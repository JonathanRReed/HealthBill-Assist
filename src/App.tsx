import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Code-split routes for faster initial paint
const Index = lazy(() => import("./pages/Index"));
const BillBridge = lazy(() => import("./pages/BillBridge"));
const Comparison = lazy(() => import("./pages/Comparison"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Plan = lazy(() => import("./pages/Plan"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="container mx-auto px-4 py-12 text-text-secondary">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bill-bridge" element={<BillBridge />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/legal" element={<Legal />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
