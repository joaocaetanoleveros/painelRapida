import {
  Flex,
  Text,
  Input,
  Spinner,
  Button,
} from "@chakra-ui/react";
import Card from "../../components/Card/card";

import GlpiTable from "../../components/Tables/glpiTable/glpiTable";
import OrdersTable from "../../components/Tables/ordersTable/ordersTable";
import { Icon } from "@iconify/react";
import { fetchOrders } from "../../data/orders";
import { useEffect, useState } from "react";
import { getAllTickets } from "../../data/glpiData";
import { formatDate } from "../../data/date";

export default function Pedidos() {
  const [orders, setOrders] = useState([]);
  const [contador, setContador] = useState(0);
  const [contaRjESp, setContaRjESp] = useState([0, 0]);
  const [valorTotal, setValorTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [statesTickets, setStatesTickets] = useState([0, 0, 0, 0]);
  const [filter, setFilter] = useState("");
  const [tempOrders, setTempOrders] = useState([]);

  useEffect(() => {
    let rapidaArray = [];
    let contador = 0;
    let rj = 0;
    let sp = 0;
    let valorTotal = 0;
    let ticketsAbertos = 0;
    let ticketsForaDoPrazo = 0;
    let ticketsSolucionados = 0;
    let solucionadosForaDoPrazo = 0;
    async function init() {
      try {
        const data = await fetchOrders();
        console.log(data)
        data.forEach((order) => {
          order.authorizedDate = formatDateOrder(order.authorizedDate);
          if (order.shippingDateEstimate != null) {
            order.shippingDateEstimate = formatDateOrder(
              order.shippingDateEstimate
            );
          }
          rapidaArray.push(order);
          contador++;
          valorTotal +=
            parseFloat(order.totalDiscount) +
            parseFloat(order.totalItems) +
            parseFloat(order.totalShipping);

          if (String(order.deliveryCompany).includes("RJ")) {
            rj++;
          } else if (String(order.deliveryCompany).includes("SP")) {
            sp++;
          }
        });
        setOrders(rapidaArray);
        setTempOrders(rapidaArray);
        setContador(contador);
        setContaRjESp([sp, rj]);
        setValorTotal(valorTotal);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      await getAllTickets()
        .then((data) => {
  
          data.forEach((d) => {
            d.dataChamado = formatDate(d.dataChamado);
            d.deadLine = formatDate(d.deadLine);

            if (d.nomeChamado.length > 30) {
              d.nomeChamado = d.nomeChamado.substring(0, 80);
              if (d.nomeChamado.length > 80) {
                d.nomeChamado = d.nomeChamado + "...";
              }
            } else {
              d.nomeChamado = d.nomeChamado.substring(0, 30);
            }

            if (d.noPrazo == 0) {
              ticketsForaDoPrazo++;
              if (d.statusChamado == "Solucionado") {
                solucionadosForaDoPrazo++;
              }
            }

            if (d.statusChamado == "Solucionado") {
              ticketsSolucionados++;
            } else {
              ticketsAbertos++;
            }
          });

          setTickets(data);
          setStatesTickets([
            ticketsAbertos,
            ticketsForaDoPrazo,
            ticketsSolucionados,
            solucionadosForaDoPrazo,
          ]);
          setIsLoading(false);
          console.log(orders)
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error fetching SLAs:", error);
        });
    }
    init();
    return () => {};
  }, []);

  function formatDateOrder(orderDate) {
    const date = new Date(orderDate);
    const day = date.getDate().toString().padStart(2, 0);
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, 0);
    const minutes = date.getMinutes().toString().padStart(2, 0);
    const seconds = date.getSeconds().toString().padStart(2, 0);
    const formatedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formatedDate;
  }

  function filterAllOrders() {
    const filterOrder = tempOrders.filter((item) =>
      item.orderId.toLowerCase().includes(filter.toLowerCase())
    );
    if (filterOrder != "") {
      setOrders(filterOrder);
    } else {
      setOrders(tempOrders);
    }
  }

  return isLoading ? (
    <Flex
      bg="#EBECEC"
      height={{ base: "100%", md: "100%" }}
      minHeight="90vh"
      width="100%"
      flexDirection="column"
      maxHeight={{ "2xl": "90vh" }}
      align="center"
      justify="center"
    >
      <Spinner
        thickness="1rem"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        h="10rem"
        w="10rem"
      />
    </Flex>
  ) : (
    <Flex
      bg="#EBECEC"
      color="black"
      height={{ base: "100%", md: "100%" }}
      minHeight="90vh"
      width="100%"
      flexDirection="column"
      padding="1rem 2rem"
      gap={{ base: "2rem" }}
      maxHeight={{ "2xl": "90vh" }}
    >
      <Flex
        gap={{ base: "1rem" }}
        flexDirection={{ base: "column", md: "row" }}
        justify={{ md: "space-between" }}
      >
        <Flex
          gap={{ base: "0.5rem", md: "1rem" }}
          justifyContent="space-between"
        >
          <Card>
            <Flex
              flexDirection="column"
              align="center"
              padding={{ base: "0.2rem 0.4rem", md: "1rem" }}
              justify="space-around"
            >
              <Text fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}>
                Tickets Abertos
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {statesTickets[0]}
              </Text>
            </Flex>
          </Card>
          <Card>
            <Flex
              flexDirection="column"
              align="center"
              padding={{ base: "0.2rem 0.4rem", md: "1rem" }}
              justify="space-around"
            >
              <Text fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}>
                Tickets Fora do Prazo
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {statesTickets[1]}
              </Text>
            </Flex>
          </Card>

          <Card>
            <Flex
              flexDirection="column"
              align="center"
              padding={{ base: "0.2rem 0.4rem", md: "1rem" }}
              justify="space-around"
            >
              <Text fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}>
                Solucionados
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {statesTickets[2]}
              </Text>
            </Flex>
          </Card>
          <Card>
            <Flex
              flexDirection="column"
              align="center"
              padding="0.2rem 0.4rem"
              justify="space-around"
            >
              <Text fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}>
                Solucionados Fora do Prazo
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {statesTickets[3]}
              </Text>
            </Flex>
          </Card>
        </Flex>
        <Flex
          gap={{ base: "0.5rem", md: "1rem" }}
          justifyContent="space-between"
        >
          <Card>
            <Flex
              flexDirection="column"
              align="center"
              padding={{ base: "0.2rem 0.4rem", md: "1rem" }}
              justify="space-around"
            >
              <Text fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}>
                Qtde. Pedidos (SP)
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {contaRjESp[0]}
              </Text>
            </Flex>
          </Card>
          <Card>
            <Flex
              flexDirection="column"
              align="center"
              padding={{ base: "0.2rem 0.4rem", md: "1rem" }}
              justify="space-around"
            >
              <Text fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}>
                Qtde. Pedidos (RJ)
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {contaRjESp[1]}
              </Text>
            </Flex>
          </Card>

          <Card>
            <Flex
              flexDirection="column"
              align="center"
              padding={{ base: "0.2rem 0.4rem", md: "1rem" }}
              justify="space-around"
            >
              <Text fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}>
                Quantidade de Pedidos
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {contador}
              </Text>
            </Flex>
          </Card>
          <Card>
            <Flex
              flexDirection="column"
              align="center"
              padding={{ base: "0.2rem 0.4rem", md: "1rem" }}
              justify="space-around"
            >
              <Text fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}>
                Total de Vendas
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {valorTotal.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </Flex>
          </Card>
          {/* <Card>
            <Flex
              flexDirection="column"
              align="center"
              padding="0.2rem 0.4rem"
              justify="space-around"
            >
              <Text fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}>
                Tempo médio de Integração
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                0
              </Text>
            </Flex>
          </Card> */}
        </Flex>
      </Flex>
      <Flex
        h={{ base: "100%", md: "200px", xl: "280px", "2xl": "100%" }}
        flexDir="column"
        gap="1rem"
      >
        <Flex justify="space-between">
          <Flex w="20%" gap="1rem">
            <Input
              bg="white"
              fontSize="1.2rem"
              height="4rem"
              w="80%"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              focusBorderColor="brand.S3"
              type="text"
              placeholder="Digite aqui o número do pedido"
            />
            <Button
              onClick={() => filterAllOrders()}
              h="4rem"
              w="20%"
              bg="brand.P1"
              color="white"
              _hover={{ bg: "brand.P2" }}
              onKeyUpCapture={(e) => (e.key === 13 ? filterAllOrders() : "")}
            >
              <Icon icon="material-symbols:search" fontSize="1.6rem" />
            </Button>
          </Flex>
          {/* <Flex>
            <Button
              bg="brand.P1"
              color="white"
              _hover={{ bg: "brand.P2" }}
              w="70px"
              size="lg"
            >
              Baixar
            </Button>
          </Flex> */}
        </Flex>
        <Flex>
          <Card width="100%">
            <OrdersTable orders={orders} />
          </Card>
        </Flex>
      </Flex>
      <Flex w="100%" flexDirection="column">
        <Flex>
          <Card width="100%" height="100%">
            <GlpiTable allTickets={tickets} />
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
}
