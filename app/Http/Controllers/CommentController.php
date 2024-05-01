<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

    
class CommentController extends Controller
    {
        public function index(Post $post)
        {
            $comments = $post->comments()->latest()->take(2)->get(); // Assuming you have a 'comments' relationship in Post model
            return response()->json($comments);
        }
    
        public function store(Request $request, Post $post)
        {
            $comment = new Comment();
            $comment->user_id = Auth::id();
            $comment->post_id = $post->id;
            $comment->body = $request->body;
            $comment->save();
    
            return response()->json($comment, 201);
        }
    
        public function update(Request $request, Comment $comment)
        {
            // Add authorization check to ensure users can only edit their comments
            $comment->update($request->all());
            return response()->json($comment);
        }
    
        public function destroy(Comment $comment)
        {
            // Add authorization check to ensure users can only delete their comments
            $comment->delete();
            return response()->json(['message' => 'Comment deleted successfully.']);
        }
    }
