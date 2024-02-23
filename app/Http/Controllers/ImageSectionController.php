<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContractorProfile;
use App\Models\ImageSection;
use Illuminate\Support\Facades\Storage;


class ImageSectionController extends Controller
{
    public function store(Request $request, $contractorProfileId)
    {
        $contractorProfile = ContractorProfile::findOrFail($contractorProfileId);
    
        $data = $request->validate([
            'section_image' => 'required|image',
            'section_text' => 'nullable|string'
        ]);
    
        // $data['section_image'] = $request->file('section_image')->store('images/section_images', 'public-storage');
    
        // $imageSection = $contractorProfile->imageSections()->create($data);
        $relativePath = $request->file('section_image')->store('images/section_images', 'public-storage');
    
    // Convert the relative path to a full URL
    $fullURL = asset($relativePath);
    
    // Save the full URL in the array
    $data['section_image'] = $fullURL;

    // Use the data to create the image section for the contractor profile
    $imageSection = $contractorProfile->imageSections()->create($data);
    
        return response()->json(['message' => 'Image section added successfully.', 'imageSection' => $imageSection]);
    }
    
    // public function update(Request $request, $sectionId)
    // {
    //         $section = ImageSection::findOrFail($sectionId);
        
    //         $data = $request->validate([
    //             'section_image' => 'sometimes|image',
    //             'section_text' => 'sometimes|string'
    //         ]);
    

    //         // If a new image is uploaded, delete the previous one
    //         if ($request->hasFile('section_image')) {
    //             // Storage::disk('public-storage')->delete($section->section_image);
    //             // $data['section_image'] = $request->file('section_image')->store('images/section_images', 'public-storage');
    //             // Delete the old image from storage
    //     Storage::disk('public-storage')->delete($section->section_image);
        
    //     // Store the new image and get the relative path
    //     $relativePath = $request->file('section_image')->store('images/section_images', 'public-storage');
        
    //     // Convert the relative path to a full URL
    //     $fullURL = asset( $relativePath);
        
    //     // Save the full URL in the array
    //     $data['section_image'] = $fullURL;

    
    //     }
    //     // dd($data);
    //     $section->update($data);
    
    //     // Refresh the section to get latest attributes (especially if relationships are involved)
    //     $section->refresh();
    
    //     return response()->json(['message' => 'Image section updated successfully.', 'imageSection' => $section]);
    // }


    public function update(Request $request, $sectionId)
    {
        $section = ImageSection::where("id", $sectionId)->first();

        // dd($request);
    
        $data = $request->validate([
            // 'section_image' => 'sometimes|image',
            'section_text' => 'sometimes|string'
        ]);
    
        // // If a new image is uploaded, delete the previous one
        // if ($request->hasFile('section_image')) {
        //     Storage::disk('public-storage')->delete($section->section_image);
        // }
        
        // $data['section_image'] = $request->file('section_image')->store('images/section_images', 'public-storage');
    
        $section->update($data);
    
        // Refresh the section to get latest attributes (especially if relationships are involved)
        $section->refresh();


    
        return response()->json(['message' => 'Image section updated successfully.', 'imageSection' => $section]);
    }
    
    
    public function destroy($sectionId)
    {
        $section = ImageSection::findOrFail($sectionId);
        
        // Delete the image associated with the section
        Storage::disk('public-storage')->delete($section->section_image);
        
        $section->delete();
    
        return response()->json(['message' => 'Image section deleted successfully.']);
    }
}
