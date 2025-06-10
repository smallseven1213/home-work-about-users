import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationItem {
  label: string;
  path: string;
}

const navigationItems: NavigationItem[] = [
  { label: 'Basic', path: '/' },
  { label: 'Pro', path: '/pro' },
];

export const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-lg rounded-full p-1 shadow-2xl border border-white/10">
        <div className="flex space-x-1 bg-black/20 rounded-full p-1">
          {navigationItems.map(item => {
            const isActive = location.pathname === item.path;

            return (
              <motion.button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  relative px-6 py-3 rounded-full font-medium text-sm transition-colors duration-300
                  ${
                    isActive
                      ? 'text-white'
                      : 'text-black/80 hover:text-black/90 bg-white/20 backdrop-blur-sm'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: 'easeOut',
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
