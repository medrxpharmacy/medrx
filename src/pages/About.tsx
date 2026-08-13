import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartHandshake, MapPin, Phone, ShieldCheck, 
  Truck, Clock, UserCheck, CheckCircle2, Sparkles, Pill, RefreshCw
} from 'lucide-react';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { RxLabelCard } from '../components/RxLabelCard';

interface AboutProps {
  onOpenModal: (type: 'transfer' | 'refill' | 'delivery' | 'contact') => void;
}

export const About: React.FC<AboutProps> = ({ onOpenModal }) => {
  const whyChooseItems = [
    {
      title: 'Fast & Friendly Service',
      desc: 'Prompt prescription filling by attentive local staff who value your time.',
      icon: Clock,
    },
    {
      title: 'Free Home Delivery',
      desc: 'Convenient medication delivery to your doorstep 4 days a week in the Bronx.',
      icon: Truck,
    },
    {
      title: 'Most Insurance Accepted',
      desc: 'We work with most major insurance plans to make your medications affordable.',
      icon: ShieldCheck,
    },
    {
      title: 'Hassle-Free Transfers',
      desc: 'We handle all doctor and prior pharmacy contact to switch your prescriptions easily.',
      icon: RefreshCw,
    },
    {
      title: 'Competitive Cash Pricing',
      desc: 'Fair, transparent pricing for un-insured or under-insured medications.',
      icon: Sparkles,
    },
    {
      title: 'Personalized Med Support',
      desc: 'Tailored guidance so you understand dosage, schedule, and proper storage.',
      icon: HeartHandshake,
    },
    {
      title: 'Licensed Pharmacist Care',
      desc: 'Direct access to experienced pharmacists ready to answer your questions.',
      icon: UserCheck,
    },
    {
      title: 'Senior-Friendly Services',
      desc: 'Easy-to-read labels, blister packaging options, and clear patient guidance.',
      icon: Pill,
    },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Header Banner */}
      <section className="bg-[#16305F] text-white py-16 border-b-4 border-[#B5662A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center max-w-3xl">
          <div className="inline-block px-3 py-1 bg-[#D98A4F]/20 text-[#D98A4F] font-mono text-xs font-semibold rounded uppercase tracking-wider">
            ABOUT MED RX PHARMACY
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            Your Neighborhood Bronx Pharmacy
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            A neighborhood-focused community pharmacy serving the Bronx with prescription services, personalized assistance, and dependable medication care.
          </p>
        </div>
      </section>

      {/* Mission & Story Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SectionEyebrow>OUR MISSION</SectionEyebrow>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#16305F]">
              Dedicated to Building Lasting Community Relationships
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              At <strong className="font-semibold text-[#16305F]">MED RX PHARMACY</strong>, our mission is to provide convenient, affordable, and personalized pharmacy care while building lasting relationships with the community we serve in the Bronx.
            </p>
            <p className="text-slate-700 text-base leading-relaxed">
              We believe that receiving healthcare should be simple, respectful, and compassionate. Unlike giant chain store pharmacies where you are treated as a transaction, our licensed pharmacists take the time to know you by name, understand your health history, and answer all your questions with genuine care.
            </p>

            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#21468C] font-semibold text-sm">
                <MapPin className="w-4 h-4 text-[#B5662A]" />
                <span>625 E Fordham Road, Bronx, NY 10458</span>
              </div>
              <div className="text-xs text-slate-600 font-mono">
                Phone: 718-584-6600 · Fax: 718-584-0600 · Email: medrxpharmacy@gmail.com
              </div>
            </div>
          </div>

          {/* Right Image / Card Callout (Navy Theme) */}
          <div className="bg-[#16305F] text-white p-8 rounded-2xl border-2 border-[#B5662A] shadow-lg space-y-6">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <img 
                src="/logo.png" 
                alt="MED RX PHARMACY Logo" 
                className="w-14 h-14 object-contain flex-shrink-0" 
              />
              <div>
                <h3 className="font-serif font-bold text-xl text-white">Why Neighborhood Care Matters</h3>
                <span className="text-xs text-[#D98A4F] font-mono">Licensed & Independent Pharmacy</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D98A4F] flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">No Long Lines:</strong> Quick prescription filling with minimal waiting room time.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D98A4F] flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Multilingual Staff:</strong> Clear instructions and consultation provided in your preferred language.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D98A4F] flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Doctor Coordination:</strong> Direct line with local Bronx physicians to resolve refills and prior authorizations.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D98A4F] flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Senior Support:</strong> Clear print labels, blister packaging, and medication synchronization.</span>
              </li>
            </ul>

            <button
              onClick={() => onOpenModal('contact')}
              className="w-full py-3.5 bg-[#B5662A] hover:bg-[#964F1C] text-white font-semibold text-sm rounded-lg transition-colors shadow-md"
            >
              Speak With Our Pharmacist
            </button>
          </div>
        </div>
      </section>

      {/* Repeat Why Choose MED RX (Signature Rx Label Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <SectionEyebrow>OUR COMMITMENT TO YOU</SectionEyebrow>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#16305F]">
            Why Choose MED RX PHARMACY?
          </h2>
          <p className="text-slate-600 text-base">
            Every service we offer is designed to give you peace of mind and accessible care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseItems.map((item, index) => (
            <RxLabelCard
              key={index}
              title={item.title}
              description={item.desc}
              icon={item.icon}
              badgeText="Rx"
            />
          ))}
        </div>
      </section>

      {/* Community Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F8FA] border-2 border-dashed border-[#B5662A]/40 rounded-2xl p-8 text-center space-y-4">
          <h3 className="font-serif font-bold text-2xl text-[#16305F]">
            Visit Us Today on Fordham Road
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            Walk-ins are always welcome! Stop by 625 E Fordham Rd, Bronx, NY 10458 during our store hours (Mon–Fri 9:30 AM–7:00 PM) or call 718-584-6600.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onOpenModal('transfer')}
              className="px-6 py-2.5 bg-[#B5662A] text-white font-semibold text-sm rounded-lg hover:bg-[#964F1C] transition-colors"
            >
              Transfer Your Prescriptions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
