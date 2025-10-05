import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "react-error-boundary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactButtons from "@/components/StickyContactButtons";
import LoadingSpinner from "@/components/LoadingSpinner";
import NotFound from "@/pages/not-found";

const Home = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Oops! Something went wrong</h2>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover-elevate active-elevate-2 transition-all"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
              <Suspense fallback={<LoadingSpinner />}>
                <Router />
              </Suspense>
            </main>
            <Footer />
            <StickyContactButtons />
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
