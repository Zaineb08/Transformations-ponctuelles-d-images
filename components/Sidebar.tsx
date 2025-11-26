import React, { useState } from 'react';
import { NavItem } from '../types';
import { Menu, X, ChevronRight, Image as LogoIcon } from 'lucide-react';

interface SidebarProps {
  items: NavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, activeId, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md border border-slate-200 text-slate-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-slate-200 shadow-xl md:shadow-none z-40
        transition-transform duration-300 ease-in-out w-72
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white">
             <LogoIcon size={24} />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">Image<br/>Process</h1>
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-88px)]">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3 mt-2">
            Sommaire
          </div>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`
                w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                ${activeId === item.id 
                  ? 'bg-brand-50 text-brand-700 border-brand-200 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              <span>{item.label}</span>
              {activeId === item.id && <ChevronRight size={16} />}
            </button>
          ))}
        </nav>
      </aside>
      
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;