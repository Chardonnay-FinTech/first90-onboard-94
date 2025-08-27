import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AppLayout } from "./layout/AppLayout";
import { SplashScreen } from "./SplashScreen";
import { TermsModal } from "./TermsModal";
import { ClientProfileForm } from "./ClientProfileForm";
import Dashboard from "../pages/Dashboard";
import ClientManagement from "../pages/ClientManagement";
import Households from "../pages/Households";
import HouseholdDetail from "../pages/HouseholdDetail";
import Documents from "../pages/Documents";
import Messages from "../pages/Messages";
import Settings from "../pages/Settings";
import Meetings from "../pages/Meetings";

type UserRole = 'advisor' | 'assistant' | 'client';

export const MainApp = () => {
  const [currentUser, setCurrentUser] = useState<UserRole | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Check if user has previously accepted terms
  useEffect(() => {
    const accepted = localStorage.getItem('termsAccepted');
    if (accepted === 'true') {
      setTermsAccepted(true);
    }
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    setCurrentUser(role);
    
    // For clients, show terms modal first
    if (role === 'client' && !termsAccepted) {
      setShowTerms(true);
    }
  };

  const handleTermsAccept = () => {
    setTermsAccepted(true);
    localStorage.setItem('termsAccepted', 'true');
    setShowTerms(false);
  };

  const handleTermsDecline = () => {
    setShowTerms(false);
    setCurrentUser(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setTermsAccepted(false);
    localStorage.removeItem('termsAccepted');
  };

  // Show splash screen if no user is selected
  if (!currentUser) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <SplashScreen onRoleSelect={handleRoleSelect} />
      </ThemeProvider>
    );
  }

  // Show terms modal for clients who haven't accepted
  if (currentUser === 'client' && !termsAccepted) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <SplashScreen onRoleSelect={handleRoleSelect} />
        <TermsModal 
          isOpen={showTerms}
          onAccept={handleTermsAccept}
          onDecline={handleTermsDecline}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AppLayout userRole={currentUser} onLogout={handleLogout}>
        <Routes>
          {/* Common routes for all roles */}
          <Route path="/" element={<Navigate to={currentUser === 'client' ? '/client-dashboard' : '/dashboard'} replace />} />
          
          {/* Advisor and Assistant routes */}
          {(currentUser === 'advisor' || currentUser === 'assistant') && (
            <>
              <Route path="/dashboard" element={<Dashboard userRole={currentUser} />} />
              <Route path="/clients" element={<ClientManagement />} />
              <Route path="/households" element={<Households />} />
              <Route path="/household-detail" element={<HouseholdDetail />} />
              <Route path="/household/:householdId" element={<HouseholdDetail />} />
              <Route path="/documents" element={<Documents userRole={currentUser} />} />
              <Route path="/messages" element={<Messages userRole={currentUser} />} />
              <Route path="/meetings" element={<Meetings userRole={currentUser} />} />
              <Route path="/settings" element={<Settings userRole={currentUser} />} />
              <Route path="/client-profile/:id?" element={<ClientProfileForm userRole={currentUser} />} />
            </>
          )}
          
          {/* Client-specific routes */}
          {currentUser === 'client' && (
            <>
              <Route path="/client-dashboard" element={<Dashboard userRole={currentUser} />} />
              <Route path="/client-profile" element={<ClientProfileForm userRole={currentUser} />} />
              <Route path="/client-documents" element={<Documents userRole={currentUser} />} />
              <Route path="/client-messages" element={<Messages userRole={currentUser} />} />
              <Route path="/client-settings" element={<Settings userRole={currentUser} />} />
            </>
          )}
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to={currentUser === 'client' ? '/client-dashboard' : '/dashboard'} replace />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
};