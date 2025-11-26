import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SlidePage from './pages/SlidePage';
import { NAV_ITEMS, SLIDES } from './constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Helper component to scroll top on nav
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract current ID from path
  const currentId = location.pathname.replace('/', '') || NAV_ITEMS[0].id;
  const currentIndex = NAV_ITEMS.findIndex(item => item.id === currentId);

  const handleNext = () => {
    if (currentIndex < NAV_ITEMS.length - 1) {
      navigate(`/${NAV_ITEMS[currentIndex + 1].id}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/${NAV_ITEMS[currentIndex - 1].id}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        items={NAV_ITEMS} 
        activeId={currentId} 
        onNavigate={(id) => navigate(`/${id}`)} 
      />
      
      <main className="flex-1 md:ml-72 transition-all duration-300">
        <div className="p-6 md:p-12 min-h-[calc(100vh-80px)]">
           <Routes>
            {NAV_ITEMS.map(item => {
              const slideData = SLIDES[item.id];
              return (
                <Route 
                  key={item.id} 
                  path={`/${item.id}`} 
                  element={slideData ? <SlidePage data={slideData} /> : <div>Slide not found</div>} 
                />
              );
            })}
            <Route path="/" element={<Navigate to={`/${NAV_ITEMS[0].id}`} replace />} />
          </Routes>
        </div>

        {/* Navigation Footer */}
        <div className="sticky bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 px-8 flex justify-between items-center z-20 backdrop-blur-lg bg-opacity-90">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${currentIndex === 0 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-brand-700'
                }`}
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:inline">Précédent</span>
            </button>

            <div className="text-xs font-mono text-slate-400">
              {currentIndex + 1} / {NAV_ITEMS.length}
            </div>

            <button 
              onClick={handleNext}
              disabled={currentIndex === NAV_ITEMS.length - 1}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${currentIndex === NAV_ITEMS.length - 1 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'bg-brand-600 text-white hover:bg-brand-700 shadow-md hover:shadow-lg transform active:scale-95'
                }`}
            >
              <span className="hidden sm:inline">Suivant</span>
              <ChevronRight size={20} />
            </button>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;