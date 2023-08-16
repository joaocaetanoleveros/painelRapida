import {
  TableContainer,
  Table as T,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatDate } from "../../../data/date";
import { getAllTickets } from "../../../data/glpiData";

export default function GlpiTable() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    getAllTickets()
      .then((data) => {
        let alltickets;
        console.log(data);
        data.forEach((d) => {
          d.dataChamado = formatDate(d.dataChamado);
          d.deadLine = formatDate(d.deadLine);
          alltickets = data;
          if (d.nomeChamado.length > 30) {
            d.nomeChamado = d.nomeChamado.substring(0, 80);
            if(d.nomeChamado.length > 80){
                d.nomeChamado = d.nomeChamado + "...";
            }
          } else {
            d.nomeChamado = d.nomeChamado.substring(0, 30);
          }
        });

        setTickets(alltickets);
        setIsLoading(false)
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching SLAs:", error);
      });

  }, []);

  function openInNewTab(ticketId) {
    window
      .open(
        `http://34.68.83.67/glpi/front/ticket.form.php?id=${ticketId}`,
        "_blank"
      )
      .focus();
  }


  return (
    <>
      <Flex flexDir="column" w="100%" h="100%">
        <Flex
          display={isLoading ? "flex" : "none"}
          justify="center"
          align="center"
          w="100%"
          h="100%"
        >
          <Spinner
            thickness="8px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.P2"
            height={70}
            width={70}
          />
        </Flex>
        <TableContainer
          w="100%"
          h="100%"
          overflowY="scroll"
          display={!isLoading ? "" : "none"}
        >
          <T variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>Código</Text>
                </Th>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                    Assunto
                  </Text>
                </Th>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                    Status
                  </Text>
                </Th>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                    Entidade
                  </Text>
                </Th>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>Grupo</Text>
                </Th>
                <Th hideBelow={"2xl"}>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                    Atribuido para
                  </Text>
                </Th>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>Prazo</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {tickets.map((row, index) => (
                <Tr
                  key={index}
                  cursor="pointer"
                  onClick={() => openInNewTab(row.numeroChamado)}
                  _hover={{ bg: "brand.S1" }}
                >
                  <Td>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      {row.numeroChamado}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      {row.nomeChamado}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      {row.statusChamado}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      {row.entidade}
                    </Text>
                  </Td>
                  <Th>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      {row.id_grupo === 2
                        ? "Infra"
                        : row.id_grupo === 4
                        ? "SAP"
                        : row.entidade === "Tecnologia da Informação"
                        ? "Sistemas"
                        : row.entidade === "BI - Business Intelligence"
                        ? "BI"
                        : ""}
                    </Text>
                  </Th>
                  <Td hideBelow={"2xl"}>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      {row.atendente}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      {row.deadLine}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </T>
        </TableContainer>
      </Flex>
    </>
  );
}
