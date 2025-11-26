import React, { useState } from 'react';
import { SlideData, SlideType } from '../types';
import ImageProcessor from '../components/ImageProcessor';
import ArithmeticProcessor from '../components/ArithmeticProcessor';
import TransferFunctionChart from '../components/TransferFunctionChart';
import { Info, Play } from 'lucide-react';

interface SlidePageProps {
  data: SlideData;
}

const SlidePage: React.FC<SlidePageProps> = ({ data }) => {
  const [gamma, setGamma] = useState(1);

  return (
    <div className="max-w-5xl mx-auto animate-fadeIn pb-20">
      {/* Header */}
      <header className="mb-8 md:mb-12 border-b border-slate-200 pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          {data.title}
        </h1>
        {data.subtitle && (
          <h2 className="text-xl text-brand-600 font-medium">{data.subtitle}</h2>
        )}
      </header>

      {/* Content Layout */}
      <div className="grid grid-cols-1 gap-10">
        
        {/* Text Content Block */}
        <div className="prose prose-slate max-w-none">
          {data.content}
          
          {data.bulletPoints && (
            <div className="bg-slate-50 rounded-xl p-6 mt-6 border border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Points Clés</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 m-0 p-0 list-none">
                {data.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 shadow-sm text-sm">
                    <div className="mt-1 text-brand-500 shrink-0"><Play size={14} fill="currentColor" /></div>
                    <span className="text-slate-700 font-medium leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* INTERACTIVE MODULES */}
        
        {/* 1. INVERSION */}
        {data.type === SlideType.INTERACTIVE_INVERSION && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <div className="lg:col-span-2 order-2 lg:order-1">
               <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm mb-6 flex items-start gap-3">
                 <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
                 <div className="text-sm text-blue-800">
                   <strong className="block mb-1">Cas concret : Imagerie Médicale</strong>
                   L'inversion est souvent utilisée pour mieux visualiser des structures fines (os, tissus) dans des radiographies ou des images microscopiques.
                 </div>
               </div>
               {/* Use a cell/microscope image to simulate medical/scientific context */}
               <ImageProcessor 
                  operation="inverse" 
                  initialImageUrl="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&q=80"
               />
            </div>
            <div className="lg:col-span-1 order-1 lg:order-2">
               <div className="sticky top-6">
                 <TransferFunctionChart type="inversion" />
                 <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-500 leading-relaxed">
                   <strong>Analyse :</strong> La fonction est une droite décroissante. Les pixels sombres (0) deviennent clairs (255) et inversement.
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* 2. GAMMA */}
        {data.type === SlideType.INTERACTIVE_GAMMA && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <div className="lg:col-span-2 order-2 lg:order-1 space-y-6">
               <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 shadow-sm flex items-start gap-3">
                 <Info className="text-yellow-600 shrink-0 mt-0.5" size={20} />
                 <div className="text-sm text-yellow-800">
                   <strong className="block mb-1">Cas concret : Correction d'exposition</strong>
                   Cette photo de nuit est naturellement sombre (sous-exposée). Essayez de réduire le Gamma (γ &lt; 1) pour révéler les détails dans les ombres sans "brûler" les zones claires.
                 </div>
               </div>

               {/* Gamma Controller */}
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm ring-1 ring-slate-100">
                 <div className="flex justify-between items-end mb-6">
                   <label className="font-bold text-slate-800 text-lg">
                     Contrôle Gamma (γ)
                   </label>
                   <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full font-mono font-bold">
                     {gamma}
                   </span>
                 </div>
                 
                 <input 
                   type="range" 
                   min="0.1" 
                   max="3.0" 
                   step="0.1" 
                   value={gamma} 
                   onChange={(e) => setGamma(parseFloat(e.target.value))}
                   className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                 />
                 <div className="flex justify-between text-xs font-medium text-slate-400 mt-3 font-mono">
                   <span>0.1 (Clair)</span>
                   <span>1.0 (Identité)</span>
                   <span>3.0 (Sombre)</span>
                 </div>
               </div>

               {/* Use a dark moody street image to demonstrate Gamma correction effectively */}
               <ImageProcessor 
                  operation="gamma" 
                  gammaValue={gamma} 
                  initialImageUrl="https://images.unsplash.com/photo-1516617442634-75371039cb3a?w=600&q=80"
               />
            </div>

            <div className="lg:col-span-1 order-1 lg:order-2">
               <div className="sticky top-6 space-y-6">
                  {/* Dynamic Main Chart */}
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">Temps Réel</div>
                    <TransferFunctionChart type="gamma" gammaValue={gamma} />
                    <div className="mt-2 space-y-2">
                        <div className={`p-3 rounded-lg text-xs border transition-colors ${gamma < 1 ? 'bg-red-50 border-red-100 text-red-800' : (gamma > 1 ? 'bg-blue-50 border-blue-100 text-blue-800' : 'bg-slate-50 border-slate-100 text-slate-500')}`}>
                        {gamma < 1 
                            ? <span><strong>γ &lt; 1 :</strong> Courbe au-dessus. Éclaircit l'image (dilatation des noirs).</span>
                            : (gamma > 1 
                                ? <span><strong>γ &gt; 1 :</strong> Courbe en dessous. Assombrit l'image.</span> 
                                : <span><strong>γ = 1 :</strong> Identité (pas de changement).</span>)
                        }
                        </div>
                    </div>
                  </div>

                  {/* Reference Examples */}
                  <div>
                      <div className="text-xs font-bold text-slate-400 uppercase mb-3 pb-1 border-b border-slate-100">Courbes Types</div>
                      <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                             <TransferFunctionChart type="gamma" gammaValue={0.5} minimal />
                             <div className="text-center mt-1">
                                <div className="text-xs font-bold text-red-600 font-mono">γ = 0.5</div>
                                <div className="text-[10px] text-slate-500">Éclaircissement</div>
                             </div>
                          </div>
                          <div className="flex flex-col gap-1">
                             <TransferFunctionChart type="gamma" gammaValue={2.0} minimal />
                             <div className="text-center mt-1">
                                <div className="text-xs font-bold text-blue-600 font-mono">γ = 2.0</div>
                                <div className="text-[10px] text-slate-500">Assombrissement</div>
                             </div>
                          </div>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* 3. ARITHMETIC */}
        {data.type === SlideType.ARITHMETIC && (
           <div className="mt-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100 shadow-sm mb-8 flex gap-3">
                 <Info className="text-emerald-600 mt-1" />
                 <div className="text-sm text-emerald-900">
                   <strong>Laboratoire Arithmétique :</strong> Découvrez comment la fusion d'images (addition) ou la détection de différence (soustraction) fonctionnent pixel par pixel.
                 </div>
              </div>
              <ArithmeticProcessor />
           </div>
        )}

      </div>
    </div>
  );
};

export default SlidePage;