export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  apiKey?: string;
}

export interface UploadResult {
  url: string;
  thumbnailUrl: string;
  fileType: 'image' | 'video';
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  publicId: string;
  format: string;
  originalName: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const BASE64_FALLBACK_LIMIT = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
export const ACCEPTED_TYPES = [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES];

export function getConfig(): CloudinaryConfig {
  if (typeof window === 'undefined') return { cloudName: '', uploadPreset: '' };
  try {
    const stored = localStorage.getItem('kpm_cloudinary_config');
    if (stored) return JSON.parse(stored);
  } catch {}
  return { cloudName: '', uploadPreset: '' };
}

export function saveConfig(config: CloudinaryConfig): void {
  localStorage.setItem('kpm_cloudinary_config', JSON.stringify(config));
}

export function isConfigured(): boolean {
  const config = getConfig();
  return !!(config.cloudName && config.uploadPreset);
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return { valid: false, error: `Unsupported file type: ${file.type}. Accepted: JPG, PNG, WebP, MP4, MOV, AVI, WebM` };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum: 100MB` };
  }
  return { valid: true };
}

export function getFileType(file: File): 'image' | 'video' {
  return file.type.startsWith('video/') ? 'video' : 'image';
}

function getVideoThumbnailFromUrl(videoUrl: string): string {
  const url = new URL(videoUrl);
  const parts = url.pathname.split('/');
  const versionAndPublicId = parts.slice(parts.indexOf('upload')).join('/');
  const base = `https://res.cloudinary.com${url.hostname.replace('.res.cloudinary.com', '')}`;
  return `${base}/${versionAndPublicId.replace('upload/', 'upload/')}.jpg`;
}

function getCloudinaryThumbnail(url: string): string {
  if (!url.includes('cloudinary.com')) return url;
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const uploadIndex = pathParts.indexOf('upload');
    if (uploadIndex === -1) return url;
    pathParts.splice(uploadIndex + 1, 0, 'c_fill,w_400,h_300,g_auto,f_auto');
    urlObj.pathname = pathParts.join('/');
    return urlObj.toString();
  } catch {
    return url;
  }
}

async function uploadToCloudinary(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  const config = getConfig();
  if (!config.cloudName || !config.uploadPreset) {
    throw new Error('Cloudinary not configured. Please set up Cloudinary in Settings.');
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', config.uploadPreset);
    formData.append('resource_type', getFileType(file) === 'video' ? 'video' : 'image');

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress({
          loaded: e.loaded,
          total: e.total,
          percentage: Math.round((e.loaded / e.total) * 100),
        });
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        const fileType = getFileType(file);
        const result: UploadResult = {
          url: data.secure_url,
          thumbnailUrl: fileType === 'video' ? `${data.secure_url.split('.').slice(0, -1).join('.')}.jpg` : getCloudinaryThumbnail(data.secure_url),
          fileType,
          mimeType: file.type,
          size: file.size,
          width: data.width,
          height: data.height,
          duration: data.duration,
          publicId: data.public_id,
          format: data.format,
          originalName: file.name,
        };
        resolve(result);
      } else {
        let msg = 'Upload failed';
        try {
          const err = JSON.parse(xhr.responseText);
          msg = err.error?.message || msg;
        } catch {}
        reject(new Error(msg));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Network error during upload')));
    xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));

    xhr.open('POST', `https://api.cloudinary.com/v1_1/${config.cloudName}/upload`);
    xhr.send(formData);

    (xhr as any)._abort = () => xhr.abort();
  });
}

async function uploadAsBase64(file: File): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const fileType = getFileType(file);
      const result: UploadResult = {
        url: dataUrl,
        thumbnailUrl: fileType === 'video' ? '' : dataUrl,
        fileType,
        mimeType: file.type,
        size: file.size,
        publicId: `local_${Date.now()}_${file.name}`,
        format: file.type.split('/')[1] || 'unknown',
        originalName: file.name,
      };
      resolve(result);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function uploadFile(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  const validation = validateFile(file);
  if (!validation.valid) throw new Error(validation.error);

  if (isConfigured()) {
    return uploadToCloudinary(file, onProgress);
  }

  if (file.size <= BASE64_FALLBACK_LIMIT) {
    if (onProgress) onProgress({ loaded: file.size, total: file.size, percentage: 100 });
    return uploadAsBase64(file);
  }

  throw new Error(
    `File is ${(file.size / 1024 / 1024).toFixed(1)}MB. Files over 5MB require Cloudinary. Please configure Cloudinary in Settings.`
  );
}

export function getGalleryItems(): UploadResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('kpm_gallery_items');
    if (stored) return JSON.parse(stored);
  } catch {}
  return getDefaultGalleryItems();
}

export function saveGalleryItems(items: UploadResult[]): void {
  localStorage.setItem('kpm_gallery_items', JSON.stringify(items));
}

export function addGalleryItem(item: UploadResult): UploadResult[] {
  const items = getGalleryItems();
  items.unshift(item);
  saveGalleryItems(items);
  return items;
}

export function removeGalleryItem(publicId: string): UploadResult[] {
  const items = getGalleryItems().filter((i) => i.publicId !== publicId);
  saveGalleryItems(items);
  return items;
}

export function getDefaultGalleryItems(): UploadResult[] {
  const defaults: UploadResult[] = [
    {
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      fileType: 'image',
      mimeType: 'image/jpeg',
      size: 0,
      publicId: 'default_pharma_machine',
      format: 'jpg',
      originalName: 'Pharmaceutical Machine',
    },
    {
      url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=300&fit=crop',
      fileType: 'image',
      mimeType: 'image/jpeg',
      size: 0,
      publicId: 'default_factory',
      format: 'jpg',
      originalName: 'Factory Facility',
    },
    {
      url: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=400&h=300&fit=crop',
      fileType: 'image',
      mimeType: 'image/jpeg',
      size: 0,
      publicId: 'default_lab_equipment',
      format: 'jpg',
      originalName: 'Lab Equipment',
    },
  ];
  saveGalleryItems(defaults);
  return defaults;
}

export function getGalleryCategories(): string[] {
  return ['All', 'Machines', 'Manufacturing', 'Installation', 'Videos', 'Logo'];
}

export interface GalleryCategoryItem extends UploadResult {
  galleryCategory: string;
}

export function getGalleryWithCategories(): GalleryCategoryItem[] {
  const items = getGalleryItems();
  return items.map((item) => ({
    ...item,
    galleryCategory: item.publicId.includes('video') ? 'Videos' : 'Machines',
  }));
}
