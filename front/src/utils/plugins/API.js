import {API_URL} from "../../constants";

export const API = {
  get: async (uri, params) => {
    const url = `${API_URL}${uri}?` + new URLSearchParams(params)

    const response = await fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
    });

    return response.json();
  },
  post: async (uri, payload) => {
    try {
      const response = await fetch(`${API_URL}${uri}`, {
        method: "POST",
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return response.json();
    } catch (err) {
      throw err
    }
  }
}