import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";
import {
  assetUrl,
  createItem,
  getPublishedItems,
  richTextToText,
  uploadFile,
} from "@/lib/directus";

type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  descriptions: unknown;
  key_responsibilities: unknown;
  job_requirements: unknown;
};

type Benefit = {
  title: string;
  description: string;
  icon: string;
};

type DirectusJobOpening = {
  id: number;
  title?: string;
  department?: string;
  location?: string;
  descriptions?: unknown;
  key_responsibilities?: unknown;
  job_requirements?: unknown;
};

type DirectusBenefit = {
  title?: string;
  description?: string;
  icon?: string | { id?: string };
};

const defaultBenefits: Benefit[] = [
    { title: "NSSF", description: "", icon: "/benefits/benefit-1.png" },
    { title: "Life Insurance", description: "", icon: "/benefits/benefit-2.png" },
    { title: "In-House Health Care", description: "", icon: "/benefits/benefit-3.png" },
    { title: "Internal & Outsource Training", description: "", icon: "/benefits/benefit-4.png" },
    { title: "Monthly Attendance Bonus", description: "", icon: "/benefits/benefit-5.png" },
    { title: "Monthly KPI Bonus", description: "", icon: "/benefits/benefit-6.png" },
    { title: "Annual Salary Increment", description: "", icon: "/benefits/benefit-8.png" },
    { title: "Annual Bonus", description: "", icon: "/benefits/benefit-9.png" },
    { title: "Annual Party", description: "", icon: "/benefits/benefit-10.png" },
    { title: "Annual Trip", description: "", icon: "/benefits/benefit-11.png" },
    { title: "Birthday Party", description: "", icon: "/benefits/benefit-12.png" },
    { title: "Team Building Budget", description: "", icon: "/benefits/benefit-13.png" },
    { title: "4 Days off / month", description: "", icon: "/benefits/benefit-15.png" },
    { title: "Certificate of Merit Award", description: "", icon: "/benefits/benefit-18.png" },
    { title: "Best Staff Award", description: "", icon: "/benefits/benefit-19.png" },
  ];

const Careers = () => {
  const [jobListings, setJobListings] = useState<Job[]>([]);
  const [careerBenefits, setCareerBenefits] = useState<Benefit[]>(defaultBenefits);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState("");

  const hasText = (value: unknown) => richTextToText(value).trim().length > 0;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getPublishedItems<DirectusJobOpening>(
          "job_openings"
        );

        if (jobsData.length > 0) {
          const jobs: Job[] = jobsData.map((item) => ({
            id: item.id,
            title: item.title || "",
            department: item.department || "",
            location: item.location || "",
            descriptions: item.descriptions || [],
            key_responsibilities: item.key_responsibilities || [],
            job_requirements: item.job_requirements || [],
          }));
          setJobListings(jobs);
        } else {
          setJobListings([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      }
    };

    const fetchBenefits = async () => {
      try {
        const benefitsData = await getPublishedItems<DirectusBenefit>(
          "career_benefits",
          { fields: "*,icon.*" }
        );

        if (!benefitsData.length) return;

        setCareerBenefits(
          benefitsData.map((benefit) => ({
            title: benefit.title || "",
            description: benefit.description || "",
            icon: assetUrl(benefit.icon, ""),
          }))
        );
      } catch (err) {
        console.error("Error fetching career benefits:", err);
      }
    };

    fetchJobs();
    fetchBenefits();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const fileInput = form.querySelector<HTMLInputElement>("#resume");
      let uploadedFileId = null;

      if (fileInput?.files?.length) {
        uploadedFileId = await uploadFile(fileInput.files[0]);
      }

      await createItem("career_applications", {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        position: formData.get("position"),
        message: formData.get("message"),
        resume: uploadedFileId,
        status: formData.get("status"),
      });

      alert("Application submitted successfully!");
      form.reset();
    } catch (err) {
      console.error("Error:", err);
      alert(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-96 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Careers</h1>
          <p className="text-xl md:text-2xl text-blue-100">
            At Koh Thmey Technology, we believe everyone can do great things. Opportunities don’t happen, you create them…!
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Benefits</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover what makes Koh Thmey Technology an exceptional workplace.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerBenefits.map((b) => (
            <Card key={b.title} className="p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <img src={b.icon} alt={b.title} className="mx-auto mb-4 h-16 w-16 object-contain" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{b.title}</h3>
              <p className="text-gray-600 text-sm">{b.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Current Openings</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our current job opportunities and apply today.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading jobs...</p>
          ) : jobListings.length > 0 ? (
            jobListings.map((job) => (
              <Card key={job.id} className="p-6 shadow-md hover:shadow-lg transition-shadow bg-[#E8EBEF]">
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.department} | {job.location}</p>

                {hasText(job.descriptions) && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800">Description:</h4>
                    <p className="text-gray-700 whitespace-pre-line">
                      {richTextToText(job.descriptions)}
                    </p>
                  </div>
                )}

                {hasText(job.key_responsibilities) && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800">Key Responsibilities:</h4>
                    <p className="text-gray-700 whitespace-pre-line">
                      {richTextToText(job.key_responsibilities)}
                    </p>
                  </div>
                )}

                {hasText(job.job_requirements) && (
                  <div>
                    <h4 className="font-semibold text-gray-800">Job Requirements:</h4>
                    <p className="text-gray-700 whitespace-pre-line">
                      {richTextToText(job.job_requirements)}
                    </p>
                  </div>
                )}

              <a href="#application-form">
                <Button
                  className="mt-4 bg-[#FACC15] text-black hover:bg-[#EAB308] font-medium"
                  onClick={() => setSelectedPosition(job.title)}
                >
                  Apply
                </Button>
              </a>

              </Card>
            ))
          ) : (
            <p className="text-center text-gray-600">No open positions at the moment.</p>
          )}
        </div>
      </section>
      {/* CTA Banner */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-cover bg-center relative text-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80)" }}>
        <div className="absolute inset-0 bg-[#1E40AF] bg-opacity-90"></div>
        <div className="container mx-auto relative z-10 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join One of Cambodia’s Fastest-Growing Tech Companies
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Be part of a dynamic team that thrives on innovation and growth.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Apply Now</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6 bg-white p-8 shadow-md rounded-md">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <select
                id="position"
                name="position"
                required
                value={selectedPosition}
                onChange={(event) => setSelectedPosition(event.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select a position</option>
                {jobListings.map((job) => (
                  <option key={job.id} value={job.title}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume *</Label>
              <Input id="resume" name="resume" type="file" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" />
            </div>
            <input type="hidden" name="status" value="new" />
            <Button type="submit" className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-medium flex items-center justify-center gap-2">
              <Send className="h-4 w-4" /> Submit Application
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
