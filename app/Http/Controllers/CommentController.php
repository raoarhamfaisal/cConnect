<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;
use App\Models\CommentReaction;
use Illuminate\Support\Facades\Auth;

    
class CommentController extends Controller
    {

        public function index(Post $post)
        {
            $comments = $post->comments()->with('replies')->whereNull('parent_id')->latest()->take(2)->get();
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

        public function likeComment(Comment $comment)
        {
            $reaction = CommentReaction::updateOrCreate(
                [
                    'comment_id' => $comment->id,
                    'user_id' => Auth::id(),
                ],
                ['type' => 'like']
            );

            return response()->json($reaction, 200);
        }

        public function dislikeComment(Comment $comment)
        {
            $reaction = CommentReaction::updateOrCreate(
                [
                    'comment_id' => $comment->id,
                    'user_id' => Auth::id(),
                ],
                ['type' => 'dislike']
            );

            return response()->json($reaction, 200);
        }

        public function storeReply(Request $request, $parentCommentId)
        {
            // Find the parent comment
            $parentComment = Comment::find($parentCommentId);
        
            // Check if the parent comment exists
            if (!$parentComment) {
                return response()->json(['message' => 'Parent comment not found.'], 404);
            }
        
            $reply = new Comment();
            $reply->user_id = Auth::id();
            $reply->post_id = $parentComment->post_id; // Assuming the reply is on the same post
            $reply->parent_id = $parentComment->id; // Set the parent comment ID
            $reply->body = $request->body;
            $reply->save();
        
            return response()->json($reply, 201);
        }



        
    }
