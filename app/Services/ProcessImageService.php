<?php

namespace App\Services;

use Illuminate\Support\Str;

class ProcessImageService
{
    public function handleProcessImage($imagesString = null, $postId)
    {
        $imagesArray = $imagesString ? explode('|', $imagesString) : [];
        $userId = Auth()->user()->id; // Ensure this is getting the correct user ID
    
        $userIdPrefix = strval($userId) . '_';
        $postIdPrefix = strval($postId) . '_';
        $identifierPrefix = $userIdPrefix . $postIdPrefix;
    
        $newImageString = '';
    
        if ($imagesArray) {
            foreach ($imagesArray as $image) {
    
                $imageOnly = null;
                // Extract the filename part after 'uploads/posts/'
                $imageFilename = Str::after($image, 'uploads/posts/');
    
                // Check if the image name already contains the user ID and post ID
                if (!strpos($image, $identifierPrefix)) {
                    // Processing required
                    $storagePathFile = storage_path('app/public/' . $image);
    
                    if (is_file($storagePathFile)) {
                        $imageSlice = Str::afterLast($image, '/');
                        $imageOnly = $identifierPrefix . $imageSlice;
                        $publicPathFile = public_path(env('POSTS_UPLOAD_PATH') . $imageOnly);
    
                        copy($storagePathFile, $publicPathFile);
                        unlink($storagePathFile);
                    }
                } else {
                    // No processing required, just use the part of the image name after 'uploads/posts/'
                    $imageOnly = $imageFilename;
                }
                $newImageString .= $imageOnly . "|";
            }
            $newImageString = rtrim($newImageString, '|');
        } else {
            $newImageString = null;
        }
    
        return $newImageString;
    }
    
    // NOT USING THIS FUNCTION RIGHT NOW
    public function hasImage(string $image): bool
    {
        return strpos($this->$image, $image) !== false;
    }

    // NOT USING THIS FUNCTION RIGHT NOW
    public function findMissingImages($images): array
    {
        $missingImages = [];

        // convert string to array
        $currentImages = $images ? explode('|', $images) : [];

        // GO THROUGH ARRAY AND CHECK IF EACH AND EVERY IMAGE
        // IMAGE IS PRESENT IN THE ARRAY FROM THE REQUEST
        // if not, add to $missingImages
        foreach ($currentImages as $image) {
            if (!in_array($image, $images)) {
                $missingImages[] = $image;
            }
        }

        return $missingImages;

    }

}
