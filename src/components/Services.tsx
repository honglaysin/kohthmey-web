
import Header from "./Header";
import ServiceCard from "./ServiceCard";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Smartphone,
  Code,
  TrendingUp,
  Users,
  Globe,
  BarChart3,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { assetUrl, getItems, getPublishedItems } from "@/lib/directus";

type ServiceSection = {
  title: string;
  description: string;
  logo: string;
  externalLink: string;
};

type DirectusServiceSection = {
  title?: string;
  description?: string;
  logo?: string | { id?: string };
  external_link?: string;
};

type PromoVideo = {
  id: string;
  title: string;
  videoUrl: string;
  embedUrl?: string;
};

type DirectusPromotionVideo = {
  id: number | string;
  status?: string;
  sort?: number | null;
  title?: string;
  video?: string | { id?: string; filename_disk?: string };
  video_url?: string;
  youtube_url?: string;
};

const defaultTnaotSection: ServiceSection = {
  title: "TNAOT News",
  description:
    "Stay informed with TNAOT News, Cambodia's digital news platform for fast, reliable updates on local stories, national headlines, and important events.\nTNAOT delivers breaking news, social updates, entertainment, lifestyle, sports, and video content in one easy-to-use platform.\nUsers can follow trending stories, watch short videos, discover community updates, and receive timely information wherever they are.\nOur platform helps brands and organizations reach Cambodian audiences through trusted media coverage, content distribution, and digital advertising solutions.\nAvailable on mobile and web, TNAOT News makes daily information accessible, convenient, and relevant for Cambodian readers.",
  logo: "/logo/tnaot-app.png",
  externalLink: "https://www.tnaot.app/",
};

const defaultPromotionSection = {
  title: "Promotion Video Production",
  description:
    "Our amazing Koh Thmey marketing team also produces outstanding quality promotional videos for our partners for the purpose of advertisements and exposures.",
};

const defaultPromoVideos: PromoVideo[] = [
  {
    id: "kasen",
    title: "KASEN Promo Video",
    videoUrl: "/Video/KASEN-video.mp4",
  },
  {
    id: "sgmc",
    title: "SGMC Promo Video",
    videoUrl: "/Video/SGMC-video.mp4",
  },
];

const getYoutubeEmbedUrl = (value: string) => {
  const url =
    value.match(/\s(?:src|href)=["']([^"']+)["']/i)?.[1] ||
    value.match(/https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s"'<>]+/i)?.[0] ||
    value;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      const id = parsedUrl.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      const shortsId = parsedUrl.pathname.match(/\/shorts\/([^/?]+)/)?.[1];
      const embedId = parsedUrl.pathname.match(/\/embed\/([^/?]+)/)?.[1];
      const watchId = parsedUrl.searchParams.get("v");
      const id = shortsId || embedId || watchId;

      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
  } catch {
    return "";
  }

  return "";
};

const PromoVideos = () => {
  const [activeVideo, setActiveVideo] = useState(defaultPromoVideos[0].id);
  const [section, setSection] = useState(defaultPromotionSection);
  const [videos, setVideos] = useState<PromoVideo[]>(defaultPromoVideos);
  const selectedVideo = videos.find((video) => video.id === activeVideo) || videos[0];

  useEffect(() => {
    const loadPromotionSection = async () => {
      try {
        const sections = await getPublishedItems<DirectusServiceSection>(
          "service_sections",
          {
            "filter[key][_eq]": "promotion_video_production",
            limit: "1",
          }
        );

        const directusSection = sections[0];
        if (!directusSection) return;

        setSection({
          title: directusSection.title || defaultPromotionSection.title,
          description:
            directusSection.description || defaultPromotionSection.description,
        });
      } catch (error) {
        console.error("Error loading promotion video section:", error);
      }
    };

    const loadPromotionVideos = async () => {
      try {
        const items = await getItems<DirectusPromotionVideo>(
          "promotion_videos",
          { fields: "*,video.*" }
        );

        const directusVideos = items
          .filter((item) => String(item.status || "").toLowerCase() === "published")
          .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
          .map((item) => {
            const rawVideoValue = typeof item.video === "string" ? item.video : "";
            const youtubeUrl = item.youtube_url || item.video_url || rawVideoValue;
            const embedUrl = getYoutubeEmbedUrl(youtubeUrl);

            return {
              id: String(item.id),
              title: item.title || "Promotion Video",
              videoUrl: embedUrl ? "" : assetUrl(item.video),
              embedUrl,
            };
          })
          .filter((item) => item.videoUrl || item.embedUrl);

        if (!directusVideos.length) return;

        setVideos(directusVideos);
        setActiveVideo(directusVideos[0].id);
      } catch (error) {
        console.error("Error loading promotion videos:", error);
      }
    };

    loadPromotionSection();
    loadPromotionVideos();
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {section.title}
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            {section.description}
          </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Tabs */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap border-b mb-4">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video.id)}
                  className={`px-6 py-2 font-medium ${
                    activeVideo === video.id
                      ? "border-b-2 border-[#1E40AF] text-[#1E40AF]"
                      : "text-gray-600 hover:text-[#1E40AF]"
                  }`}
                >
                  {video.title}
                </button>
              ))}
            </div>

            {/* Video Display */}
            <div className="w-full bg-gray-200 flex items-center justify-center">
              {selectedVideo.embedUrl ? (
                <iframe
                  key={selectedVideo.id}
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.title}
                  className="aspect-video w-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  key={selectedVideo.id}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-auto object-cover rounded-lg"
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">For more information, contact:</h3>
            <p className="text-gray-700 mb-4">
              <strong>Ms. Huy Leng Cheng</strong> – Chinese/English<br />
              📞 096 988 2727
            </p>
            <p className="text-gray-700">
              <strong>Mr. Chea Bunathsiak</strong> – Khmer/English<br />
              📞 077 275 105
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [tnaotSection, setTnaotSection] =
    useState<ServiceSection>(defaultTnaotSection);
  const services = [
    {
      id: 1,
      title: "Digital Media Platforms",
      description:
        "Creating engaging content platforms that connect millions of users across Southeast Asia with news, entertainment, and community features.",
      icon: <Smartphone size={32} />,
    },
    {
      id: 2,
      title: "Technology Solutions",
      description:
        "Building innovative digital tools and infrastructure that power modern businesses and enhance user experiences across multiple platforms.",
      icon: <Code size={32} />,
    },
    {
      id: 3,
      title: "Advertising & Marketing",
      description:
        "Helping businesses reach their target audiences effectively through data-driven marketing strategies and digital advertising solutions.",
      icon: <TrendingUp size={32} />,
    },
    {
      id: 4,
      title: "Social Media Engagement",
      description:
        "Developing platforms and strategies that foster meaningful connections and community building in the digital space.",
      icon: <Users size={32} />,
    },
    {
      id: 5,
      title: "Regional Growth",
      description:
        "Expanding digital presence across Southeast Asia with localized content and culturally relevant solutions for diverse markets.",
      icon: <Globe size={32} />,
    },
    {
      id: 6,
      title: "Data & Analytics",
      description:
        "Providing comprehensive insights and analytics to help businesses make informed decisions and optimize their digital strategies.",
      icon: <BarChart3 size={32} />,
    },
  ];

  useEffect(() => {
    const loadServiceSection = async () => {
      try {
        const sections = await getPublishedItems<DirectusServiceSection>(
          "service_sections",
          {
            fields: "*,logo.*",
            "filter[key][_eq]": "tnaot_news",
            limit: "1",
          }
        );

        const section = sections[0];
        if (!section) return;

        setTnaotSection({
          title: section.title || defaultTnaotSection.title,
          description: section.description || defaultTnaotSection.description,
          logo: assetUrl(section.logo, defaultTnaotSection.logo),
          externalLink:
            section.external_link || defaultTnaotSection.externalLink,
        });
      } catch (error) {
        console.error("Error loading service section:", error);
      }
    };

    loadServiceSection();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white flex items-center justify-center">
        <div className="text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Powering the Digital Future
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Digital Solutions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We provide end-to-end digital services that help businesses and
              communities thrive in the modern digital landscape. From content
              platforms to data analytics, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Video Production Section */}
<PromoVideos />


{/* TNAOT Section */}
<section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
  <div className="container mx-auto text-start">
    {/* Logo */}
    <div className="flex justify-center mb-6">
      <a href={tnaotSection.externalLink} target="_blank" rel="noopener noreferrer">
        <img
          src={tnaotSection.logo}
          alt="TNAOT Logo"
          className="h-40"
        />
      </a>
    </div>

    <h2 className="text-3xl text-center md:text-4xl font-bold text-gray-900 mb-4">
      {tnaotSection.title}
    </h2>
    {tnaotSection.description.split("\n").map((paragraph) => (
      <p key={paragraph} className="text-gray-600 max-w-3xl mx-auto mb-8 text-xl">
        {paragraph}
      </p>
    ))}
    <div className="hidden">
    <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-xl">
      Stay informed with <span className="text-[#399152] font-semibold">TNAOT News</span>, Cambodia's digital news platform for fast, reliable updates on local stories, national headlines, and important events.
      <br /> TNAOT is Cambodia’s leading real estate marketplace dedicated to empowering consumers with data, inspiration, and connecting them with the best local professionals.
    </p>
    <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-xl">Search over properties for sale and rent across all of Cambodia. Plus upload a property to sell or lease your home for FREE! (https://www.harbor-property.com/）</p>
    <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-xl">Our core service included New Development, Borey, Condo, Land, Apartment, Shophouse, and Commercial etc.</p>
    <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-xl">Harbor Property App create an efficient, convenient, professional and accurate Cambodian real estate information service platform.</p>
    <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-xl">Available in 4 language, Eng, KH, CN, and Thai.</p>
    <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-xl">Selling, Buying and Renting with the Leading Real Estate Portal in Cambodia—— Harbor Property APP （https://www.harbor-property.com/）</p>
    </div>

    {/* Features */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
      <img src="/images/App/home-1.jpg" alt="Feature 1" className="rounded-lg shadow" />
      <img src="/images/App/home-2.jpg" alt="Feature 2" className="rounded-lg shadow" />
      <img src="/images/App/home-3.jpg" alt="Feature 3" className="rounded-lg shadow" />
      <img src="/images/App/home-4.jpg" alt="Feature 4" className="rounded-lg shadow" />
      <img src="/images/App/home-5.jpg" alt="Feature 5" className="rounded-lg shadow" />
    </div>
  </div>
</section>


      {/* Process Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven methodology to deliver exceptional results for
              our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "Understanding your needs, goals, and target audience.",
              },
              {
                step: "02",
                title: "Strategy",
                description:
                  "Developing a comprehensive plan tailored to your objectives.",
              },
              {
                step: "03",
                title: "Implementation",
                description:
                  "Building and deploying solutions with precision and care.",
              },
              {
                step: "04",
                title: "Optimization",
                description:
                  "Continuous improvement and performance monitoring.",
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-[#1E40AF] text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#1E40AF] text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              These numbers reflect our commitment to delivering exceptional
              results for our clients and users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "5M+", label: "Active Users" },
              { number: "100+", label: "Projects Completed" },
              { number: "50+", label: "Happy Clients" },
              { number: "8+", label: "Years of Experience" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#FACC15] mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-4 md:px-8 lg:px-16 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Work With Us to Transform Digital Media
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Ready to take your digital presence to the next level? Let's
              collaborate and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contactform">
              <Button className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-medium text-lg px-8 py-6">
                Start Your Project
              </Button>
            </Link>

            <Link to="/contactform">
              <Button
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black font-medium text-lg px-8 py-6"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
