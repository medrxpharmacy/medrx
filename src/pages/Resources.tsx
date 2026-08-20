import React from 'react';
import { ExternalLink, ShieldAlert, HelpCircle, PhoneCall } from 'lucide-react';
import { SectionEyebrow } from '../components/SectionEyebrow';

interface ResourcesProps {
  onOpenModal: (type: 'transfer' | 'refill' | 'delivery' | 'contact') => void;
}

export const Resources: React.FC<ResourcesProps> = ({ onOpenModal }) => {
  const externalResources = [
    {
      title: 'Search Drugs',
      provider: 'Epocrates Medical Database',
      desc: 'Look up prescription and OTC drug information, dosing recommendations, and potential interaction guidelines.',
      url: 'https://www.epocrates.com/online/drugs',
      badge: 'Epocrates Link',
    },
    {
      title: 'Search Diseases & Conditions',
      provider: 'Epocrates Clinical Guidance',
      desc: 'Browse evidence-based summaries of medical conditions, symptoms, and standard therapeutic treatments.',
      url: 'https://www.epocrates.com/online/diseases',
      badge: 'Epocrates Link',
    },
    {
      title: 'Pill Identification Tool',
      provider: 'Drugs.com Pill Identifier',
      desc: 'Identify unknown pills by imprint, color, shape, or drug name using the comprehensive Drugs.com database.',
      url: 'https://www.drugs.com/imprints.php',
      badge: 'Drugs.com Tool',
    },
  ];

  const faqs = [
    {
      q: 'How do I transfer my prescription to MED RX PHARMACY?',
      a: 'Transferring is quick and simple! You can call us at 718-584-6600 or click "Transfer Prescription" on our website. Give us your name, phone number, and current pharmacy details. Our team handles the rest.',
    },
    {
      q: 'How does free home delivery work in the Bronx?',
      a: 'We offer free home delivery 4 days a week for Bronx residents. When your doctor sends us a prescription or when you order a refill, ask for free delivery and we will schedule your drop-off.',
    },
    {
      q: 'Do you accept my health insurance plan?',
      a: 'We accept most major insurance plans. Because plans frequently update, please call 718-584-6600 or stop by 625 E Fordham Rd to verify your specific insurance coverage.',
    },
    {
      q: 'What if I do not have prescription insurance?',
      a: 'MED RX PHARMACY offers competitive cash pricing for uninsured or under-insured medications so you can afford your essential prescriptions.',
    },
    {
      q: 'Can I speak directly to a pharmacist about my side effects?',
      a: 'Yes! Our licensed pharmacists are available in-person at 625 E Fordham Rd or by phone at 718-584-6600 to answer all your medication questions.',
    },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Resources Banner */}
      <section className="bg-[#16305F] text-white py-16 border-b-4 border-[#B5662A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-3 py-1 bg-[#D98A4F]/20 text-[#D98A4F] font-mono text-xs font-semibold rounded uppercase tracking-wider">
              PATIENT RESOURCES
            </div>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
              Medication & Health Knowledge
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Access trusted clinical databases, drug search tools, pill identifiers, and answers to common pharmacy questions.
            </p>
          </div>
        </div>
      </section>

      {/* Prominent Medical Advice Disclaimer Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 flex items-start gap-4 shadow-sm">
          <ShieldAlert className="w-8 h-8 text-[#B5662A] flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-amber-950">
              Important Medical Disclaimer
            </h3>
            <p className="text-amber-900 text-sm leading-relaxed">
              These resources are provided for informational purposes only and should not replace professional medical advice. Patients should speak with a healthcare professional regarding medication or health concerns.
            </p>
          </div>
        </div>
      </section>

      {/* External Clinical Links Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <SectionEyebrow>EXTERNAL VERIFIED TOOLS</SectionEyebrow>
          <h2 className="font-serif font-bold text-3xl text-[#16305F]">
            Drug & Medical Information Search
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {externalResources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#B5662A] bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                    {res.badge}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="font-serif font-semibold text-xl text-[#16305F]">
                  {res.title}
                </h3>
                <div className="text-xs text-slate-500 font-medium">
                  Provided by {res.provider}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {res.desc}
                </p>
              </div>

              <div className="pt-6">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#21468C] hover:bg-[#16305F] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Open Tool</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Patient FAQs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <SectionEyebrow>FREQUENTLY ASKED QUESTIONS</SectionEyebrow>
          <h2 className="font-serif font-bold text-3xl text-[#16305F]">
            Answers to Common Patient Questions
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#B5662A] flex-shrink-0 mt-1" />
                <h3 className="font-serif font-semibold text-lg text-[#16305F]">
                  {faq.q}
                </h3>
              </div>
              <p className="text-slate-700 text-sm pl-8 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pharmacist Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16305F] text-white rounded-2xl p-8 text-center space-y-4">
          <h3 className="font-serif font-bold text-2xl text-white">
            Have a Specific Question About Your Medication?
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Our licensed pharmacists are here to assist you in person or over the phone during normal business hours.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onOpenModal('contact')}
              className="px-6 py-3 bg-[#B5662A] hover:bg-[#964F1C] text-white font-semibold text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Our Pharmacist</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
