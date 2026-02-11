import { http, HttpResponse } from 'msw';
import { API_CONFIG } from '../config/constants';

// We need to resolve the URL. Since API_CONFIG uses import.meta.env,
// we might need to mock that if it's not available, but Vitest usually handles it.
// If BASE_URL is a relative path or absolute, we construct the full URL.

const getUrl = () => {
  const baseUrl = API_CONFIG.BASE_URL;
  const endpoint = API_CONFIG.ENDPOINTS.GENERATE_IDEAS;
  // Handle trailing/leading slashes to avoid double slashes
  const cleanBase = baseUrl.replace(/\/$/, '');
  const cleanEndpoint = endpoint.replace(/^\//, '');
  return `${cleanBase}/${cleanEndpoint}`;
};

export const handlers = [
  http.post(getUrl(), async () => {
    return HttpResponse.json({
      success: true,
      ideas: [
        {
          categoria: "Marketing",
          formato_sugerido: "Reels",
          titulo_gancho: "5 Tips para crecer en Instagram",
          descripcion_ejecucion: "Graba un video corto explicando..."
        },
        {
          categoria: "Ventas",
          formato_sugerido: "Carousel",
          titulo_gancho: "Cómo cerrar más ventas",
          descripcion_ejecucion: "Crea un carrusel con estos pasos..."
        }
      ]
    });
  }),
];
