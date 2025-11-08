import React, { useState } from "react"
import { Calendar, Tag, User, Search, X, TrendingUp } from "lucide-react"

// Full blog articles with complete content
const FULL_ARTICLES = {
  "signs-your-iphone-needs-repair": {
    title: "5 Signs Your iPhone Needs Professional Repair",
    slug: "signs-your-iphone-needs-repair",
    content: `
      <h2>Common Warning Signs</h2>
      <p>Your iPhone is an essential part of your daily life, and recognizing when it needs professional attention can save you from bigger problems down the line. Here are the most common signs that indicate your device needs repair.</p>

      <h3>1. Battery Draining Too Quickly</h3>
      <p>If your iPhone's battery life has decreased significantly and you find yourself charging it multiple times a day, this is often the first sign of battery degradation. Modern iPhone batteries are designed to retain up to 80% of their original capacity after 500 complete charge cycles. However, factors like extreme temperatures, overcharging, and age can accelerate battery wear.</p>
      <p>Our technicians can run a comprehensive battery health diagnostic to determine if a replacement is necessary. A new battery can restore your iPhone to like-new performance, often improving speed and responsiveness as well.</p>

      <h3>2. Cracked or Damaged Screen</h3>
      <p>Even small cracks in your iPhone screen can lead to bigger problems. Water and dust can enter through these cracks, potentially damaging internal components. Additionally, cracks can spread over time, and touch sensitivity may become unreliable.</p>
      <p>We use only high-quality replacement screens that match Apple's specifications, ensuring your display looks and functions exactly as it should. Our screen repairs typically take less than an hour, and we back them with a warranty for your peace of mind.</p>

      <h3>3. Overheating Issues</h3>
      <p>While it's normal for your iPhone to warm up slightly during intensive tasks, excessive heat is a red flag. Overheating can indicate problems with the battery, charging port, or internal components. If your device becomes too hot to hold or shuts down due to temperature warnings, bring it in immediately.</p>
      <p>Our diagnostic process can identify the root cause of overheating, whether it's a software issue, battery problem, or component failure.</p>

      <h3>4. Charging Port Problems</h3>
      <p>If your iPhone only charges at certain angles or doesn't charge at all, you likely have a damaged charging port. This is one of the most common repairs we perform. Lint, debris, and daily wear can damage the delicate pins inside the Lightning or USB-C port.</p>
      <p>Sometimes a simple cleaning is all that's needed, but if the port is damaged, we can replace it quickly and affordably.</p>

      <h3>5. Camera Issues</h3>
      <p>Blurry photos, black screens when opening the camera app, or a camera that won't focus properly all indicate hardware problems. The iPhone's camera system is sophisticated, and even small drops can misalign the lens or damage internal components.</p>
      <p>We can repair or replace camera modules, restoring your iPhone's photography capabilities to factory standards.</p>

      <h2>Why Choose Professional Repair?</h2>
      <p>While DIY repairs might seem tempting, iPhone repairs require specialized tools and expertise. Incorrect repairs can void warranties, cause additional damage, or even pose safety risks, especially with battery replacements.</p>
      <p>Our certified technicians have years of experience with all iPhone models and use genuine or high-quality replacement parts. We also provide warranties on our repairs, giving you confidence in our work.</p>

      <h2>Prevention Tips</h2>
      <p>To keep your iPhone in optimal condition:</p>
      <ul>
        <li>Use a quality protective case and screen protector</li>
        <li>Avoid exposing your device to extreme temperatures</li>
        <li>Keep software updated for optimal performance</li>
        <li>Clean charging ports regularly with compressed air</li>
        <li>Don't let your battery completely drain regularly</li>
      </ul>

      <h2>Schedule Your Repair Today</h2>
      <p>If you've noticed any of these warning signs, don't wait until the problem gets worse. Contact us today to schedule a free diagnostic assessment. We'll provide an honest evaluation and transparent pricing before any work begins. Most repairs are completed the same day, getting you back to your digital life quickly.</p>
    `
  },
  "buying-refurbished-vs-new": {
    title: "Buying Refurbished vs New: How to Save Without Sacrificing Quality",
    slug: "buying-refurbished-vs-new",
    content: `
      <h2>Understanding Your Options</h2>
      <p>When it's time to upgrade your Apple device, you face an important decision: should you buy new or consider a certified refurbished model? Both options have distinct advantages, and the right choice depends on your priorities, budget, and needs.</p>

      <h3>What Does "Certified Refurbished" Mean?</h3>
      <p>A certified refurbished Apple product is not simply a used device resold as-is. These devices undergo rigorous inspection, testing, and restoration processes. Our certified refurbishment program includes:</p>
      <ul>
        <li>Complete functional testing of all components</li>
        <li>Replacement of any defective parts with genuine Apple components</li>
        <li>New battery installation (for iPhones and MacBooks)</li>
        <li>Thorough cleaning and cosmetic restoration</li>
        <li>Fresh installation of the latest compatible iOS or macOS</li>
        <li>New packaging with all necessary accessories</li>
      </ul>

      <h2>Cost Savings Without Compromise</h2>
      <p>The most obvious advantage of refurbished devices is the price. Customers typically save 20-40% compared to new models, sometimes even more on older generations. For example, a refurbished iPhone 13 Pro might cost $600-700 compared to $999 new, offering the same functionality at a fraction of the price.</p>

      <h2>Environmental Impact</h2>
      <p>Choosing refurbished devices is an environmentally responsible decision. The electronics industry generates significant waste and uses precious resources. By purchasing refurbished:</p>
      <ul>
        <li>You prevent functional devices from ending up in landfills</li>
        <li>You reduce demand for new device production and its environmental impact</li>
        <li>You support the circular economy and sustainable consumption</li>
      </ul>

      <h2>Quality and Warranty Assurance</h2>
      <p>When purchased from certified refurbishers like us, refurbished devices come with warranties and return windows so you can buy with confidence.</p>

      <h2>Making Your Decision</h2>
      <p>Consider your specific needs and circumstances. If you need the absolute latest features, buy new. If you want great value and responsible consumption, refurbished is a smart choice.</p>

      <h2>Visit Our Store</h2>
      <p>We invite you to visit our store to see our selection of certified refurbished Apple products. Our knowledgeable staff can help you compare options and find the perfect device for your needs and budget.</p>
    `
  },
  "extend-macbook-lifespan": {
    title: "How to Extend Your MacBook's Lifespan — Pro Tips",
    slug: "extend-macbook-lifespan",
    content: `
      <h2>Your MacBook Investment</h2>
      <p>MacBooks are significant investments, and with proper care, they can serve you reliably for 5-7 years or even longer. Many users continue using well-maintained MacBooks for a decade. This guide provides professional advice on maximizing your MacBook's lifespan through preventive maintenance and smart usage habits.</p>

      <h3>1. Keep Your Software Updated</h3>
      <p>Apple regularly releases macOS updates that include performance improvements, security patches, and bug fixes. These updates are crucial for keeping your MacBook running smoothly.</p>

      <h3>2. Manage Storage Intelligently</h3>
      <p>A full hard drive significantly impacts performance. Keep at least 10-15% of your storage free. Use these strategies:</p>
      <ul>
        <li>Regularly review and delete unused applications</li>
        <li>Move large media files to external storage or cloud services</li>
        <li>Empty the Downloads folder periodically</li>
      </ul>

      <h3>3. Battery Care Best Practices</h3>
      <p>Your MacBook's battery is a wear item that degrades over time, but proper care can significantly extend its life.</p>

      <h3>4. Physical Cleaning and Maintenance</h3>
      <p>Dust and debris are silent MacBook killers. We recommend professional internal cleaning every 12-18 months.</p>

      <h2>When to Seek Professional Help</h2>
      <p>Don't ignore signs like frequent crashes, unusual noises, or excessive heat. Our maintenance services include diagnostics, thermal paste replacement, and SSD upgrades.</p>
    `
  },
  "data-recovery-importance": {
    title: "Why Data Recovery Matters — Protecting Memories & Business",
    slug: "data-recovery-importance",
    content: `
      <h2>The Reality of Data Loss</h2>
      <p>Every day, countless iPhone and Mac users experience the panic of data loss. Whether from accidental deletion, device failure, or physical damage, losing precious photos, important documents, or irreplaceable memories is devastating. Understanding data recovery and prevention is crucial for every Apple device owner.</p>

      <h3>Common Causes of Data Loss</h3>
      <p>From accidental deletion to hardware failure and water damage, we cover what can go wrong — and how we can help recover it.</p>

      <h2>Our Data Recovery Services</h2>
      <p>We specialize in recovering data from iPhones, iPads, and Macs — even when devices appear dead. Our process includes assessment, recovery attempts, verification, and secure transfer.</p>

      <h2>Prevention Tips</h2>
      <p>Regular backups (iCloud, Time Machine) and the 3-2-1 backup rule are the best defenses against data loss.</p>
    `
  }
}

// Dummy posts that reference the full articles above
const DUMMY_POSTS = [
  {
    id: 1,
    slug: "signs-your-iphone-needs-repair",
    title: "5 Signs Your iPhone Needs Professional Repair",
    excerpt: "Learn the early warning signs — battery, screen, overheating, charging ports and camera issues — and how timely repairs save you money.",
    featured_image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=800&fit=crop",
    published_at: "2025-01-15T10:00:00Z",
    category_name: "Repairs",
    category_slug: "repairs",
    author_name: "Tech Team",
    read_time: "6 min read"
  },
  {
    id: 2,
    slug: "buying-refurbished-vs-new",
    title: "Buying Refurbished vs New: How to Save Without Sacrificing Quality",
    excerpt: "Certified refurbished Apple devices explained: warranties, inspection, and how to decide what's right for you.",
    featured_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    published_at: "2025-02-02T09:30:00Z",
    category_name: "Sales",
    category_slug: "sales",
    author_name: "Sales Team",
    read_time: "7 min read"
  },
  {
    id: 3,
    slug: "extend-macbook-lifespan",
    title: "How to Extend Your MacBook's Lifespan — Pro Tips",
    excerpt: "Practical maintenance tips to keep your MacBook running smoothly for years — cleaning, battery care, and smart upgrades.",
    featured_image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=800&fit=crop",
    published_at: "2025-03-05T13:15:00Z",
    category_name: "Maintenance",
    category_slug: "maintenance",
    author_name: "Service Team",
    read_time: "8 min read"
  },
  {
    id: 4,
    slug: "data-recovery-importance",
    title: "Why Data Recovery Matters — Protecting Memories & Business",
    excerpt: "How we recover lost photos, messages and business files — and steps you can take to avoid data loss in the future.",
    featured_image: "https://www.pcgeeksusa.com/wp-content/uploads/2023/05/data-recovery.jpeg",
    published_at: "2025-04-10T11:00:00Z",
    category_name: "Data",
    category_slug: "data",
    author_name: "Recovery Lab",
    read_time: "9 min read"
  }
]

const CATEGORIES = [
  { name: "All Posts", slug: "all", count: DUMMY_POSTS.length },
  { name: "Repairs", slug: "repairs", count: DUMMY_POSTS.filter(p => p.category_slug === "repairs").length },
  { name: "Sales", slug: "sales", count: DUMMY_POSTS.filter(p => p.category_slug === "sales").length },
  { name: "Maintenance", slug: "maintenance", count: DUMMY_POSTS.filter(p => p.category_slug === "maintenance").length },
  { name: "Data", slug: "data", count: DUMMY_POSTS.filter(p => p.category_slug === "data").length }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openSlug, setOpenSlug] = useState(null)

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const filteredPosts = DUMMY_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category_slug === selectedCategory
    return matchesSearch && matchesCategory
  })

  const openArticle = (slug) => setOpenSlug(slug)
  const closeArticle = () => setOpenSlug(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="bg-gradient-to-br from-black to-black text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl items-center mx-auto text-center">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium text-sm tracking-wide uppercase">Repairs & Refurb Insights</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">Apple Care Tips & Product Guides</h1>
            <p className="text-xl text-gray-300 mb-8">Expert advice on repairs, refurbishment, and buying Apple devices — for consumers who want value and reliability.</p>

            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, repairs, or devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition-all ${selectedCategory === cat.slug ? 'bg-slate-900 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {cat.name} <span className="ml-2 text-sm opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="container mx-auto px-6 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try another search or clear filters to see all posts.</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {!searchQuery && selectedCategory === 'all' && (
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-1 w-12 bg-blue-500 rounded" />
                  <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
                </div>
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={() => openArticle(filteredPosts[0].slug)}>
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-full overflow-hidden">
                      <img src={filteredPosts[0].featured_image} alt={filteredPosts[0].title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                        <Tag className="h-3 w-3" />
                        {filteredPosts[0].category_name}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{filteredPosts[0].title}</h3>
                      <p className="text-gray-600 mb-6 text-lg">{filteredPosts[0].excerpt}</p>
                      <div className="flex items-center justify-between pt-6 border-t">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-black to-black flex items-center justify-center text-white font-semibold">{filteredPosts[0].author_name.charAt(0)}</div>
                          <div>
                            <p className="font-medium text-gray-900">{filteredPosts[0].author_name}</p>
                            <p className="text-sm text-gray-500">{formatDate(filteredPosts[0].published_at)}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{filteredPosts[0].read_time}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </section>
            )}

            {/* Grid */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-12 bg-slate-900 rounded" />
                <h2 className="text-2xl font-bold text-gray-900">{searchQuery ? 'Search Results' : selectedCategory === 'all' ? 'Latest Articles' : `${CATEGORIES.find(c => c.slug === selectedCategory)?.name} Articles`}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => openArticle(post.slug)}>
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">{post.category_name}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-black to-black flex items-center justify-center text-white text-sm font-semibold">{post.author_name.charAt(0)}</div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{post.author_name}</p>
                            <p className="text-xs text-gray-500">{formatDate(post.published_at)}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{post.read_time}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center mt-12">
                <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg">Load More Articles</button>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-black to-black py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-blue-100 mb-8">Get repair tips, refurbishment deals, and product arrivals delivered to your inbox.</p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-white bg-white" />
              <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Modal / Reader */}
      {openSlug && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6 overflow-auto bg-black/60">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-bold">{FULL_ARTICLES[openSlug]?.title}</h3>
                <p className="text-sm text-gray-500">By {DUMMY_POSTS.find(p => p.slug === openSlug)?.author_name} • {DUMMY_POSTS.find(p => p.slug === openSlug)?.read_time}</p>
              </div>
              <button onClick={closeArticle} className="text-gray-500 hover:text-gray-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-8 prose max-w-none">
              {/* Safe insertion of pre-rendered HTML content for blog articles */}
              <div dangerouslySetInnerHTML={{ __html: FULL_ARTICLES[openSlug]?.content || '<p>Article not available.</p>' }} />
            </div>

            <div className="p-6 border-t text-right">
              <button onClick={closeArticle} className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
