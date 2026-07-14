'use client'
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Form Submission
    setTimeout(() => {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
          
          {/* Column 1: Info Sidebar (Rentigo Branded Accent) */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Background design accents similar to your hero section styling */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-blue-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            
            <div>
              <span className="text-blue-500 font-bold tracking-wider uppercase text-xs">Get In Touch</span>
              <h2 className="text-3xl font-extrabold mt-2 tracking-tight"> Let's Start a Conversation </h2>
              <p className="mt-4 text-slate-400 leading-relaxed text-[15px]">
                Have questions about our eco-friendly fleet, customizable booking terms, or premium insurance coverages? Drop us a line.
              </p>

              {/* Direct Info Blocks */}
              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 rounded-xl text-blue-500 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Call Us</p>
                    <p className="text-base font-bold text-white mt-0.5">+1 (555) 234-5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 rounded-xl text-blue-500 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Email Support</p>
                    <p className="text-base font-bold text-white mt-0.5">support@rentigo.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 rounded-xl text-blue-500 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Main Hub</p>
                    <p className="text-base font-bold text-white mt-0.5">Uttara, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Schedule Card */}
            <div className="mt-12 pt-6 border-t border-slate-800 flex items-center gap-3 text-slate-450 text-xs">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Our support team operates 24/7 for active rentals.</span>
            </div>
          </div>

          {/* Column 2: Modern Form Wrapper */}
          <div className="lg:col-span-7 p-8 sm:p-12 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name Input */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900 font-medium text-sm"
                  />
                </div>

                {/* Email Address Input */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900 font-medium text-sm"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div className="flex flex-col">
                <label htmlFor="subject" className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Booking inquiry, Fleet question, etc."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900 font-medium text-sm"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col">
                <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900 font-medium text-sm resize-none"
                />
              </div>

              {/* CTA Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-sm disabled:bg-blue-400 group"
              >
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;