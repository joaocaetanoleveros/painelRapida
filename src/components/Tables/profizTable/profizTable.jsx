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
  
  export default function ProfizTable({ orders }) {
    const [arrayOfOrders, setArrayOfOrders] = useState([]);
  
    useEffect(() => {
      setArrayOfOrders(orders);
    }, [orders]);
  
    function openInNewTab(ticketId) {
      window
        .open(
          `https://www.vendas.leveros.com.br/wapstore/pedido/editar/${ticketId}`,
          "_blank"
        )
        .focus();
    }
  
    return (
      <>
        <Flex flexDir="column" w="100%" h="100%" maxH="70vh" minH="70vh">
          <Flex justify="center" padding="1rem" mb="0.8rem">
            <Text fontSize="2.8rem" fontWeight="bold" color="brand.P2">
              PEDIDOS PROFIZ
            </Text>
          </Flex>
          <TableContainer w="100%" h="100%" overflowY="scroll">
            <T variant="simple">
              <Thead position="sticky" top={0} zIndex="docked" bg="white">
                <Tr>
                  <Th>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>PEDIDO</Text>
                  </Th>
                  <Th>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      Data de Criação
                    </Text>
                  </Th>
                  <Th>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      Data de Aprovação
                    </Text>
                  </Th>
                  <Th>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>Valor</Text>
                  </Th>
  
                  <Th>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>Status</Text>
                  </Th>
  
                  <Th>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      BLOQUEIO
                    </Text>
                  </Th>
                  <Th>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      Tranportadora
                    </Text>
                  </Th>
                  <Th>
                    <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                      Previsão Entrega
                    </Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {arrayOfOrders == undefined ? (
                  <Tr>
                    <Td></Td>
                  </Tr>
                ) : (
                  arrayOfOrders.map((row, index) => (
                    <Tr
                      key={index}
                      _hover={{ bg: "brand.S1" }}
                      color={row.temBloqueio ? "red" : ""}
                      onClick={() => openInNewTab(row.idWebArt)}
                      cursor='pointer'
                    >
                      <Td>
                        <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                          {row.numeroPedido}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                          {row.dataEmissao}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                          {row.dataPedidoAprovado}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                          {parseFloat(row.valores.totalPedido).toLocaleString(
                            "pt-BR",
                            {
                              minimumFractionDigits: 2,
                              style: "currency",
                              currency: "BRL",
                            }
                          )}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                          {row.status.descricao}
                        </Text>
                      </Td>
                      <Td fontSize={{ base: "12px", "2xl": "14px" }}>
                        {row.bloqueios}
                      </Td>
                      <Td>
                        <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                          {String(row.frete.transportadora).toUpperCase()}
                        </Text>
                      </Td>
  
                      <Td>
                        <Text
                          fontWeight="bold"
                          color="blue"
                          fontSize={{ base: "12px", "2xl": "14px" }}
                        >
                          {row.previsaoEntrega}
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
  