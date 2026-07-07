import React, { useState } from "react";
import Header from "./Header";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { motion } from "framer-motion";
import Footer from "./Footer";
import {
  Facebook,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Download,
  Star,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Play,
  MessageCircle,
  Globe,
} from "lucide-react";

const Brands = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: <Newspaper size={32} />,
      title: "News",
      description:
        "Stay updated with the latest news from Cambodia and around the world with real-time updates and breaking news alerts.",
    },
    {
      icon: <Play size={32} />,
      title: "Entertainment",
      description:
        "Enjoy a wide variety of entertainment content including videos, music, and exclusive shows from local and international creators.",
    },
    {
      icon: <MessageCircle size={32} />,
      title: "Social Interaction",
      description:
        "Connect with friends, share content, and engage with communities through our integrated social features and messaging system.",
    },
    {
      icon: <Globe size={32} />,
      title: "Localized Content",
      description:
        "Experience content tailored specifically for Cambodian culture and interests, available in both Khmer and English languages.",
    },
  ];

  const testimonials = [
    {
      name: "Sophea Kem",
      location: "Phnom Penh",
      rating: 5,
      comment:
        "TNAOT has become my go-to app for staying informed about what's happening in Cambodia. The news is always up-to-date and the interface is so easy to use!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophea",
    },
    {
      name: "Dara Lim",
      location: "Siem Reap",
      rating: 5,
      comment:
        "I love the entertainment section! There's always something interesting to watch, and I can easily share content with my friends. Great app!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dara",
    },
    {
      name: "Pisach Ngor",
      location: "Battambang",
      rating: 5,
      comment:
        "The localized content is amazing. Finally, an app that truly understands Cambodian culture and provides content that's relevant to us.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pisach",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#1E2A5A] text-white flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <img
                src="/images/tnaot-app.png"
                alt="TNAOT App Logo"
                className="h-20 w-20 rounded-2xl mb-6 shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">TNAOT App</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Empowering Cambodia's Digital Culture
            </p>
            <p className="text-lg text-blue-200 mb-8 leading-relaxed">
              The #1 digital platform connecting millions of Cambodians with
              news, entertainment, and community features. Experience the best
              of Cambodian digital culture in one app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://play.google.com/store/apps/details?id=com.tnaot.app">
              <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-2 px-6 py-3">
                <Download size={20} />
                Google Play
              </Button>
              </a>
              <a href="https://apps.apple.com/us/app/tnaot/id6766489237">
              <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-2 px-6 py-3">
                <Download size={20} />
                App Store
              </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src="/images/App/tnaot-1.png"
                alt="TNAOT App on Phone"
                className="max-w-sm h-auto rounded-3xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-300"
              />
              <div className="absolute -bottom-4 -left-4 bg-[#FACC15] p-4 rounded-lg shadow-lg">
                <p className="font-bold text-black text-lg">#1 Media App</p>
                <p className="text-black text-sm">in Cambodia</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience TNAOT
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how TNAOT is revolutionizing digital media consumption in
              Cambodia with innovative features and localized content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                image:
                  "/images/App/tnaot-10.png",
                title: "News Feed",
                description: "Stay updated with real-time news",
              },
              {
                image:
                  "/images/App/tnaot-6.png",
                title: "Entertainment Hub",
                description: "Endless entertainment options",
              },
              {
                image:
                  "/images/App/tnaot-4.jpg",
                title: "Social Features",
                description: "Connect with your community",
              },
            ].map((mockup, index) => (
              <motion.div
                key={mockup.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={mockup.image}
                  alt={mockup.title}
                  className="w-48 h-auto mx-auto rounded-2xl shadow-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {mockup.title}
                </h3>
                <p className="text-gray-600">{mockup.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              TNAOT offers a comprehensive suite of features designed to keep
              you connected, informed, and entertained.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full bg-white shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-[#1E40AF] mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#1E40AF] text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              TNAOT by the Numbers
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our success is measured by the millions of users who trust TNAOT
              for their daily digital needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1M+",
                label: "Active Users",
                description: "Growing user base across Southeast Asia",
              },
              {
                number: "#1",
                label: "App in Cambodia",
                description: "Leading digital media platform",
              },
              {
                number: "4.4",
                label: "App Store Rating",
                description: "Highly rated by users",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl md:text-6xl font-bold text-[#FACC15] mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-blue-100">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Download TNAOT Today
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
              Join millions of users who have made TNAOT their go-to app for
              news, entertainment, and social connection. Available on all major
              platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="https://play.google.com/store/apps/details?id=com.tnaot.app">
              <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-2 px-8 py-4 text-lg">
                <Download size={24} />
                Download for Android
              </Button>
              </a>
              <a href="https://apps.apple.com/us/app/tnaot/id6766489237">
              <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-2 px-8 py-4 text-lg">
                <Download size={24} />
                Download for iOS
              </Button>
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              Free download • Available in Khmer and English
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what real users have to
              say about their TNAOT experience.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 bg-gray-50 shadow-lg">
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-[#FACC15] fill-current"
                      />
                    )
                  )}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">
                  &quot;{testimonials[currentTestimonial].comment}&quot;
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? "bg-[#1E40AF]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-20 px-4 md:px-8 lg:px-16 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-[#1E40AF] bg-opacity-90"></div>
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experience TNAOT Today
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Join the millions of users who have made TNAOT their daily digital
              companion. Download now and discover what you've been missing.
            </p>
            <Button className="bg-[#FACC15] text-black hover:bg-[#EAB308] font-medium text-lg px-8 py-6">
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brands;
