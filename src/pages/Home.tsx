import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Phone, Clock, ShieldCheck, Truck, RefreshCw, 
  UserCheck, Pill, CalendarCheck, HeartHandshake, FileCheck, 
  ShoppingBag, Sparkles, MapPin, CheckCircle
} from 'lucide-react';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { RxLabelCard } from '../components/RxLabelCard';
import { TrustBar } from '../components/TrustBar';

interface HomeProps {
  onOpenModal: (type: 'transfer' | 'refill' | 'delivery' | 'contact') => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenModal }) => {
  // Why Choose Us label cards (12 confirmed features)
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
    {
      title: 'Refill Reminders',
      desc: 'Automated calls or text notifications so you never run out of critical meds.',
      icon: CalendarCheck,
    },
    {
      title: 'Medication Synchronization',
      desc: 'Consolidate your monthly prescription refills into a single convenient pickup day.',
      icon: FileCheck,
    },
    {
      title: 'Special Medication Orders',
      desc: 'Quick procurement for hard-to-find or specialized prescription items.',
      icon: ShoppingBag,
    },
    {
      title: 'Bronx Neighborhood Care',
      desc: 'Deep commitment to our Fordham Road community with multilingual staff.',
      icon: MapPin,
    },
  ];

  const featuredServices = [
    {
      title: 'Prescription Refills',
      subtitle: 'Fast & Accurate',
      desc: 'Quick turnaround on all ongoing maintenance medications with reminder support.',
      modal: 'refill' as const,
      icon: Pill,
    },
    {
      title: 'Prescription Transfers',
      subtitle: 'Zero Stress',
      desc: 'Switch to MED RX PHARMACY in minutes. We take care of contacting your old pharmacy.',
      modal: 'transfer' as const,
      icon: RefreshCw,
    },
    {
      title: 'Free Home Delivery',
      subtitle: '4 Days / Week in Bronx',
      desc: 'Reliable doorstep delivery so you never have to worry about transportation or weather.',
      modal: 'delivery' as const,
      icon: Truck,
    },
    {
      title: 'Medication Counseling',
      subtitle: '1-on-1 Consultations',
      desc: 'Speak directly with our licensed pharmacist about drug interactions and side effects.',
      modal: 'contact' as const,
      icon: HeartHandshake,
    },
    {
      title: 'Medication Synchronization',
      subtitle: 'Single Pickup Date',
      desc: 'Sync all your recurring monthly prescriptions to refill on the exact same calendar day.',
      modal: 'contact' as const,
      icon: CalendarCheck,
    },
    {
      title: 'Insurance & Savings',
      subtitle: 'Maximum Value',
      desc: 'We accept most major plans and assist with prior authorizations and copay savings.',
      modal: 'contact' as const,
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Split Hero Section */}
      <section className="relative bg-gradient-to-b from-white via-paper to-paper overflow-hidden pt-8 pb-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <SectionEyebrow>Trusted Bronx Pharmacy</SectionEyebrow>

              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#16305F] tracking-tight leading-[1.15]">
                Your Health. <br />
                <span className="text-[#21468C]">Our Priority.</span>
              </h1>

              <p className="text-lg text-slate-700 leading-relaxed max-w-2xl font-normal">
                From prescriptions and medication counseling to convenient free home delivery and easy transfers, <strong className="font-semibold text-[#16305F]">MED RX PHARMACY</strong> provides personalized pharmacy care designed around you.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenModal('transfer')}
                  className="px-7 py-3.5 bg-[#B5662A] hover:bg-[#964F1C] text-white font-semibold text-base rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Transfer Prescription</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <Link
                  to="/contact"
                  className="px-6 py-3.5 border-2 border-[#21468C] text-[#21468C] hover:bg-[#21468C] hover:text-white font-semibold text-base rounded-lg transition-all"
                >
                  Contact Us
                </Link>
                
                <a
                  href="https://maps.google.com/?q=625+E+Fordham+Rd+Bronx+NY+10458"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg transition-colors hidden sm:inline-flex items-center gap-1.5"
                >
                  <MapPin className="w-4 h-4 text-[#B5662A]" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Trust Strip */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B5662A]" />
                  <span>Mon–Fri 9:30 AM–7:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#B5662A]" />
                  <span className="font-semibold text-[#21468C]">718-584-6600</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B5662A]" />
                  <span>Most Insurance Accepted</span>
                </div>
              </div>
            </motion.div>

            {/* Right Graphic / Motif Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Radial Backdrop Motif */}
                <div className="absolute inset-0 bg-radial-hero rounded-3xl transform rotate-3 scale-105" />
                
                {/* Hero Showcase Card (Navy Theme) */}
                <div className="relative bg-[#16305F] text-white rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#B5662A] space-y-6">
                  {/* Pharmacy Circular Emblem Badge */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src="/logo.png" 
                        alt="MED RX PHARMACY Logo" 
                        className="w-14 h-14 object-contain flex-shrink-0" 
                      />
                      <div>
                        <div className="font-serif font-bold text-lg text-white">
                          MED RX PHARMACY
                        </div>
                        <div className="text-xs text-[#D98A4F] font-mono">
                          625 E Fordham Rd · Bronx, NY
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Open Mon–Fri
                    </span>
                  </div>

                  {/* Highlights list inside badge card */}
                  <div className="space-y-3 font-sans text-sm text-slate-200">
                    <div className="p-3.5 rounded-lg bg-[#21468C]/70 border-l-4 border-[#B5662A] border border-white/10 flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#D98A4F] flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Free Bronx Home Delivery</div>
                        <div className="text-xs text-slate-300">4 days a week directly to your door</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#21468C]/70 border-l-4 border-[#D98A4F] border border-white/10 flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 text-[#D98A4F] flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Easy 1-Step Transfers</div>
                        <div className="text-xs text-slate-300">Just give us your info — we do the rest</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#21468C]/70 border-l-4 border-[#B5662A] border border-white/10 flex items-center gap-3">
                      <HeartHandshake className="w-5 h-5 text-[#D98A4F] flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Multilingual Pharmacist Staff</div>
                        <div className="text-xs text-slate-300">Personalized consultation in your language</div>
                      </div>
                    </div>
                  </div>

                  {/* Fast Call Button */}
                  <a
                    href="tel:7185846600"
                    className="w-full py-3.5 bg-[#B5662A] hover:bg-[#964F1C] text-white font-mono text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Phone className="w-4 h-4 text-white" />
                    <span>Call Pharmacist: 718-584-6600</span>
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Quick Highlight Icon Bar */}
      <TrustBar />

      {/* Why Choose Us Section (Label-Card Grid Signature) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <SectionEyebrow>WHY CHOOSE MED RX</SectionEyebrow>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#16305F]">
            Dedicated Neighborhood Pharmacy Care
          </h2>
          <p className="text-slate-600 text-base">
            We combine high-touch personal service with fast, accurate prescription handling so you get the attentive care you deserve.
          </p>
        </div>

        {/* 12 Label Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <RxLabelCard
                title={item.title}
                description={item.desc}
                icon={item.icon}
                badgeText="Rx"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <SectionEyebrow>PHARMACY SERVICES</SectionEyebrow>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#16305F]">
                Comprehensive Care Services
              </h2>
            </div>
            <Link
              to="/services"
              className="text-[#21468C] hover:text-[#B5662A] font-semibold text-sm flex items-center gap-1 transition-colors"
            >
              <span>View All Confirmed Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((srv, idx) => (
              <RxLabelCard
                key={idx}
                title={srv.title}
                subtitle={srv.subtitle}
                description={srv.desc}
                icon={srv.icon}
                actionText="Request Service"
                onAction={() => onOpenModal(srv.modal)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Transfer CTA Band (Copper Accent Theme) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#B5662A] text-white rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-white/20 rounded font-mono text-xs font-semibold uppercase tracking-wider text-white">
              EASY 1-STEP PROCESS
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white leading-tight">
              Ready to Switch Pharmacies?
            </h2>
            <p className="text-white/90 text-base leading-relaxed">
              Transfer your prescriptions to MED RX PHARMACY today. Our team can help make the process simple and hassle-free — no complicated forms required.
            </p>
          </div>
          <button
            onClick={() => onOpenModal('transfer')}
            className="px-8 py-4 bg-[#16305F] hover:bg-[#21468C] text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all whitespace-nowrap flex items-center gap-2.5"
          >
            <span>Transfer My Prescription</span>
            <ArrowRight className="w-5 h-5 text-[#D98A4F]" />
          </button>
        </div>
      </section>

      {/* Delivery CTA Band (Navy Theme) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16305F] text-white rounded-2xl p-8 sm:p-12 shadow-xl border border-[#21468C] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-[#D98A4F]/20 text-[#D98A4F] rounded font-mono text-xs font-semibold uppercase tracking-wider">
              FREE BRONX DELIVERY
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white leading-tight">
              Stay Home. We'll Bring Your Medication to You.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              We offer free home delivery 4 days a week across Bronx neighborhood locations so you never have to miss a dose.
            </p>
          </div>
          <button
            onClick={() => onOpenModal('delivery')}
            className="px-8 py-4 bg-[#B5662A] hover:bg-[#964F1C] text-white font-semibold text-base rounded-lg shadow-lg transition-all whitespace-nowrap flex items-center gap-2.5"
          >
            <span>Learn About Delivery</span>
            <Truck className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Community Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <SectionEyebrow>OUR BRONX COMMUNITY</SectionEyebrow>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#16305F]">
            More Than a Pharmacy — We're Part of Your Community
          </h2>
          <p className="text-slate-600 text-base">
            Located on East Fordham Road, we take pride in building genuine relationships with our patients and local families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-[#21468C]/10 text-[#21468C] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-semibold text-xl text-[#16305F]">Personalized Care</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              You are never just a prescription number. Our pharmacists get to know your personal health needs and preferences.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-[#B5662A]/10 text-[#B5662A] flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-semibold text-xl text-[#16305F]">Reliable Service</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dependable filling, clear instructions, and proactive refill management so your health management is effortless.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-[#21468C]/10 text-[#21468C] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-semibold text-xl text-[#16305F]">Convenient Access</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Convenient Fordham Road location, fast walk-in service, phone consultations, and free neighborhood home delivery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
