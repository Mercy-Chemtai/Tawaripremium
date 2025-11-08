"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Loader, CheckCircle } from "lucide-react";
import { trainingAPI } from "../services/api";
import AppleRepairTrainingImage from "/public/Images/applerepairtraining.png"; // Import the image

export default function TrainingPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(false);

  const [pricing, setPricing] = useState({});
  const [loadingPricing, setLoadingPricing] = useState(false);

  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);

  // Fetch courses and pricing when the page loads
  useEffect(() => {
    const fetchCoursesAndPricing = async () => {
      try {
        setLoading(true);
        const data = await trainingAPI.getCourses();
        setCourses(data.results || data);

        // Fetch pricing for all courses
        const pricingPromises = (data.results || data).map(async (course) => {
          try {
            const pricingData = await trainingAPI.getCoursePricing(course.slug);
            return { slug: course.slug, price: pricingData.price };
          } catch {
            return { slug: course.slug, price: null };
          }
        });

        const pricingResults = await Promise.all(pricingPromises);
        const pricingMap = pricingResults.reduce((acc, { slug, price }) => {
          acc[slug] = price;
          return acc;
        }, {});
        setPricing(pricingMap);

        setError(null);
      } catch {
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndPricing();
  }, []);

  // Fetch testimonials when the page loads
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoadingTestimonials(true);
        const data = await trainingAPI.getTestimonials();
        setTestimonials(data.results || data);
      } catch {
        setTestimonials([]);
      } finally {
        setLoadingTestimonials(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleViewModules = async (courseSlug) => {
    try {
      setLoadingModules(true);
      const data = await trainingAPI.getModules(courseSlug); // Fetch modules using courseSlug
      setModules(data.results || data); // Ensure the correct data structure is set
      setSelectedCourse(courseSlug);
    } catch {
      setModules([]); // Clear modules if there's an error
    } finally {
      setLoadingModules(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Apple Repair Training
              </h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Professional training programs to master Apple device repair and sales
              </p>
            </div>
            <Link
              to="/contact?tab=training"
              className="inline-flex items-center justify-center px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Enroll Now <GraduationCap className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Training Overview */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-black">
                Learn from Industry Experts
              </h2>
              <p className="text-gray-500 md:text-xl">
                Our comprehensive training programs are designed to equip you with the skills and knowledge needed to
                excel in Apple device repair and sales. Whether you're looking to start a career, enhance your existing
                skills, or open your own repair business, our expert-led courses provide hands-on experience with the
                latest techniques and tools.
              </p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-black" />
                <p className="text-gray-700">Hands-on practical training</p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-black" />
                <p className="text-gray-700">Small class sizes for personalized attention</p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-black" />
                <p className="text-gray-700">Industry-recognized certification</p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-black" />
                <p className="text-gray-700">Job placement assistance</p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-black" />
                <p className="text-gray-700">Ongoing support after course completion</p>
              </div>
            </div>
            <div className="relative lg:ml-auto">
              <img
                src={"https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/6bc2693d-1ca1-4f11-b61a-2e572b046800/public"}
                width={500}
                height={500}
                alt="Apple repair training"
                className="mx-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Offerings */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">Our Training Programs</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Comprehensive courses tailored to your goals
              </p>
            </div>
          </div>

          <div className="mt-12">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader className="h-8 w-8 animate-spin text-black" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-black text-white rounded-md"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold">{course.title}</h3>
                        <p className="text-gray-500 mt-2">{course.duration}</p>
                        <p className="text-3xl font-bold mt-1">
                          {pricing[course.slug] !== undefined
                            ? `Ksh ${pricing[course.slug]?.toFixed(2)}`
                            : "Contact for pricing"}
                        </p>
                      </div>
                      <div className="mb-6">
                        <p className="text-gray-600">{course.description}</p>
                      </div>
                      <button
                        onClick={() => handleViewModules(course.slug)}
                        className="inline-flex items-center justify-center px-4 py-2 mt-auto bg-black text-white font-medium rounded-md hover:bg-black/90 transition-colors"
                      >
                        View Modules
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500">No training courses available at the moment.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      {selectedCourse && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black text-center mb-8">
              Modules for Selected Course
            </h2>
            {loadingModules ? (
              <div className="flex justify-center items-center py-20">
                <Loader className="h-8 w-8 animate-spin text-black" />
              </div>
            ) : modules.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="flex flex-col p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <h3 className="text-xl font-bold">{module.title}</h3>
                    {module.description.includes("•") ? (
                      <div
                        className="text-gray-600 mt-2"
                        dangerouslySetInnerHTML={{ __html: module.description.replace(/•/g, "<br/>•") }}
                      />
                    ) : (
                      <ul className="text-gray-600 mt-2 list-disc pl-5 space-y-1">
                        {module.description
                          .split(".")
                          .filter((item) => item.trim())
                          .map((item, index) => (
                            <li key={index}>
                              {item.trim()}
                              {!item.trim().endsWith(".") && "."}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No modules available for this course.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">Student Success Stories</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our graduates who have transformed their careers
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {loadingTestimonials ? (
              <div className="flex justify-center items-center py-20">
                <Loader className="h-8 w-8 animate-spin text-black" />
              </div>
            ) : testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex flex-col p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      width={100}
                      height={100}
                      alt={testimonial.name}
                      className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-gray-500">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.message}"</p>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No testimonials available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
