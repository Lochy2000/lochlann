import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
  Navigate,
  useLocation
} from "react-router-dom";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import UpgradedHome from "@/pages/UpgradedHome";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import Resume from "@/pages/Resume";
import CV from "@/pages/CV";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DarkModeToggle from "@/components/layout/DarkModeToggle";
import { ThemeProvider } from "@/components/ThemeProvider";

// Component to handle scroll to top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout component that includes header and footer
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <DarkModeToggle />
    </div>
  );
};

// Download page layout without header/footer
const DownloadLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<UpgradedHome />} />
        <Route path="about" element={<About />} />
        <Route path="experience" element={<Experience />} />
        <Route path="portfolio" element={<Portfolio showAll={true} />} />
        <Route path="contact" element={<Contact />} />
        <Route path="resume" element={<Resume />} />
        <Route path="blog" element={<Navigate to="/blog/" />} />
        <Route path="blog/*" element={<Navigate to="/blog/" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/download" element={<DownloadLayout />}>
        <Route path="cv" element={<CV />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
