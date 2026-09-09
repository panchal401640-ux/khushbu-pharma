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
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`,
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
