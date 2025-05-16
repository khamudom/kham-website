import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AppProvider } from "./context/AppContext";
import styles from "./styles/App.module.css";

// Lazy load pages
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Work = React.lazy(() => import("./pages/Work"));
const Contact = React.lazy(() => import("./pages/Contact"));
const ProjectDetail = React.lazy(() => import("./pages/ProjectDetail"));

// Loading fallback
const LoadingFallback = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.loadingSpinner}></div>
  </div>
);

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AppProvider>
      <Router future={{ v7_relativeSplatPath: true }}>
        <div className={styles.appContainer}>
          <ScrollToTop />
          <Header />
          <Suspense fallback={<LoadingFallback />}>
            <main className={styles.mainContent}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
              </Routes>
            </main>
          </Suspense>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
