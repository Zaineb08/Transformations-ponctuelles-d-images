
import React from 'react';
import { SlideData, SlideType, NavItem } from './types';
import { Lightbulb, Zap, Brain, Camera, Monitor } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { id: 'intro', label: 'Introduction Générale' },
  { id: 'types', label: 'Types d\'Opérations' },
  { id: 'point_def', label: 'Transformation Ponctuelle' },
  { id: 'inversion', label: 'Inversion Dynamique' },
  { id: 'gamma', label: 'Correction Gamma' },
  { id: 'arithmetic', label: 'Opérations Arithmétiques' },
  { id: 'applications', label: 'Conclusion' },
];

export const SLIDES: Record<string, SlideData> = {
  'intro': {
    id: 'intro',
    title: 'Traitement d\'Images',
    subtitle: 'Concepts et Définitions',
    type: SlideType.TITLE,
    content: (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-brand-800 mb-3">Qu'est-ce que le traitement d'images ?</h3>
          <p className="text-slate-600 leading-relaxed">
            C'est une discipline de l'informatique et des mathématiques appliquées qui étudie les images numériques et leurs transformations.
            L'objectif est d'améliorer leur qualité (visibilité) ou d'en extraire des informations pertinentes (vision par ordinateur).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-50 rounded-lg border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-2">Représentation Matricielle</h4>
            <p className="text-sm text-slate-600">
              Une image est une <strong>matrice de nombres</strong> (signal 2D). Chaque case est un pixel ayant une valeur (intensité ou couleur).
            </p>
          </div>
          <div className="p-5 bg-slate-50 rounded-lg border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-2">Objectifs Principaux</h4>
            <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
              <li><strong>Amélioration :</strong> Contraste, luminosité.</li>
              <li><strong>Restauration :</strong> Suppression du bruit, flou.</li>
              <li><strong>Analyse :</strong> Segmentation, détection.</li>
            </ul>
          </div>
        </div>

        {/* Fun Fact: Why 255? */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-4">
          <div className="bg-amber-100 p-2 rounded-full shrink-0 text-amber-600">
             <Lightbulb size={20} />
          </div>
          <div>
             <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wider mb-1">Le Saviez-vous ?</h4>
             <p className="text-sm text-amber-900">
               Pourquoi les valeurs vont-elles de <strong>0 à 255</strong> ? <br/>
               C'est lié à l'informatique binaire : 1 pixel est souvent codé sur <strong>1 octet (8 bits)</strong>.
               <br/>
               <span className="font-mono text-xs bg-white/50 px-1 rounded">2^8 = 256 valeurs</span> (de 0 à 255). C'est le compromis historique parfait entre la qualité visuelle et l'espace mémoire.
             </p>
          </div>
        </div>
      </div>
    )
  },
  'types': {
    id: 'types',
    title: 'Classification des Transformations',
    subtitle: 'Les 3 familles d\'opérations',
    type: SlideType.CONTENT,
    content: (
      <div className="space-y-6">
        <p className="text-slate-600 mb-4">
          Pour passer d'une image source <span className="font-mono text-brand-600">f(x,y)</span> à une image transformée <span className="font-mono text-brand-600">g(x,y)</span>, les opérations sont classées selon la dépendance des pixels :
        </p>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Ponctuelle */}
          <div className="flex gap-4 p-6 bg-white rounded-xl shadow-md border-l-4 border-brand-500 transition-transform hover:scale-[1.01]">
            <div className="shrink-0 w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold text-xl">1</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Transformations Ponctuelles</h3>
              <p className="text-slate-600 text-sm mt-1">
                La nouvelle valeur d'un pixel dépend <strong>uniquement</strong> de sa propre valeur actuelle.
              </p>
              <div className="mt-2 inline-block px-2 py-1 bg-slate-100 text-xs font-mono rounded text-slate-500">Point à Point</div>
            </div>
          </div>

          {/* Locale */}
          <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-200 transition-transform hover:scale-[1.01]">
            <div className="shrink-0 w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center font-bold text-xl">2</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Transformations Locales</h3>
              <p className="text-slate-600 text-sm mt-1">
                La nouvelle valeur dépend du pixel et de ses <strong>voisins</strong> (fenêtre 3x3, 5x5...).
              </p>
              <div className="mt-2 inline-block px-2 py-1 bg-slate-100 text-xs font-mono rounded text-slate-500">Filtres, Convolutions</div>
            </div>
          </div>

          {/* Globale */}
          <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-200 transition-transform hover:scale-[1.01]">
            <div className="shrink-0 w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center font-bold text-xl">3</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Transformations Globales</h3>
              <p className="text-slate-600 text-sm mt-1">
                La nouvelle valeur dépend de l'information contenue dans <strong>toute l'image</strong>.
              </p>
              <div className="mt-2 inline-block px-2 py-1 bg-slate-100 text-xs font-mono rounded text-slate-500">Fourier, Histogrammes</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'point_def': {
    id: 'point_def',
    title: 'Transformation Ponctuelle',
    subtitle: 'Définition et Principe',
    type: SlideType.CONTENT,
    content: (
      <div className="space-y-8">
        <div className="bg-brand-50 border border-brand-200 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-900 mb-4">Définition</h3>
          <p className="text-lg text-brand-800 leading-relaxed">
            Une transformation ponctuelle est une opération qui modifie chaque pixel d'une image 
            <strong className="bg-white px-1 mx-1 rounded shadow-sm text-brand-600">indépendamment de ses voisins</strong>.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Modèle Mathématique</h3>
          <div className="flex justify-center items-center gap-4 mb-6">
             <div className="text-4xl font-mono text-slate-800 font-bold">v = f(u)</div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center font-mono font-bold">u</div>
              <span className="text-sm text-slate-600">Niveau de gris d'<strong>entrée</strong></span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-lg">
              <div className="w-8 h-8 bg-brand-200 text-brand-700 rounded flex items-center justify-center font-mono font-bold">v</div>
              <span className="text-sm text-brand-700">Niveau de gris de <strong>sortie</strong></span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'inversion': {
    id: 'inversion',
    title: 'Inversion Dynamique (Négatif)',
    type: SlideType.INTERACTIVE_INVERSION,
    content: (
      <div className="mb-6">
        <p className="text-slate-600 mb-4">
          L'inversion dynamique inverse les niveaux de gris d'une image, créant un effet de 
          <span className="font-semibold"> négatif photographique</span>.
        </p>
        <div className="bg-slate-900 text-white p-4 rounded-lg font-mono text-center mb-6">
           v = U_max - u
        </div>
        <p className="text-sm text-slate-500 italic mb-6">Pour une image 8 bits (U_max = 255) : v = 255 - u</p>

        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto border border-slate-800 shadow-inner mb-6">
          <div className="text-xs text-slate-500 mb-2 uppercase font-bold tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Python (NumPy)
          </div>
          <pre className="text-sm font-mono leading-relaxed text-slate-300">
            <div><span className="text-purple-400">import</span> cv2</div>
            <br/>
            <div className="text-slate-500"># Chargement de l'image</div>
            <div>img <span className="text-pink-400">=</span> cv2.<span className="text-blue-300">imread</span>(<span className="text-amber-300">'input.jpg'</span>)</div>
            <br/>
            <div className="text-slate-500"># L'opération est vectorisée avec NumPy (très rapide)</div>
            <div className="text-slate-500"># Chaque pixel P devient (255 - P)</div>
            <div>img_inverse <span className="text-pink-400">=</span> <span className="text-orange-400">255</span> <span className="text-pink-400">-</span> img</div>
          </pre>
        </div>
      </div>
    )
  },
  'gamma': {
    id: 'gamma',
    title: 'Correction Gamma',
    type: SlideType.INTERACTIVE_GAMMA,
    content: (
      <div className="mb-6">
        <p className="text-slate-600 mb-4">
           La correction gamma est en effet une transformation non-linéaire essentielle pour adapter la luminance d’une image : elle transforme la réponse linéaire des capteurs (appareils photo, écrans modernes) pour se rapprocher de la perception humaine, qui elle, est plutôt logarithmique.
        </p>
        
        {/* Visual Equation */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center my-6">
            <div className="text-xl md:text-3xl font-serif text-slate-800 flex items-center gap-3 flex-wrap justify-center">
                <span>v</span>
                <span className="text-slate-400 text-2xl">=</span>
                <span>255</span>
                <span className="text-slate-400 text-2xl">×</span>
                <div className="flex items-center">
                    <span className="text-4xl font-light text-slate-300">(</span>
                    <div className="flex flex-col items-center mx-1">
                        <span className="border-b-2 border-slate-800 px-2 pb-1">u</span>
                        <span className="pt-1">255</span>
                    </div>
                    <span className="text-4xl font-light text-slate-300">)</span>
                    <sup className="text-brand-600 font-bold text-2xl ml-1">γ</sup>
                </div>
            </div>
        </div>

        {/* Fun Fact: CRT Legacy */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-4 mb-6">
          <div className="bg-indigo-100 p-2 rounded-full shrink-0 text-indigo-600">
             <Monitor size={20} />
          </div>
          <div>
             <h4 className="font-bold text-indigo-800 text-sm uppercase tracking-wider mb-1">Le Saviez-vous ? : L'Héritage CRT</h4>
             <p className="text-sm text-indigo-900 leading-relaxed">
               Pourquoi le gamma standard est souvent de <strong>2.2</strong> ? <br/>
               Cela vient des vieux écrans à tubes cathodiques (CRT). Ils avaient un défaut physique naturel : ils affichaient les images plus sombres que la réalité (avec une courbe d'environ γ = 2.2). <br/>
               Pour compenser, on a commencé à "éclaircir" les images à la source. Cette convention est restée !
             </p>
          </div>
        </div>

        {/* Steps Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-6">
           <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">1. Normalisation</div>
              <div className="text-lg font-mono text-slate-700 mb-1">u' = u / 255</div>
              <div className="text-[10px] leading-tight text-slate-500">Ramène les valeurs entre 0 et 1.</div>
           </div>
           <div className="bg-brand-50 p-3 rounded-lg border border-brand-100 text-center">
              <div className="text-xs font-bold text-brand-400 uppercase mb-2">2. Puissance</div>
              <div className="text-lg font-mono text-brand-700 mb-1">v' = (u')^γ</div>
              <div className="text-[10px] leading-tight text-brand-600">Transformation non-linéaire de la courbe.</div>
           </div>
           <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">3. Dénormalisation</div>
              <div className="text-lg font-mono text-slate-700 mb-1">v = v' × 255</div>
              <div className="text-[10px] leading-tight text-slate-500">Retour à l'échelle de l'image (8 bits).</div>
           </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto border border-slate-800 shadow-inner">
          <div className="text-xs text-slate-500 mb-2 uppercase font-bold tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Python (OpenCV / NumPy)
          </div>
          <pre className="text-sm font-mono leading-relaxed text-slate-300">
            <div><span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np</div>
            <div><span className="text-purple-400">import</span> cv2</div>
            <br/>
            <div>img <span className="text-pink-400">=</span> cv2.<span className="text-blue-300">imread</span>(<span className="text-amber-300">'input.jpg'</span>)</div>
            <div>gamma <span className="text-pink-400">=</span> <span className="text-orange-400">2.2</span></div>
            <br/>
            <div className="text-slate-500"># 1. Normalisation [0, 1]</div>
            <div>img_norm <span className="text-pink-400">=</span> img <span className="text-pink-400">/</span> <span className="text-orange-400">255.0</span></div>
            <br/>
            <div className="text-slate-500"># 2. Puissance (v = u^gamma)</div>
            <div>img_corrected <span className="text-pink-400">=</span> np.<span className="text-blue-300">power</span>(img_norm, gamma)</div>
            <br/>
            <div className="text-slate-500"># 3. Dénormalisation [0, 255]</div>
            <div>final_img <span className="text-pink-400">=</span> np.<span className="text-blue-300">uint8</span>(img_corrected <span className="text-pink-400">*</span> <span className="text-orange-400">255</span>)</div>
          </pre>
        </div>
      </div>
    )
  },
  'arithmetic': {
    id: 'arithmetic',
    title: 'Opérations Arithmétiques',
    type: SlideType.ARITHMETIC,
    content: (
      <div className="space-y-8">
        <div className="bg-white border border-emerald-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
            <span>+</span> Addition d'Images
          </h3>
          <div className="font-mono text-sm bg-emerald-50 text-emerald-800 p-3 rounded-lg mt-2 mb-4 inline-block">
            g(x,y) = Min(f1(x, y) + f2(x, y); 255)
          </div>
          <p className="text-slate-600 text-sm mb-2">L'addition pixel à pixel de deux images f1 et f2 est définie ci-dessus. Elle permet de :</p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
            <li><strong>Diminuer le bruit</strong> d'une vue dans une série d'images (moyennage/stacking).</li>
            <li><strong>Augmenter la luminance</strong> en additionnant une image avec elle-même.</li>
          </ul>

           <div className="mt-4 bg-slate-900 rounded-lg p-4 overflow-x-auto border border-slate-800 shadow-inner">
             <div className="text-xs text-slate-500 mb-2 uppercase font-bold tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
               <span className="w-2 h-2 rounded-full bg-blue-500"></span>
               Python (OpenCV)
             </div>
             <pre className="text-sm font-mono leading-relaxed text-slate-300">
               <div><span className="text-purple-400">import</span> cv2</div>
               <div className="text-slate-500"># Addition saturée : min(a+b, 255)</div>
               <div className="text-slate-500"># cv2.add gère automatiquement la saturation</div>
               <div>res <span className="text-pink-400">=</span> cv2.<span className="text-blue-300">add</span>(img1, img2)</div>
             </pre>
           </div>
          
          {/* Fun Fact: Astrophotography */}
          <div className="mt-4 bg-emerald-50 p-3 rounded-lg border border-emerald-100 flex items-center gap-3">
            <Camera size={18} className="text-emerald-600 shrink-0" />
            <p className="text-xs text-emerald-800 leading-relaxed">
              <strong>Astrophotographie :</strong> Les superbes photos de galaxies sont souvent le résultat de l'addition de centaines de photos pour capter assez de lumière.
            </p>
          </div>
        </div>

        <div className="bg-white border border-rose-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-rose-800 flex items-center gap-2">
            <span>-</span> Soustraction d'Images
          </h3>
          <div className="font-mono text-sm bg-rose-50 text-rose-800 p-3 rounded-lg mt-2 mb-4 inline-block">
            g(x,y) = Max(f1(x, y) - f2(x, y); 0)
          </div>
          <p className="text-slate-600 text-sm mb-2">La soustraction pixel à pixel permet de :</p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
            <li>La <strong>détection de défauts</strong> (comparaison avec un modèle parfait).</li>
            <li>La <strong>détection de mouvements</strong> (comparaison d'images successives).</li>
          </ul>

          <div className="mt-4 bg-slate-900 rounded-lg p-4 overflow-x-auto border border-slate-800 shadow-inner">
             <div className="text-xs text-slate-500 mb-2 uppercase font-bold tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
               <span className="w-2 h-2 rounded-full bg-blue-500"></span>
               Python (OpenCV)
             </div>
             <pre className="text-sm font-mono leading-relaxed text-slate-300">
               <div><span className="text-purple-400">import</span> cv2</div>
               <div className="text-slate-500"># Soustraction clippée : max(a-b, 0)</div>
               <div className="text-slate-500"># cv2.subtract gère automatiquement le clipping</div>
               <div>res <span className="text-pink-400">=</span> cv2.<span className="text-blue-300">subtract</span>(img1, img2)</div>
             </pre>
           </div>
        </div>
      </div>
    )
  },
  'applications': {
    id: 'applications',
    title: 'Conclusion',
    type: SlideType.CONTENT,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-brand-900 to-brand-800 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Brain className="text-brand-300" />
            En Résumé
          </h3>
          <p className="mb-4 text-brand-100 leading-relaxed">
            Les transformations ponctuelles (inversion, gamma, addition) sont les briques élémentaires du traitement d'image. Elles sont fondamentales, rapides et universelles, et constituent la base pour des traitements beaucoup plus complexes.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Médical</h4>
          <p className="text-sm text-slate-600">Soustraction pour angiographie, Gamma pour radiographies.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Industrie</h4>
          <p className="text-sm text-slate-600">Détection de défauts par soustraction, Calibration de capteurs.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Astronomie</h4>
          <p className="text-sm text-slate-600">Addition pour réduction de bruit thermique sur longues poses.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Sécurité</h4>
          <p className="text-sm text-slate-600">Détection de mouvement par différence d'images consécutives.</p>
        </div>
      </div>
    )
  }
};
