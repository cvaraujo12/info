import React from 'react';

interface MapLegendProps {
  className?: string;
}

export const MapLegend: React.FC<MapLegendProps> = ({ className }) => {
  const items = [
    {
      color: '#2563eb',
      icon: '🚢',
      label: 'Rotas Marítimas',
      description: 'Conexões através dos oceanos'
    },
    {
      color: '#16a34a',
      icon: '🚂',
      label: 'Rotas Terrestres',
      description: 'Conexões por terra'
    },
    {
      color: '#2563eb',
      icon: '🔵',
      label: 'Ponto de Partida',
      description: 'Local de origem da rota'
    },
    {
      color: '#dc2626',
      icon: '🔴',
      label: 'Ponto de Chegada',
      description: 'Destino final da rota'
    }
  ];

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-4 ${className}`}>
      <h3 className="text-sm font-medium text-gray-900 mb-3">Legenda</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start space-x-2">
            <span className="flex-shrink-0 mt-1">{item.icon}</span>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {item.label}
              </div>
              <div className="text-xs text-gray-500">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 