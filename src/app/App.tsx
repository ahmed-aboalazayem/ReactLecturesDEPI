import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from "react-router";
import { Dashboard } from "../pages/Dashboard";
import { LearnedDashboard } from "../pages/LearnedDashboard";
import { LecturePage } from "../pages/LecturePage";
import { Footer } from "../components/Footer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Sun, Moon, GraduationCap, Lightbulb } from "lucide-react";

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  
  const [completedLectures, setCompletedLectures] = useLocalStorage("completedLectures", []);
  const [completedLearned, setCompletedLearned] = useLocalStorage("completedLearned", []);
  const [lectureNotes, setLectureNotes] = useLocalStorage("lectureNotes", {});
  const [isDark, setIsDark] = useLocalStorage("themeMode", true);


  // Apply dark mode class to html tag based on state
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDocumentTheme = () => {
    setIsDark(!isDark);
  };

  const toggleLectureComplete = (id: string) => {
    setCompletedLectures((prev: string[]) => {
      const current = Array.isArray(prev) ? prev : [];
      const isCurrentlyCompleted = current.includes(id);
      if (isCurrentlyCompleted) {
        return current.filter((lId) => lId !== id);
      } else {
        return [...current, id];
      }
    });
  };

  const toggleLearnedComplete = (id: string) => {
    setCompletedLearned((prev: string[]) => {
      const current = Array.isArray(prev) ? prev : [];
      const isCurrentlyCompleted = current.includes(id);
      if (isCurrentlyCompleted) {
        return current.filter((lId) => lId !== id);
      } else {
        return [...current, id];
      }
    });
  };

  const overrideUpdateLectureNotes = (id: string, notes: string) => {
    setLectureNotes((prev: Record<string, string>) => ({ 
      ...(typeof prev === 'object' && prev !== null ? prev : {}), 
      [id]: notes 
    }));
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-transparent text-foreground transition-colors duration-300 flex flex-col font-sans pt-16">
        <header className="border-b border-border bg-card/80 backdrop-blur-xl fixed top-0 left-0 right-0 z-10 shadow-sm transition-colors duration-300 h-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-inner">
                DL
              </div>
              <span className="font-bold text-xl tracking-tight">DEPI Lectures Hub</span>
            </Link>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <nav className="flex items-center gap-1 sm:gap-2">
                <NavLink
                  to="/"
                  className={({ isActive }: { isActive: boolean }) => 
                    `flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-300 text-sm font-medium ${
                      isActive 
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`
                  }
                  data-tooltip="Official structured curriculum from the program"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="hidden sm:inline">Curriculum</span>
                </NavLink>

                <NavLink
                  to="/learned"
                  className={({ isActive }: { isActive: boolean }) => 
                    `flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-300 text-sm font-medium ${
                      isActive 
                        ? "bg-accent/10 text-accent border border-accent/20 shadow-sm" 
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`
                  }
                  data-tooltip="Personal study materials beyond the curriculum, shared for learning"
                >
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <span className="hidden sm:inline">Beyond Curriculum</span>
                </NavLink>
              </nav>

              <button 
                type="button"
                onClick={toggleDocumentTheme}
                className="p-2 rounded-full hover:bg-secondary transition-colors focus:ring-2 focus:ring-primary outline-none flex items-center justify-center shrink-0"
                title="Toggle Theme"
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="text-foreground w-5 h-5" />
                ) : (
                  <Moon className="text-foreground w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full transition-colors duration-300">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  completedLectures={completedLectures}
                  toggleLectureComplete={toggleLectureComplete}
                />
              } 
            />
            <Route 
              path="/learned" 
              element={
                <LearnedDashboard 
                  completedLearned={completedLearned}
                  toggleLearnedComplete={toggleLearnedComplete}
                />
              } 
            />
            <Route path="/lecture/:id" element={<PageWrapper key="lecture" component={LecturePage} props={{ source: 'lectures', completedLectures, toggleLectureComplete, lectureNotes, updateLectureNotes: overrideUpdateLectureNotes }} />} />
            <Route path="/learned/:id" element={<PageWrapper key="learned" component={LecturePage} props={{ source: 'learned', completedLectures: completedLearned, toggleLectureComplete: toggleLearnedComplete, lectureNotes, updateLectureNotes: overrideUpdateLectureNotes }} />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

// Simple wrapper to pass correct props based on data type
function PageWrapper({ component: Component, props }: { component: any; props: any }) {
  return <Component {...props} />;
}