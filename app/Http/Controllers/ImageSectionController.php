<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContractorProfile;
use App\Models\ImageSection;

class ImageSectionController extends Controller
{
    public function store(Request $request, $contractorProfileId)
    {
        $profile = ContractorProfile::findOrFail($contractorProfileId);

        $data = $request->validate([
            'section_image' => 'required|image',
            'section_text' => 'nullable|string'
        ]);

        $data['section_image'] = $request->file('section_image')->store('images/section_images', 'public-storage');

        $profile->imageSections()->create($data);

        return response()->json(['message' => 'Image section added successfully.']);
    }

    public function update(Request $request, $sectionId)
    {
        $section = ImageSection::findOrFail($sectionId);

        $data = $request->validate([
            'section_image' => 'sometimes|image',
            'section_text' => 'sometimes|string'
        ]);

        if ($request->hasFile('section_image')) {
            $data['section_image'] = $request->file('section_image')->store('images/section_images', 'public-storage');
        }

        $section->update($data);

        return response()->json(['message' => 'Image section updated successfully.']);
    }

    public function destroy($sectionId)
    {
        $section = ImageSection::findOrFail($sectionId);
        $section->delete();

        return response()->json(['message' => 'Image section deleted successfully.']);
    }
}
