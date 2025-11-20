import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const values = [
    {
      icon: "🔍",
      title: "Integrity",
      description: "Honesty and transparency in all our actions and decisions.",
    },
    {
      icon: "💡",
      title: "Creativity",
      description: "Innovative thinking that drives digital transformation.",
    },
    {
      icon: "🤝",
      title: "Responsibility",
      description: "Accountable to our stakeholders and communities.",
    },
    {
      icon: "🙏",
      title: "Respect",
      description: "Valuing diversity and treating everyone with dignity.",
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "Always pushing boundaries to create better solutions.",
    },
  ];

  const timeline = [
    {
      year: "2018",
      title: "Platform Establishment & Launch",
      description:
        "APP V1.0 officially launched, along with social media accounts. Initially focused on daily news services in Chinese and Khmer, providing timely and accurate news information for local Cambodian users.",
    },
    {
      year: "2019",
      title: "Service Diversification",
      description:
        "Expanded from single daily news service to a diversified service system, launched innovative features like treasure hunting activities, encouraging more user interaction and providing rich entertainment content and practical functions.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description:
        "Fully embraced digital marketing, launched social media management and digital advertising services, providing professional digital marketing solutions for clients.",
    },
    {
      year: "2022",
      title: "Media Service Expansion",
      description:
        "Established a comprehensive media submission and interview service system, providing professional media communication services for enterprises and organizations, becoming a well-known media communication service provider in the industry.",
    },
    {
      year: "2024-Present",
      title: "Social Media Platform Upgrade",
      description:
        "APP fully upgraded to a professional social media platform where professional media companies, NGOs, and various organizations can publish content, announcements, promotions, and videos, achieving content monetization. Provides five core services: media submission, creative production, event planning, digital marketing, and technical development.",
    },
  ];

  const leadership = [
    {
      name: "Sopheak Chan",
      position: "CEO & Founder",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sopheak",
    },
    {
      name: "Sreypov Lim",
      position: "CTO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sreypov",
    },
    {
      name: "Dara Kem",
      position: "Head of Product",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dara",
    },
    {
      name: "Pisach Ngor",
      position: "Head of Marketing",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=pisach",
    },
  ];
  const events: {
    title: string;
    description: string;
    date: string;
    image: string;
    link: string;
  }[] = [
    {
      title: "Birthday Party 2025",
      description:
        "Join us for a joyful celebration filled with fun, laughter, and unforgettable memories as we mark the special moments of Birthday Party 2025.",
      date: "April 2025",
      link: "https://www.facebook.com/tnaot.kh",
      image: "/images/event-1.jpg",
    },
    {
      title: "Happy Women's Day",
      description:
        "Celebrating the strength, courage, and achievements of women around the world. Join us in honoring their inspiring journey.",
      date: "March 2025",
      link: "https://www.facebook.com/share/p/16oejR8od8/",
      image: "/images/event-2.jpg",
    },
    {
      title: "Chinese New Year Events 2025",
      description:
        "Celebrate the vibrant traditions and festivities of Chinese New Year 2025, featuring colorful parades, cultural performances, and community events welcoming the Year of the Snake.",
      date: "January 2025",
      link: "https://www.facebook.com/share/p/1B5XVKZJRd/",
      image: "/images/event-3.jpg",
    },
    {
      title: "Chrismas Party 2024",
      description:
        "Celebrate the joy and warmth of the season at our Christmas Party 2024, filled with festive cheer, music, and holiday fun for everyone.",
      date: "December 2024",
      link: "https://www.facebook.com/share/p/19gu8r1zb7/",
      image: "/images/event-4.jpg",
    },
    {
      title: "People to People Exchange Amateur Badminton Championships 2024",
      description:
        "Join badminton enthusiasts from across the region for thrilling matches and friendly competition at the 2024 Amateur Championships.",
      date: "September 2024",
      link: "https://www.facebook.com/tnaot.kh",
      image: "/images/event-5.jpg",
    },
    {
      title: "Harbor Group Team Buiding Party 2023",
      description:
        "Strengthen bonds and build teamwork with fun activities and celebrations at Harbor Group’s 2023 team building event.",
      date: "April 2023",
      link: "https://www.facebook.com/share/p/177HK5ddFt/",
      image: "images/event-6.jpg",
    },
    {
      title: "National and Career Fair 2022 at Khos Pich",
      description:
        "Engaging with the community through our outreach initiatives.",
      date: "October 2022",
      link: "https://www.facebook.com/share/p/19AvTSNedH/",
      image: "/images/event-7.png",
    },
    {
      title: "Harbor Group Annual Trip 2022",
      description:
        "Experience memorable moments and camaraderie during the Harbor Group’s 2022 Annual Trip filled with adventure and fun.",
      date: "April 2022",
      link: "https://www.facebook.com/share/p/1DubSVv3FS/",
      image: "/images/event-8.jpg",
    },
  ];
  const heroImages = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // change image every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [heroImages.length]);
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
    <section className="relative min-h-screen text-white flex items-center justify-center">
        {/* Background Images */}

        {heroImages.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Hero ${index}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}

        {/* Text Overlay */}
        <div className="relative text-center px-4 z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empowering Ideas. Connecting Communities.
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Driving Cambodia’s digital future with creativity and integrity
          </motion.p>
        </div>
      </section>
      {/* Hero Section End */}

      {/* Company Story */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Koh Thmey is a leading company in the digital and media
                industry, best known for its flagship brand, TNAOT APP. This
                brand holds cultural significance in the digital world and plays
                an important role for advertisers and commercial purposes.
              </p>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Our dedication to authenticity and depth allows us to create
                content that engages and informs audiences, strengthens consumer
                relationships, and delivers captivating products. Koh Thmey and
                TNAOT APP have a strong track record in social media
                interactions, news, entertainment, and educational content,
                which guides our strategy to build on existing strengths and
                invest in new resources.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                For more information about Koh Thmey, please dial 023922788.
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/img7.jpg"
                alt="Team collaboration"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#FACC15] p-6 rounded-lg shadow-lg hidden md:block">
                <p className="font-bold text-gray-900 text-2xl">6+</p>
                <p className="text-gray-800">Years of Innovation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mission, Vision & Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core principles guide everything we do, from product
              development to community engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <Card className="p-8 bg-white shadow-md">
              <h3 className="text-2xl font-bold text-[#1E40AF] mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Koh Thmey Technology is focused and positioned for growth in the
                South East Asian media sector.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                <br />
                Our mission is to become the leading media company in the region
                by providing exclusive content for users and quality target data
                for investors.
              </p>
            </Card>
            <Card className="p-8 bg-white shadow-md">
              <h3 className="text-2xl font-bold text-[#1E40AF] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our corporate culture is one of team work and commitment to each
                other in reaching beyond boundaries to inspire with a
                consistently open, honest, ethical and genuine team spirit
                atmosphere.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                <br />
                Koh Thmey Core Values are Quality, Responsibility, Integrity,
                Respect and Teamwork.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full bg-white shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Witness our growth journey and milestone moments
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute top-0 left-5 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-[#1E40AF]"></div>

            <div className="space-y-8 md:space-y-0">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className="flex flex-col md:flex-row md:items-center relative"
                >
                  {/* Left Side Card */}
                  <div
                    className={`flex-1 px-6 ${
                      index % 2 === 0
                        ? "md:pr-8 md:text-right"
                        : "md:order-2 md:pl-8 md:text-left"
                    }`}
                  >
                    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="text-[#FACC15] font-bold text-base mb-1">
                        {item.year}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div className="w-4 h-4 bg-[#1E40AF] rounded-full border-2 border-white shadow-md"></div>
                  </div>

                  {/* Right Side Spacer */}
                  <div
                    className={`flex-1 px-6 hidden md:block ${
                      index % 2 === 0 ? "md:order-2" : ""
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Partner */}
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Our Partners</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            
            {/* Partner Card Example */}
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/Wing.png')" }}
              ></div>
             
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/eget.png')" }}
              ></div>

            </div>

            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/Huawei.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/ABA.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/abc.jpg')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/cdf.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/Cellcard.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/Forte.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/Harbor.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/Le-Conde.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/Mekong-Net.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/prince.jpg')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/Smart.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/STAPANA.jpg')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/The-Peak.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/tiger.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/truemoney.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/vattanac.jpg')" }}
              ></div>

            </div>

            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/WICAM.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/WEWATCH.jpg')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/vinina.JPG')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/Vattanac Investment.jpg')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/Vattanac Goft Resort.jpg')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/studio.JPG')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/Square Communication Cambodia.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/ramen.JPG')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/pteah chas.JPG')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/oudong express.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/NSC.jpg')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/Logo G.T.V.C.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/Lexus Cambodia.jpg')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/KB.png')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/JC.jpg')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/ganzberg.JPG')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/ENEOS.PNG')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/Chip Mong Land.jpg')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/cambodia airports.JPG')" }}
              ></div>

            </div>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-28 h-28 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/partner/New Logo/Borey Chankiri.jpg')" }}
              ></div>

            </div>

            
            
          </div>
        </div>
      </section>


      {/* Company Events */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Company Events
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Celebrating our milestones and bringing our team together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent className="flex flex-col justify-between h-full p-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {event.description}
                      </p>
                      <p className="text-sm text-[#1E40AF] font-medium mb-4">
                        📅 {event.date}
                      </p>
                    </div>
                    <Button
                      asChild
                      className="mt-auto bg-[#1E40AF] text-white hover:bg-[#374b9a]"
                    >
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      {/* <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the visionaries leading Koh Thmey Technology into the future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center bg-white shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-100"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-[#1E40AF] font-medium">
                    {leader.position}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Banner */}
      <section
        className="py-20 px-4 md:px-8 lg:px-16 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-[#1E40AF] bg-opacity-90"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Be Part of Our Journey
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Join us in shaping the future of digital media and technology in
            Southeast Asia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ContactForm">
              <Button className="bg-[#FACC15] text-black hover:bg-[#EAB308] font-medium text-lg px-8 py-6">
                Join Our Team
              </Button>
            </Link>
            <Link to="/ContactForm">
              <Button
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-[#1E40AF] font-medium text-lg px-8 py-6"
              >
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
