import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ServiceCard from "./ServiceCard";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Youtube,
} from "lucide-react";

const Home = () => {
  // Mock data for services
  const services = [
    {
      id: 1,
      title: "Digital Media",
      description: "Content platforms for news & entertainment.",
      icon: "📱",
    },
    {
      id: 2,
      title: "Technology Solutions",
      description: "Building innovative digital tools.",
      icon: "💻",
    },
    {
      id: 3,
      title: "Advertising & Marketing",
      description: "Helping businesses reach audiences effectively.",
      icon: "📈",
    },
    {
      id: 4,
      title: "Regional Expansion",
      description: "Growing across Southeast Asia.",
      icon: "🌏",
    },
  ];

  // Mock data for news articles
  const newsArticles = [
    {
      id: 1,
      title: "Koh Thmey Technology launches TNAOT App",
      excerpt:
        "Exciting times as Koh Thmey Technology introduces the TNAOT App, marking a significant step in its Southeast Asian expansion.",
      image:
        "/images/tnaot.png",
      date: "2018",
    },
    {
      id: 2,
      title: "TNAOT App Reaches 1 Million Users",
      excerpt:
        "Our flagship app celebrates a major milestone as user base continues to grow across the region.",
      image:
        "/images/tnaot-1m.png",
      date: "2022",
    },
    {
      id: 3,
      title: "New Partnership with Leading Telecom Provider",
      excerpt:
        "Strategic alliance aims to improve digital infrastructure across Cambodia.",
      image:
        "/images/partner .png",
      date: "April 10, 2023",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white" id="about">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-6">
                Koh Thmey Technology is focused and positioned for growth in the
                South East Asian media sector. <br />
                Our mission is to become the leading media company in the region
                by providing exclusive content for users and quality target data
                for investors.
              </p>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Values
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-full mr-3">
                    <span className="text-xl">🔍</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Integrity</h4>
                    <p className="text-sm text-gray-600">
                      Honesty in all our actions
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-full mr-3">
                    <span className="text-xl">💡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Creativity</h4>
                    <p className="text-sm text-gray-600">Innovative thinking</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-full mr-3">
                    <span className="text-xl">🤝</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Responsibility
                    </h4>
                    <p className="text-sm text-gray-600">
                      Accountable to all stakeholders
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-full mr-3">
                    <span className="text-xl">🚀</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Innovation</h4>
                    <p className="text-sm text-gray-600">
                      Always moving forward
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/img7.jpg"
                alt="Team collaboration"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <Link
                to="/AboutUs"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="absolute -bottom-6 -right-6 bg-yellow-400 p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-bold text-gray-900">Read more</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50" id="services">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Our Services
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We provide comprehensive digital solutions to help businesses and
            communities thrive in the digital age.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TNAOT App Showcase */}
      <section
        className="py-20 px-4 md:px-8 lg:px-16 bg-blue-900 text-white"
        id="brands"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">TNAOT App</h2>
              <p className="mb-8 text-blue-100">
                Our flagship digital platform connecting millions of users
                across Southeast Asia with news, entertainment, and community
                features.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-800 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-yellow-400">5M+</p>
                  <p className="text-sm text-blue-100">Active Users</p>
                </div>
                <div className="bg-blue-800 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-yellow-400">4.4</p>
                  <p className="text-sm text-blue-100">App Rating</p>
                </div>
                <div className="bg-blue-800 p-4 rounded-lg text-center">
                  <img src="/images/tnaot-qr.png" alt="" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://play.google.com/store/apps/details?id=com.tnaot.newspro&pcampaignid=web_share">
                <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-2">
                  <Download size={18} />
                  Google Play
                </Button>
                </a>
                <a href="https://apps.apple.com/us/app/tnaot-khmer-content-platform/id1296073079">
                <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-2">
                  <Download size={18} />
                  App Store
                </Button>
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/tnaot-1.png"
                alt="TNAOT App"
                className="max-w-full h-auto rounded-xl shadow-2xl transform rotate-3"
                style={{ maxHeight: "500px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white" id="news">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Latest News
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Stay updated with the latest developments at Koh Thmey Technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 relative h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                  <h3 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Button
                    variant="link"
                    className="p-0 text-blue-700 hover:text-blue-900 flex items-center gap-1"
                  >
                    Read More <ArrowRight size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-blue-700 text-blue-700 hover:bg-blue-50"
            >
              View All News
            </Button>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section
        className="py-20 px-4 md:px-8 lg:px-16 bg-cover bg-center relative"
        id="careers"
        style={{
          backgroundImage:
            "url(/images/ad.png)",
        }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-80"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Team
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Be part of one of the fastest-growing media technology companies in
            Cambodia.
          </p>
          <Link to="/Careers">
            <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-medium text-lg px-8 py-6">
              Explore Careers
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
