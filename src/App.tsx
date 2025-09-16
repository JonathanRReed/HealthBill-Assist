import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SkipLinks } from "@/components/SkipLinks";
import { DisclaimerBanner, DisclaimerModal } from "@/components/DisclaimerBanner";

// Code-split routes for faster initial paint
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Features = lazy(() => import("./pages/Features"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const HealthBridge = lazy(() => import("./pages/HealthBridge"));
const Comparison = lazy(() => import("./pages/Comparison"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Plan = lazy(() => import("./pages/Plan"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Enhanced loading component with better accessibility
const LoadingFallback = () => (
  <div className="container mx-auto px-4 py-12 text-center">
    <div 
      className="inline-flex items-center gap-2 text-text-secondary"
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
    >
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-gold border-t-transparent"></div>
      <span>Loading…</span>
    </div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SkipLinks />
        <DisclaimerModal />
        <DisclaimerBanner />
        <Toaster />
        <Sonner />
        {/* Use Vite's BASE_URL so routes work on GitHub Pages project URLs */}
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/health-bridge" element={<HealthBridge />} />
                <Route path="/comparison" element={<Comparison />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/legal" element={<Legal />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
