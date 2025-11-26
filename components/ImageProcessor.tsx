import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RefreshCw, Upload, ArrowRight } from 'lucide-react';

interface ImageProcessorProps {
  operation: 'identity' | 'inverse' | 'gamma';
  gammaValue?: number;
  initialImageUrl?: string; // New prop for context-aware defaults
}

const ImageProcessor: React.FC<ImageProcessorProps> = ({ 
  operation, 
  gammaValue = 1,
  initialImageUrl 
}) => {
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const processedCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Determine default image based on operation if not provided
  const getDefaultImage = () => {
    if (initialImageUrl) return initialImageUrl;
    // Default fallbacks if no prop provided
    if (operation === 'gamma') return 'https://images.unsplash.com/photo-1516617442634-75371039cb3a?w=600&q=80'; // Dark moody street
    if (operation === 'inverse') return 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&q=80'; // Microscopic/Medical look
    return 'https://picsum.photos/id/237/600/400';
  };

  const [imageUrl, setImageUrl] = useState<string>(getDefaultImage());
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = useCallback(() => {
    const originalCanvas = originalCanvasRef.current;
    const processedCanvas = processedCanvasRef.current;
    if (!originalCanvas || !processedCanvas) return;

    const ctxOriginal = originalCanvas.getContext('2d', { willReadFrequently: true });
    const ctxProcessed = processedCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctxOriginal || !ctxProcessed) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    
    img.onload = () => {
      // 1. Setup Dimensions
      const maxWidth = 500;
      const scale = img.width > maxWidth ? maxWidth / img.width : 1;
      const w = Math.floor(img.width * scale);
      const h = Math.floor(img.height * scale);

      originalCanvas.width = w;
      originalCanvas.height = h;
      processedCanvas.width = w;
      processedCanvas.height = h;

      // 2. Draw Original
      ctxOriginal.drawImage(img, 0, 0, w, h);
      
      // 3. Process for Output
      ctxProcessed.drawImage(img, 0, 0, w, h);

      if (operation === 'identity') return;

      const imageData = ctxProcessed.getImageData(0, 0, w, h);
      const data = imageData.data;

      // Lookup table for Gamma to improve performance
      let lut: Uint8Array | null = null;
      if (operation === 'gamma') {
        lut = new Uint8Array(256);
        for (let i = 0; i < 256; i++) {
          lut[i] = Math.round(255 * Math.pow(i / 255, gammaValue));
        }
      }

      // Pixel Manipulation
      for (let i = 0; i < data.length; i += 4) {
        // data[i] = R, data[i+1] = G, data[i+2] = B, data[i+3] = A
        if (operation === 'inverse') {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        } else if (operation === 'gamma' && lut) {
          data[i] = lut[data[i]];
          data[i + 1] = lut[data[i + 1]];
          data[i + 2] = lut[data[i + 2]];
        }
      }

      ctxProcessed.putImageData(imageData, 0, 0);
      setIsProcessing(false);
    };
    
    setIsProcessing(true);
  }, [imageUrl, operation, gammaValue]);

  useEffect(() => {
    processImage();
  }, [processImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImageUrl(ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 w-full justify-center">
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <Upload size={18} />
          <span className="text-sm font-medium">Charger une image</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
        <button 
          onClick={processImage}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors shadow-sm"
        >
          <RefreshCw size={18} />
          <span className="text-sm font-medium">Rafraîchir</span>
        </button>
      </div>

      {/* Visualization Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Original */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider text-center">Originale</span>
          <div className="relative bg-slate-100 border border-slate-200 rounded-xl overflow-hidden shadow-sm min-h-[200px] flex items-center justify-center">
             <canvas ref={originalCanvasRef} className="max-w-full h-auto" />
          </div>
        </div>

        {/* Processed */}
        <div className="flex flex-col gap-2 relative">
          <span className="text-xs font-bold uppercase text-brand-600 tracking-wider text-center">Transformée</span>
           {/* Mobile Arrow Indicator */}
           <div className="md:hidden absolute top-1/2 -left-3 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md">
              <ArrowRight size={16} className="text-slate-400" />
           </div>
          <div className="relative bg-slate-100 border-2 border-brand-100 rounded-xl overflow-hidden shadow-sm min-h-[200px] flex items-center justify-center">
            {isProcessing && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <RefreshCw className="animate-spin text-brand-600 w-8 h-8" />
              </div>
            )}
            <canvas ref={processedCanvasRef} className="max-w-full h-auto" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImageProcessor;