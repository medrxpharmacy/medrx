import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Printer, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenModal: (type: 'transfer' | 'refill' | 'delivery' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="bg-[#16305F] text-white border-t-4 border-[#B5662A] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">

          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <Logo variant="dark" />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your trusted, personal neighborhood pharmacy in the Bronx. Providing dependable prescription services, medication consultations, and free home delivery.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#D98A4F]">
              <ShieldCheck className="w-4 h-4" />
              <span>Licensed NY Pharmacy · Neighborhood Care</span>
            </div>
          </div>

          {/* Column 2: Quick Links & Actions */}
          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-lg text-white border-b border-[#B5662A] pb-2 inline-block">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm text-slate-300 font-medium">
              <li>
                <Link to="/" className="hover:text-[#D98A4F] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D98A4F] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#D98A4F] transition-colors">Pharmacy Services</Link>
              </li>
              <li>
                <button onClick={() => onOpenModal('transfer')} className="hover:text-[#D98A4F] text-left transition-colors">
                  Transfer Prescription
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('refill')} className="hover:text-[#D98A4F] text-left transition-colors">
                  Refill Prescription
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('delivery')} className="hover:text-[#D98A4F] text-left transition-colors">
                  Request Free Home Delivery
                </button>
              </li>
              <li>
                <Link to="/resources" className="hover:text-[#D98A4F] transition-colors">Patient Resources</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#D98A4F] transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D98A4F] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-lg text-white border-b border-[#B5662A] pb-2 inline-block">
              Pharmacy Details
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D98A4F] flex-shrink-0 mt-1" />
                <span>625 E Fordham Road<br />Bronx, NY 10458</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D98A4F] flex-shrink-0" />
                <a href="tel:7185846600" className="hover:text-white font-mono font-semibold text-[#D98A4F]">
                  718-584-6600
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Printer className="w-4 h-4 text-[#D98A4F] flex-shrink-0" />
                <span className="font-mono text-xs">Fax: 718-584-0600</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D98A4F] flex-shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=medrxpharmacy@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-xs break-all font-mono text-[#D98A4F]"
                >
                  medrxpharmacy@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Store Hours Table (IBM Plex Mono) */}
          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-lg text-white border-b border-[#B5662A] pb-2 inline-block">
              Store Hours
            </h3>
            <div className="bg-[#21468C]/50 p-4 rounded-lg border border-white/10 font-mono text-xs text-slate-200">
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="font-semibold text-white">Mon – Fri:</span>
                <span className="text-[#D98A4F] font-bold">9:30 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span>Saturday:</span>
                <span className="text-slate-400">Closed</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Sunday:</span>
                <span className="text-slate-400">Closed</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Free Home Delivery: 4 Days / Week in Bronx, NY.
            </p>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} MED RX PHARMACY. All rights reserved. 625 E Fordham Rd, Bronx, NY 10458.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-4">
              <Link to="/resources" className="hover:text-slate-200">HIPAA & Privacy</Link>
              <span>·</span>
              <Link to="/contact" className="hover:text-slate-200">Location Map</Link>
            </div>
            <span className="hidden sm:inline text-white/20">·</span>
            <a
              href="https://www.instagram.com/staffarc?igsh=NGI1ajBjank5aWF3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              Developed by <span className="text-[#D98A4F] font-semibold hover:text-white transition-colors">Staffarc</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
