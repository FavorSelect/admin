import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  value?: File[];
  multiple?: boolean;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  aspectRatio?: number;
  placeholder?: string;
  existingUrls?: string[];
  onRemoveExisting?: (index: number) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  value,
  multiple = true,
  maxSizeMB = 5,
  acceptedTypes = ["image/jpeg", "image/png"],
  aspectRatio,
  placeholder,
  existingUrls,
  onRemoveExisting,
}) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const validFiles: File[] = [];

      for (const file of acceptedFiles) {
        // ✅ File type check
        if (!acceptedTypes.includes(file.type)) {
          alert(`File type not allowed: ${file.type}`);
          continue;
        }

        // ✅ File size check
        if (file.size > maxSizeMB * 1024 * 1024) {
          alert(`File ${file.name} exceeds size limit of ${maxSizeMB}MB`);
          continue;
        }

        // ✅ Aspect ratio check (if provided)
        if (aspectRatio && file.type.startsWith("image/")) {
          const imageBitmap = await createImageBitmap(file);
          const ratio = imageBitmap.width / imageBitmap.height;
          const ratioDiff = Math.abs(ratio - aspectRatio);

          if (ratioDiff > 0.05) {
            alert(
              `File ${
                file.name
              } does not match required aspect ratio of ${aspectRatio.toFixed(
                2
              )}`
            );
            continue;
          }
        }

        validFiles.push(file);
      }

      if (!multiple) {
        onFilesSelected(validFiles.slice(0, 1));
      } else {
        onFilesSelected(validFiles);
      }
    },
    [acceptedTypes, maxSizeMB, aspectRatio, multiple, onFilesSelected]
  );

  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
  });

  return (
    <div
      {...getRootProps()}
      className="border border-dashed border-gray-400 py-2 px-3   text-sm rounded-md font-medium bg-white cursor-pointer"
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {placeholder} {multiple ? "files" : "a file"} here, or click to select
      </p>

      {existingUrls && existingUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {existingUrls.map((url, index) => (
            <div
              key={`existing-${index}`}
              className="relative group border border-pale-rose rounded-md overflow-hidden"
            >
              <Image
                src={url}
                alt={`Existing ${index + 1}`}
                className="w-full h-28 object-cover"
                width={200}
                height={200}
              />
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveExisting?.(index);
                }}
                className="absolute top-1 right-1 bg-white text-gray-700 rounded-full p-1 shadow hover:text-red-600 z-10"
              >
                <X size={18} />
              </Button>
            </div>
          ))}
        </div>
      )}
      {value && value.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {value.map((file, index) => {
            const isImage = file.type.startsWith("image/");
            const previewUrl = URL.createObjectURL(file);

            return (
              <div
                key={index}
                className="relative group border border-pale-rose rounded-md overflow-hidden"
              >
                {isImage ? (
                  <Image
                    src={previewUrl}
                    alt={file.name}
                    className="w-full h-28 object-cover"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 bg-gray-100 text-gray-600">
                    {file.name}
                  </div>
                )}

                {/* Close Button */}
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newFiles = [...value];
                    newFiles.splice(index, 1);
                    onFilesSelected(newFiles);
                  }}
                  className="absolute top-1 right-1 bg-white text-gray-700 rounded-full p-1 shadow hover:text-red-600 z-10"
                >
                  <X size={18} />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
