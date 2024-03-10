<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContractorProfile;
use App\Models\BragSection;
use Illuminate\Support\Facades\Storage;

class BragSectionController extends Controller
{
    public function store(Request $request, $contractorProfileId)
    {
        $contractorProfile = ContractorProfile::findOrFail($contractorProfileId);
    
        $data = $request->validate([
            'section_image' => 'nullable|image',
            'section_text' => 'nullable|string'
        ]);
    
        // $data['section_image'] = $request->file('section_image')->store('uploads/brag_section', 'public-storage');
    
        if( $request->file('section_image')) {

            // $imageSection = $contractorProfile->bragSections()->create($data);
            $relativePath = $request->file('section_image')->store('uploads/brag_section', 'public-storage');
        
            // Convert the relative path to a full URL
            $fullURL = asset($relativePath);
            
            // Save the full URL in the array
            $data['section_image'] = $fullURL;
        }

        // Use the data to create the image section for the contractor profile
        $imageSection = $contractorProfile->bragSections()->create($data);
    
        return response()->json(['message' => 'Brag section added successfully.', 'imageSection' => $imageSection]);
    }
    
    public function update(Request $request, $sectionId)
    {
        $section = BragSection::findOrFail($sectionId);
    
        $data = $request->validate([
            'section_image' => 'nullable|image',
            'section_text' => 'nullable|string'
        ]);


        // If a new image is uploaded, delete the previous one
        if ($request->hasFile('section_image')) {
            // Storage::disk('public-storage')->delete($section->section_image);
            // $data['section_image'] = $request->file('section_image')->store('uploads/brag_section', 'public-storage');
            // Delete the old image from storage
            if($section->section_image && ($section->section_image !== "/uploads/default-images/blank-image-2.jpg" && $section->section_image !== "/uploads/default-images/blank-image-1.jpg")) {
                Storage::disk('public-storage')->delete($section->section_image);
            }
            
            // Store the new image and get the relative path
            $relativePath = $request->file('section_image')->store('uploads/brag_section', 'public-storage');
            
            // Convert the relative path to a full URL
            $fullURL = asset( $relativePath);
            
            // Save the full URL in the array
            $data['section_image'] = $fullURL;


        }
        // dd($data);
        $section->update($data);
    
        // Refresh the section to get latest attributes (especially if relationships are involved)
        $section->refresh();
    
        return response()->json(['message' => 'Brag section updated successfully.', 'imageSection' => $section]);
    }
    
    
    public function destroy($sectionId)
    {
        $section = BragSection::findOrFail($sectionId);
        
        // Delete the image associated with the section
        if($section->section_image && ($section->section_image !== "/uploads/default-images/blank-image-2.jpg" && $section->section_image !== "/uploads/default-images/blank-image-1.jpg")) {
            Storage::disk('public-storage')->delete($section->section_image);
        }
        
        $section->delete();
    
        return response()->json(['message' => 'Brag section deleted successfully.']);
    }
}
