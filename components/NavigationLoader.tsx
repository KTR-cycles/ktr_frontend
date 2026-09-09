"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

function NavigationLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [initialLoading, setInitialLoading] = useState(true);
  const [navLoading, setNavLoading] = useState(false);

  // Initial page load animation timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Route change reset
  useEffect(() => {
    setNavLoading(false);
  }, [pathname, searchParams]);

  // Click listener for link navigation
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.href) {
        try {
          const targetUrl = new URL(anchor.href, window.location.href);
          if (
            targetUrl.origin === window.location.origin &&
            (targetUrl.pathname !== window.location.pathname || targetUrl.search !== window.location.search) &&
            !anchor.target &&
            !anchor.getAttribute("href")?.startsWith("#") &&
            !event.ctrlKey &&
            !event.metaKey
          ) {
            setNavLoading(true);
          }
        } catch {
          // Ignore invalid URLs
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  if (!initialLoading && !navLoading) return null;

  return <LoadingSpinner />;
}

export default function NavigationLoader() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavigationLoaderContent />
    </Suspense>
  );
}
