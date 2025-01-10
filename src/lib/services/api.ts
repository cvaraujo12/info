import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema';
import type { ApiResponse, News } from '../../types/api';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite, { schema });

interface NewsRow {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  source: string;
  category: string;
  image_url: string | null;
}

function mapNewsRow(row: NewsRow): News {
  const { image_url, ...rest } = row;
  return {
    ...rest,
    imageUrl: image_url || undefined
  };
}

export async function fetchProjects() {
  try {
    return await db.select().from(schema.projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function fetchNews(): Promise<News[]> {
  try {
    const stmt = sqlite.prepare('SELECT * FROM news');
    const rows = stmt.all() as NewsRow[];
    return rows.map(mapNewsRow);
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function fetchNewsById(id: number): Promise<ApiResponse<News | null>> {
  try {
    const stmt = sqlite.prepare('SELECT * FROM news WHERE id = ?');
    const row = stmt.get(id) as NewsRow | undefined;
    
    if (!row) {
      return {
        data: null,
        error: 'Notícia não encontrada',
        status: 404
      };
    }

    return {
      data: mapNewsRow(row),
      status: 200
    };
  } catch (error) {
    console.error('Error fetching news by id:', error);
    return {
      data: null,
      error: 'Erro ao buscar notícia',
      status: 500
    };
  }
}

export async function fetchRoutes() {
  try {
    return await db.select().from(schema.routes);
  } catch (error) {
    console.error('Error fetching routes:', error);
    return [];
  }
}

export async function fetchStatistics() {
  try {
    return await db.select().from(schema.statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return [];
  }
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContact(data: ContactForm) {
  try {
    // Aqui você pode implementar a lógica para salvar o contato
    // Por exemplo, enviar um email, salvar no banco de dados, etc.
    console.log('Contact form submitted:', data);
    
    // Por enquanto, vamos apenas simular um sucesso
    return {
      success: true,
      message: 'Mensagem enviada com sucesso!'
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'Erro ao enviar mensagem. Tente novamente mais tarde.'
    };
  }
} 