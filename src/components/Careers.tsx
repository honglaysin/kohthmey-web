import React from "react";
import Header from "./Header";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import Footer from "./Footer";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  const values = [
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

  const jobListings = [
        {
          title: "General Manager Assistant",
          department: "Management",
          location: "Phnom Penh",
          description: `The General Manager Assistant is responsible for assisting the General Manager with daily operations and decision implementation, managing internal documentation and contract-related files. This position requires excellent Chinese-Khmer language skills, a legal academic background, and strong document management capabilities.

      Key Responsibilities:
      1. Assist the General Manager with daily office tasks and ensure the effective implementation of instructions;
      2. Manage document archiving, meeting minutes, and departmental records to ensure information security and traceability;
      3. Coordinate interdepartmental collaboration and facilitate the smooth progress of cross-team projects;
      4. Receive, analyze, and coordinate tasks assigned by the General Manager, ensuring timely and efficient completion;
      5. Provide Chinese-Khmer translation support for the General Manager and other departments.

      Job Requirements:
      1. Bachelor’s degree or above in Law or a related field, with solid legal knowledge;
      2. Proficient in Chinese and Khmer; proficiency in English is an advantage;
      3. Experience in contract review, legal document handling, and related administrative work is preferred;
      4. Strong document management, communication, and execution skills;
      5. High professional ethics, strong sense of responsibility, and meticulous work attitude;
      6. Proficient in office software and document management tools.`,
        },
        {
          title: "Marketing & Sales Supervisor",
          department: "Management",
          location: "Phnom Penh",
          description: `The General Manager Assistant is responsible for assisting the General Manager with daily operations and decision implementation, managing internal documentation and contract-related files. This position requires excellent Chinese-Khmer language skills, a legal academic background, and strong document management capabilities.

      Key Responsibilities:
      1. Identify potential clients through various channels, update client prospects and plans, conduct visits, and drive successful partnerships.
      2. Maintain and enhance relationships with existing clients, ensuring high client satisfaction through regular follow-ups and proactive issue resolution.
      3. Participate in business negotiations with key clients and partners, oversee contract implementation, and ensure timely and high-quality service delivery.
      4. Lead and supervise the marketing and sales team to ensure monthly sales targets are achieved, including assigning individual responsibilities, setting clear KPIs, and providing necessary support to the team.
      5. Arrange and manage team tasks effectively to secure continuous achievement of monthly signing targets.
      6. Coach and mentor team members, conduct regular performance evaluations, and enhance team capabilities and accountability.
      7. Plan and execute online and offline marketing campaigns, business development, brand promotion, and event execution.
      8. Seek and secure potential sponsorship opportunities for company or client events activities, building strategic partnerships with sponsors.
      9. Develop and maintain strong cooperative relationships with both government and private sector partners to support business development, brand promotion, and event execution.
      10. Collaborate with external partners such as media agencies, platforms, and influencers to implement integrated marketing strategies.
      11. Coordinate with Khmer and Chinese content production, operations, and design teams to ensure smooth progress of marketing and sales projects.
      12. Analyze sales performance, collect market and client feedback, report progress with to management and provide optimization suggestions.
      13. Update weekly sales reports, client development progress, event summaries, and client feedback.

      Job Requirements:
      1. Bachelor’s degree or above in Marketing, Business Administration, Media, Public Relations, or related fields is preferred.
      2. Strong skills in both written and spoken Chinese and English are required.
      3. Proven leadership skills with the ability to lead teams to achieve sales and marketing KPIs.
      4. Minimum 3 years of relevant experience in sales or marketing promotion, with a background in media advertising or digital marketing preferred.
      5. Experience in sponsorship development and collaboration with government or private enterprises is a plus. 
      6. Strong communication abilities to build and maintain positive relationships with clients, teams, and partners.
      7. Ability to maintain high performance and complete tasks on time in a high-pressure environment.`,
        },
        {
          title: "Content Creator / Producer",
          department: "Management",
          location: "Phnom Penh",
          description: `The General Manager Assistant is responsible for assisting the General Manager with daily operations and decision implementation, managing internal documentation and contract-related files. This position requires excellent Chinese-Khmer language skills, a legal academic background, and strong document management capabilities.

      Key Responsibilities:
      1. Serve as the on-camera host for interviews, programs, and special features, presenting professionally and confidently.
      2. Participate in content planning, develop program outlines, and prepare interview questions.
      3. Conduct interviews with guests from various backgrounds, guiding conversations to deliver informative and engaging stories.
      4. Collaborate with the production team to ensure smooth filming and quality output.
      5. Stay aware of trending topics and audience interests to inspire fresh, relevant content ideas.

      Job Requirements:
      1. Bachelor’s degree or above preferred; background in journalism, media, performing arts, or related fields is a plus.
      2. Native-level fluency in Khmer; other language skills (Chinese, English) are an advantage.
      3. Strong on-camera presence, clear articulation, and engaging delivery style.
      4. Excellent interpersonal and communication skills; able to interact confidently with diverse guests.
      5. Creative mindset, adaptability, and the ability to perform well under pressure.`,
        },
];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    fetch("https://getform.io/f/bqoeerlb", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Application submitted successfully!");
        } else {
          alert("There was a problem with your submission.");
        }
      })
      .catch(() => {
        alert("An error occurred. Please try again later.");
      });
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
          {values.map((value) => (
            <Card key={value.title} className="p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <img src={value.icon} alt={value.title} className="mx-auto mb-4 h-16 w-16 object-contain" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
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
          {jobListings.map((job) => (
            <Card key={job.title} className="p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between bg-[#E8EBEF]">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.department} | {job.location}</p>
                {job.description && (
                  <p className="text-gray-700 text-l whitespace-pre-line">{job.description}</p>
                )}
              </div>
              <Link to="#application-form">
                <Button className="mt-4 bg-[#FACC15] text-black hover:bg-[#EAB308] font-medium">Apply</Button>
              </Link>
            </Card>
          ))}
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
