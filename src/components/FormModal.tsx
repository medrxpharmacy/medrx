import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, PhoneCall, ShieldAlert, Send, Mail, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { ModalState } from '../types';

interface FormModalProps {
  modalState: ModalState;
  onClose: () => void;
}

export const FormModal: React.FC<FormModalProps> = ({ modalState, onClose }) => {
  const { isOpen, type, defaultSubject } = modalState;
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailLinks, setEmailLinks] = useState({ mailtoUrl: '', gmailUrl: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    currentPharmacy: '',
    address: '',
    message: defaultSubject || '',
  });

  // Reset form data, errors, and submission state whenever modal is opened or type changes
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      setErrors({});
      setTouched({});
      setEmailLinks({ mailtoUrl: '', gmailUrl: '' });
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        currentPharmacy: '',
        address: '',
        message: defaultSubject || '',
      });
    }
  }, [isOpen, type, defaultSubject]);

  if (!isOpen || !type) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'.-]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = 'Full Name should only contain letters and spaces';
    }

    // Phone validation
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (phoneDigits.length < 10) {
      newErrors.phone = 'Enter a valid 10-digit phone (e.g. 718-584-6600)';
    }

    // Email validation (optional, but must be valid if entered)
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Delivery address validation
    if (type === 'delivery') {
      if (!formData.address.trim()) {
        newErrors.address = 'Delivery address in the Bronx is required';
      } else if (formData.address.trim().length < 5) {
        newErrors.address = 'Please enter a complete delivery address';
      }
    }

    // Transfer pharmacy validation (optional but min 3 chars if entered)
    if (type === 'transfer' && formData.currentPharmacy.trim() && formData.currentPharmacy.trim().length < 3) {
      newErrors.currentPharmacy = 'Please enter current pharmacy name or phone number';
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

    // Mark all fields as touched to show errors if invalid
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      currentPharmacy: true,
      address: true,
      message: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const requestTitle = getTitle();
    const rawSubject = `MED RX Web Request: ${requestTitle} - ${formData.fullName}`;
    const rawBody =
      `MED RX PHARMACY INQUIRY\n` +
      `==========================\n` +
      `Request Type: ${requestTitle}\n` +
      `Full Name: ${formData.fullName}\n` +
      `Phone Number: ${formData.phone}\n` +
      `Email Address: ${formData.email || 'Not provided'}\n` +
      (formData.currentPharmacy ? `Current Pharmacy & Phone: ${formData.currentPharmacy}\n` : '') +
      (formData.address ? `Delivery Address: ${formData.address}\n` : '') +
      `Additional Notes:\n${formData.message || 'None'}\n\n` +
      `Destination Email: info@harborapothecary.com`;

    const mailtoUrl = `mailto:info@harborapothecary.com?subject=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(rawBody)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@harborapothecary.com&su=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(rawBody)}`;

    setEmailLinks({ mailtoUrl, gmailUrl });

    // Send email in background via FormSubmit API
    try {
      await fetch('https://formsubmit.co/ajax/info@harborapothecary.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: rawSubject,
          requestType: requestTitle,
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email || 'Not provided',
          currentPharmacy: formData.currentPharmacy || 'N/A',
          address: formData.address || 'N/A',
          message: formData.message || 'N/A'
        })
      });
    } catch (err) {
      console.log('Background mail submission trigger:', err);
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
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    setErrors({});
    setTouched({});
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      currentPharmacy: '',
      address: '',
      message: '',
    });
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'transfer': return 'Transfer Your Prescription';
      case 'refill': return 'Request Prescription Refill';
      case 'delivery': return 'Request Free Home Delivery';
      case 'contact': return 'Contact MED RX Pharmacist';
      default: return 'Contact Us';
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case 'transfer': return 'We handle all paperwork and doctor coordination directly with your current pharmacy.';
      case 'refill': return 'Request a refill notification or follow-up from our Bronx pharmacy team.';
      case 'delivery': return 'Free home delivery available 4 days/week in the Bronx.';
      case 'contact': return 'Have a question for our licensed pharmacist? Send us a message.';
      default: return 'Our team is here to assist you.';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#16305F]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#21468C] text-white px-6 py-5 flex items-center justify-between relative">
          <div>
            <div className="font-mono text-xs font-semibold text-[#D98A4F] uppercase tracking-wider mb-1">
              MED RX PHARMACY · BRONX, NY
            </div>
            <h2 className="font-serif text-xl font-semibold text-white leading-tight">
              {getTitle()}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#16305F]">
                Request Sent to info@harborapothecary.com!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Your request details have been dispatched. If your email app did not open automatically, click one of the quick options below:
              </p>

              {/* Quick Mail Action Buttons */}
              <div className="flex flex-col items-center justify-center gap-2 pt-2">
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

              <div className="bg-[#F7F8FA] p-3.5 rounded-lg border border-slate-200 text-xs text-slate-600 font-mono space-y-1 mt-3">
                <div>Direct Phone Line: 718-584-6600</div>
                <div>Store Address: 625 E Fordham Rd, Bronx NY</div>
              </div>

              <button
                onClick={resetAndClose}
                className="mt-2 px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold rounded-lg transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 mb-2">
                {getSubtitle()}
              </p>

              {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 flex items-center gap-2 text-xs text-rose-700 font-semibold animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Please fix the highlighted errors below before submitting.</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maria Santos"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#1A2233] focus:outline-none transition-colors ${touched.fullName && errors.fullName
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500 bg-rose-50/20'
                      : 'border-slate-300 focus:ring-2 focus:ring-[#B5662A]'
                    }`}
                />
                {touched.fullName && errors.fullName && (
                  <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#1A2233] focus:outline-none transition-colors ${touched.phone && errors.phone
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
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#1A2233] focus:outline-none transition-colors ${touched.email && errors.email
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
              </div>

              {type === 'transfer' && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Current Pharmacy Name & Phone
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CVS on Grand Concourse (718-555-0100)"
                    value={formData.currentPharmacy}
                    onChange={(e) => handleChange('currentPharmacy', e.target.value)}
                    onBlur={() => handleBlur('currentPharmacy')}
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#1A2233] focus:outline-none transition-colors ${touched.currentPharmacy && errors.currentPharmacy
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500 bg-rose-50/20'
                        : 'border-slate-300 focus:ring-2 focus:ring-[#B5662A]'
                      }`}
                  />
                  {touched.currentPharmacy && errors.currentPharmacy && (
                    <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.currentPharmacy}</span>
                    </p>
                  )}
                </div>
              )}

              {type === 'delivery' && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Delivery Address in the Bronx <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 123 E 180th St, Apt 4B, Bronx, NY"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    onBlur={() => handleBlur('address')}
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#1A2233] focus:outline-none transition-colors ${touched.address && errors.address
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500 bg-rose-50/20'
                        : 'border-slate-300 focus:ring-2 focus:ring-[#B5662A]'
                      }`}
                  />
                  {touched.address && errors.address && (
                    <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.address}</span>
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Additional Notes or Questions
                </label>
                <textarea
                  rows={3}
                  placeholder="How can our pharmacist assist you today?"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#B5662A] text-sm text-[#1A2233]"
                />
              </div>

              {/* HIPAA / Health Privacy Footnote */}
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-[#B5662A] flex-shrink-0 mt-0.5" />
                <p className="leading-tight">
                  <strong className="font-semibold">Privacy Footnote:</strong> For your privacy and HIPAA compliance, please do not include medication names or protected health details in this web form. For confidential prescription requests, please call <strong>718-584-6600</strong> or fax <strong>718-584-0600</strong>.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 bg-[#B5662A] hover:bg-[#964F1C] disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
                <a
                  href="tel:7185846600"
                  className="py-3 px-4 bg-[#21468C] hover:bg-[#16305F] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span className="hidden sm:inline">Call Us Now</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
