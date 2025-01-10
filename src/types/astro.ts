export interface AstroGlobal {
  request: Request;
  params: Record<string, string>;
  props: Record<string, unknown>;
  redirect(path: string): Response;
  response: Response;
} 