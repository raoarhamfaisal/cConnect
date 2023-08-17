<?php

namespace App\Services;

use Illuminate\Support\Str;

class ProcessImageService
{
    // called function processImage +++++++++++++++++++++++++++++++++++++++
    public function handleProcessImage($imagesString = null, $postId)
    {
        //dd('In Services: ', $imagesString);

        //  $imageString is a string of image paths seperated by |
        //  convert the images string parameter into array
        //  called $explodedImage
        $imagesArray = $imagesString ? explode('|', $imagesString) : [];
        $userId = Auth()->user('')->id;

        $userId = strval($userId) . '_';
        $postId = strval($postId) . '_';

        $newImageString = '';

        // dd($userId, $postId, $imagesArray);

        if ($imagesArray) {
            foreach ($imagesArray as $image) {

                // Existing files path & file names
                $storagePathFile = storage_path('app/public/' . $image);
                //dd($storagePath);

                if (is_file($storagePathFile)) {
                    // This is for the image copied to the server
                    // We are adding the user_id of poster and
                    // the id of the post to track images when
                    // upload to public server.
                    $imageSlice = Str::afterLast($image, '/');
                    $imageOnly = $userId . $postId . $imageSlice;

                    $publicPathFile = public_path('uploads/posts/' . $imageOnly);

                    //dd($image, $storagePathFile, $publicPathFile);

                    copy($storagePathFile, $publicPathFile);
                    unlink($storagePathFile);
                    $newImageString .= $imageOnly . "|";
                }
            }
            $newImageString = rtrim($newImageString, '|');

        } else {
            $newImageString = null;
        }
        //dd($newImageString);

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
