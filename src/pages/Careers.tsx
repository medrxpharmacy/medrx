import React, { useState } from 'react';
import { 
  Briefcase, GraduationCap, HeartHandshake, Clock, ShieldCheck, 
  MapPin, CheckCircle2, Send, AlertCircle, Loader2, ExternalLink, Mail, UserCheck, Sparkles, ChevronDown, ChevronUp 
} from 'lucide-react';
import { SectionEyebrow } from '../components/SectionEyebrow';

interface JobPosting {
  id: string;
  title: string;
  type: string;
  location: string;
  experience: string;
  shortDesc: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

interface CareersProps {
  onOpenModal?: (type: 'transfer' | 'refill' | 'delivery' | 'contact') => void;
}

export const Careers: React.FC<CareersProps> = ({ onOpenModal }) => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<string | null>('pharmacist');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailLinks, setEmailLinks] = useState({ mailtoUrl: '', gmailUrl: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: 'Staff Pharmacist (PharmD)',
    experienceYears: '1-3 years',
    bilingual: 'Yes (English & Spanish)',
    coverNote: '',
  });

  const jobPostings: JobPosting[] = [
    {
      id: 'pharmacist',
      title: 'Staff Pharmacist (PharmD)',
      type: 'Full-Time',
      location: '625 E Fordham Rd, Bronx NY',
      experience: '1+ Years Required (NY Licensed)',
      shortDesc: 'Oversee daily prescription dispensing, deliver personalized patient consultations, and supervise pharmacy technicians.',
      responsibilities: [
        'Perform accurate final verification of prescription orders and drug interactions.',
        'Provide one-on-one patient counseling on dosage, side effects, and adherence.',
        'Collaborate with healthcare providers and physician offices regarding prescription clarification.',
        'Supervise and mentor registered pharmacy technicians and counter staff.',
        'Ensure compliance with all NY State Board of Pharmacy and DEA regulations.'
      ],
      requirements: [
        'Active New York State Pharmacist License & Registration in good standing.',
        'Doctor of Pharmacy (PharmD) degree from an accredited institution.',
        'Strong interpersonal communication skills and passion for community care.',
        'Bilingual proficiency in Spanish and English highly preferred.'
      ],
      benefits: [
        'Competitive Salary with annual review',
        'No weekend shifts (Mon–Fri 9:30 AM – 7:00 PM)',
        'Paid Time Off (PTO) & Paid Holidays',
        'Continuing Education (CE) stipend'
      ]
    },
    {
      id: 'technician',
      title: 'Lead Pharmacy Technician (CPhT)',
      type: 'Full-Time / Part-Time',
      location: '625 E Fordham Rd, Bronx NY',
      experience: '2+ Years Required',
      shortDesc: 'Assist pharmacists with prescription intake, computer entry, insurance adjudication, and inventory replenishment.',
      responsibilities: [
        'Process patient prescriptions efficiently using specialized pharmacy software.',
        'Adjudicate third-party insurance claims and resolve prior authorization alerts.',
        'Assist patients at the prescription pick-up counter with friendly, respectful care.',
        'Manage inventory ordering, stock rotation, and return processing.'
      ],
      requirements: [
        'PTCB or NHA Certified Pharmacy Technician (CPhT) preferred.',
        'Minimum 2 years of retail community pharmacy experience.',
        'Strong knowledge of pharmacy software and insurance billing procedures.',
        'Fluency in Spanish and English strongly preferred.'
      ],
      benefits: [
        'Competitive hourly wage based on experience',
        'Paid training and certification support',
        'Employee medication and store discounts',
        'Predictable weekday schedule'
      ]
    },
    {
      id: 'clerk',
      title: 'Bilingual Pharmacy Counter Associate',
      type: 'Full-Time / Part-Time',
      location: '625 E Fordham Rd, Bronx NY',
      experience: 'Entry Level to 1 Year',
      shortDesc: 'Greet Fordham Road neighbors, manage point-of-sale transactions, and assist with OTC product guidance.',
      responsibilities: [
        'Provide warm, welcoming customer service to patients visiting our Fordham Road pharmacy.',
        'Operate POS cash register system for OTC and prescription copay payments.',
        'Stock OTC shelves, maintain clean store displays, and monitor inventory tags.',
        'Answer incoming phone inquiries and route clinical calls to licensed staff.'
      ],
      requirements: [
        'Fluent in Spanish and English (required to serve our local Bronx community).',
        'High school diploma or GED equivalent.',
        'Positive attitude, strong organizational skills, and reliability.',
        'Prior customer service or retail experience is a plus.'
      ],
      benefits: [
        'Flexible shifts during open store hours',
        'Friendly, supportive team environment',
        'On-the-job pharmacy clerk training',
        'Paid time off for full-time employees'
      ]
    },
    {
      id: 'courier',
      title: 'Prescription Delivery Courier',
      type: 'Part-Time (4 Days / Week)',
      location: 'Bronx, NY Coverage Area',
      experience: 'Valid Driver\'s License Required',
      shortDesc: 'Safely transport prescription medications directly to senior citizens and homebound patients across the Bronx.',
      responsibilities: [
        'Execute daily delivery routes to deliver medications safely and punctually.',
        'Obtain required patient signatures and confirm receipt for controlled deliveries.',
        'Maintain strict confidentiality and HIPAA compliance during deliveries.',
        'Report delivery statuses and route updates to pharmacy management.'
      ],
      requirements: [
        'Valid, clean New York State Driver\'s License.',
        'Punctual, dependable, and respectful demeanor with senior patients.',
        'Familiarity with Bronx neighborhoods and navigation apps.',
        'Ability to pass a background check and drug screen.'
      ],
      benefits: [
        'Reliable part-time weekday schedule',
        'Company vehicle or mileage reimbursement provided',
        'Meaningful community work helping local seniors'
      ]
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (phoneDigits.length < 10) {
      newErrors.phone = 'Enter a valid 10-digit phone (e.g. 718-555-0199)';
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

  const handleApplyClick = (jobTitle: string) => {
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    const formElement = document.getElementById('career-application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      position: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const emailSubject = `MED RX Career Application: ${formData.position} - ${formData.fullName}`;
    const emailBody = 
      `MED RX PHARMACY JOB APPLICATION\n` +
      `===============================\n` +
      `Applicant Name: ${formData.fullName}\n` +
      `Applied Position: ${formData.position}\n` +
      `Email Address: ${formData.email}\n` +
      `Phone Number: ${formData.phone}\n` +
      `Pharmacy Experience: ${formData.experienceYears}\n` +
      `Bilingual (English/Spanish): ${formData.bilingual}\n\n` +
      `Applicant Summary & Qualifications:\n` +
      `${formData.coverNote || 'None provided'}\n\n` +
      `Destination: medrxpharmacy@gmail.com`;

    const mailtoUrl = `mailto:medrxpharmacy@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=medrxpharmacy@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    setEmailLinks({ mailtoUrl, gmailUrl });

    // Submit in background via FormSubmit API
    try {
      await fetch('https://formsubmit.co/ajax/medrxpharmacy@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: emailSubject,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          experience: formData.experienceYears,
          bilingual: formData.bilingual,
          summary: formData.coverNote
        })
      });
    } catch (err) {
      console.log('Background mail dispatch:', err);
    }

    // Direct open Gmail Compose
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
      fullName: '',
      email: '',
      phone: '',
      position: 'Staff Pharmacist (PharmD)',
      experienceYears: '1-3 years',
      bilingual: 'Yes (English & Spanish)',
      coverNote: '',
    });
    setErrors({});
    setTouched({});
    setFormSubmitted(false);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-[#16305F] text-white py-16 border-b-4 border-[#B5662A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-block px-3 py-1 bg-[#D98A4F]/20 text-[#D98A4F] font-mono text-xs font-semibold rounded uppercase tracking-wider">
            CAREERS AT MED RX PHARMACY
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            Join Our Neighborhood Pharmacy Team
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Serve the Bronx community with dedication, competitive compensation, and a supportive, weekday-focused work environment.
          </p>
        </div>
      </section>

      {/* Why Work With Us Badges Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>WHY WORK AT MED RX</SectionEyebrow>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <Clock className="w-8 h-8 text-[#B5662A]" />
            <h3 className="font-serif font-bold text-lg text-[#16305F]">No Weekend Hours</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Enjoy your weekends! We are open Monday through Friday 9:30 AM to 7:00 PM and closed on Saturdays and Sundays.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <HeartHandshake className="w-8 h-8 text-[#21468C]" />
            <h3 className="font-serif font-bold text-lg text-[#16305F]">Community Impact</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Make a meaningful difference in the lives of local Bronx families, senior residents, and long-time neighborhood regulars.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#B5662A]" />
            <h3 className="font-serif font-bold text-lg text-[#16305F]">Competitive Pay</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Fair, competitive compensation based on experience with annual performance reviews and paid time off benefits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <UserCheck className="w-8 h-8 text-[#21468C]" />
            <h3 className="font-serif font-bold text-lg text-[#16305F]">Bilingual Culture</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              We take pride in our welcoming, English and Spanish bilingual workplace serving the Fordham Road community.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions Accordion/List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <SectionEyebrow>CURRENT OPENINGS</SectionEyebrow>
            <h2 className="font-serif font-bold text-3xl text-[#16305F]">
              Available Positions in Bronx, NY
            </h2>
          </div>
          <div className="text-xs font-mono text-[#21468C] bg-[#21468C]/10 px-3 py-1.5 rounded-md font-semibold self-start">
            Location: 625 E Fordham Rd
          </div>
        </div>

        <div className="space-y-4">
          {jobPostings.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div 
                key={job.id} 
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all"
              >
                {/* Job Card Header */}
                <div 
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                  onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-[#B5662A]/10 text-[#B5662A] text-xs font-mono font-semibold rounded uppercase">
                        {job.type}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {job.experience}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-[#16305F]">
                      {job.title}
                    </h3>
                    <p className="text-slate-600 text-sm max-w-2xl">
                      {job.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-start md:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyClick(job.title);
                      }}
                      className="px-5 py-2 bg-[#B5662A] hover:bg-[#964F1C] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Apply Now</span>
                    </button>
                    <button 
                      className="p-2 text-slate-400 hover:text-slate-700 transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Job Card Details (Expanded Body) */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-[#F7F8FA] space-y-4 text-xs text-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div>
                        <h4 className="font-semibold text-[#16305F] uppercase tracking-wider mb-2">
                          Key Responsibilities:
                        </h4>
                        <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                          {job.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#16305F] uppercase tracking-wider mb-2">
                          Requirements & Qualifications:
                        </h4>
                        <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                          {job.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
                      <div className="flex items-center gap-2 text-slate-500 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-[#B5662A]" />
                        <span>{job.location}</span>
                      </div>
                      <button
                        onClick={() => handleApplyClick(job.title)}
                        className="px-4 py-2 bg-[#21468C] hover:bg-[#16305F] text-white text-xs font-semibold rounded-md transition-colors"
                      >
                        Submit Application for {job.title} →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Application Form Section */}
      <section id="career-application-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
          <div className="mb-6 space-y-1">
            <SectionEyebrow>SUBMIT APPLICATION</SectionEyebrow>
            <h2 className="font-serif font-bold text-2xl text-[#16305F]">
              Apply for a Career at MED RX
            </h2>
            <p className="text-slate-600 text-sm">
              Fill out the form below to apply. Your application details will be sent directly to <span className="font-semibold text-[#21468C]">medrxpharmacy@gmail.com</span>.
            </p>
          </div>

          {formSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#16305F]">
                Application Dispatched to medrxpharmacy@gmail.com!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you for applying to join the MED RX PHARMACY team. If Gmail did not open automatically, click the button below:
              </p>

              <div className="flex flex-col items-center justify-center gap-3 py-2">
                <a
                  href={emailLinks.gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#EA4335] hover:bg-[#c53929] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Mail className="w-5 h-5" />
                  <span>Open & Send in Gmail directly</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <button
                onClick={handleSendAnother}
                className="mt-2 px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold rounded-lg transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 flex items-center gap-2 text-xs text-rose-700 font-semibold">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Please correct the errors in the form before submitting.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Position Applied For <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#B5662A] text-sm text-[#1A2233]"
                  >
                    <option value="Staff Pharmacist (PharmD)">Staff Pharmacist (PharmD)</option>
                    <option value="Lead Pharmacy Technician (CPhT)">Lead Pharmacy Technician (CPhT)</option>
                    <option value="Bilingual Pharmacy Counter Associate">Bilingual Pharmacy Counter Associate</option>
                    <option value="Prescription Delivery Courier">Prescription Delivery Courier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Your Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Carlos Rivera"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#1A2233] focus:outline-none transition-colors ${
                      touched.fullName && errors.fullName
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="carlos@example.com"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Pharmacy Experience
                  </label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => handleChange('experienceYears', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#B5662A] text-sm text-[#1A2233]"
                  >
                    <option value="No experience (Entry Level)">No experience (Entry Level)</option>
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Bilingual in Spanish & English?
                  </label>
                  <select
                    value={formData.bilingual}
                    onChange={(e) => handleChange('bilingual', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#B5662A] text-sm text-[#1A2233]"
                  >
                    <option value="Yes (Fluent English & Spanish)">Yes (Fluent English & Spanish)</option>
                    <option value="Conversational Spanish">Conversational Spanish</option>
                    <option value="English Only">English Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Brief Summary of Experience / Cover Note
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your background, certifications (e.g. PharmD, CPhT), and why you would be a great fit for MED RX PHARMACY..."
                  value={formData.coverNote}
                  onChange={(e) => handleChange('coverNote', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#B5662A] text-sm text-[#1A2233]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#B5662A] hover:bg-[#964F1C] disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application via Gmail</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;
