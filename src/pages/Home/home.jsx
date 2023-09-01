import {
  Flex,
  List,
  ListItem,
  Box,
  Text,
  Grid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import Card from "../../components/Card/card";
import { useState, useEffect } from "react";
import { init } from "../../data/homeData";
import VerticalBarChart from "../../components/Charts/VerticalBar";

export default function Home() {
  const [estadosDosCanais, setEstadosDosCanais] = useState([0, 0, 0, 0]);
  const [orderData, setOrderData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalVendas, setTotalVendas] = useState(0);
  const [contadorVendas, setContadorVendas] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  

  function clearVariables() {
    setEstadosDosCanais([0, 0, 0, 0]);
    setOrderData([]);
    setGraphData([]);
    setOrders([]);
    setTotalVendas(0);
    setContadorVendas(0);
    setIsLoading(true);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        
        const data = await init();
        const company = data[0].map((order) => ({
          label: order.fullNameCompany,
          value: parseFloat(order.totalValue.replace(/[R$.]/g, "")),
          color: order.color,
        }));

        setOrderData(data);
    
        setGraphData(company);
        setOrders(data[0]);
        setTotalVendas(data[2]);
        setContadorVendas(data[3]);
        setEstadosDosCanais([
          {
            valor: data[1][0],
            nome: "Normal",
            cor: "#005A64",
          },
          {
            valor: data[1][1],
            nome: "Atenção",
            cor: "#FFCE00",
          },
          {
            valor: data[1][2],
            nome: "Perigo",
            cor: "#FF0000",
          },
          { valor: data[1][3], nome: "Todos", cor: "black" },
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    setTimeout(() => {
      window.location.reload();
    }, 480000);
    return clearVariables();
  }, []);

  function organizarCards(estadoDoCard) {
    let manipularArrays = [];
    setOrders(orderData[0]);


    if (estadoDoCard === "Normal") {
      orderData[0].forEach((order) => {

        if (order.timeElapsed[0][1]) {
          manipularArrays.push(order);
        }
      });
    } else if (estadoDoCard === "Atenção") {
      orderData[0].forEach((order) => {
        if (order.timeElapsed[0][2]) {
          manipularArrays.push(order);
        }
      });
    } else if (estadoDoCard === "Perigo") {
      orderData[0].forEach((order) => {
        if (order.timeElapsed[0][3]) {
          manipularArrays.push(order);
        }
      });
    } else {
      setOrders(orderData[0]);
      return;
    }

    setOrders(manipularArrays);

    return;
  }

  return isLoading ? (
    <Flex
      justify="center"
      align="center"
      height={{ base: "100%", md: "100%" }}
      minHeight="90vh"
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
      gap={{ base: "1rem" }}
    >
      <Flex
        flexDirection={{ base: "row", pedrao: "column" }}
        gap={{ base: "1rem" }}
        h={{ base: "20%", pedrao: "100%" }}
      >
        <Flex
          gap={{ base: "1rem" }}
          flexDirection={{ base: "column", md: "column", pedrao: "row" }}
          justify={{ md: "space-between" }}
        >
          <Flex
            gap={{ base: "0.5rem", md: "1rem" }}
            justifyContent="space-between"
            hideBelow="1919px"
          >
            <Card>
              <Flex>
                <List display="flex" gap={{ base: "1rem", md: "1rem" }}>
                  {estadosDosCanais.map((a, index) => {
                    return (
                      <ListItem
                        display="flex"
                        key={index}
                        flexDirection="column"
                        alignItems="center"
                        padding={{ base: "0.6rem 0.4rem", md: "1rem" }}
                        onClick={() => organizarCards(a.nome)}
                        cursor="pointer"
                      >
                        <Box
                          color={a.cor}
                          fontSize={{ base: "1.2rem", md: "2rem" }}
                          fontWeight="bold"
                        >
                          {a.valor}
                        </Box>
                        <Box
                          fontSize={{
                            base: "0.8rem",
                            md: "1rem",
                            lg: "1.2rem",
                          }}
                        >
                          {a.nome}
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              </Flex>
            </Card>
          </Flex>

          <Flex
            gap={{ base: "1rem" }}
            justifyContent="space-between"
            flexDirection={{ base: "column", pedrao: "row" }}
            h='100%'
          >
            <Flex hideFrom='1920px'>
              <Card>
                <Flex>
                  <List display="flex" gap={{ base: "1rem", md: "1rem" }}>
                    {estadosDosCanais.map((a, index) => {
                      return (
                        <ListItem
                          display="flex"
                          key={index}
                          flexDirection="column"
                          alignItems="center"
                          padding={{ base: "0.6rem 0.4rem", md: "1rem" }}
                          onClick={() => organizarCards(a.nome)}
                          cursor="pointer"
                        >
                          <Box
                            color={a.cor}
                            fontSize={{ base: "1.2rem", md: "2rem" }}
                            fontWeight="bold"
                          >
                            {a.valor}
                          </Box>
                          <Box
                            fontSize={{
                              base: "0.8rem",
                              md: "1rem",
                              lg: "1.2rem",
                            }}
                          >
                            {a.nome}
                          </Box>
                        </ListItem>
                      );
                    })}
                  </List>
                </Flex>
              </Card>
            </Flex>
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
                <Text
                  fontSize={{ base: "1.2rem", md: "2rem" }}
                  fontWeight="bold"
                >
                  {contadorVendas}
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
                <Text
                  fontSize={{ base: "1.2rem", md: "2rem" }}
                  fontWeight="bold"
                >
                  {totalVendas}
                </Text>
              </Flex>
            </Card>
          </Flex>
        </Flex>
        <Flex
          h={{ base: "100%", md: "200px", xl: "250px", "2xl": "100%" }}
          w="100%"
        >
          <Card width="100%">
            <VerticalBarChart data={graphData} />
          </Card>
        </Flex>
      </Flex>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
          xl: "repeat(8, 1fr)",
          "2xl": "repeat(9, 1fr)",
          pedrao: "repeat(10, 1fr)",
        }}
        gap="0.5rem"
        width="100%"
        rowGap="1rem"
        justifyItems="center"
        h="50%"
      >
        {!orders
          ? ""
          : orders.map((order, key) => {
              return (
                <GridItem key={key}>
                  <Card
                    height={{ base: "145px", md: "130px" }}
                    width={{ base: "170px", md: "160px" }}
                  >
                    <Flex
                      color={
                        order.timeElapsed[0][2]
                          ? "#DCB200 !important"
                          : order.timeElapsed[0][3]
                          ? "red !important"
                          : "brand.P1"
                      }
                      flexDirection="column"
                      gap="0.8rem"
                      padding="1rem"
                      fontSize={{ md: "1.1rem" }}
                      w={"100%"}
                    >
                      <Text
                        textAlign="center"
                        fontWeight="bold"
                        fontSize={{ base: "1.2rem", md: "1.2rem" }}
                      >
                        {order.fullNameCompany}
                      </Text>
                      <Flex justify="space-between">
                        <Flex
                          gap="1rem"
                          borderBottom="1px solid"
                          borderColor={
                            order.timeElapsed[0][2]
                              ? "#DCB200 !important"
                              : order.timeElapsed[0][3]
                              ? "red !important"
                              : "brand.P1"
                          }
                        >
                          <Text>Nº Pedidos</Text>
                          <Text fontWeight="bold">{order.cont}</Text>
                        </Flex>
                        <Flex fontSize="1.1rem">{order.timeElapsed[0]}</Flex>
                      </Flex>
                      <Flex
                        justify="space-between"
                        borderBottom="1px solid"
                        borderColor={
                          order.timeElapsed[0][2]
                            ? "#DCB200 !important"
                            : order.timeElapsed[0][3]
                            ? "red !important"
                            : "brand.P1"
                        }
                      >
                        <Text>Último Ticket</Text>
                        <Text fontWeight="bold">{order.lastTicket}</Text>
                      </Flex>
                      <Flex
                        justify="space-between"
                        borderBottom="1px solid"
                        borderColor={
                          order.timeElapsed[0][2]
                            ? "#DCB200 !important"
                            : order.timeElapsed[0][3]
                            ? "red !important"
                            : "brand.P1"
                        }
                      >
                        <Text>Ticket Médio</Text>
                        <Text fontWeight="bold">{order.mediumTicket}</Text>
                      </Flex>
                      <Flex
                        justify="space-between"
                        borderBottom="1px solid"
                        borderColor={
                          order.timeElapsed[0][2]
                            ? "#DCB200 !important"
                            : order.timeElapsed[0][3]
                            ? "red !important"
                            : "brand.P1"
                        }
                      >
                        <Text>Total</Text>
                        <Text fontWeight="bold">{order.totalValue}</Text>
                      </Flex>
                    </Flex>
                  </Card>
                </GridItem>
              );
            })}
      </Grid>
    </Flex>
  );
}
