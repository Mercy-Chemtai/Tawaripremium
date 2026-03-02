import React, { useState } from "react"
import { Heart, MessageSquare, Share2, Clock, Eye, X, ChevronLeft, ChevronRight } from "lucide-react"

// This would come from your backend/database in production
const DAILY_POSTS = [
  {
    id: "p1",
    type: "image",
    caption: "Just received fresh stock of iPhone 15 Pro Max! 🎉 Limited units available. DM for pricing.",
    media: "https://images.unsplash.com/photo-1696446702183-cbd50ad3a567?w=800&h=800&fit=crop",
    timestamp: new Date("2025-01-30T09:00:00"),
    engagement: { views: 342, likes: 45, comments: 12 }
  },
  {
    id: "p2",
    type: "image",
    caption: "Watch how we professionally replace iPhone screens in under 30 minutes! ⚡",
    media: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=800&fit=crop",
    timestamp: new Date("2025-01-29T14:30:00"),
    engagement: { views: 567, likes: 89, comments: 23 }
  },
  {
    id: "p3",
    type: "image",
    caption: "Special Weekend Offer: 20% off all MacBook repairs! Book now 📱",
    media: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
    timestamp: new Date("2025-01-28T11:00:00"),
    engagement: { views: 234, likes: 34, comments: 8 }
  },
  {
    id: "p4",
    type: "image",
    caption: "Before & After: Complete MacBook Air restoration ✨ Looking brand new!",
    media: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=800&fit=crop",
    timestamp: new Date("2025-01-27T16:20:00"),
    engagement: { views: 445, likes: 67, comments: 15 }
  },
  {
    id: "p5",
    type: "image",
    caption: "Customer appreciation post! 💙 Thanks for trusting us with your devices",
    media: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=800&fit=crop",
    timestamp: new Date("2025-01-26T10:15:00"),
    engagement: { views: 289, likes: 52, comments: 9 }
  },
  {
    id: "p6",
    type: "image",
    caption: "Pro tip: Always use original chargers to extend battery life! 🔋",
    media: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=800&fit=crop",
    timestamp: new Date("2025-01-25T13:45:00"),
    engagement: { views: 312, likes: 41, comments: 7 }
  }
]

export default function DailyUpdatesSidebar() {
  const [posts, setPosts] = useState(DAILY_POSTS)
  const [selectedPost, setSelectedPost] = useState(null)
  const [likedPosts, setLikedPosts] = useState(new Set())

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
        setPosts(posts.map(p => 
          p.id === postId 
            ? { ...p, engagement: { ...p.engagement, likes: p.engagement.likes - 1 }}
            : p
        ))
      } else {
        newSet.add(postId)
        setPosts(posts.map(p => 
          p.id === postId 
            ? { ...p, engagement: { ...p.engagement, likes: p.engagement.likes + 1 }}
            : p
        ))
      }
      return newSet
    })
  }

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)
    if (seconds < 60) return 'Just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  const navigatePost = (direction) => {
    const currentIndex = posts.findIndex(p => p.id === selectedPost.id)
    if (direction === 'next' && currentIndex < posts.length - 1) {
      setSelectedPost(posts[currentIndex + 1])
    } else if (direction === 'prev' && currentIndex > 0) {
      setSelectedPost(posts[currentIndex - 1])
    }
  }

  return (
    <>
      <aside className="bg-white rounded-xl shadow-lg border border-gray-200 sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden">
        {/* Section Header */}
        <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Daily Updates</h3>
          <p className="text-xs text-gray-600">Latest from our shop</p>
        </div>

        {/* Scrollable Posts List */}
        <div className="overflow-y-auto max-h-[calc(100vh-12rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="p-3 space-y-3">
            {posts.map((post, index) => (
              <article 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-50 hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-purple-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.media} 
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* New Badge */}
                  {index < 3 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  {/* Time Badge */}
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(post.timestamp)}
                  </div>
                </div>

                {/* Caption Preview */}
                <div className="p-3">
                  <p className="text-sm text-gray-800 line-clamp-2 mb-2">
                    {post.caption}
                  </p>
                  
                  {/* Engagement Stats */}
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.engagement.views}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="p-3 border-t bg-gray-50">
          <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
            View All Updates
          </button>
        </div>
      </aside>

      {/* Post Modal/Lightbox */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
            <X className="h-8 w-8" />
          </button>

          {/* Navigation Buttons */}
          {posts.findIndex(p => p.id === selectedPost.id) > 0 && (
            <button
              onClick={() => navigatePost('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3 backdrop-blur-sm z-10">
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}
          {posts.findIndex(p => p.id === selectedPost.id) < posts.length - 1 && (
            <button
              onClick={() => navigatePost('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3 backdrop-blur-sm z-10">
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Content */}
          <div className="max-w-6xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden grid md:grid-cols-[1.5fr,1fr]">
            {/* Left: Image */}
            <div className="bg-black flex items-center justify-center">
              <img 
                src={selectedPost.media} 
                alt=""
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>

            {/* Right: Details */}
            <div className="flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="p-4 border-b flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Your Shop Name</p>
                  <p className="text-xs text-gray-500">{formatTimeAgo(selectedPost.timestamp)}</p>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 flex-1 overflow-y-auto">
                <p className="text-gray-900 whitespace-pre-wrap">{selectedPost.caption}</p>
              </div>

              {/* Engagement */}
              <div className="border-t">
                <div className="p-4 space-y-4">
                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLike(selectedPost.id)}
                      className="group">
                      <Heart 
                        className={`h-7 w-7 transition-all ${
                          likedPosts.has(selectedPost.id) 
                            ? 'fill-red-500 text-red-500 scale-110' 
                            : 'text-gray-700 hover:text-red-500 hover:scale-110'
                        }`} 
                      />
                    </button>
                    <button className="text-gray-700 hover:text-gray-900">
                      <MessageSquare className="h-7 w-7" />
                    </button>
                    <button className="text-gray-700 hover:text-gray-900">
                      <Share2 className="h-7 w-7" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">{selectedPost.engagement.likes.toLocaleString()} likes</p>
                    <p className="text-sm text-gray-500">{selectedPost.engagement.views.toLocaleString()} views</p>
                  </div>

                  {/* Comment Input */}
                  <div className="pt-4 border-t">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}