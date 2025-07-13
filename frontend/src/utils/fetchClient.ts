const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
};

export async function fetchClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body } = options;

  const isFormData = body instanceof FormData;

  const config: RequestInit = {
    method,
    headers: isFormData
      ? headers
      : {
        'Content-Type': 'application/json',
        ...headers,
      },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Network error');
  }

  if (response.status === 204) return null as T;

  return response.json() as Promise<T>;
}
