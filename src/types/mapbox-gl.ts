import type { Map, MapboxOptions as MapboxGLOptions } from 'mapbox-gl';

export interface MapboxOptions extends Partial<MapboxGLOptions> {
  container: string;
  style: string;
  center: [number, number];
  zoom: number;
  accessToken: string;
}

export interface MapMarker {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    title: string;
    description: string;
  };
}

export type MapInstance = Map; 