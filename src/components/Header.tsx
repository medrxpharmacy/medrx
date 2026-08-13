import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Clock, MapPin, Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenModal: (type: 'transfer' | 'refill' | 'delivery' | 'contact') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Resources', path: '/resources' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-[#21468C] border-b-4 border-[#B5662A] shadow-md">
      {/* Top Utility Bar (Deep Navy Bar) */}
      <div className="bg-[#16305F] text-white text-xs py-2 px-4 font-mono border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-[#D98A4F]" />
              <span>Mon–Fri 9:30 AM–7:00 PM · Sat–Sun Closed</span>
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#D98A4F]" />
              <span>625 E Fordham Rd, Bronx, NY 10458</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a 
              href="tel:7185846600" 
              className="flex items-center gap-1.5 text-[#D98A4F] hover:text-white font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>718-584-6600</span>
            </a>
            <span className="text-white/30">·</span>
            <span className="text-slate-300">Fax: 718-584-0600</span>
          </div>
        </div>
      </div>

      {/* Main Navbar (Navy Theme) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" onClick={closeMobileMenu} className="flex items-center">
            <Logo variant="dark" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-md text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-white bg-[#16305F] border-b-2 border-[#D98A4F] shadow-inner'
                      : 'text-white/90 hover:text-[#D98A4F] hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenModal('refill')}
              className="px-4 py-2 text-sm font-semibold text-[#D98A4F] hover:text-white hover:bg-white/10 border border-[#D98A4F]/60 rounded-md transition-all"
            >
              Refill Rx
            </button>
            <button
              onClick={() => onOpenModal('transfer')}
              className="px-5 py-2.5 bg-[#B5662A] hover:bg-[#964F1C] text-white text-sm font-semibold rounded-md shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <span>Transfer Prescription</span>
              <ArrowRight className="w-4 h-4 text-[#D98A4F]" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenModal('transfer')}
              className="px-3 py-1.5 bg-[#B5662A] text-white text-xs font-semibold rounded shadow"
            >
              Transfer Rx
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D98A4F]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Navy Deep Theme) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#16305F] border-t border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#21468C] text-white border-l-4 border-[#D98A4F]'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                closeMobileMenu();
                onOpenModal('transfer');
              }}
              className="w-full py-3 bg-[#B5662A] hover:bg-[#964F1C] text-white font-semibold rounded-md text-center shadow"
            >
              Transfer Prescription
            </button>
            <button
              onClick={() => {
                closeMobileMenu();
                onOpenModal('delivery');
              }}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-md text-center border border-white/20 text-sm"
            >
              Request Free Delivery
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
