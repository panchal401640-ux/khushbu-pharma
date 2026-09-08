'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, Image as ImageIcon, Film, AlertCircle, Check, X } from 'lucide-react';
import {
  uploadFile,
  validateFile,
  ACCEPTED_TYPES,
  type UploadResult,
  type UploadProgress as UploadProgressType,
} from '@/lib/cloudinary';
import UploadProgressComponent from './UploadProgress';

interface MediaUploaderProps {
  onUploadComplete?: (result: UploadResult) => void;
  onUploadError?: (error: string) => void;
  maxFiles?: number;
  className?: string;
  compact?: boolean;
}

interface PendingUpload {
  id: string;
  file: File;
  progress: UploadProgressType | null;
  status: 'pending' | 'uploading' | 'success' | 'error';
  result?: UploadResult;
  error?: string;
  previewUrl?: string;
}

export default function MediaUploader({
  onUploadComplete,
  onUploadError,
  maxFiles = 10,
  className = '',
  compact = false,
}: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<PendingUpload[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());

  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files).slice(0, maxFiles);

      const newUploads: PendingUpload[] = [];
      for (const file of fileArray) {
        const validation = validateFile(file);
        if (!validation.valid) {
          onUploadError?.(validation.error!);
          continue;
        }

        let previewUrl: string | undefined;
        if (file.type.startsWith('image/')) {
          previewUrl = URL.createObjectURL(file);
        }

        newUploads.push({
          id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
          file,
          progress: null,
          status: 'pending',
          previewUrl,
        });
      }

      setUploads((prev) => [...prev, ...newUploads]);

      for (const upload of newUploads) {
        startUpload(upload);
      }
    },
    [maxFiles, onUploadError]
  );

  const startUpload = useCallback(
    async (upload: PendingUpload) => {
      setUploads((prev) =>
        prev.map((u) => (u.id === upload.id ? { ...u, status: 'uploading' } : u))
      );

      try {
        const result = await uploadFile(upload.file, (progress) => {
          setUploads((prev) =>
            prev.map((u) => (u.id === upload.id ? { ...u, progress } : u))
          );
        });

        setUploads((prev) =>
          prev.map((u) =>
            u.id === upload.id ? { ...u, status: 'success', result, progress: { loaded: u.file.size, total: u.file.size, percentage: 100 } } : u
          )
        );

        onUploadComplete?.(result);
      } catch (err: any) {
        const errorMsg = err.message || 'Upload failed';
        setUploads((prev) =>
          prev.map((u) =>
            u.id === upload.id ? { ...u, status: 'error', error: errorMsg } : u
          )
        );
        onUploadError?.(errorMsg);
      }
    },
    [onUploadComplete, onUploadError]
  );

  const handleCancel = useCallback((id: string) => {
    const controller = abortControllersRef.current.get(id);
    if (controller) {
      controller.abort();
      abortControllersRef.current.delete(id);
    }
    setUploads((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const handleDismiss = useCallback((id: string) => {
    setUploads((prev) => {
      const upload = prev.find((u) => u.id === id);
      if (upload?.previewUrl) URL.revokeObjectURL(upload.previewUrl);
      return prev.filter((u) => u.id !== id);
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
        e.target.value = '';
      }
    },
    [addFiles]
  );

  const acceptedTypes = ACCEPTED_TYPES.join(',');

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
        >
          <Upload className="w-4 h-4" />
          Upload Files
        </button>
        {uploads.length > 0 && (
          <div className="mt-3 space-y-2">
            {uploads.map((upload) => (
              <UploadProgressComponent
                key={upload.id}
                fileName={upload.file.name}
                fileSize={upload.file.size}
                fileType={upload.file.type.startsWith('video/') ? 'video' : 'image'}
                progress={upload.progress}
                status={upload.status}
                error={upload.error}
                thumbnailUrl={upload.previewUrl}
                onCancel={() => handleCancel(upload.id)}
                onDismiss={() => handleDismiss(upload.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50 scale-[1.02]'
            : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
              isDragging ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              JPG, PNG, WebP, MP4, MOV, AVI • Max 100MB
            </p>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload list */}
      {uploads.length > 0 && (
        <div className="space-y-2">
          {uploads.map((upload) => (
            <UploadProgressComponent
              key={upload.id}
              fileName={upload.file.name}
              fileSize={upload.file.size}
              fileType={upload.file.type.startsWith('video/') ? 'video' : 'image'}
              progress={upload.progress}
              status={upload.status}
              error={upload.error}
              thumbnailUrl={upload.previewUrl}
              onCancel={() => handleCancel(upload.id)}
              onDismiss={() => handleDismiss(upload.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
