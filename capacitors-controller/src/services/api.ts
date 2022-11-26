const prefix = "http://localhost:8000/api/v1/core";

export const api = {
  get: async (url: string) => {
    const response = await fetch(prefix + url);
    return await response.json();
  },
  post: async (url: string, params: unknown) => {
    const response = await fetch(prefix + url, {
      method: "POST",
      body: JSON.stringify(params),
    });
    return await response.json();
  },
};
