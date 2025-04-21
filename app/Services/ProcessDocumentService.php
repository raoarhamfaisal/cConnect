<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class ProcessDocumentService
{
    /**
     * Process and store a supporting document.
     *
     * @param UploadedFile $file
     * @param string $directory
     * @return string
     */
    public function processSupportingDocument(UploadedFile $file, string $directory = 'uploads/supporting_documents')
    {
        // Generate a unique filename to avoid collisions
        $filename = Str::random(20) . '_' . time() . '.' . $file->getClientOriginalExtension();
        
        // First, store the file temporarily in the public disk
        $tempPath = Storage::disk('public')->putFileAs($directory, $file, $filename);
        
        // Create the permanent path for the document
        $publicDir = 'uploads/supporting_documents';
        
        // Ensure directory exists
        if (!file_exists(public_path($publicDir))) {
            mkdir(public_path($publicDir), 0755, true);
        }
        
        // Copy from storage to public path
        $storagePath = Storage::disk('public')->path($tempPath);
        $publicPath = public_path($publicDir . '/' . $filename);
        
        // Copy the file
        copy($storagePath, $publicPath);
        
        // Remove the temporary file
        Storage::disk('public')->delete($tempPath);
        
        // Return the public path
        return $publicDir . '/' . $filename;
    }

    /**
     * Validate if the document is of an allowed type.
     *
     * @param UploadedFile $file
     * @return bool
     */
    public function isValidDocumentType(UploadedFile $file)
    {
        $allowedMimeTypes = [
            'application/pdf',                                                           // PDF
            'application/msword',                                                        // DOC
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',   // DOCX
            'image/jpeg',                                                                // JPEG, JPG
            'image/png',                                                                 // PNG
        ];

        return in_array($file->getMimeType(), $allowedMimeTypes);
    }

    /**
     * Handle the processing of a supporting document.
     *
     * @param UploadedFile $file
     * @param int|null $reviewId
     * @return string
     */
    public function handleProcessDocument(UploadedFile $file, ?int $reviewId = null)
    {
        // Validate document type
        if (!$this->isValidDocumentType($file)) {
            throw new \Exception('Invalid document type. Only PDF, DOC, DOCX, JPG, and PNG files are allowed.');
        }

        // Define the directory, potentially using the review ID if provided
        $directory = 'uploads/supporting_documents';
        if ($reviewId) {
            $directory .= "/{$reviewId}";
        }

        // Process and store the document
        return $this->processSupportingDocument($file, $directory);
    }

    /**
     * Delete a supporting document.
     *
     * @param string $path
     * @return bool
     */
    public function deleteDocument(string $path)
    {
        $publicPath = public_path($path);
        
        if (file_exists($publicPath)) {
            return unlink($publicPath);
        }
        
        return false;
    }
}
