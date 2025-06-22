import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Resume from "./pages/Resume";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Networking from "./pages/Networking";
import Settings from "./pages/Settings";
import GenerateCoverLetter from "./pages/GenerateCoverLetter";
import JobSearchAnalytics from "./pages/JobSearchAnalytics";
import NotFound from "./pages/NotFound";
import AuthLayout from "@/layouts/AuthLayout";


// Create QueryClient outside component to prevent recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<AuthLayout> <Login /> </AuthLayout>} />
            <Route path="/signup" element={<AuthLayout> <SignUp /> </AuthLayout>} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/generate-cover-letter"
              element={<GenerateCoverLetter />}
            />
            <Route path="/analytics" element={<JobSearchAnalytics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
