// AboutPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Users, X, Award, TrendingUp, MapPin, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ==========================
   JourneyTimeline Component - Modern Vertical Design
   ========================== */

const journeyItems = [
  {
    id: "f",
    year: "2023",
    title: "Foundation",
    icon: MapPin,
    bullets: [
      "Tawari Digital Limited established in Nairobi",
      "Specialising in exceptional Apple repair services",
    ],
  },
  {
    id: "e",
    year: "2024",
    title: "Expansion",
    icon: TrendingUp,
    bullets: [
      "Moved to a larger location at Westlands Commercial Centre",
      "Improved workshop capacity and faster turnaround",
    ],
  },
  {
    id: "r",
    year: "2024R",
    title: "Recognition",
    icon: Award,
    bullets: [
      "Crowned among Best Apple Repair Service Providers in Nairobi",
      "Acknowledged for excellent customer care",
    ],
  },
  {
    id: "d",
    year: "2025",
    title: "Digital Transformation",
    icon: Globe,
    bullets: ["Launched online platform to serve customers across Kenya"],
  },
];

export function JourneyTimeline() {
  return (
    <section id="journey" className="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-gray-900"
          >
            Our Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-gray-600 text-lg"
          >
            From humble beginnings to digital transformation
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Desktop/Tablet View */}
          <div className="hidden md:block relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gray-400 via-gray-900 to-gray-950" />
            
            <div className="space-y-6">
              {journeyItems.map((item, idx) => {
                const Icon = item.icon;
                const isEven = idx % 2 === 0;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                    className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Content Card */}
                    <div className={`w-5/12 ${isEven ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                      <motion.div
                        whileHover={{ scale: 1.03, y: -4 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                      >
                        <div className={`flex items-center gap-3 mb-3 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className="px-4 py-1 bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400 rounded-full text-sm font-bold">
                            {item.year}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <ul className={`space-y-2 ${isEven ? 'text-right' : 'text-left'}`}>
                          {item.bullets.map((bullet, i) => (
                            <li key={i} className="text-gray-600 flex items-start gap-2">
                              {!isEven && <span className="text-cyan-500 mt-1">•</span>}
                              <span className="flex-1">{bullet}</span>
                              {isEven && <span className="text-cyan-500 mt-1">•</span>}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    {/* Center Icon */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-950 flex items-center justify-center shadow-xl border-4 border-white"
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Empty space on other side */}
                    <div className="w-5/12" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-8">
            {journeyItems.map((item, idx) => {
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Vertical line for mobile */}
                  {idx < journeyItems.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-black to-white -mb-8" />
                  )}
                  
                  {/* Icon */}
                  <div className="absolute left-0 top-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-black to-white flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-gray-400 via-gray-900 to-gray-950 rounded-full text-xs font-bold">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <ul className="space-y-2 mt-3">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                          <span className="text-cyan-500 mt-0.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================
   AboutPage (Main)
   ========================== */

export default function AboutPage() {
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setSelectedProfile(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const profiles = {
    cate: {
      id: "cate",
      name: "Cate Adiwa",
      role: "Lead Technician",
      img: "/Images/femaleAvater.jpg",
      bio: "Cate leads our repair team with 7+ years experience in Apple repairs, specialising in logic board and display repairs. Passionate about quality and customer service.",
    },
    brighette: {
      id: "brighette",
      name: "Brighette",
      role: "Marketing Specialist",
      img: "/Images/femaleAvater.jpg",
      bio: "Brighette manages our communications and helps customers find the right service for their needs.",
    },
    robert: {
      id: "robert",
      name: "Robert",
      role: "Repair Specialist",
      img: "/Images/maleAvater.jpg",
      bio: "Robert focuses on diagnostics and fast, reliable repairs — screens, batteries and water damage.",
    },
    mitchelle: {
      id: "mitchelle",
      name: "Mitchelle",
      role: "Technical Advisor",
      img: "/Images/femaleAvater.jpg",
      bio: "Mitchelle advises on complex repairs and quality assurance, ensuring each device leaves in perfect condition.",
    },
  };

  const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };
  const cardHover = { scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="w-full py-12 md:py-20 lg:py-28 bg-black text-white"
      >
        <motion.div variants={fadeUp} className="w-full max-w-[1400px] mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            About Tawari Digital
          </h1>
          <p className="max-w-[700px] mx-auto mt-4 text-gray-300 md:text-xl">
            Your trusted partner for all Apple device sales, repairs, and training
          </p>
        </motion.div>
      </motion.section>

      {/* OUR STORY */}
      <section className="w-full py-12 md:py-20 lg:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="space-y-4"
            >
              <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tighter sm:text-4xl text-black">
                Our Story
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 md:text-lg">
                Tawari Digital Limited was founded with a simple mission: to provide exceptional service for Apple
                device users. What began as a small repair shop has grown into a comprehensive service provider
                offering sales, repairs, and professional training.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-500 md:text-lg">
                Our team of certified technicians brings years of experience and a passion for technology to every
                interaction.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 16 }}
              className="relative lg:ml-auto"
            >
              <img
                src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/dffa28af-ca8c-4f6e-22a2-e7debdfcf400/public"
                width={500}
                height={600}
                alt="Tawari Digital team"
                className="mx-auto rounded-xl object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <JourneyTimeline />

      {/* VALUES */}
      <section className="w-full py-12 md:py-20 lg:py-24 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold sm:text-4xl">Our Values</h2>
            <p className="mt-2 text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="p-3 rounded-full bg-black text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mt-4">Excellence</h3>
              <p className="text-gray-600 text-center mt-2">
                We strive for excellence in every repair, sale, and training session.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="p-3 rounded-full bg-black text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mt-4">Integrity</h3>
              <p className="text-gray-600 text-center mt-2">
                Honesty and transparency are at the core of our business.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="p-3 rounded-full bg-black text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mt-4">Innovation</h3>
              <p className="text-gray-600 text-center mt-2">
                We continuously learn and adapt to stay at the forefront of Apple technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Meet the Team</h2>
            <p className="mt-3 text-base text-gray-600">
              Skilled technicians and friendly faces — the people who bring your devices back to life.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.values(profiles).map((p) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                whileHover={cardHover}
                className="relative group bg-white rounded-2xl p-6 shadow hover:shadow-2xl transition"
              >
                <img src={p.img} alt={p.name} className="mx-auto mb-4 h-28 w-28 rounded-full object-cover" />
                <h3 className="text-xl font-semibold text-center">{p.name}</h3>
                <p className="text-center text-gray-600">{p.role}</p>

                <div className="mt-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => setSelectedProfile(p.id)}
                    className="px-3 py-2 rounded bg-black text-white text-sm"
                    aria-haspopup="dialog"
                  >
                    View Profile
                  </button>
                  <a href="tel:+254710130021" className="px-3 py-2 rounded border border-gray-300 text-sm">
                    Call
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProfile && profiles[selectedProfile] && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="profile-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                className="absolute inset-0 bg-black/50"
                onClick={() => setSelectedProfile(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="relative max-w-2xl w-full bg-white rounded-2xl p-6 z-10 shadow-lg"
                initial={{ y: 20, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 12, opacity: 0 }}
              >
                <button
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setSelectedProfile(null)}
                  aria-label="Close profile"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex gap-6 items-center">
                  <img
                    src={profiles[selectedProfile].img}
                    alt={profiles[selectedProfile].name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <div>
                    <h3 id="profile-title" className="text-2xl font-semibold">
                      {profiles[selectedProfile].name}
                    </h3>
                    <p className="text-sm text-gray-600">{profiles[selectedProfile].role}</p>
                    <p className="mt-3 text-gray-600">{profiles[selectedProfile].bio}</p>
                    <div className="mt-4 flex gap-3">
                      <a
                        className="inline-flex items-center px-4 py-2 rounded bg-black text-white"
                        href="tel:+254710130021"
                      >
                        Call
                      </a>
                      <Link
                        className="inline-flex items-center px-4 py-2 rounded border border-gray-200"
                        to="/contact"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full py-12 md:py-16 lg:py-20 bg-black text-white mt-auto"
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tighter">Join Our Team</h2>
          <p className="max-w-[600px] mx-auto mt-3 text-gray-300">
            We're always looking for talented individuals who share our passion for Apple technology
          </p>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              View Careers <Users className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}