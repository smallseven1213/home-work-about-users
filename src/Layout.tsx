import { motion } from 'motion/react';
import { Suspense, lazy, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Lazy import NavigationBar
const NavigationBar = lazy(() =>
  import('./features/navigation/NavigationBar').then(module => ({ default: module.NavigationBar }))
);

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <motion.main
        className="pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>

      <Suspense
        fallback={
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-lg rounded-full p-1 shadow-2xl border border-white/10">
              <div className="flex space-x-1 bg-black/20 rounded-full p-1">
                <div className="px-6 py-3 rounded-full bg-white/10 animate-pulse w-16 h-10"></div>
                <div className="px-6 py-3 rounded-full bg-white/10 animate-pulse w-16 h-10"></div>
              </div>
            </div>
          </div>
        }
      >
        <NavigationBar />
      </Suspense>
    </div>
  );
};
