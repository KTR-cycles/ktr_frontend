import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactButtons from "@/components/StickyContactButtons";
import LoadingSpinner from "@/components/LoadingSpinner";
import Router from "@/components/Router";
import ErrorFallback from "@/components/ErrorFallback";
import ScrollToTop from "@/components/ScrollToTop";


function AppContent() {

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
      <StickyContactButtons />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <AppContent />
              <Toaster />
            </TooltipProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
