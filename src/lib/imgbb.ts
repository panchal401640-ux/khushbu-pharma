export interface UploadResult {
  url: string;
  display_url: string;
  id: string;
}

const IMGBB_API_KEY = 'd0b83854803b4bda06c7a15b4d1a8a04';

export async function uploadToImgBB(file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append('key', IMGBB_API_KEY);
  formData.append('image', file);

  const response = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || 'Upload failed');
  }

  const data = await response.json();
  return {
    url: data.data.url,
    display_url: data.data.display_url,
    id: data.data.id,
  };
}

export async function uploadMultipleFiles(
  files: File[],
  onProgress?: (file: string, progress: number) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];
  for (const file of files) {
    onProgress?.(file.name, 0);
    const result = await uploadToImgBB(file);
    results.push(result);
    onProgress?.(file.name, 100);
  }
  return results;
}
