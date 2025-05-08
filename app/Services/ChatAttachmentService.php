<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class ChatAttachmentService
{
    /**
     * Process and store a temporary chat attachment.
     *
     * @param UploadedFile $file
     * @return string
     */
    public function processTempAttachment(UploadedFile $file)
    {
        Log::info('Processing temp attachment', [
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'error' => $file->getError()
        ]);

        // Validate document type
        if (!$this->isValidAttachmentType($file)) {
            Log::warning('Invalid file type rejected', [
                'mime_type' => $file->getMimeType()
            ]);
            throw new \Exception('Invalid file type. Only PDF, DOC, DOCX, JPG, and PNG files are allowed.');
        }

        // Generate a unique filename to avoid collisions
        $filename = Str::random(20) . '_' . time() . '.' . $file->getClientOriginalExtension();
        
        // Define the public directory path
        $directory = 'uploads/chat/temp';
        $publicDir = public_path($directory);
        
        // Ensure the directory exists
        if (!file_exists($publicDir)) {
            mkdir($publicDir, 0755, true);
        }
        
        // Move the uploaded file to the public directory
        $file->move($publicDir, $filename);
        
        // Return the path relative to the public directory
        $relativePath = $directory . '/' . $filename;
        
        Log::info('File stored successfully in public directory', [
            'path' => $relativePath,
            'exists' => file_exists(public_path($relativePath))
        ]);
        
        return $relativePath;
    }

    /**
     * Process and store permanent chat attachment from temporary or uploaded file.
     *
     * @param mixed $fileOrPath Either an UploadedFile or a string path to temp file
     * @param int $messageId
     * @return array
     */
    public function processPermanentAttachment($fileOrPath, int $messageId)
    {
        // Define target directory path relative to public directory
        $directory = "uploads/chat/attachments/{$messageId}";
        $publicDir = public_path($directory);
        
        // Ensure the directory exists
        if (!file_exists($publicDir)) {
            mkdir($publicDir, 0755, true);
        }
        
        if ($fileOrPath instanceof UploadedFile) {
            // Direct file upload case
            $file = $fileOrPath;
            
            // Validate file type
            if (!$this->isValidAttachmentType($file)) {
                throw new \Exception('Invalid file type. Only PDF, DOC, DOCX, JPG, and PNG files are allowed.');
            }
            
            // Generate filename
            $filename = Str::random(20) . '_' . time() . '.' . $file->getClientOriginalExtension();
            
            // Move the uploaded file to the public directory
            $file->move($publicDir, $filename);
            
            // Return the path relative to the public directory and the mime type
            $relativePath = $directory . '/' . $filename;
            
            return [
                'path' => $relativePath,
                'type' => $file->getMimeType()
            ];
        } else {
            // Path string case - move from temp location to permanent
            $tempPath = $fileOrPath;
            
            // Check if temp file exists in public directory
            if (!file_exists(public_path($tempPath))) {
                throw new \Exception('Temporary file does not exist: ' . $tempPath);
            }
            
            // Get original filename from path
            $filename = basename($tempPath);
            
            // Move file from temp to permanent location
            $permanentPath = $directory . '/' . $filename;
            
            // Copy the file (rename would be better but might fail across different drives)
            if (!copy(public_path($tempPath), public_path($permanentPath))) {
                throw new \Exception('Failed to move file from temp to permanent location');
            }
            
            // Delete the temp file
            @unlink(public_path($tempPath));
            
            // Get mime type from the file
            $mimeType = mime_content_type(public_path($permanentPath));
            
            return [
                'path' => $permanentPath,
                'type' => $mimeType
            ];
        }
    }

    /**
     * Validate if the file is of an allowed type.
     *
     * @param UploadedFile $file
     * @return bool
     */
    public function isValidAttachmentType(UploadedFile $file)
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
}
