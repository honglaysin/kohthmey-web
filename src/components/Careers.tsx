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

type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  descriptions: any[];
  key_responsibilities: any[];
  job_requirements: any[];
};

const benefits = [
    { title: "NSSF", description: "", icon: "/benefits/benefit-1.png" },
    { title: "Life Insurance", description: "", icon: "/benefits/benefit-2.png" },
    { title: "In-House Health Care", description: "", icon: "/benefits/benefit-3.png" },
    { title: "Internal & Outsource Training", description: "", icon: "/benefits/benefit-4.png" },
    { title: "Monthly Attendance Bonus", description: "", icon: "/benefits/benefit-5.png" },
    { title: "Monthly KPI Bonus", description: "", icon: "/benefits/benefit-6.png" },
    { title: "Staff Referral Bonus", description: "", icon: "/benefits/benefit-7.png" },
    { title: "Annual Salary Increment", description: "", icon: "/benefits/benefit-8.png" },
    { title: "Annual Bonus", description: "", icon: "/benefits/benefit-9.png" },
    { title: "Annual Party", description: "", icon: "/benefits/benefit-10.png" },
    { title: "Annual Trip", description: "", icon: "/benefits/benefit-11.png" },
    { title: "Birthday Party", description: "", icon: "/benefits/benefit-12.png" },
    { title: "Team Building Budget", description: "", icon: "/benefits/benefit-13.png" },
    { title: "Company Fund", description: "", icon: "/benefits/benefit-14.png" },
    { title: "4 Days off / month", description: "", icon: "/benefits/benefit-15.png" },
    { title: "Special Leave", description: "", icon: "/benefits/benefit-16.png" },
    { title: "Long Year Service Award", description: "", icon: "/benefits/benefit-17.png" },
    { title: "Certificate of Merit Award", description: "", icon: "/benefits/benefit-18.png" },
    { title: "Best Staff Award", description: "", icon: "/benefits/benefit-19.png" },
  ];

const Careers = () => {
  const [jobListings, setJobListings] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("https://api.kohthmey.com/api/job?populate=*");
        if (!res.ok) throw new Error("Network response not ok: " + res.status);

        const data = await res.json();
        console.log("Jobs API Response:", data);

        if (data.data && data.data.length > 0) {
          const jobs: Job[] = data.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            department: item.department,
            location: item.location,
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

    fetchJobs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // Upload resume file first
      const fileInput = form.querySelector<HTMLInputElement>("#resume");
      let uploadedFileId = null;

      if (fileInput?.files?.length) {
        const fileData = new FormData();
        fileData.append("files", fileInput.files[0]);

        const uploadRes = await fetch("https://api.kohthmey.com/api/upload", {
          method: "POST",
          body: fileData,
          // Add Authorization header if your API is private
          // headers: { "Authorization": `Bearer ${YOUR_STRAPI_API_TOKEN}` }
        });

        const uploadJson = await uploadRes.json();
        if (uploadJson && uploadJson[0] && uploadJson[0].id) {
          uploadedFileId = uploadJson[0].id;
        }
      }

      // Submit application entry to Strapi
      const payload = {
        data: {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          resume: uploadedFileId ? [uploadedFileId] : [],
        },
      };

      const res = await fetch("https://api.kohthmey.com/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if your collection is private
          // "Authorization": `Bearer ${YOUR_STRAPI_API_TOKEN}`
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Application submitted successfully!");
        form.reset();
      } else {
        const errData = await res.json();
        console.error(errData);
        alert("Error submitting application. Check console for details.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An unexpected error occurred. Please try again.");
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
          {benefits.map((b) => (
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

                {job.descriptions.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800">Description:</h4>
                    <p className="text-gray-700 whitespace-pre-line">
                      {job.descriptions.map((d: any) => d.children.map((c: any) => c.text).join(" ")).join("\n")}
                    </p>
                  </div>
                )}

                {job.key_responsibilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800">Key Responsibilities:</h4>
                    <p className="text-gray-700 whitespace-pre-line">
                      {job.key_responsibilities.map((d: any) => d.children.map((c: any) => c.text).join(" ")).join("\n")}
                    </p>
                  </div>
                )}

                {job.job_requirements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800">Job Requirements:</h4>
                    <p className="text-gray-700 whitespace-pre-line">
                      {job.job_requirements.map((d: any) => d.children.map((c: any) => c.text).join(" ")).join("\n")}
                    </p>
                  </div>
                )}

              <a href="#application-form">
                <Button className="mt-4 bg-[#FACC15] text-black hover:bg-[#EAB308] font-medium">
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
              <Label htmlFor="resume">Resume *</Label>
              <Input id="resume" name="resume" type="file" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" />
            </div>
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
