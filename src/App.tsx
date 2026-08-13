import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FormModal } from './components/FormModal';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Resources } from './pages/Resources';
import { Contact } from './pages/Contact';
import { ModalState, ModalType } from './types';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
  });

  const handleOpenModal = (type: ModalType, defaultSubject?: string) => {
    setModalState({
      isOpen: true,
      type,
      defaultSubject,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      type: null,
    });
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-paper text-ink font-sans">
        <Header onOpenModal={(t) => handleOpenModal(t)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenModal={(t) => handleOpenModal(t)} />} />
            <Route path="/about" element={<About onOpenModal={(t) => handleOpenModal(t)} />} />
            <Route path="/services" element={<Services onOpenModal={(t) => handleOpenModal(t)} />} />
            <Route path="/resources" element={<Resources onOpenModal={(t) => handleOpenModal(t)} />} />
            <Route path="/contact" element={<Contact onOpenModal={(t) => handleOpenModal(t)} />} />
            <Route path="*" element={<Home onOpenModal={(t) => handleOpenModal(t)} />} />
          </Routes>
        </main>

        <Footer onOpenModal={(t) => handleOpenModal(t)} />

        {/* Global Action Modal */}
        <FormModal modalState={modalState} onClose={handleCloseModal} />
      </div>
    </Router>
  );
};

export default App;
