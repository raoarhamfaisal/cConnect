<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class AdminPostsController extends Controller
{
    public function getAllPosts(Request $request)
    {
        $perPage = $request->query('per_page', 15);
        $page = $request->query('page', 1);
        $search = $request->query('search', '');
    
        // Start building the query directly with the Post model
        $posts = Post::with(['user.profile']);
    
        // Filter posts based on the search parameter
        if (!empty($search)) {
            $posts->where(function($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%')
                      ->orWhere('body1', 'like', '%' . $search . '%')
                      ->orWhere('body2', 'like', '%' . $search . '%');
            });
        }
    
        // Add any additional filters or sorting you need here
    
        $paginatedPosts = $posts->paginate($perPage, ['*'], 'page', $page);
    
        $response = [
            'posts' => $paginatedPosts->items(),
            'pagination' => [
                'current_page' => $paginatedPosts->currentPage(),
                'last_page' => $paginatedPosts->lastPage(),
                'per_page' => $paginatedPosts->perPage(),
                'total' => $paginatedPosts->total(),
            ]
        ];
    
        return response()->json($response);
    }
            
    public function updatePost(Request $request, $postId)
    {
        $post = Post::findOrFail($postId);
    
        // Validate and update data as necessary
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'image' => 'nullable|url',
            'body1' => 'nullable|string',
            'body2' => 'nullable|string',
            'is_body_bold' => 'nullable|boolean',
            'post_text_color_id' => 'nullable|integer',
            'post_background_color_id' => 'nullable|integer',
            'font_size' => 'nullable|string|max:10',  // Adjust the max if you have a specific format
            'text_alignment' => 'nullable|in:left,right,center,justify',
            'title_text_alignment' => 'nullable|in:left,right,center,justify',
            'title_text_color_id' => 'nullable|integer',
            'title_background_color_id' => 'nullable|integer',
            'active_post' => 'nullable|boolean',
        ]);
    
        $post->update($data);
    
        return response()->json(['message' => 'Post updated successfully!']);
    }
}
