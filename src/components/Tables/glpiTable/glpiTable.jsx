import {
  TableContainer,
  Table as T,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,

  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";


export default function GlpiTable({allTickets}) {
  const [tickets, setTickets] = useState([]);


  useEffect(() => {
    setTickets(allTickets)

  }, [allTickets]);

  function openInNewTab(ticketId) {
    window
      .open(
        `http://34.68.83.67/glpi/front/ticket.form.php?id=${ticketId}`,
        "_blank"
      )
      .focus();
  }

  return  (
 
    <>
      <Flex flexDir="column" w="100%" h="100%" maxH='40vh' minH="30vh">
        
        <Flex justify="center" padding="1rem" mb="0.8rem">
          <Text fontSize="2.8rem" fontWeight="bold" color="brand.P2">
            CHAMADOS GLPI
          </Text>
        </Flex>
        <TableContainer
          w="100%"
          h="100%"
          overflowY="scroll"
       
        >
          <T variant="simple">
            <Thead position="sticky" top={0} zIndex="docked" bg='white'>
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
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>Status</Text>
                </Th>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                    Entidade
                  </Text>
                </Th>

                <Th >
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                    Atribuido para
                  </Text>
                </Th>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                    Aberto em
                  </Text>
                </Th>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>Prazo</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {tickets == undefined ? (
                <Tr>
                  <Td></Td>
                </Tr>
              ) : (
                tickets.map((row, index) => (
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
                    <Td >
                      <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                        {row.atendente}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                        {row.dataChamado}
                      </Text>
                    </Td>

                    <Td>
                      <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                        {row.deadLine}
                      </Text>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </T>
        </TableContainer>
      </Flex>
    </>
  );
}
