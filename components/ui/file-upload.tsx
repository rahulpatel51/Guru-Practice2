"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, File, FileText } from "lucide-react"
import { uploadFile, uploadMultipleFiles } from "@/services/upload-service"

interface FileUploadProps {
  onUpload: (urls: string[]) => void
  multiple?: boolean
  accept?: string
  maxSize?: number // in MB
  type?: "product" | "user" | "order"
  className?: string
  buttonText?: string
  showPreview?: boolean
  initialFiles?: string[]
}

export function FileUpload({
  onUpload,
  multiple = false,
  accept = "image/*",
  maxSize = 5, // 5MB default
  type = "product",
  className = "",
  buttonText = "Upload Files",
  showPreview = true,
  initialFiles = [],
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>(initialFiles)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)

    if (!e.target.files?.length) return

    const selectedFiles = Array.from(e.target.files)

    // Check file size
    const oversizedFiles = selectedFiles.filter((file) => file.size > maxSize * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the maximum size of ${maxSize}MB`)
      return
    }

    setFiles(multiple ? [...files, ...selectedFiles] : selectedFiles)

    // Generate previews for images
    if (showPreview) {
      const newPreviews = selectedFiles.map((file) => {
        if (file.type.startsWith("image/")) {
          return URL.createObjectURL(file)
        }
        return getFileIcon(file)
      })

      setPreviews(multiple ? [...previews, ...newPreviews] : newPreviews)
    }
  }

  const getFileIcon = (file: File): string => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file)
    } else if (file.type.startsWith("video/")) {
      return "video-icon"
    } else if (file.type.includes("pdf")) {
      return "pdf-icon"
    }
    return "file-icon"
  }

  const handleUpload = async () => {
    if (!files.length) return

    setIsUploading(true)
    setError(null)

    try {
      let urls: string[] = []

      if (multiple) {
        urls = await uploadMultipleFiles(files, type)
      } else {
        const url = await uploadFile(files[0], type)
        if (url) urls = [url]
      }

      if (urls.length) {
        onUpload(urls)
        setFiles([])
        setPreviews(urls)
      } else {
        setError("Failed to upload files")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)

    if (showPreview) {
      const newPreviews = [...previews]
      const removed = newPreviews.splice(index, 1)[0]

      // Revoke object URL if it's a blob URL
      if (removed.startsWith("blob:")) {
        URL.revokeObjectURL(removed)
      }

      setPreviews(newPreviews)
    }
  }

  const removeInitialFile = (index: number) => {
    const newPreviews = [...previews]
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)
    onUpload(newPreviews)
  }

  const renderPreview = (src: string, index: number, isInitial = false) => {
    if (src.startsWith("blob:") || src.startsWith("http")) {
      return (
        <div key={index} className="relative group">
          <img
            src={src || "/placeholder.svg"}
            alt={`Preview ${index}`}
            className="w-20 h-20 object-cover rounded-md border dark:border-gray-700"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => (isInitial ? removeInitialFile(index) : removeFile(index))}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )
    } else if (src === "video-icon") {
      return (
        <div key={index} className="relative group">
          <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md border dark:border-gray-700">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => removeFile(index)}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )
    } else {
      return (
        <div key={index} className="relative group">
          <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md border dark:border-gray-700">
            <File className="h-8 w-8 text-gray-400" />
          </div>
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => removeFile(index)}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col items-center justify-center border-2 border-dashed dark:border-gray-700 rounded-lg p-6 transition-colors hover:border-gray-400 dark:hover:border-gray-600">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Upload className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium dark:text-white">
              Drag and drop files here, or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {multiple ? "Upload multiple files" : "Upload a file"} up to {maxSize}MB
            </p>
          </div>
        </div>
      </div>

      {error && <div className="text-sm text-red-500 dark:text-red-400">{error}</div>}

      {showPreview && previews.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium dark:text-white mb-2">
            {files.length > 0 ? "Selected Files" : "Uploaded Files"}
          </p>
          <div className="flex flex-wrap gap-2">
            {previews.map((preview, index) => renderPreview(preview, index, index >= files.length))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <Button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isUploading ? "Uploading..." : buttonText}
        </Button>
      )}
    </div>
  )
}

