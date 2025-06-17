import service from "./constant";

//apiUrl
const apiUrl = service.API_URL;

export const ApiServices = {
  callServicePostWithBodyData: async (URL, apiBody) => {
    try {
      const response = await fetch(apiUrl + URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiBody),
      });
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  },
  callServicePutWithBodyData: async (URL, apiBody) => {
    try {
      const response = await fetch(apiUrl + URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiBody),
      });
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  },
  callServiceGet: async (URL) => {
    try {
      const response = await fetch(apiUrl + URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  },
  callServiceDelete: async (URL) => {
    try {
      const response = await fetch(apiUrl + URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
