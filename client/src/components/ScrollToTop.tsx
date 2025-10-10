import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Temporarily disable smooth scroll behavior
    const htmlElement = document.documentElement;
    const originalScrollBehavior = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    
    // Immediate scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Use requestAnimationFrame to ensure scroll happens after render
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Restore original scroll behavior after scrolling
      setTimeout(() => {
        htmlElement.style.scrollBehavior = originalScrollBehavior;
      }, 100);
    });
  }, [location]);

  return null;
}

