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
  callServicePostWithFormData: async (url, formData) => {
    try {
      const response = await fetch(apiUrl + url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in PUT request with FormData:", error);
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
  callServicePutWithFormData: async (url, formData) => {
    try {
      const response = await fetch(apiUrl + url, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in PUT request with FormData:", error);
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
