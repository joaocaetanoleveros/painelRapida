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

export default function OrdersTable({ orders }) {
  const [arrayOfOrders, setArrayOfOrders] = useState([]);


  useEffect(() => {
    setArrayOfOrders(orders);
  }, []);

  useEffect(() => {
    setArrayOfOrders(orders);
  }, [orders]);

  return (
    <>
      <Flex flexDir="column" w="100%" h="100%" maxH="40vh" minH="30vh">
        <Flex justify="center" padding="1rem" mb="0.8rem">
          <Text fontSize="2.8rem" fontWeight="bold" color="brand.P2">
            PEDIDOS COMPROU CHEGOU
          </Text>
        </Flex>
        <TableContainer w="100%" h="100%" overflowY="scroll">
          <T variant="simple">
            <Thead position="sticky" top={0} zIndex="docked" bg='white'>
              <Tr>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                    Pedido
                  </Text>
                </Th>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                    Data de Criação
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
                    Tranportadora
                  </Text>
                </Th>
                <Th>
                  <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                    Tipo Frete
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
                  <Tr key={index}  _hover={{ bg: "brand.S1" }}>
                    <Td>
                      <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                        {row.orderId}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                        {row.authorizedDate}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                        {(
                          parseFloat(row.totalDiscount) +
                          parseFloat(row.totalItems) +
                          parseFloat(row.totalShipping)
                        ).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                        {row.statusDescription}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                        {row.deliveryCompany}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                        {String(row.selectedSla).slice(0, 27)}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={{ base: "12px", "2xl": "14px" }}>
                        {row.shippingDateEstimate}
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
