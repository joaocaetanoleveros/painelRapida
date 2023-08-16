import axios from "axios";

export async function fetchEntitiesTickets() {
    const initDate = "2023-08-01";
    const endDate = "2030-12-31";
    return await axios
      .get("https://leverosintegra.dev.br/api/vtexServices/glpi/entities/all",{
        params: { initDate, endDate },
      })
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
    const LeverosInitCicle = new Date("2023-08-15").getTime();

  
    allTickets[0].map((ticket) => {
      if (ticket.statusChamado !== "Solucionado") {
        arrayOfTickets.push(ticket);
      }
  
      if (
        new Date(ticket.dataResolucao).getTime() >= LeverosInitCicle
      ) {
        arrayOfTickets.push(ticket);
      }
    });

    return arrayOfTickets;
  }