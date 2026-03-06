"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Loader,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
// import { trainingAPI } from "../services/api";

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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
        // If API fails, use fallback testimonials
        setTestimonials([
          {
            id: 1,
            name: "James Maina",
            title: "Graduate, iPhone Repair Course",
            message:
              "Tawari Digital Limited gave me the skills and confidence to start my own repair business. The hands-on training was exceptional!",
            image: "https://via.placeholder.com/100",
          },
          {
            id: 2,
            name: "Sarah Wanjiku",
            title: "Advanced MacBook Repair Graduate",
            message:
              "The instructors are industry experts who genuinely care about your success. I went from zero knowledge to running a successful repair shop in 3 months!",
            image: "https://via.placeholder.com/100",
          },
          {
            id: 3,
            name: "David Ochieng",
            title: "iPad Repair Specialist",
            message:
              "The certification from Tawari Digital opened doors for me. I now work with major tech companies and earn a great income doing what I love.",
            image: "https://via.placeholder.com/100",
          },
        ]);
      } finally {
        setLoadingTestimonials(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleViewModules = async (courseSlug) => {
    try {
      setLoadingModules(true);
      const data = await trainingAPI.getModules(courseSlug);
      setModules(data.results || data);
      setSelectedCourse(courseSlug);
    } catch {
      setModules([]);
    } finally {
      setLoadingModules(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Auto-advance testimonials
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

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
                Professional training programs to master Apple device repair and
                sales
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
                Our comprehensive training programs are designed to equip you
                with the skills and knowledge needed to excel in Apple device
                repair and sales. Whether you're looking to start a career,
                enhance your existing skills, or open your own repair business,
                our expert-led courses provide hands-on experience with the
                latest techniques and tools.
              </p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-black" />
                <p className="text-gray-700">Hands-on practical training</p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-black" />
                <p className="text-gray-700">
                  Small class sizes for personalized attention
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-black" />
                <p className="text-gray-700">
                  Industry-recognized certification
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-black" />
                <p className="text-gray-700">Learn from industry</p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-black" />
                <p className="text-gray-700">
                  Ongoing support after course completion
                </p>
              </div>
            </div>
            <div className="relative lg:ml-auto">
              <img
                src={
                  "/Images/training-overview.png"
                }
                width={500}
                height={500}
                alt="Apple repair training"
                className="mx-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Course Summary Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black mb-4">
              Master Apple Device Repair in 3 Months
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform from beginner to certified Apple repair expert with our
              comprehensive, hands-on training program designed for aspiring
              technicians and entrepreneurs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Course Highlights */}
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-black/10 to-black/10 p-6 rounded-2xl border border-blue-100">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Course Investment
                  </h3>
                  <div className="text-right">
                    <p className="text-3xl font-bold bg-black/600">
                      Ksh 45,000
                    </p>
                    <p className="text-gray-600">or Ksh 15,000/month</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Complete professional training with certification, hands-on
                  practice, and business guidance
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold bg-black/600">3</div>
                  <div className="text-sm text-gray-600">Months</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold bg-black/600">100+</div>
                  <div className="text-sm text-gray-600">Hours</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold bg-black/600">6</div>
                  <div className="text-sm text-gray-600">Modules</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold bg-black/600">
                    Certified
                  </div>
                  <div className="text-sm text-gray-600">Graduation</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  What You'll Master:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      Complete iPhone, iPad & Mac repair techniques
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      Hardware & software troubleshooting mastery
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      Advanced circuit diagnosis & water damage repair
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      Business skills to launch your own repair shop
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Modules Breakdown */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Course Journey
              </h3>
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black/600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Apple Ecosystem Foundation
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Master device specifications, hardware components, and
                      professional repair tools
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black/600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Diagnostic Expertise
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Learn systematic troubleshooting for both hardware and
                      software issues
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black/600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Hardware Repair Mastery
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Screen replacements, battery swaps, and motherboard
                      component identification
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black/600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Software Solutions
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Firmware flashing, device restoration, and software
                      unlocking techniques
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black/600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Advanced Techniques
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Circuit tracing, water damage recovery, and schematic
                      diagram interpretation
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black/600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    6
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Business Launchpad
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Setup your repair business, customer service, inventory,
                      and marketing
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-black/10 rounded-lg border border-black/200">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-black/12 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 bg-black/600" />
                  </div>
                  <div>
                    <p className="font-semibold bg-black/900">
                      Professional Certification
                    </p>
                    <p className="bg-black/700 text-sm">
                      Receive industry-recognized certification upon completion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact?tab=training"
                className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-semibold rounded-lg"
              >
                Start Your Journey Today
                <GraduationCap className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              Limited spots available. Next cohort starting soon!
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-center text-4xl font-bold text-black mb-4">
            Student Success Stories
          </h2>
          <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            Real experiences from learners who turned their passion into a
            profession
          </p>

          <div className="relative">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`transition-opacity duration-3000 ${
                  index === currentTestimonial
                    ? "opacity-100"
                    : "opacity-0 absolute inset-0"
                }`}
              >
                <div className="bg-white mx-auto max-w-xl rounded-2xl shadow-xl p-10 text-center">
                

                  <Quote className="w-10 h-10 text-gray-300 mx-auto mb-4" />

                  <p className="text-gray-700 text-lg italic mb-6">
                    “{t.message}”
                  </p>

                  <h3 className="font-semibold text-xl text-black">{t.name}</h3>
                  <p className="text-gray-500">{t.title}</p>
                </div>
              </div>
            ))}

            {/* Navigation */}
            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 left-4 bg-white shadow-lg p-2 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 right-4 bg-white shadow-lg p-2 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentTestimonial
                      ? "bg-black scale-125"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Your Journey?
              </h2>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
                Join hundreds of successful graduates and transform your career
                today
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact?tab=training"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
              >
                Enroll Now <GraduationCap className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/Training"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                View All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
