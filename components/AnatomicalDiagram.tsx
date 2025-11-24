import React, { useState, useRef, useCallback } from 'react';
import { MapPin, AlertTriangle, Eye, Trash2, X } from 'lucide-react';

export interface AnatomicalMarker {
  id: string;
  x: number;
  y: number;
  type: 'pain' | 'injury' | 'observation';
  description: string;
  bodyPart: string;
}

interface AnatomicalDiagramProps {
  markers: AnatomicalMarker[];
  onMarkerAdd?: (marker: Omit<AnatomicalMarker, 'id'>) => void;
  onMarkerRemove?: (markerId: string) => void;
  readOnly?: boolean;
  darkMode?: boolean;
}

const BODY_PARTS = {
  head: { name: 'Cabeça', bounds: { x: 215, y: 30, width: 70, height: 90 } },
  neck: { name: 'Pescoço', bounds: { x: 235, y: 115, width: 30, height: 35 } },
  leftShoulder: { name: 'Ombro Esquerdo', bounds: { x: 165, y: 140, width: 50, height: 45 } },
  rightShoulder: { name: 'Ombro Direito', bounds: { x: 285, y: 140, width: 50, height: 45 } },
  upperChest: { name: 'Tórax Superior', bounds: { x: 215, y: 150, width: 70, height: 40 } },
  lowerChest: { name: 'Tórax Inferior', bounds: { x: 220, y: 190, width: 60, height: 35 } },
  upperAbdomen: { name: 'Abdômen Superior', bounds: { x: 225, y: 225, width: 50, height: 35 } },
  lowerAbdomen: { name: 'Abdômen Inferior', bounds: { x: 230, y: 260, width: 40, height: 40 } },
  pelvis: { name: 'Pelve/Quadril', bounds: { x: 215, y: 300, width: 70, height: 50 } },
  leftThigh: { name: 'Coxa Esquerda', bounds: { x: 200, y: 350, width: 45, height: 120 } },
  rightThigh: { name: 'Coxa Direita', bounds: { x: 255, y: 350, width: 45, height: 120 } },
  leftKnee: { name: 'Joelho Esquerdo', bounds: { x: 205, y: 470, width: 35, height: 35 } },
  rightKnee: { name: 'Joelho Direito', bounds: { x: 260, y: 470, width: 35, height: 35 } },
  leftCalf: { name: 'Panturrilha Esquerda', bounds: { x: 205, y: 505, width: 35, height: 100 } },
  rightCalf: { name: 'Panturrilha Direita', bounds: { x: 260, y: 505, width: 35, height: 100 } },
  leftFoot: { name: 'Pé Esquerdo', bounds: { x: 195, y: 625, width: 40, height: 35 } },
  rightFoot: { name: 'Pé Direito', bounds: { x: 265, y: 625, width: 40, height: 35 } }
};

const AnatomicalDiagram: React.FC<AnatomicalDiagramProps> = ({
  markers,
  onMarkerAdd,
  onMarkerRemove,
  readOnly = false,
  darkMode = false
}) => {
  const [hoveredBodyPart, setHoveredBodyPart] = useState<string | null>(null);
  const [showMarkerForm, setShowMarkerForm] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [markerType, setMarkerType] = useState<'pain' | 'injury' | 'observation'>('observation');
  const [markerDescription, setMarkerDescription] = useState('');
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const isPointInBounds = useCallback((point: { x: number; y: number }, bounds: { x: number; y: number; width: number; height: number }): boolean => {
    return point.x >= bounds.x &&
           point.x <= bounds.x + bounds.width &&
           point.y >= bounds.y &&
           point.y <= bounds.y + bounds.height;
  }, []);

  const findBodyPartAtPoint = useCallback((point: { x: number; y: number }): string | null => {
    for (const [key, part] of Object.entries(BODY_PARTS)) {
      if (isPointInBounds(point, part.bounds)) {
        return key;
      }
    }
    return null;
  }, [isPointInBounds]);

  const handleSvgClick = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
    if (readOnly || !svgRef.current) return;
    
    const target = event.target as SVGElement;
    if (target.closest('.marker-pin-group')) return;

    event.preventDefault();
    event.stopPropagation();
    
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 500 / rect.width;
    const scaleY = 700 / rect.height;
    
    const point = { x: (event.clientX - rect.left) * scaleX, y: (event.clientY - rect.top) * scaleY };
    
    setMarkerPosition(point);
    setShowMarkerForm(true);
    setMarkerDescription('');
  }, [readOnly]);
  
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 500 / rect.width;
    const scaleY = 700 / rect.height;
    const point = { x: (event.clientX - rect.left) * scaleX, y: (event.clientY - rect.top) * scaleY };
    const bodyPart = findBodyPartAtPoint(point);
    setHoveredBodyPart(bodyPart);
  };

  const handleAddMarker = () => {
    if (!markerPosition || !markerDescription.trim() || !onMarkerAdd) return;
    
    const bodyPartKey = findBodyPartAtPoint(markerPosition);
    const bodyPartName = bodyPartKey ? BODY_PARTS[bodyPartKey as keyof typeof BODY_PARTS].name : 'Corpo';
    
    onMarkerAdd({
      x: markerPosition.x,
      y: markerPosition.y,
      type: markerType,
      description: markerDescription.trim(),
      bodyPart: bodyPartName
    });
    
    setShowMarkerForm(false);
    setMarkerPosition(null);
    setMarkerDescription('');
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'pain': return <AlertTriangle className="w-3 h-3" />;
      case 'injury': return <X className="w-3 h-3" />;
      default: return <Eye className="w-3 h-3" />;
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'pain': return 'text-red-600 bg-red-100 border-red-500';
      case 'injury': return 'text-orange-600 bg-orange-100 border-orange-500';
      default: return 'text-blue-600 bg-blue-100 border-blue-500';
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start w-full">
      <div className="relative flex-shrink-0 mx-auto">
        <div className={`p-4 rounded-3xl border shadow-sm relative ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white'}`}>
          <svg
            ref={svgRef}
            viewBox="0 0 500 700"
            className={`w-full max-w-[300px] h-auto ${!readOnly ? 'cursor-crosshair' : ''}`}
            onClick={handleSvgClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredBodyPart(null)}
          >
            <defs>
              <radialGradient id="skinGradient" cx="0.3" cy="0.3" r="0.8"><stop offset="0%" stopColor="#fde8d7" /><stop offset="50%" stopColor="#f4d1ae" /><stop offset="100%" stopColor="#e8b892" /></radialGradient>
              <radialGradient id="muscleGradient" cx="0.3" cy="0.3" r="0.8"><stop offset="0%" stopColor="#f0c5a0" /><stop offset="50%" stopColor="#e8b892" /><stop offset="100%" stopColor="#d4a574" /></radialGradient>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2"/></filter>
            </defs>

            {hoveredBodyPart && BODY_PARTS[hoveredBodyPart as keyof typeof BODY_PARTS] && (
              <rect
                {...BODY_PARTS[hoveredBodyPart as keyof typeof BODY_PARTS].bounds}
                fill="rgba(139, 92, 246, 0.15)"
                stroke="rgba(139, 92, 246, 0.4)"
                strokeWidth="1.5"
                rx="8"
                className="pointer-events-none transition-opacity duration-200"
              />
            )}
            
            <g filter="url(#shadow)">
                {/* Simplified Body Shape for visual context */}
                <ellipse cx="250" cy="75" rx="32" ry="40" fill="url(#skinGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                <ellipse cx="250" cy="185" rx="60" ry="35" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                <ellipse cx="250" cy="245" rx="50" ry="25" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1"/>
                <ellipse cx="250" cy="340" rx="35" ry="25" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1"/>
                <ellipse cx="250" cy="375" rx="50" ry="35" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                
                {/* Limbs */}
                <ellipse cx="192" cy="162" rx="27" ry="22" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                <ellipse cx="308" cy="162" rx="27" ry="22" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                <ellipse cx="175" cy="230" rx="20" ry="45" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                <ellipse cx="325" cy="230" rx="20" ry="45" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                
                {/* Legs */}
                <ellipse cx="222" cy="470" rx="22" ry="60" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                <ellipse cx="277" cy="470" rx="22" ry="60" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                <ellipse cx="222" cy="605" rx="17" ry="50" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                <ellipse cx="277" cy="605" rx="17" ry="50" fill="url(#muscleGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                <ellipse cx="215" cy="685" rx="20" ry="15" fill="url(#skinGradient)" stroke="#d4a574" strokeWidth="1.5"/>
                <ellipse cx="285" cy="685" rx="20" ry="15" fill="url(#skinGradient)" stroke="#d4a574" strokeWidth="1.5"/>
            </g>

            {markers.map((marker) => {
              const isSelected = selectedMarkerId === marker.id;
              return (
                <g 
                  key={marker.id} 
                  className="cursor-pointer marker-pin-group transition-transform duration-200 hover:scale-110"
                  onClick={(e) => { e.stopPropagation(); setSelectedMarkerId(isSelected ? null : marker.id); }}
                >
                  <circle cx={marker.x} cy={marker.y} r={isSelected ? "14" : "10"} className={`${marker.type === 'pain' ? 'fill-red-500' : marker.type === 'injury' ? 'fill-orange-500' : 'fill-blue-500'} stroke-white stroke-2 shadow-sm`} />
                  <foreignObject x={marker.x - 6} y={marker.y - 6} width="12" height="12" className="pointer-events-none">
                    <div className="flex items-center justify-center w-full h-full text-white">
                      {getMarkerIcon(marker.type)}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Panel de Detalhes/Formulário */}
      <div className="flex-1 w-full">
        {showMarkerForm && !readOnly ? (
          <div className={`p-6 rounded-2xl border shadow-lg animate-in fade-in slide-in-from-bottom-4 ${darkMode ? 'bg-slate-800 border-white/5 text-white' : 'bg-white text-gray-900'}`}>
            <h3 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Adicionar Observação</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tipo</label>
                <div className="flex gap-2">
                  {[
                    { id: 'pain', label: 'Dor', color: 'bg-red-100 text-red-700 border-red-200' },
                    { id: 'injury', label: 'Lesão', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                    { id: 'observation', label: 'Obs.', color: 'bg-blue-100 text-blue-700 border-blue-200' }
                  ].map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setMarkerType(type.id as any)}
                      className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all ${markerType === type.id ? type.color + ' ring-2 ring-offset-1' : (darkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-white border-gray-200 text-gray-600')}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Descrição</label>
                <textarea
                  value={markerDescription}
                  onChange={(e) => setMarkerDescription(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' : 'bg-white border-gray-300 placeholder:text-gray-400'}`}
                  rows={3}
                  placeholder="Descreva a condição..."
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => setShowMarkerForm(false)}
                  className={`flex-1 px-4 py-2 rounded-xl ${darkMode ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleAddMarker}
                  disabled={!markerDescription.trim()}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`rounded-2xl border shadow-sm overflow-hidden ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white'}`}>
            <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'bg-slate-700/50 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Registros Anatômicos</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${darkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>{markers.length}</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-2">
              {markers.length === 0 ? (
                <div className={`text-center py-8 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  <p>Nenhum registro adicionado.</p>
                  {!readOnly && <p>Clique no corpo para adicionar.</p>}
                </div>
              ) : (
                <div className="space-y-2">
                  {markers.map(marker => (
                    <div 
                      key={marker.id}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedMarkerId === marker.id 
                          ? (darkMode ? 'bg-blue-900/30 border-blue-500/50 ring-1 ring-blue-500/30' : 'bg-blue-50 border-blue-300 ring-1 ring-blue-300')
                          : (darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-gray-100 hover:border-gray-300')
                      }`}
                      onClick={() => setSelectedMarkerId(marker.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${getMarkerColor(marker.type)}`}>
                            {getMarkerIcon(marker.type)}
                          </div>
                          <div>
                            <p className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{marker.bodyPart}</p>
                            <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{marker.description}</p>
                          </div>
                        </div>
                        {!readOnly && onMarkerRemove && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); onMarkerRemove(marker.id); }}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnatomicalDiagram;