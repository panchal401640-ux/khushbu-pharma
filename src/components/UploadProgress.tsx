'use client';

import React from 'react';
import { X, Check, AlertCircle, Loader2, Image as ImageIcon, Film } from 'lucide-react';
import type { UploadProgress as UploadProgressType } from '@/lib/cloudinary';

interface UploadProgressProps {
  fileName: string;
  fileSize: number;
  fileType: 'image' | 'video';
  progress: UploadProgressType | null;
  status: 'uploading' | 'success' | 'error';
  error?: string;
  thumbnailUrl?: string;
  onCancel?: () => void;
  onDismiss?: () => void;
}

export default function UploadProgress({
  fileName,
  fileSize,
  fileType,
  progress,
  status,
  error,
  thumbnailUrl,
  onCancel,
  onDismiss,
}: UploadProgressProps) {
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  const percentage = progress?.percentage ?? 0;

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Thumbnail / Icon */}
      <div className="relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {fileType === 'video' ? (
              <Film className="w-5 h-5 text-slate-400" />
            ) : (
              <ImageIcon className="w-5 h-5 text-slate-400" />
            )}
          </div>
        )}
        {status === 'success' && (
          <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
        )}
        {status === 'error' && (
          <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-slate-900 truncate">{fileName}</p>
          {status === 'uploading' && (
            <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          {formatSize(fileSize)}
          {status === 'uploading' && progress && (
            <span className="ml-2 text-blue-600 font-medium">{percentage}%</span>
          )}
          {status === 'success' && (
            <span className="ml-2 text-green-600 font-medium">Uploaded</span>
          )}
          {status === 'error' && (
            <span className="ml-2 text-red-600 font-medium truncate inline-block max-w-[150px]">
              {error || 'Failed'}
            </span>
          )}
        </p>
        {status === 'uploading' && (
          <div className="mt-1.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex-shrink-0">
        {status === 'uploading' && onCancel && (
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Cancel upload"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {status === 'success' && onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {status === 'error' && onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
