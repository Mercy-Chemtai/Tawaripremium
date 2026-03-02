// src/pages/ContactPage.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import {
  Loader,
  Mail,
  Phone,
  MapPin,
  Send,
  GraduationCap,
  Calendar,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { contactAPI, trainingAPI } from "../services/api";

export default function ContactPage() {
  const { toast } = useToast();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get("tab");
  const courseSlug = searchParams.get("course");

  const [activeTab, setActiveTab] = useState(
    tabParam === "training" ? "training" : "contact"
  );
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [trainingFormData, setTrainingFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    course: courseSlug || "",
  });

  const [submittingContact, setSubmittingContact] = useState(false);
  const [submittingTraining, setSubmittingTraining] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      if (courses.length > 0) return;

      try {
        setLoadingCourses(true);
        const data = await trainingAPI.getCourses();
        setCourses(data.results || data);
      } catch (err) {
        console.error("Failed to load courses:", err);
        // Set mock courses as fallback
        setCourses([
          {
            id: 1,
            slug: "iphone-repair",
            title: "iPhone Repair Training",
            price: 45000,
            duration: "4 weeks",
          },
          {
            id: 2,
            slug: "macbook-repair",
            title: "MacBook Repair Training",
            price: 55000,
            duration: "6 weeks",
          },
          {
            id: 3,
            slug: "ipad-repair",
            title: "iPad Repair Training",
            price: 40000,
            duration: "3 weeks",
          },
        ]);
      } finally {
        setLoadingCourses(false);
      }
    };

    if (activeTab === "training") {
      fetchCourses();
    }
  }, [activeTab, courses.length]);

  useEffect(() => {
    if (courseSlug) {
      setTrainingFormData((prev) => ({
        ...prev,
        course: courseSlug,
      }));
    }
  }, [courseSlug]);

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTrainingInputChange = (e) => {
    const { name, value } = e.target;
    setTrainingFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmittingContact(true);

      await contactAPI.sendContactMessage(contactFormData);

      setContactFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      toast({
        title: "Message Sent Successfully!",
        description:
          "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
    } catch (err) {
      console.error("Contact form error:", err);
      toast({
        title: "Failed to Send Message",
        description:
          err?.message ||
          "There was an error sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmittingContact(false);
    }
  };

  const handleTrainingSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmittingTraining(true);

      await trainingAPI.enrollCourse(trainingFormData);

      setTrainingFormData({
        full_name: "",
        email: "",
        phone: "",
        course: "",
      });

      toast({
        title: "Enrollment Request Submitted!",
        description:
          "Thank you for your interest. Our training coordinator will contact you within 24 hours with course details and payment information.",
      });
    } catch (err) {
      console.error("Training enrollment error:", err);
      toast({
        title: "Failed to Submit Enrollment",
        description:
          err?.message ||
          "There was an error submitting your enrollment. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmittingTraining(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-black">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white tracking-tighter sm:text-4xl md:text-5xl">
                Contact Us
              </h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
                Get in touch with our team for inquiries, support, or feedback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="contact">General Contact</TabsTrigger>
              <TabsTrigger value="training">Training Enrollment</TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <div className="grid gap-10 lg:grid-cols-2">
                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                  <p className="text-gray-600 mb-8">
                    Have questions about our products or services? Need
                    technical support? Want to discuss a business opportunity?
                    Fill out the form and we'll get back to you as soon as
                    possible.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <a
                          href="mailto:tawaridigital@gmail.com"
                          className="text-gray-600 hover:text-black"
                        >
                          tawaridigital@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-gray-600">
                          <a
                            href="tel:+254734447444"
                            className="hover:text-black"
                          >
                            0734 447 444
                          </a>
                          <br />
                          <a
                            href="tel:+254710130021"
                            className="hover:text-black"
                          >
                            0710 130 021
                          </a>
                        </p>
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
                          Old Block, 1st Floor
                          <br />
                          Ring Rd Parklands
                          <br />
                          Nairobi, Kenya
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Saturday</span>
                        <span className="font-medium">10:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunday</span>
                        <span className="font-medium">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactFormData.name}
                        onChange={handleContactInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder=""
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactFormData.email}
                        onChange={handleContactInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder=""
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={contactFormData.subject}
                        onChange={handleContactInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={contactFormData.message}
                        onChange={handleContactInputChange}
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingContact}
                      className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
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
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Training Enrollment
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Interested in our professional training programs? Fill out
                    this form to enroll or request more information about our
                    courses.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <GraduationCap className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium">Training Programs</h3>
                        <p className="text-gray-600">
                          Professional Apple repair and sales training
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium">Class Schedule</h3>
                        <p className="text-gray-600">
                          Flexible timing with weekday and weekend options
                        </p>
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
                          Old Block, 1st Floor
                          <br />
                          Ring Rd Parklands
                          <br />
                          Nairobi, Kenya
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">
                      Why Choose Our Training?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-black mr-2 mt-1">✓</span>
                        <span>
                          Hands-on practical training with real devices
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2 mt-1">✓</span>
                        <span>
                          Small class sizes for personalized attention
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2 mt-1">✓</span>
                        <span>
                          Industry-recognized certification upon completion
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2 mt-1">✓</span>
                        <span>Job placement assistance for top performers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2 mt-1">✓</span>
                        <span>Business setup guidance for entrepreneurs</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Training Enrollment Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Enroll in a Training Program
                  </h2>
                  <form onSubmit={handleTrainingSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="full_name"
                        className="block text-sm font-medium"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={trainingFormData.full_name}
                        onChange={handleTrainingInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder=""
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={trainingFormData.email}
                        onChange={handleTrainingInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder=""
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={trainingFormData.phone}
                        onChange={handleTrainingInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder=""
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="course"
                        className="block text-sm font-medium"
                      >
                        Select Course *
                      </label>
                      <select
                        id="course"
                        name="course"
                        value={trainingFormData.course}
                        onChange={handleTrainingInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      >
                        <option value="">Select a course</option>
                        {loadingCourses ? (
                          <option disabled>Loading courses...</option>
                        ) : (
                          courses.map((course) => (
                            <option key={course.id} value={course.slug}>
                              {course.title} - KSh{" "}
                              {course.price?.toLocaleString()} (
                              {course.duration})
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingTraining}
                      className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
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

      {/* Map + Video Section */}
      <section className="w-full py-12 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>

          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Watch the video guide and use the map to easily locate our shop at
            Westlands Commercial Centre.
          </p>

          <div className="grid  gap-8 lg:grid-cols-2">
            {/* Video */}
            <div className="rounded-2xl overflow-hidden shadow-lg border">
              <video controls className="w-170 h-105 object-cover">
                <source src="/Images/tawaridirection.mp4" type="video/mp4" className="h-105 w-130" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Map */}
            <div className="h-[420px] rounded-2xl overflow-hidden shadow-lg border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.3032806191067!2d36.803560459879016!3d-1.2607247400177348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f177307c21aa9%3A0xafa646b993f202b0!2sTawari%20Digital%20Limited%3A%20Apple%20Premium%20Service%20Provider!5e0!3m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Tawari Digital Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
