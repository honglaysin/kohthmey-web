import React, { useState } from "react";
import Header from "./Header";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import Footer from "./Footer";
import {
  AlertCircle,
  CheckCircle2,
  Send,
  Phone,
  Mail,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // wrap subject and message in Strapi rich text blocks
      const subjectBlocks = [
        {
          type: "paragraph",
          children: [{ type: "text", text: formData.subject }],
        },
      ];
      const messageBlocks = [
        {
          type: "paragraph",
          children: [{ type: "text", text: formData.message }],
        },
      ];

      const res = await fetch(
        "https://kohthmey-strapi-api.onrender.com/api/contact-messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              name: formData.name,
              email: formData.email,
              subject: subjectBlocks,
              message: messageBlocks,
            },
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) {
        console.error("Submission error:", result);
        setSubmitStatus("error");
      } else {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSubmitStatus("success");
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative h-72 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact Us</h1>
          <p className="text-lg md:text-xl text-blue-100">
            We'd love to hear from you! Reach out with any questions or
            inquiries.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Send us a Message
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we’ll get back to you as soon as
              possible.
            </p>

            {submitStatus === "success" && (
              <Alert className="mb-6 bg-green-50 text-green-700 border-green-200">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Thank you for your message! We'll get back to you soon.
                </AlertDescription>
              </Alert>
            )}
            {submitStatus === "error" && (
              <Alert className="mb-6 bg-red-50 text-red-700 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  There was an error sending your message. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`h-12 ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-[#1E40AF]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`h-12 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-[#1E40AF]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  className={`h-12 ${
                    errors.subject
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#1E40AF]"
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  className={`min-h-[140px] resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#1E40AF]"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-medium py-3 px-6 h-12 text-base transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[
              {
                title: "Customer Service",
                email: "support@tnaot.com",
                phone: "(+855) 023 922 788",
              },
              {
                title: "Advertising",
                email: "chenghuyleng@kohthmey.net",
                phone: "(+855) 010 688 511",
              },
              {
                title: "Business",
                email: "chenghuyleng@kohthmey.net",
                phone: "(+855) 010 688 511",
              },
              {
                title: "Careers",
                email: "hr@kohthmey.net",
                phone: "Telegram : 015 856 322 (KHM&ENG) / 061 538 022 (CHN)",
              },
            ].map((contact) => (
              <Card
                key={contact.title}
                className="p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {contact.title}
                </h4>
                <p className="text-gray-700 flex items-center">
                  <Mail size={16} className="mr-2 text-[#1E40AF]" />
                  {contact.email}
                </p>
                <p className="text-gray-700 flex items-center mt-1">
                  <Phone size={16} className="mr-2 text-[#1E40AF]" />
                  {contact.phone}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Google Map */}
      <div className="mt-12 w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d565.9863493451629!2d104.92969849675013!3d11.544271094967597!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109517a45a7bed5%3A0xd8a2ae37461e456b!2sKohthmey%20Technology%20Co%2C.Ltd!5e0!3m2!1skm!2skh!4v1756973984208!5m2!1skm!2skh"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <Separator />
      <Footer />
    </div>
  );
};

export default ContactUs;
