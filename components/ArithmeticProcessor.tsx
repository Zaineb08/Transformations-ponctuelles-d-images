
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Plus, Minus, Upload, RefreshCw } from 'lucide-react';

const ArithmeticProcessor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Default Images illustrating typical use cases
  // Img 1: Base Landscape
  const [img1Url, setImg1Url] = useState<string>('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80'); 
  // Img 2: Texture/Stars/Noise (Good for addition)
  const [img2Url, setImg2Url] = useState<string>('https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=500&q=80');
  
  const [mode, setMode] = useState<'add' | 'subtract'>('add');
  const [isProcessing, setIsProcessing] = useState(false);

  const process = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    setIsProcessing(true);

    try {
      // Helper to load image
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
      };

      const [img1, img2] = await Promise.all([loadImage(img1Url), loadImage(img2Url)]);

      // Standardize size based on first image (clamped for performance)
      const w = 400;
      const h = 300;
      
      canvas.width = w;
      canvas.height = h;

      // Create offscreen canvases for pixel data extraction
      const c1 = new OffscreenCanvas(w, h);
      const ctx1 = c1.getContext('2d');
      const c2 = new OffscreenCanvas(w, h);
      const ctx2 = c2.getContext('2d');

      if (!ctx1 || !ctx2) return;

      // Draw images resized to standard size
      ctx1.drawImage(img1, 0, 0, w, h);
      ctx2.drawImage(img2, 0, 0, w, h);

      const id1 = ctx1.getImageData(0, 0, w, h);
      const id2 = ctx2.getImageData(0, 0, w, h);
      const d1 = id1.data;
      const d2 = id2.data;
      
      const output = ctx.createImageData(w, h);
      const dOut = output.data;

      for (let i = 0; i < d1.length; i += 4) {
        // RGB
        for (let j = 0; j < 3; j++) {
          let val = 0;
          if (mode === 'add') {
            // Addition: Min(I1 + I2, 255) - Saturated Addition
            val = Math.min(d1[i + j] + d2[i + j], 255); 
          } else {
            // Subtraction: Max(I1 - I2, 0) - Clipped Subtraction
            val = Math.max(d1[i + j] - d2[i + j], 0);
          }
          dOut[i + j] = val;
        }
        // Alpha
        dOut[i + 3] = 255;
      }

      ctx.putImageData(output, 0, 0);

    } catch (e) {
      console.error("Error processing images", e);
    } finally {
      setIsProcessing(false);
    }

  }, [img1Url, img2Url, mode]);

  useEffect(() => {
    process();
  }, [process]);

  const handleUpload = (idx: 1 | 2) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          if (idx === 1) setImg1Url(ev.target.result as string);
          else setImg2Url(ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="inline-flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
          <button
            onClick={() => setMode('add')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
              ${mode === 'add' ? 'bg-emerald-100 text-emerald-800 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}
            `}
          >
            <Plus size={16} /> Addition (Min(I1+I2, 255))
          </button>
          <button
            onClick={() => setMode('subtract')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
              ${mode === 'subtract' ? 'bg-rose-100 text-rose-800 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}
            `}
          >
            <Minus size={16} /> Soustraction (Max(I1-I2, 0))
          </button>
        </div>

        <p className="text-xs text-slate-500 italic text-center md:text-right max-w-xs">
          {mode === 'add' 
            ? "Utilisé pour : Réduction de bruit (moyennage), augmentation de luminance." 
            : "Utilisé pour : Détection de défauts, détection de mouvements."}
        </p>
      </div>

      {/* Visualization Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        
        {/* Image 1 */}
        <div className="flex flex-col gap-2">
           <div className="relative aspect-[4/3] bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm group">
              <img src={img1Url} alt="Source 1" className="w-full h-full object-cover" />
              <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <span className="text-white text-xs font-bold flex items-center gap-1"><Upload size={12}/> Changer I1</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload(1)} />
              </label>
           </div>
           <span className="text-center text-xs font-mono text-slate-500">Image I1</span>
        </div>

        {/* Operator Symbol */}
        <div className="flex justify-center text-slate-300">
          {mode === 'add' ? <Plus size={32} /> : <Minus size={32} />}
        </div>

        {/* Image 2 */}
        <div className="flex flex-col gap-2">
           <div className="relative aspect-[4/3] bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm group">
              <img src={img2Url} alt="Source 2" className="w-full h-full object-cover" />
              <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <span className="text-white text-xs font-bold flex items-center gap-1"><Upload size={12}/> Changer I2</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload(2)} />
              </label>
           </div>
           <span className="text-center text-xs font-mono text-slate-500">Image I2</span>
        </div>
      </div>

      {/* Result Section */}
      <div className="mt-8 flex flex-col items-center">
         <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Résultat g(x,y)</div>
         <div className="relative bg-white p-2 rounded-xl border border-slate-200 shadow-lg">
            <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg" />
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                <RefreshCw className="animate-spin text-slate-600" />
              </div>
            )}
         </div>
         <p className="mt-4 text-sm text-slate-500 text-center max-w-md bg-yellow-50 border border-yellow-100 p-2 rounded text-yellow-800">
           {mode === 'add' 
             ? "Résultat : La somme est plafonnée à 255 (blanc). Les zones claires s'additionnent pour devenir encore plus claires." 
             : "Résultat : La différence est bornée à 0 (noir). Si I1 < I2, le résultat est noir. Utile pour isoler ce qui est plus clair dans I1 que dans I2."}
         </p>
      </div>
    </div>
  );
};

export default ArithmeticProcessor;
