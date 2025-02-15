// components/ImageUpload.tsx
"use client";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebaseConfig";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
      }
    );
  };

  return (
    <div className="p-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        disabled={!file}
      >
        Upload
      </button>
      {progress > 0 && <p>Progress: {Math.round(progress)}%</p>}
      {downloadURL && (
        <div>
          <p>Image uploaded:</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            {downloadURL}
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
