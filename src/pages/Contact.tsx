import React, { useState } from 'react';
import { 
  Phone, Printer, Mail, MapPin, Clock, ShieldAlert, 
  Send, RefreshCw, Truck, Pill, HeartHandshake, CheckCircle2, ExternalLink, Loader2, AlertCircle 
} from 'lucide-react';
import { SectionEyebrow } from '../components/SectionEyebrow';

interface ContactProps {
  onOpenModal: (type: 'transfer' | 'refill' | 'delivery' | 'contact') => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenModal }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailLinks, setEmailLinks] = useState({ mailtoUrl: '', gmailUrl: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Your Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'.-]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name should only contain letters and spaces';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com)';
    }

    // Phone validation
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (phoneDigits.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number (e.g. 718-584-6600)';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Touch all fields to surface validation feedback
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const emailSubject = `MED RX Contact Form: ${formData.subject} - ${formData.name}`;
    const emailBody = 
      `MED RX WEBSITE CONTACT FORM SUBMISSION\n` +
      `=======================================\n` +
      `Sender Name: ${formData.name}\n` +
      `Sender Email: ${formData.email}\n` +
      `Phone Number: ${formData.phone}\n` +
      `Subject Topic: ${formData.subject}\n\n` +
      `Message Details:\n${formData.message}\n\n` +
      `Destination: medrxpharmacy@gmail.com`;

    const mailtoUrl = `mailto:medrxpharmacy@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=medrxpharmacy@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    setEmailLinks({ mailtoUrl, gmailUrl });

    // Send email in background via FormSubmit API
    try {
      await fetch('https://formsubmit.co/ajax/medrxpharmacy@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: emailSubject,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        })
      });
    } catch (err) {
      console.log('FormSubmit API trigger:', err);
    }

    // Directly open/redirect to Gmail Web Compose
    try {
      const opened = window.open(gmailUrl, '_blank');
      if (!opened) {
        window.location.href = gmailUrl;
      }
    } catch (err) {
      window.location.href = gmailUrl;
    }

    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  const handleSendAnother = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Question',
      message: '',
    });
    setErrors({});
    setTouched({});
    setFormSubmitted(false);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Contact Banner */}
      <section className="bg-[#16305F] text-white py-16 border-b-4 border-[#B5662A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-block px-3 py-1 bg-[#D98A4F]/20 text-[#D98A4F] font-mono text-xs font-semibold rounded uppercase tracking-wider">
            GET IN TOUCH
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            Contact MED RX PHARMACY
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            We are located at 625 E Fordham Road in the Bronx. Stop by, give us a call, or submit a message below.
          </p>
        </div>
      </section>

      {/* Quick Action Button Row (Prompt Requirement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
          <SectionEyebrow>QUICK ACTION BUTTONS</SectionEyebrow>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:7185846600"
              className="px-4 py-2.5 bg-[#21468C] hover:bg-[#16305F] text-white text-xs sm:text-sm font-semibold rounded-md transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D98A4F]" />
              <span>Call Us (718-584-6600)</span>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=medrxpharmacy@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#16305F] hover:bg-[#21468C] text-white text-xs sm:text-sm font-semibold rounded-md transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#D98A4F]" />
              <span>Email Us (Gmail)</span>
            </a>
            <a
              href="https://maps.google.com/?q=625+E+Fordham+Rd+Bronx+NY+10458"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-md border border-slate-300 transition-colors flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#B5662A]" />
              <span>Get Directions</span>
            </a>
            <button
              onClick={() => onOpenModal('transfer')}
              className="px-4 py-2.5 bg-[#B5662A] hover:bg-[#964F1C] text-white text-xs sm:text-sm font-semibold rounded-md transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Transfer Prescription</span>
            </button>
            <button
              onClick={() => onOpenModal('refill')}
              className="px-4 py-2.5 bg-[#F7F8FA] hover:bg-slate-200 text-[#21468C] text-xs sm:text-sm font-semibold rounded-md border border-slate-300 transition-colors flex items-center gap-2"
            >
              <Pill className="w-4 h-4" />
              <span>Refill Prescription</span>
            </button>
            <button
              onClick={() => onOpenModal('delivery')}
              className="px-4 py-2.5 bg-[#F7F8FA] hover:bg-slate-200 text-[#21468C] text-xs sm:text-sm font-semibold rounded-md border border-slate-300 transition-colors flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Request Delivery</span>
            </button>
            <button
              onClick={() => onOpenModal('contact')}
              className="px-4 py-2.5 bg-[#21468C] text-white text-xs sm:text-sm font-semibold rounded-md transition-colors flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Contact Pharmacist</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Details Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Direct Phone Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-2xl text-[#16305F]">
                Pharmacy Contact Info
              </h2>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B5662A] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#16305F]">Store Address:</strong>
                    <span>625 E Fordham Road, Bronx, NY 10458</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#B5662A] flex-shrink-0" />
                  <div>
                    <strong className="block text-[#16305F]">Phone Number:</strong>
                    <a href="tel:7185846600" className="font-mono font-bold text-[#21468C] text-base hover:underline">
                      718-584-6600
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Printer className="w-5 h-5 text-[#B5662A] flex-shrink-0" />
                  <div>
                    <strong className="block text-[#16305F]">Fax Number:</strong>
                    <span className="font-mono font-semibold">718-584-0600</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#B5662A] flex-shrink-0" />
                  <div>
                    <strong className="block text-[#16305F]">Email Address:</strong>
                    <a 
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=medrxpharmacy@gmail.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:underline font-mono text-xs text-[#21468C] font-semibold flex items-center gap-1"
                    >
                      <span>medrxpharmacy@gmail.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Hours Card (IBM Plex Mono) */}
            <div className="bg-[#16305F] text-white p-6 rounded-2xl border border-[#21468C] shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#D98A4F]" />
                <h3 className="font-serif font-bold text-xl text-white">Store Hours</h3>
              </div>

              <div className="bg-[#21468C]/60 p-4 rounded-lg font-mono text-sm space-y-2 border border-white/10">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="font-semibold text-white">Monday – Friday:</span>
                  <span className="text-[#D98A4F] font-bold">9:30 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span>Saturday:</span>
                  <span className="text-slate-400">Closed</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sunday:</span>
                  <span className="text-slate-400">Closed</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-mono pt-1">
                Walk-ins welcomed during open store hours.
              </p>
            </div>

          </div>

          {/* Right Contact Form Column */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
            <h2 className="font-serif font-bold text-2xl text-[#16305F] mb-1">
              Send Us a Message
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Have a question about store hours, OTC availability, or pharmacy services? Fill out the form below.
            </p>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#16305F]">
                  Message Sent to medrxpharmacy@gmail.com!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for reaching out to MED RX PHARMACY. Your request has been dispatched. If your email app did not open automatically, click one of the quick options below:
                </p>

                {/* Quick Mail Action Buttons */}
                <div className="flex flex-col items-center justify-center gap-3 py-2">
                  <a
                    href={emailLinks.gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#EA4335] hover:bg-[#c53929] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Open & Send in Gmail directly</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <button
                  onClick={handleSendAnother}
                  className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit} 
                className="space-y-4"
              >
                {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
                  <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 flex items-center gap-2 text-xs text-rose-700 font-semibold animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>Please fix the highlighted errors below before submitting.</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Your Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Juan Rodriguez"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#1A2233] focus:outline-none transition-colors ${
                      touched.name && errors.name
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500 bg-rose-50/20'
                        : 'border-slate-300 focus:ring-2 focus:ring-[#B5662A]'
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="juan@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#1A2233] focus:outline-none transition-colors ${
                        touched.email && errors.email
                          ? 'border-rose-500 focus:ring-2 focus:ring-rose-500 bg-rose-50/20'
                          : 'border-slate-300 focus:ring-2 focus:ring-[#B5662A]'
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                      Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="718-555-0199"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#1A2233] focus:outline-none transition-colors ${
                        touched.phone && errors.phone
                          ? 'border-rose-500 focus:ring-2 focus:ring-rose-500 bg-rose-50/20'
                          : 'border-slate-300 focus:ring-2 focus:ring-[#B5662A]'
                      }`}
                    />
                    {touched.phone && errors.phone && (
                      <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#B5662A] text-sm text-[#1A2233]"
                  >
                    <option value="General Question">General Question</option>
                    <option value="Store Hours & Directions">Store Hours & Directions</option>
                    <option value="Free Delivery Info">Free Delivery Info</option>
                    <option value="OTC Availability">OTC Item Availability</option>
                    <option value="Pharmacist Consultation">Pharmacist Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Message <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can MED RX PHARMACY assist you today?"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#1A2233] focus:outline-none transition-colors ${
                      touched.message && errors.message
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500 bg-rose-50/20'
                        : 'border-slate-300 focus:ring-2 focus:ring-[#B5662A]'
                    }`}
                  />
                  {touched.message && errors.message && (
                    <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* HIPAA Privacy Footnote */}
                <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-[#B5662A] flex-shrink-0 mt-0.5" />
                  <p className="leading-tight">
                    <strong className="font-semibold">Privacy Footnote:</strong> For your privacy and HIPAA compliance, do not collect or submit medication names or protected health details in any web form — route anything involving protected health info to phone (<strong>718-584-6600</strong>) or fax (<strong>718-584-0600</strong>).
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#B5662A] hover:bg-[#964F1C] disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Embedded Google Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <SectionEyebrow>OUR LOCATION</SectionEyebrow>
          <a
            href="https://maps.google.com/?q=625+E+Fordham+Rd+Bronx+NY+10458"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#21468C] hover:underline font-semibold"
          >
            Open in Google Maps →
          </a>
        </div>

        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-md overflow-hidden h-[400px]">
          <iframe
            title="MED RX PHARMACY Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.59247348918!2d-73.89312952345802!3d40.85878432857731!2m3!1f0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f4625b01ff21%3A0x6b45a0b73c2670e1!2s625%20E%20Fordham%20Rd%2C%20Bronx%2C%20NY%2010458!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '0.75rem' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};
