import { Link } from "react-router-dom"
import { CheckCircle, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                About Tawari Digital
              </h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Your trusted partner for all Apple device sales, repairs, and training
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-black">Our Story</h2>
              <p className="text-gray-500 md:text-xl">
                Tawari Digital Limited was founded with a simple mission: to provide exceptional service for Apple
                device users. What began as a small repair shop has grown into a comprehensive service provider offering
                sales, repairs, and professional training.
              </p>
              <p className="text-gray-500 md:text-xl">
                Our team of certified technicians brings years of experience and a passion for technology to every
                interaction. We believe in transparency, quality, and customer satisfaction above all else.
              </p>
              <p className="text-gray-500 md:text-xl">
                Today, we're proud to be a trusted name in the Apple ecosystem, serving individual consumers,
                businesses, and aspiring technicians with the same dedication to excellence that has defined us from day
                one.
              </p>
            </div>
            <div className="relative lg:ml-auto">
              <img
                src="https://i.pinimg.com/736x/7a/da/ae/7adaae1bb095a783b4904edc7866f799.jpg"
                width={500}
                height={600}
                alt="Tawari Digital team"
                className="mx-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">Our Values</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The principles that guide everything we do
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-4 p-6 border border-gray-200 rounded-lg">
              <div className="p-3 rounded-full bg-black text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Excellence</h3>
              <p className="text-gray-500 text-center">
                We strive for excellence in every repair, sale, and training session. Nothing less than the best is
                acceptable.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 border border-gray-200 rounded-lg">
              <div className="p-3 rounded-full bg-black text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Integrity</h3>
              <p className="text-gray-500 text-center">
                Honesty and transparency are at the core of our business. We build trust through ethical practices and
                clear communication.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 border border-gray-200 rounded-lg">
              <div className="p-3 rounded-full bg-black text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Innovation</h3>
              <p className="text-gray-500 text-center">
                We continuously learn and adapt to stay at the forefront of Apple technology and repair techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Team</h2>
              <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're always looking for talented individuals who share our passion for Apple technology
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              View Careers <Users className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

