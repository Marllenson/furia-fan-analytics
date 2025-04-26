"use client";

import React from 'react';

// Componente simplificado de mapa de calor que não depende de leaflet
const HeatMap = ({ geoData }) => {
  return (
    <div className="w-full h-full bg-gray-100 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">Mapa de Calor Simulado</h3>
      <div className="relative w-full h-[80%] border border-gray-300 rounded">
        {/* Mapa do Brasil simplificado */}
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="w-[60%] h-[70%] bg-gray-200 rounded-lg relative">
            {/* Pontos representando cidades */}
            {Object.entries(geoData).map(([country, cities]) => {
              return Object.entries(cities).map(([city, fans]) => {
                if (city === 'Outros') return null;
                
                // Posições aproximadas para algumas cidades brasileiras
                const positions = {
                  'São Paulo': { top: '60%', left: '65%' },
                  'Rio de Janeiro': { top: '65%', left: '70%' },
                  'Belo Horizonte': { top: '55%', left: '65%' },
                  'Brasília': { top: '45%', left: '60%' },
                  'Porto Alegre': { top: '80%', left: '55%' },
                  'Curitiba': { top: '70%', left: '60%' },
                  'Salvador': { top: '40%', left: '80%' },
                  'Recife': { top: '30%', left: '85%' },
                  'Fortaleza': { top: '20%', left: '80%' },
                  'Manaus': { top: '20%', left: '45%' },
                  'Goiânia': { top: '50%', left: '55%' },
                  'Florianópolis': { top: '75%', left: '60%' },
                  'Lisboa': { top: '30%', left: '20%' },
                  'Porto': { top: '25%', left: '15%' },
                  'Miami': { top: '25%', left: '30%' },
                  'Nova York': { top: '20%', left: '35%' },
                  'Los Angeles': { top: '30%', left: '10%' }
                };
                
                // Tamanho do círculo baseado no número de fãs
                const size = Math.min(Math.max(fans / 10, 10), 40);
                
                // Cor baseada no número de fãs
                const getColor = (fans) => {
                  if (fans > 200) return "#8B5CF6"; // Roxo (cor da Fúria)
                  if (fans > 100) return "#A855F7";
                  if (fans > 50) return "#C084FC";
                  return "#D8B4FE";
                };
                
                const position = positions[city];
                if (!position) return null;
                
                return (
                  <div 
                    key={`${country}-${city}`}
                    className="absolute rounded-full flex items-center justify-center text-xs text-white font-bold"
                    style={{
                      top: position.top,
                      left: position.left,
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: getColor(fans),
                      transform: 'translate(-50%, -50%)',
                      zIndex: Math.floor(fans / 10)
                    }}
                    title={`${city}: ${fans} fãs`}
                  >
                    {fans > 100 ? fans : ''}
                  </div>
                );
              });
            })}
            
            {/* Legenda */}
            <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow-sm text-xs">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-1"></div>
                <span>+200 fãs</span>
              </div>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-[#A855F7] mr-1"></div>
                <span>100-200 fãs</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#D8B4FE] mr-1"></div>
                <span>&lt;50 fãs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">
        Visualização simplificada da distribuição geográfica dos fãs da Fúria
      </p>
    </div>
  );
};

export default HeatMap;
