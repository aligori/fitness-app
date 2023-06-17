import {API_URL} from "../../constants";

export const API = {
  get: async (uri, params) => {
    const url = `${API_URL}${uri}?` + new URLSearchParams(params)
    const user = JSON.parse(localStorage.getItem('auth'))?.user

    const response = await fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "user_id": user?.id
      },
    });

    return response.json();
  },
  post: async (uri, payload) => {
    try {
      const user = JSON.parse(localStorage.getItem('auth'))?.user

      const response = await fetch(`${API_URL}${uri}`, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "user_id": user?.id
        },
        body: JSON.stringify(payload),
      });
      return response.json();
    } catch (err) {
      throw err
    }
  }
}