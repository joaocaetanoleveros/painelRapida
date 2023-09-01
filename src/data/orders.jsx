import axios from "axios";

export async function fetchOrders() {
  return await axios
    .get(
      "https://apiv2.leveros.com.br/panel/index"
    )
    .then((response) => response.data)
    .catch((error) => {
      // Handle any errors
      console.error("Error fetching SLAs:", error);
      throw error;
    });
}