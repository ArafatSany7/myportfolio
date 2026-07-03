"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div className="space-y-4 w-full">
      {value ? (
        <div className="relative w-full h-[200px] rounded-md overflow-hidden border border-border">
          <div className="z-10 absolute top-2 right-2">
            <button
              type="button"
              onClick={onRemove}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground p-2 rounded-md shadow-md transition-colors"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
          <Image fill className="object-cover" alt="Upload" src={value} />
        </div>
      ) : (
        <CldUploadWidget onSuccess={onUpload} uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}>
          {({ open }) => {
            const onClick = (e: React.MouseEvent) => {
              e.preventDefault();
              open();
            };
            return (
              <button
                type="button"
                onClick={onClick}
                className="w-full h-[200px] border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                <ImagePlus className="h-10 w-10" />
                <span className="font-medium">Upload an Image</span>
              </button>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
}
