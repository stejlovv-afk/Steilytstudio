import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Advantages } from './components/Advantages';
import { Portfolio } from './components/Portfolio';
import { Workflow } from './components/Workflow';
import { InteractiveCalculator } from './components/InteractiveCalculator';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { PrivacyModal, LegalDocTab } from './components/PrivacyModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';

function AppContent() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalDocTab>('privacy');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('Telegram Mini App (TMA)');
  const [calculatedEstimate, setCalculatedEstimate] = useState<string | undefined>(undefined);
  const [calculationSummary, setCalculationSummary] = useState<string | undefined>(undefined);

  const handleOpenLegal = (tab: LegalDocTab = 'privacy') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const handleOpenCalculator = () => {
    const calcSection = document.getElementById('calculator');
    calcSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToCases = () => {
    const portfolioSection = document.getElementById('portfolio');
    portfolioSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectService = (serviceType: 'tma' | 'web') => {
    setSelectedServiceType(
      serviceType === 'tma' ? 'Telegram Mini App (TMA)' : 'Корпоративный сайт'
    );
    handleOpenContact();
  };

  const handleApplyEstimate = (data: { projectType: string; summary: string; estimatedPrice: string }) => {
    setSelectedServiceType(data.projectType);
    setCalculatedEstimate(data.estimatedPrice);
    setCalculationSummary(data.summary);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1D] text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* Scroll Progress Bar at top */}
      <ScrollProgressBar />

      {/* Header with Theme Toggle */}
      <Header 
        onOpenCalculator={handleOpenCalculator} 
        onOpenContact={handleOpenContact} 
      />

      {/* Main Sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero 
          onOpenCalculator={handleOpenCalculator} 
          onScrollToCases={handleScrollToCases} 
        />

        {/* Section 2: Services */}
        <Services onSelectService={handleSelectService} />

        {/* Section 3: Advantages */}
        <Advantages onOpenCalculator={handleOpenCalculator} />

        {/* Section 4: Interactive Portfolio with Live Case Test-Drive */}
        <Portfolio onOpenCalculator={handleOpenCalculator} />

        {/* Dynamic Cost Calculator */}
        <InteractiveCalculator onApplyEstimate={handleApplyEstimate} />

        {/* Section 5: Workflow */}
        <Workflow />

        {/* Section 6: Contact Form */}
        <ContactForm 
          initialProjectType={selectedServiceType}
          initialEstimate={calculatedEstimate}
          initialSummary={calculationSummary}
          onOpenLegal={handleOpenLegal}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenPrivacy={() => handleOpenLegal('privacy')} 
        onOpenTerms={() => handleOpenLegal('terms')}
      />

      {/* Legal & Privacy Policy Modal with 3 documents */}
      <PrivacyModal 
        isOpen={legalModalOpen} 
        onClose={() => setLegalModalOpen(false)} 
        initialTab={legalTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
