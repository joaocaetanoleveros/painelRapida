import axios from "axios";

export async function fetchEntitiesTickets() {
  return await axios
    .get(
      "https://leverosintegra.dev.br/api/vtexServices/glpi/comprouChegou/all"
    )
    .then((response) => response.data)
    .catch((error) => {
      // Handle any errors
      console.error("Error fetching SLAs:", error);
      throw error;
    });
}

export async function getAllTickets() {
  const allTickets = await fetchEntitiesTickets();

  const arrayOfTickets = [];
  // const LeverosInitCicle = new Date("2023-08-15").getTime();
  if (allTickets[0]) {
    allTickets[0].map((ticket) => {
      arrayOfTickets.push(ticket);
    });
  }

  return arrayOfTickets;
}
