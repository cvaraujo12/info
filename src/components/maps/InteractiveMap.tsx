import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import type { Route } from '@/types/routes';
import type { Feature, FeatureCollection, Point, LineString } from 'geojson';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { MapDetails } from './MapDetails';
import { MapSearch } from './MapSearch';

// Configurar o token do Mapbox
mapboxgl.accessToken = import.meta.env.PUBLIC_MAPBOX_TOKEN;

interface InteractiveMapProps {
  routes: Route[];
}

export const InteractiveMap: React.FC<InteractiveMapProps> = React.memo(({ routes }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Memoizar rotas filtradas
  const filteredRoutes = useMemo(() => 
    selectedType ? routes.filter(route => route.type === selectedType) : routes,
    [routes, selectedType]
  );

  // Memoizar dados GeoJSON
  const geojsonData = useMemo(() => ({
    routes: {
      type: 'FeatureCollection' as const,
      features: filteredRoutes.map(route => ({
        type: 'Feature' as const,
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            route.startPoint.split(',').map(Number).reverse(),
            route.endPoint.split(',').map(Number).reverse()
          ]
        },
        properties: route
      }))
    } as FeatureCollection<LineString, Route>,
    points: {
      type: 'FeatureCollection' as const,
      features: filteredRoutes.flatMap(route => [
        {
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: route.startPoint.split(',').map(Number).reverse()
          },
          properties: { ...route, pointType: 'start' }
        },
        {
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: route.endPoint.split(',').map(Number).reverse()
          },
          properties: { ...route, pointType: 'end' }
        }
      ])
    } as FeatureCollection<Point, Route & { pointType: 'start' | 'end' }>
  }), [filteredRoutes]);

  // Inicializar o mapa
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [100, 40],
      zoom: 3,
      maxZoom: 12,
      minZoom: 2,
      attributionControl: false
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

    map.current.on('load', () => setIsMapLoaded(true));

    return () => {
      map.current?.remove();
    };
  }, []);

  // Atualizar rotas no mapa
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    // Limpar camadas e fontes existentes
    ['route-lines', 'start-points', 'end-points'].forEach(layer => {
      if (map.current?.getLayer(layer)) map.current.removeLayer(layer);
    });
    ['routes', 'points'].forEach(source => {
      if (map.current?.getSource(source)) map.current.removeSource(source);
    });

    // Adicionar novas fontes
    map.current.addSource('routes', {
      type: 'geojson',
      data: geojsonData.routes
    });

    map.current.addSource('points', {
      type: 'geojson',
      data: geojsonData.points
    });

    // Adicionar camadas
    map.current.addLayer({
      id: 'route-lines',
      type: 'line',
      source: 'routes',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': [
          'match',
          ['get', 'type'],
          'Terrestre', '#16a34a',
          'Marítima', '#2563eb',
          '#000000'
        ],
        'line-width': 2,
        'line-opacity': 0.8
      }
    });

    map.current.addLayer({
      id: 'start-points',
      type: 'circle',
      source: 'points',
      filter: ['==', ['get', 'pointType'], 'start'],
      paint: {
        'circle-radius': 6,
        'circle-color': '#2563eb',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
      }
    });

    map.current.addLayer({
      id: 'end-points',
      type: 'circle',
      source: 'points',
      filter: ['==', ['get', 'pointType'], 'end'],
      paint: {
        'circle-radius': 6,
        'circle-color': '#dc2626',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
      }
    });

    // Adicionar interatividade
    const handleClick = (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
      if (e.features?.[0]) {
        setSelectedRoute(e.features[0].properties as Route);
      }
    };

    map.current.on('click', 'route-lines', handleClick);

    return () => {
      map.current?.off('click', 'route-lines', handleClick);
    };
  }, [geojsonData, isMapLoaded]);

  // Handlers memoizados
  const handleReset = useCallback(() => {
    setSelectedType(null);
    setSelectedRoute(null);
    if (map.current) {
      map.current.flyTo({
        center: [100, 40],
        zoom: 3,
        essential: true
      });
    }
  }, []);

  const handleRouteSelect = useCallback((route: Route) => {
    setSelectedRoute(route);
    if (map.current) {
      const startCoords = route.startPoint.split(',').map(Number).reverse();
      map.current.flyTo({
        center: startCoords as [number, number],
        zoom: 5,
        essential: true
      });
    }
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedRoute(null);
  }, []);

  return (
    <div className="relative h-[600px]">
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      
      <div className="absolute top-4 left-4 w-80">
        <MapSearch
          routes={routes}
          onSelect={handleRouteSelect}
          className="mb-4"
        />
        <MapControls
          routes={routes}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          onReset={handleReset}
        />
      </div>

      <MapLegend className="absolute bottom-4 left-4" />

      {selectedRoute && (
        <div className="absolute top-4 right-4 w-80">
          <MapDetails
            route={selectedRoute}
            onClose={handleCloseDetails}
          />
        </div>
      )}
    </div>
  );
}); 