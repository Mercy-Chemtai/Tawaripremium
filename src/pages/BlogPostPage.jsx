"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Calendar, ChevronLeft, Loader, MessageSquare, Tag, ThumbsUp, User } from "lucide-react"
import { blogAPI } from "../services/api"
import { useAuth } from "../components/auth/AuthContext"
import { useToast } from "../components/ui/use-toast"
import DOMPurify from "dompurify"

// Get the API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

// Function to get full image URL
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.svg?height=600&width=1200"

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath
  }

  if (imagePath.startsWith("/api/media/")) {
    const mediaPath = imagePath.replace("/api/media/", "media/")
    return `${API_URL}/${mediaPath}`
  }

  const cleanPath = imagePath.startsWith("/") ? imagePath.substring(1) : imagePath
  return `${API_URL}/${cleanPath}`
}

// Format date function
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [submittingComment, setSubmittingComment] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true)

        const postData = await blogAPI.getPost(slug)
        setPost(postData)

        if (postData && postData.id) {
          const commentsData = await blogAPI.getComments(postData.id)
          setComments(commentsData.results || [])

          if (postData.category) {
            const relatedData = await blogAPI.getPosts({
              category: postData.category,
              exclude: postData.id,
              limit: 3,
            })
            setRelatedPosts(relatedData.results || [])
          }
        }

        setError(null)
      } catch (err) {
        setError("Failed to load blog post. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPostData()
  }, [slug])

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!post || !isAuthenticated || !commentText.trim()) return

    try {
      setSubmittingComment(true)

      const commentData = {
        post: post.id,
        content: commentText.trim(),
      }

      await blogAPI.addComment(commentData)

      const commentsData = await blogAPI.getComments(post.id)
      setComments(commentsData.results || [])

      setCommentText("")

      toast({
        title: "Comment submitted",
        description: "Your comment has been added successfully.",
      })
    } catch (err) {
      toast({
        title: "Failed to submit comment",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setSubmittingComment(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center items-center min-h-[50vh]">
        <Loader className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p className="text-red-500 mb-4">{error || "Blog post not found"}</p>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded flex items-center mx-auto">
          <ChevronLeft className="h-4 w-4 mr-2" />
          <Link to="/blog">Back to Blog</Link>
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-6">
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded flex items-center">
          <ChevronLeft className="h-4 w-4 mr-2" />
          <Link to="/blog">Back to Blog</Link>
        </button>
      </div>

      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center text-gray-600 mb-6">
            <div className="flex items-center mr-6 mb-2">
              <User className="h-4 w-4 mr-2" />
              <span>{post.author_name || "Admin"}</span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(post.published_at)}</span>
            </div>
            {post.category_name && (
              <div className="flex items-center mr-6 mb-2">
                <Tag className="h-4 w-4 mr-2" />
                <span>{post.category_name}</span>
              </div>
            )}
            <div className="flex items-center mb-2">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>{comments.length} comments</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={getFullImageUrl(post.featured_image) || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Post Content */}
        <div
          className="prose max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  to={`/blog?tag=${tag.slug}`}
                  className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="border-t pt-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

          {comments.length > 0 ? (
            <div className="space-y-6 mb-8">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b pb-6 last:border-0">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{comment.user_name}</h4>
                        <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mb-8">No comments yet. Be the first to comment!</p>
          )}

          {/* Comment Form */}
          <div>
            <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>

            {isAuthenticated ? (
              <form onSubmit={handleSubmitComment}>
                <div className="mb-4">
                  <textarea
                    className="w-full p-3 border rounded-md"
                    rows={4}
                    placeholder="Write your comment here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 flex items-center"
                  disabled={submittingComment || !commentText.trim()}
                >
                  {submittingComment ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2 text-white" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Comment"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center p-4 bg-gray-50 rounded-md">
                <p className="mb-2">Please log in to leave a comment.</p>
                <Link to="/login" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 inline-block">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id} className="border rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video relative">
                  <img
                    src={
                      relatedPost.featured_image
                        ? getFullImageUrl(relatedPost.featured_image)
                        : "/placeholder.svg?height=200&width=300"
                    }
                    alt={relatedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(relatedPost.published_date)}</span>
                  </div>
                  <h4 className="text-lg font-medium mb-2">{relatedPost.title}</h4>
                  <Link
                    to={`/blog/${relatedPost.slug}`}
                    className="text-black font-medium flex items-center hover:underline"
                  >
                    Read More <ChevronLeft className="h-4 w-4 ml-1 rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogPostPage
