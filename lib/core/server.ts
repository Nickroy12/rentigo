const baseUrl = process.env.NEXT_BASE_URL || '';

export const serverMutation = async <T = unknown, U = unknown>(
  path: string, 
  data: U, 
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json() as Promise<T>;
};

export const serverFetch = async <T = unknown>(path: string): Promise<T | Record<string, never>> => {
  try {
    const res = await fetch(`${baseUrl}${path}`);
    return await res.json() as T;
  } catch (error) {
    console.error(error);
    return {};
  }
};