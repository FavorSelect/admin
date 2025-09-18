"use client";
import { toast } from "react-hot-toast";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/molecules/file-uploader/Uploader";
import React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/atoms/Button";

type FileUploaderProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  multiple?: boolean;
};

export default function FileUploader({
  files,
  onFilesChange,
  maxFiles,
  multiple = false,
}: FileUploaderProps) {
  const onFileReject = React.useCallback((file: File, message: string) => {
    const shortName =
      file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name;

    toast(
      <div>
        <div style={{ fontWeight: 600 }}>{message}</div>
        <div style={{ fontSize: 12, opacity: 0.8 }}>
          “{shortName}” has been rejected
        </div>
      </div>
    );
  }, []);

  const handleValueChange = React.useCallback(
    (next: File[]) => {
      onFilesChange(next);
    },
    [onFilesChange]
  );

  const sizeBytes = 8 * 1024 * 1024;

  return (
    <div className="relative">
      <FileUpload
        maxFiles={maxFiles ?? 1}
        maxSize={sizeBytes}
        accept="image/png,image/jpeg"
        className="w-full"
        value={files}
        onValueChange={handleValueChange}
        onFileReject={onFileReject}
        multiple={multiple}
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center justify-center rounded-full border border-muted-foreground p-2.5">
              <Upload className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-sm">Drag & drop files here</p>
            <p className="text-muted-foreground text-xs">
              Or click to browse (max {maxFiles ?? 1} file
              {maxFiles && maxFiles > 1 ? "s" : ""}, up to{" "}
              {sizeBytes / (1024 * 1024)}MB)
            </p>
          </div>

          <FileUploadTrigger asChild>
            <Button
              size="sm"
              className="mt-2 w-fit bg-white text-slate-900 border border-slate-200 hover:bg-slate-100 focus-visible:ring-slate-400"
            >
              Browse files
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>

        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem
              key={index}
              value={file}
              className="border-slate-200"
            >
              <FileUploadItemPreview className="border-slate-200" />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <button className="w-7 h-7 bg-slate-200 flex justify-center items-center rounded cursor-pointer text-gray-600 hover:bg-slate-300 transition duration-150">
                  <X size={18} />
                </button>
              </FileUploadItemDelete>
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>
    </div>
  );
}
