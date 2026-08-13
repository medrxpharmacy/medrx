import React from 'react';
import { 
  Pill, RefreshCw, Truck, HeartHandshake, CalendarCheck, ShieldCheck, 
  Clock, FileCheck, Package, ShoppingBag, DollarSign
} from 'lucide-react';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { RxLabelCard } from '../components/RxLabelCard';

interface ServicesProps {
  onOpenModal: (type: 'transfer' | 'refill' | 'delivery' | 'contact') => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenModal }) => {
  const confirmedServices = [
    {
      id: 'refills',
      title: 'Prescription Refills',
      subtitle: 'Fast & Convenient',
      desc: 'Never worry about missing a refill. Call, send a request, or speak with our staff to have your maintenance prescriptions filled quickly.',
      benefits: [
        'Quick turnaround times',
        'Automatic refill reminder calls/texts',
        'Direct doctor authorization follow-up',
      ],
      cta: 'Refill Your Prescription',
      action: () => onOpenModal('refill'),
      icon: Pill,
    },
    {
      id: 'transfers',
      title: 'Prescription Transfers',
      subtitle: 'We Handle Everything',
      desc: 'Switching to MED RX PHARMACY is effortless. Provide us with your current pharmacy name or prescription numbers, and our staff handles all the details.',
      benefits: [
        'Zero phone calls required on your end',
        'Direct transfer coordination with doctor & old pharmacy',
        'Complimentary consultation upon first pickup',
      ],
      cta: 'Transfer Prescription',
      action: () => onOpenModal('transfer'),
      icon: RefreshCw,
    },
    {
      id: 'fast-filling',
      title: 'Fast Prescription Filling',
      subtitle: 'Minimal Waiting',
      desc: 'We understand your time is valuable. Bring in your paper or electronic prescription, and our experienced team prepares your medication with speed and precision.',
      benefits: [
        'Short wait times inside store',
        'Real-time prescription verification',
        'Walk-in orders completed promptly',
      ],
      cta: 'Contact Pharmacy',
      action: () => onOpenModal('contact'),
      icon: Clock,
    },
    {
      id: 'delivery',
      title: 'Free Home Delivery',
      subtitle: '4 Days / Week in Bronx',
      desc: 'We deliver your medications directly to your home address across Bronx neighborhoods 4 days every week, ensuring safe and reliable access.',
      benefits: [
        'Free service for Bronx neighborhood residents',
        'Secure, discreet packaging',
        'Convenient scheduling for seniors & homebound patients',
      ],
      cta: 'Request Free Delivery',
      action: () => onOpenModal('delivery'),
      icon: Truck,
    },
    {
      id: 'sync',
      title: 'Medication Synchronization',
      subtitle: 'Single Monthly Pickup',
      desc: 'Consolidate all of your recurring monthly medications so they refill on the exact same date each month, saving you multiple trips to the pharmacy.',
      benefits: [
        'One trip per month for all medications',
        'Reduces missed doses and prescription gaps',
        'Monthly review of all active prescriptions',
      ],
      cta: 'Learn About Med Sync',
      action: () => onOpenModal('contact'),
      icon: CalendarCheck,
    },
    {
      id: 'reminders',
      title: 'Refill Reminders',
      subtitle: 'Never Run Out',
      desc: 'Stay on track with your health regimen. Our system sends helpful notifications before your medication runs out so you always order on time.',
      benefits: [
        'Phone call or text message reminders',
        'Proactive coordination with prescribing physicians',
        'Peace of mind for family caregivers',
      ],
      cta: 'Setup Reminders',
      action: () => onOpenModal('contact'),
      icon: FileCheck,
    },
    {
      id: 'counseling',
      title: 'Medication Counseling',
      subtitle: '1-on-1 Consultation',
      desc: 'Our licensed pharmacists provide comprehensive 1-on-1 counseling to explain proper medication dosage, potential drug interactions, and storage guidelines.',
      benefits: [
        'Private consultation with licensed pharmacist',
        'Answers to side-effect questions',
        'Clear, senior-friendly medication instructions',
      ],
      cta: 'Talk to a Pharmacist',
      action: () => onOpenModal('contact'),
      icon: HeartHandshake,
    },
    {
      id: 'prior-auth',
      title: 'Prior Authorization Support',
      subtitle: 'Insurance Navigation',
      desc: 'If your insurance requires prior approval for a prescription, our team works directly with your doctor and insurance provider to help get it authorized.',
      benefits: [
        'Direct doctor office communication',
        'Facilitates required insurance documentation',
        'Minimizes delay in starting necessary treatment',
      ],
      cta: 'Ask About Coverage',
      action: () => onOpenModal('contact'),
      icon: ShieldCheck,
    },
    {
      id: 'blister-packs',
      title: 'Blister Packaging & Pill Organizers',
      subtitle: 'Simplified Dosing',
      desc: 'Custom multi-dose blister packs (bubble packs) organize your daily medications by day and time, making it effortless to follow complex medication routines.',
      benefits: [
        'Color-coded morning/afternoon/evening slots',
        'Greatly reduces dosing errors',
        'Ideal for seniors and family caregivers',
      ],
      cta: 'Request Blister Packs',
      action: () => onOpenModal('contact'),
      icon: Package,
    },
    {
      id: 'special-orders',
      title: 'Special Medication Orders',
      subtitle: 'Hard-To-Find Rx',
      desc: 'If you need a specialized or hard-to-find medication that isn’t typically stocked on standard shelves, we can special order it quickly through our supply network.',
      benefits: [
        'Fast turnaround on special orders',
        'Sourced from licensed USA wholesalers',
        'Notification as soon as item arrives',
      ],
      cta: 'Order Special Rx',
      action: () => onOpenModal('contact'),
      icon: ShoppingBag,
    },
    {
      id: 'insurance-savings',
      title: 'Insurance & Savings Assistance',
      subtitle: 'Maximum Affordable Value',
      desc: 'We accept most major insurance plans. Contact us to confirm your specific plan. For cash-paying or underinsured patients, we offer competitive cash pricing.',
      benefits: [
        'Safe compliance: "We accept most major insurance plans. Contact us to confirm your specific plan."',
        'Competitive cash pricing for un-insured meds',
        'Coordination with discount program coupons',
      ],
      cta: 'Check Insurance Plan',
      action: () => onOpenModal('contact'),
      icon: DollarSign,
    },
  ];

  const otcCategories = [
    'Pain Relief & Fever Reducers',
    'Cold, Flu & Allergy Support',
    'Digestive & Stomach Health',
    'Vitamins & Daily Supplements',
    'First Aid & Bandages',
    'Personal Care & Hygiene',
    'Oral Health & Dental Care',
    'Skin Care & Topical Creams',
    'Family & Household Health',
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Services Banner */}
      <section className="bg-[#16305F] text-white py-16 border-b-4 border-[#B5662A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-block px-3 py-1 bg-[#D98A4F]/20 text-[#D98A4F] font-mono text-xs font-semibold rounded uppercase tracking-wider">
            PHARMACY SERVICES
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            Confirmed Pharmacy Services
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Every service below is active and available at MED RX PHARMACY on East Fordham Road, Bronx, NY.
          </p>
        </div>
      </section>

      {/* Quick Anchors Navigation */}
      <div className="sticky top-20 z-30 bg-white border-b border-slate-200 shadow-sm py-3 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-mono whitespace-nowrap">
          <span className="text-slate-500 font-bold uppercase mr-2">Jump to:</span>
          {confirmedServices.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1 bg-[#F7F8FA] hover:bg-[#21468C] text-slate-700 hover:text-white rounded transition-colors"
            >
              {s.title}
            </a>
          ))}
          <a
            href="#otc"
            className="px-3 py-1 bg-[#B5662A]/10 text-[#B5662A] hover:bg-[#B5662A] hover:text-white rounded font-bold transition-colors"
          >
            OTC Products
          </a>
        </div>
      </div>

      {/* Confirmed Services Label Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {confirmedServices.map((service) => (
            <div key={service.id} id={service.id} className="scroll-mt-36">
              <RxLabelCard
                title={service.title}
                subtitle={service.subtitle}
                description={service.desc}
                benefits={service.benefits}
                icon={service.icon}
                actionText={service.cta}
                onAction={service.action}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Over-the-Counter (OTC) Products Section */}
      <section id="otc" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-36">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-lg space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <SectionEyebrow>OVER-THE-COUNTER PRODUCTS</SectionEyebrow>
              <h2 className="font-serif font-bold text-3xl text-[#16305F] mt-1">
                OTC Health & Wellness Essentials
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Our shelves are stocked with trusted brand name and high-value generic health products.
              </p>
            </div>
            <button
              onClick={() => onOpenModal('contact')}
              className="px-5 py-2.5 bg-[#21468C] hover:bg-[#16305F] text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              Inquire About OTC Items
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otcCategories.map((cat, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-lg bg-[#F7F8FA] border border-slate-200 flex items-center gap-3 hover:border-[#B5662A] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#B5662A]/10 text-[#B5662A] flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <span className="font-semibold text-slate-800 text-sm">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Statement Box (Strict Wording Enforced) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16305F] text-white rounded-2xl p-8 border-l-8 border-[#B5662A] flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-serif font-bold text-2xl text-white">
              Insurance Coverage Statement
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed font-sans">
              "We accept most major insurance plans. Contact us to confirm your specific plan."
            </p>
          </div>
          <a
            href="tel:7185846600"
            className="px-6 py-3 bg-[#B5662A] hover:bg-[#964F1C] text-white font-mono text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Call to Verify: 718-584-6600
          </a>
        </div>
      </section>
    </div>
  );
};
