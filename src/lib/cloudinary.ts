export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  apiKey?: string;
}

const DEFAULT_CONFIG: CloudinaryConfig = {
  cloudName: 'rvpoqyva',
  uploadPreset: 'kpm_uploads',
  apiKey: '',
};

export function getConfig(): CloudinaryConfig {
  try {
    const stored = localStorage.getItem('kpm_cloudinary');
    if (stored) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    }
  } catch {}
  return { ...DEFAULT_CONFIG };
}

export function saveConfig(config: CloudinaryConfig): void {
  localStorage.setItem('kpm_cloudinary', JSON.stringify(config));
}

export function isConfigured(): boolean {
  const config = getConfig();
  return !!(config.cloudName && config.uploadPreset);
}

export const CLOUDINARY_CONFIG = {
  cloudName: 'rvpoqyva',
  uploadPreset: 'kpm_uploads',
};

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes: number;
  width?: number;
  height?: number;
}

export async function uploadToCloudinary(
  file: File,
  folder: string = 'kpm'
): Promise<CloudinaryUploadResult> {
  const config = getConfig();
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', config.uploadPreset || CLOUDINARY_CONFIG.uploadPreset);
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName || CLOUDINARY_CONFIG.cloudName}/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || 'Upload failed');
  }

  return response.json();
}

export async function uploadMultipleFiles(
  files: File[],
  folder: string = 'kpm',
  onProgress?: (file: string, progress: number) => void
): Promise<CloudinaryUploadResult[]> {
  const results: CloudinaryUploadResult[] = [];

  for (const file of files) {
    onProgress?.(file.name, 0);
    const result = await uploadToCloudinary(file, folder);
    results.push(result);
    onProgress?.(file.name, 100);
  }

  return results;
}
