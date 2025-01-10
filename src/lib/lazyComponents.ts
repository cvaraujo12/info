import { lazy } from 'react';

// Maps
export const InteractiveMap = lazy(() => import('../components/maps/InteractiveMap'));
export const MapSearch = lazy(() => import('../components/maps/MapSearch'));
export const MapDetails = lazy(() => import('../components/maps/MapDetails'));
export const MapControls = lazy(() => import('../components/maps/MapControls'));
export const MapLegend = lazy(() => import('../components/maps/MapLegend'));

// Charts
export const LineChart = lazy(() => import('../components/charts/LineChart'));

// Sections
export const NewsSection = lazy(() => import('../components/sections/NewsSection'));
export const StatisticsSection = lazy(() => import('../components/sections/StatisticsSection'));
export const ProjectsSection = lazy(() => import('../components/sections/ProjectsSection')); 