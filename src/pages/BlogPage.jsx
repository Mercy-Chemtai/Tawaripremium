"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Calendar, Filter, Loader, RefreshCw, Tag, User, ChevronRight } from "lucide-react"
import { blogAPI } from "../services/api"

// Get the API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

// Function to get full image URL - reusing the same function from ShopPage
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.svg?height=300&width=300"

  // If the image path is already a full URL, return it as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath
  }

  // If the path starts with /api/media, we need to handle it specially
  if (imagePath.startsWith("/api/media/")) {
    // Extract the part after /api/media/ and append it to the API_URL/media/
    const mediaPath = imagePath.replace("/api/media/", "media/")
    return `${API_URL}/${mediaPath}`
  }

  // Otherwise, prepend the API URL
  // Remove any leading slash from the image path to avoid double slashes
  const cleanPath = imagePath.startsWith("/") ? imagePath.substring(1) : imagePath
  return `${API_URL}/${cleanPath}`
}

// Format date function
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Truncate text function
const truncateText = (text, maxLength) => {
  if (!text) return ""
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + "..."
}

function BlogPage() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await blogAPI.getCategories()
        if (data && Array.isArray(data.results)) {
          setCategories(data.results)
        } else {
          setCategories([])
        }
      } catch (err) {
        setError("Failed to load categories. Please try again later.")
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const params = {
          page: currentPage,
        }

        if (searchQuery) {
          params.search = searchQuery
        }

        if (selectedCategories.length > 0) {
          params.category = selectedCategories.join(",")
        }

        if (sortBy === "newest") {
          params.ordering = "-published_date"
        } else if (sortBy === "oldest") {
          params.ordering = "published_date"
        } else if (sortBy === "a-z") {
          params.ordering = "title"
        } else if (sortBy === "z-a") {
          params.ordering = "-title"
        }

        const data = await blogAPI.getPosts(params)

        if (data && data.results) {
          setPosts(data.results)

          // Calculate total pages
          if (data.count && data.page_size) {
            setTotalPages(Math.ceil(data.count / data.page_size))
          }
        } else {
          setPosts([])
          setTotalPages(1)
        }

        setError(null)
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [searchQuery, selectedCategories, sortBy, currentPage])

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
    // Reset to first page when changing filters
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll to top when changing pages
    window.scrollTo(0, 0)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Blog</h1>
        <p className="text-gray-600">Stay updated with the latest news, tips, and insights</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="sticky top-20 border rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-medium">Filters</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <div key={category.slug} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`category-${category.slug}`}
                        checked={selectedCategories.includes(category.slug)}
                        onChange={(e) => handleCategoryChange(category.slug, e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor={`category-${category.slug}`}>{category.name}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    setCurrentPage(1) // Reset to first page when changing sort
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="a-z">Title (A-Z)</option>
                  <option value="z-a">Title (Z-A)</option>
                </select>
              </div>

              <button
                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                onClick={() => {
                  // Reset filters
                  setSelectedCategories([])
                  setSortBy("newest")
                  setSearchQuery("")
                  setCurrentPage(1)
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search blog posts..."
              className="w-full max-w-md p-2 border rounded"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset to first page when searching
              }}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : error ? (
            <div className="text-center p-8 text-red-500">
              <p>{error}</p>
              <button
                className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded flex items-center mx-auto"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              <p>No blog posts found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    to={`/blog/${post.slug}`}
                    key={post.id}
                    className="border rounded-lg overflow-hidden shadow-sm group hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={
                          post.featured_image
                            ? getFullImageUrl(post.featured_image)
                            : "/placeholder.svg?height=300&width=500"
                        }
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(post.published_at)}</span>
                        {post.category && (
                          <>
                            <span className="mx-2">•</span>
                            <Tag className="h-4 w-4 mr-1" />
                            <span>{post.category_name}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-medium group-hover:text-black transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow">{truncateText(post.excerpt, 120)}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="h-4 w-4 mr-1" />
                          <span>{post.author_name || "Admin"}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Previous
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded ${
                          currentPage === i + 1 ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
