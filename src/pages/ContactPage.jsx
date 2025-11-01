"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useToast } from "../components/ui/use-toast" // <--- restored import
import { Loader, Mail, Phone, MapPin, Send, GraduationCap, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { trainingAPI, contactAPI } from "../services/api"

export default function ContactPage() {
  const { toast } = useToast()
  const location = useLocation()

  // Parse query parameters
  const searchParams = new URLSearchParams(location.search)
  const tabParam = searchParams.get("tab")
  const courseSlug = searchParams.get("course")

  const [activeTab, setActiveTab] = useState(tabParam === "training" ? "training" : "contact")
  const [courses, setCourses] = useState([])
  const [loadingCourses, setLoadingCourses] = useState(false)

  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [trainingFormData, setTrainingFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    course: courseSlug || "",
  })

  const [submittingContact, setSubmittingContact] = useState(false)
  const [submittingTraining, setSubmittingTraining] = useState(false)

  // Fetch courses for the training form
  useEffect(() => {
    const fetchCourses = async () => {
      if (courses.length > 0) return

      try {
        setLoadingCourses(true)
        const data = await trainingAPI.getCourses()
        setCourses(data.results || data)
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load courses. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoadingCourses(false)
      }
    }

    if (activeTab === "training") {
      fetchCourses()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]) // intentionally minimal deps to avoid repeated calls

  // Update the course in the form when courseSlug changes
  useEffect(() => {
    if (courseSlug) {
      setTrainingFormData((prev) => ({
        ...prev,
        course: courseSlug,
      }))
    }
  }, [courseSlug])

  const handleContactInputChange = (e) => {
    const { name, value } = e.target
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTrainingInputChange = (e) => {
    const { name, value } = e.target
    setTrainingFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()

    try {
      setSubmittingContact(true)

      // Send the contact form data to the backend
      await contactAPI.sendContactMessage(contactFormData)

      // Reset the form
      setContactFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      })
    } catch (err) {
      toast({
        title: "Failed to Send Message",
        description: (err && err.message) || "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmittingContact(false)
    }
  }

  const handleTrainingSubmit = async (e) => {
    e.preventDefault()

    try {
      setSubmittingTraining(true)

      // Send the training enrollment data to the backend
      await trainingAPI.enrollCourse(trainingFormData)

      // Reset the form
      setTrainingFormData({
        full_name: "",
        email: "",
        phone: "",
        course: "",
      })

      toast({
        title: "Enrollment Request Sent",
        description:
          "Thank you for your interest in our training program. We'll contact you shortly with more details!",
      })
    } catch (err) {
      toast({
        title: "Failed to Submit Enrollment",
        description: (err && err.message) || "There was an error submitting your enrollment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmittingTraining(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-black text-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
                Get in touch with our team for inquiries, support, or feedback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="contact">General Contact</TabsTrigger>
              <TabsTrigger value="training">Training Enrollment</TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <div className="grid gap-10 lg:grid-cols-2">
                {/* Contact Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                  <p className="text-gray-600 mb-8">
                    Have questions about our products or services? Need technical support? Want to discuss a business
                    opportunity? Fill out the form and we'll get back to you as soon as possible.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-600">tawaridigital@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-gray-600">+254   712007722 <br/> +254   734447444</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium">Address</h3>
                        <p className="text-gray-600">
                          Tawari Digital Limited
                          <br />
                          Westlands Commercial Centre
                          <br />
                          Ring Rd Parklands
                          <br />
                          Nairobi, Kenya
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monday - Friday</span>
                        <span>8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Saturday</span>
                        <span>9:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleContactSubmit} className="space-y-6 border rounded-lg p-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactFormData.name}
                        onChange={handleContactInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactFormData.email}
                        onChange={handleContactInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={contactFormData.subject}
                        onChange={handleContactInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={contactFormData.message}
                        onChange={handleContactInputChange}
                        rows={6}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingContact}
                      className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center"
                    >
                      {submittingContact ? (
                        <>
                          <Loader className="animate-spin h-4 w-4 mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="training">
              <div className="grid gap-10 lg:grid-cols-2">
                {/* Training Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Training Enrollment</h2>
                  <p className="text-gray-600 mb-8">
                    Interested in our professional training programs? Fill out this form to enroll or request more
                    information about our courses.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <GraduationCap className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium">Training Programs</h3>
                        <p className="text-gray-600">Professional Apple repair and sales training</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium">Class Schedule</h3>
                        <p className="text-gray-600">Flexible timing with weekday and weekend options</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium">Training Location</h3>
                        <p className="text-gray-600">
                          Tawari Digital Training Center
                          <br />
                          Westlands Commercial Centre
                          <br />
                          Nairobi, Kenya
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Why Choose Our Training?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-black mr-2">•</span>
                        <span>Hands-on practical training with real devices</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2">•</span>
                        <span>Small class sizes for personalized attention</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2">•</span>
                        <span>Industry-recognized certification upon completion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2">•</span>
                        <span>Job placement assistance for top performers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2">•</span>
                        <span>Business setup guidance for entrepreneurs</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Training Enrollment Form */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Enroll in a Training Program</h2>
                  <form onSubmit={handleTrainingSubmit} className="space-y-6 border rounded-lg p-6">
                    <div className="space-y-2">
                      <label htmlFor="full_name" className="block text-sm font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={trainingFormData.full_name}
                        onChange={handleTrainingInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={trainingFormData.email}
                        onChange={handleTrainingInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={trainingFormData.phone}
                        onChange={handleTrainingInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="course" className="block text-sm font-medium">
                        Select Course *
                      </label>
                      <select
                        id="course"
                        name="course"
                        value={trainingFormData.course}
                        onChange={handleTrainingInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Select a course</option>
                        {loadingCourses ? (
                          <option disabled>Loading courses...</option>
                        ) : (
                          courses.map((course) => (
                            <option key={course.id} value={course.slug}>
                              {course.title} - KSh{course.price} ({course.duration})
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingTraining}
                      className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center"
                    >
                      {submittingTraining ? (
                        <>
                          <Loader className="animate-spin h-4 w-4 mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <GraduationCap className="h-4 w-4 mr-2" />
                          Submit Enrollment Request
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-12 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
          <div className="h-[400px] rounded-lg overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.3032806191067!2d36.803560459879016!3d-1.2607247400177348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f177307c21aa9%3A0xafa646b993f202b0!2sTawari%20Digital%20Limited%3A%20Apple%20Premium%20Service%20Provider!5e0!3m2!1sen!2ske!4v1746963066660!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}
