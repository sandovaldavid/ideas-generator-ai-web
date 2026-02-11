import { useMutation } from '@tanstack/react-query';
import { API_CONFIG, MESSAGES } from '../config/constants';
import type { Idea, BackendApiResponse } from '../types';

interface GenerateIdeasParams {
  businessType: string;
}

const fetchIdeas = async ({ businessType }: GenerateIdeasParams): Promise<Idea[]> => {
  if (!businessType.trim()) {
    throw new Error(MESSAGES.EMPTY_INPUT);
  }

  const apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE_IDEAS}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ businessType: businessType.trim() }),
    });

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const data: BackendApiResponse = await response.json();

    if (data.success && data.ideas && Array.isArray(data.ideas)) {
       return data.ideas.map((idea, index) => ({
          id: Date.now() + index,
          title: idea.titulo_gancho,
          description: idea.descripcion_ejecucion,
          category: `${idea.categoria} | ${idea.formato_sugerido}`,
        }));
    } else {
      throw new Error(MESSAGES.ERROR_INVALID_RESPONSE);
    }
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error(MESSAGES.ERROR_CONNECTION);
  }
};

export const useIdeasGenerator = () => {
  const mutation = useMutation({
    mutationFn: fetchIdeas,
  });

  return {
    generateIdeas: mutation.mutate,
    ideas: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error ? (mutation.error instanceof Error ? mutation.error.message : MESSAGES.ERROR_CONNECTION) : null,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
