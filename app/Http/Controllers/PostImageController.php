<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostImageController extends Controller
{

    // upload ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Uplloads files to temp storage
    public function upload(Request $request)
    {
        // check if $request has file and if it does
        // save the file in the storage folder
        if ($request->hasFile('imageFilepond')) {
            // temp storage here - storage\app\public\uploads\posts
            // After file is saved it gets
            // moved to permenate storage
            return $request->file('imageFilepond')->store('uploads/posts', 'public');

            return '';
        }
    }

    // uploadRevert ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Removes uploaded but not saved image from temp storage
    public function uploadRevert(Request $request)
    {
        if ($image = $request->get('image')) {
            $path = storage_path('app/public/' . $image);
            if (file_exists($path)) {
                // delete old temp file
                unlink($path);
            }
        }

    }

   public function reOrder(Request $request)
{
    // Validate the request here, for example, check if 'images' and 'imageFiles' are arrays

  // Deletion part
  if ($request->has('images') && is_array($request->get('images'))) {
    $images = $request->get('images');
    foreach ($images as $image) {
        $path = storage_path('app/public/' . $image);
        if (file_exists($path)) {
            unlink($path);
        }
    }
}
    // Uploading part
    $paths = [];
    if ($request->has('imageFiles')) {
        $files = $request->file('imageFiles');
    

        foreach ($files as $file) {
            // if ($file instanceof UploadedFile) {
                $path = $file->store('uploads/posts', 'public');
                $paths[] = $path;
             
            // }
        }
    }
    
    return implode('|', $paths);
    dd('Final paths:', $paths);
    }

  

}
