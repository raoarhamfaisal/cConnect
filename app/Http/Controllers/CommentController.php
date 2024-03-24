<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;
use App\Models\CommentReaction;
use Illuminate\Support\Facades\Auth;
use App\Events\CommentPosted;
use App\Events\CommentUpdated;
use App\Events\CommentDeleted;
use App\Events\CommentReactionOrReplyChanged;
use App\Events\CommentReplyAdded;

use Illuminate\Support\Facades\Broadcast;


    
class CommentController extends Controller
    {

        // public function index(Post $post)
        // {
        //     $comments = $post->comments()->with('replies')->whereNull('parent_id')->latest()->take(2)->get();
        //     return response()->json($comments);
        // }

        public function index(Request $request, Post $post)
        {
            $userID = Auth::id(); // Get the current user ID
            $perPage = $request->query('per_page', 10); // Default to 10 if not provided
            $page = $request->query('page', 1);         // Default to page 1 if not provided
            $sortBy = $request->query('sort_by', 'latest'); // Default to 'latest' if not provided

            $query = $post->comments()
                ->with([
                    'replies' => function ($query) use ($userID) {
                        $query->withCount(['likes', 'dislikes'])
                            ->with(['user.profile', 'reactions' => function ($q) use ($userID) {
                                $q->where('user_id', $userID);
                            }]);
                    },
                    'user.profile',
                    'reactions' => function ($query) use ($userID) {
                        $query->where('user_id', $userID);
                    }
                ])
                ->withCount(['likes', 'dislikes'])
                ->whereNull('parent_id');

            if ($sortBy === 'oldest') {
                $query->oldest();
            } else {
                $query->latest();
            }

            $comments = $query->paginate($perPage, ['*'], 'page', $page);

            $totalNumberOfCommentsWithReplies = 0;

            foreach ($comments as $comment) {
                $this->addUserDetailsToComment($comment);
                $comment->user_reaction = $comment->reactions->first()->type ?? null;
                unset($comment->user); // Remove the additional user details

                // Add reply count to total count
                $totalNumberOfCommentsWithReplies += 1 + $comment->replies->count();

                foreach ($comment->replies as $reply) {
                    $this->addUserDetailsToComment($reply);
                    $reply->user_reaction = $reply->reactions->first()->type ?? null;
                    unset($reply->user); // Remove the additional user details
                }
            }

            return response()->json([
                'comments' => $comments->items(),
                'total_number_of_comments_with_replies' => $totalNumberOfCommentsWithReplies,
                'pagination' => [
                    'current_page' => $comments->currentPage(),
                    'last_page' => $comments->lastPage(),
                    'per_page' => $comments->perPage(),
                    'total' => $comments->total(),
                ]
            ]);
        }




        public function getSingleComment(Request $request, $commentId)
        {
            $userID = Auth::id(); // Get the current user ID
        
            $comment = Comment::with([
                    'replies' => function ($query) use ($userID) {
                        $query->withCount(['likes', 'dislikes'])
                              ->with(['user.profile', 'reactions' => function ($q) use ($userID) {
                                  $q->where('user_id', $userID);
                              }]);
                    },
                    'user.profile',
                    'reactions' => function ($query) use ($userID) {
                        $query->where('user_id', $userID);
                    }
                ])
                ->withCount(['likes', 'dislikes'])
                ->where('id', $commentId)
                ->firstOrFail();
        
            $this->addUserDetailsToComment($comment);
            $comment->user_reaction = $comment->reactions->first()->type ?? null;
            unset($comment->user); // Remove the additional user details
        
            foreach ($comment->replies as $reply) {
                $this->addUserDetailsToComment($reply);
                $reply->user_reaction = $reply->reactions->first()->type ?? null;
                unset($reply->user); // Remove the additional user details
            }
        
            return response()->json($comment);
        }
        
                
        private function addUserDetailsToComment($comment)
        {
            if (isset($comment->user) && isset($comment->user->profile)) {
                $profile = $comment->user->profile;
                $comment->user_avatar = $profile->user_avatar ?? null;
                $comment->first_name = $profile->first_name ?? null;
                $comment->last_name = $profile->last_name ?? null;
                $comment->company_logo = $profile->company_logo ?? null;
                $comment->company_name = $profile->company_name ?? null;
            }
        }
        

    
        // public function store(Request $request, Post $post)
        // {
        //     $comment = new Comment();
        //     $comment->user_id = Auth::id();
        //     $comment->post_id = $post->id;
        //     $comment->body = $request->body;
        //     $comment->save();
    
        //     return response()->json($comment, 201);
        // }
        public function store(Request $request, Post $post)
        {
            $comment = new Comment();
            $comment->user_id = Auth::id();
            $comment->post_id = $post->id;
            $comment->body = $request->body;
            $comment->save();



            // Eager load the user's profile
            $comment->load('user.profile');

            // Append profile details to the comment object
            if (isset($comment->user->profile)) {
                $profile = $comment->user->profile;
                $comment->user_avatar = $profile->user_avatar ?? null;
                $comment->first_name = $profile->first_name ?? null;
                $comment->last_name = $profile->last_name ?? null;
                $comment->company_logo = $profile->company_logo ?? null;
                $comment->company_name = $profile->company_name ?? null;
            }

            // Hide the user object from the response
            $comment->makeHidden('user');

            try {
                broadcast(new CommentPosted($comment));

            } catch (\Exception $e) {
                \Log::error('Error broadcasting CommentPosted event: ' . $e->getMessage());
                // Optionally, handle the error further if needed
            }
    



            return response()->json($comment, 201);
        }


        
    
        public function update(Request $request, Comment $comment)
        {
            // Add authorization check to ensure users can only edit their comments
            $comment->update($request->all());
            try {
                broadcast(new CommentUpdated($comment));
            } catch (\Exception $e) {
                \Log::error('Error broadcasting CommentUpdated event: ' . $e->getMessage());
                // Optionally, handle the error further if needed
            }



            return response()->json($comment);
        }
    
        public function destroy(Comment $comment)
        {
            // Add authorization check to ensure users can only delete their comments
            
            try {
                broadcast(new CommentDeleted($comment));
            } catch (\Exception $e) {
                \Log::error('Error broadcasting CommentDeleted event: ' . $e->getMessage());
                // Optionally, handle the error further if needed
            }



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

            
            try {
                broadcast(new CommentReactionOrReplyChanged($comment));
            } catch (\Exception $e) {
                \Log::error('Error broadcasting CommentReactionOrReplyChanged event: ' . $e->getMessage());
                // Optionally, handle the error further if needed
            }



            return response()->json($reaction, 200);
        }

        private function removeReaction(Comment $comment, $type)
        {
            $userId = Auth::id();
            CommentReaction::where('comment_id', $comment->id)->where('user_id', $userId)->where('type', $type)->delete();
        }
    

        public function removeLikeComment(Comment $comment)
        {
            $this->removeReaction($comment, 'like');

            try {
                broadcast(new CommentReactionOrReplyChanged($comment));
            } catch (\Exception $e) {
                \Log::error('Error broadcasting CommentReactionOrReplyChanged event: ' . $e->getMessage());
                // Optionally, handle the error further if needed
            }
            
            return response()->json(['message' => 'Like removed']);
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

            try {
                broadcast(new CommentReactionOrReplyChanged($comment));
            } catch (\Exception $e) {
                \Log::error('Error broadcasting CommentReactionOrReplyChanged event: ' . $e->getMessage());
                // Optionally, handle the error further if needed
            }


            return response()->json($reaction, 200);
        }

        public function removeDislikeComment(Comment $comment)
        {
            $this->removeReaction($comment, 'dislike');

            try {
                broadcast(new CommentReactionOrReplyChanged($comment));
            } catch (\Exception $e) {
                \Log::error('Error broadcasting CommentReactionOrReplyChanged event: ' . $e->getMessage());
                // Optionally, handle the error further if needed
            }


            return response()->json(['message' => 'Dislike removed']);
        }

        public function storeReply(Request $request, $parentCommentId)
        {
            // Find the parent comment
            $parentComment = Comment::find($parentCommentId);
        
            // Check if the parent comment exists
            if (!$parentComment) {
                return response()->json(['message' => 'Parent comment not found.'], 404);
            }
        
            $userID = Auth::id();
        
            $reply = new Comment();
            $reply->user_id = $userID;
            $reply->post_id = $parentComment->post_id; // Assuming the reply is on the same post
            $reply->parent_id = $parentComment->id; // Set the parent comment ID
            $reply->body = $request->body;
            $reply->save();
        
            // Load user profile and reactions for the reply
            $reply->load([
                'user.profile',
                'reactions' => function ($query) use ($userID) {
                    $query->where('user_id', $userID);
                }
            ]);
        
            // Add user details to the reply
            $this->addUserDetailsToComment($reply);
        
            // Add the user's reaction to the reply
            $reply->user_reaction = $reply->reactions->first()->type ?? null;
            unset($reply->user); // Remove additional user details


            // try {
            //     broadcast(new CommentReactionOrReplyChanged($parentComment));

            // } catch (\Exception $e) {
            //     \Log::error('Error broadcasting CommentReactionOrReplyChanged event: ' . $e->getMessage());
            //     // Optionally, handle the error further if needed
            // }


            try {
                // dd("here");
                broadcast(new CommentReplyAdded($reply));

            } catch (\Exception $e) {
                \Log::error('Error broadcasting CommentReplyAdded event: ' . $e->getMessage());
                // Optionally, handle the error further if needed
            }

        
            return response()->json($reply, 201);
        }


        public function getCommentLikes(Comment $comment)
        {
            $likes = $comment->likes()->with('user.profile')->get()->map(function ($like) {
               // Access the profile from the like
        $profile = $like->user->profile;

        // Convert the profile's trades to the old structure
        $profileTrades = $this->convertTradesToOldStructure($profile->trades);

        // Merge the converted trades back into the profile's data
        $profileData = $profile->toArray(); // Convert the profile to an array
        $profile = array_merge($profileData,$profileTrades );

        // Return the profile with its trades converted
        return $profile;
            });
            return response()->json($likes);
        }
        private function convertTradesToOldStructure($trades) 
        {
            $oldStructure = [];
            for ($i = 1; $i <= 30; $i++) {
                $oldStructure["trade{$i}"] = $trades->contains('id', $i) ? 1 : 0;
            }
            return $oldStructure;
        }
        public function getCommentDislikes(Comment $comment)
        {
            $dislikes = $comment->dislikes()->with('user.profile')->get()->map(function ($dislike) {
                   // Access the profile from the like
        $profile = $dislike->user->profile;

        // Convert the profile's trades to the old structure
        $profileTrades = $this->convertTradesToOldStructure($profile->trades);

        // Merge the converted trades back into the profile's data
        $profileData = $profile->toArray(); // Convert the profile to an array
        $profile = array_merge($profileData,$profileTrades );

        // Return the profile with its trades converted
        return $profile;
            });
            return response()->json($dislikes);
        }
        


        
    }
