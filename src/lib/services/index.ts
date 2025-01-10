const API_URL = import.meta.env.PUBLIC_API_URL;

export const fetchNews = async () => {
  const response = await fetch(`${API_URL}/news`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
};

export const fetchNewsById = async (id: number) => {
  const response = await fetch(`${API_URL}/news/${id}`);
  if (!response.ok) throw new Error('Failed to fetch news item');
  return response.json();
};

export const fetchStatistics = async () => {
  const response = await fetch(`${API_URL}/statistics`);
  if (!response.ok) throw new Error('Failed to fetch statistics');
  return response.json();
};

export const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

export const fetchProjectById = async (id: number) => {
  const response = await fetch(`${API_URL}/projects/${id}`);
  if (!response.ok) throw new Error('Failed to fetch project');
  return response.json();
};

export const fetchRoutes = async () => {
  const response = await fetch(`${API_URL}/routes`);
  if (!response.ok) throw new Error('Failed to fetch routes');
  return response.json();
};

export const fetchAnalysis = async () => {
  const response = await fetch(`${API_URL}/analysis`);
  if (!response.ok) throw new Error('Failed to fetch analysis');
  return response.json();
}; 