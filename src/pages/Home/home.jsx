import {
  Flex,
  List,
  ListItem,
  Box,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Card from "../../components/Card/card";
import { useState, useEffect } from "react";
import { alertaDeCanais, dadosDeVendas, init } from "../../data/homeData";
import VerticalBarChart from "../../components/Charts/VerticalBar";

export default function Home() {
  const [estadosDosCanais, setEstadosDosCanais] = useState([1, 2, 4, 5]);
  const [pedidosPorEstado, setPedidosPorEstado] = useState([200, 400]);
  const [totalDeVendas, setTotalDeVendas] = useState(10000000000000);
  const [tempoMedioIntegracao, setTempoMedioIntegracao] = useState("00:00:00");
  const [tempHolderOfOrders, setTempHolderOfOrders] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [all, setAll] = useState(0);
  const [normal, setNormal] = useState(0);
  const [warning, setWarning] = useState(0);
  const [danger, setDanger] = useState(0);
  const [renderOnce, setRenderOnce] = useState(0);

  window.;
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await init();
        const company = data.map(order => ({
          label: order.fullNameCompany,
          value: parseFloat(order.totalValue.replace(/[R$]/g, "")),
        }));
        
        setOrderData(data);
        setGraphData(company);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);




  // useEffect(() => {
  //   setEstadosDosCanais([normal, warning, danger, normal + warning + danger]);
  //   // // console.log(estadosDosCanais)
  // }, [normal, warning, danger]);

  const teste = [
    { label: "SITE", value: 239000.39 },
    { label: "AMAZON", value: 344907.18 },
    { label: "MAGAZINE LUIZA", value: 216978.17 },
    { label: "B2W", value: 35203.02 },
    { label: "MELI CLÁSSICO", value: 77795.56 },
    { label: "MELI PREMIUM", value: 73688.46 },
    { label: "C-NOVA", value: 57433.62 },
    { label: "BALAROTI", value: 7117.58 },
    { label: "CAMICADO", value: 3693.21 },
    { label: "CARREFOUR", value: 1873.56 },
    { label: "DAIKIN", value: 38868.28 },
    { label: "PROFIZ", value: 13583.77 },
    { label: "LVI 2.0", value: 77795.56 },
    { label: "LVI WA", value: 344907.18 },
  ];

  const [showAll, setShowAll] = useState(false);

  function showAllArrays() {
    if (showAll === false) {
      setShowAll(true);
      ruleOfShowingArrays();
    } else {
      setShowAll(false);
      ruleOfShowingArrays();
    }
  }

  function ruleOfShowingArrays() {
    let mostImportantOrders;

    if (showAll === false) {
      mostImportantOrders = orderData.filter(
        (order) =>
          order.fullNameCompany === "SITE" ||
          order.fullNameCompany === "AMAZON" ||
          order.fullNameCompany === "B2W" ||
          order.fullNameCompany === "MAGAZINE LUIZA" ||
          order.fullNameCompany === "MELI CLÁSSICO" ||
          order.fullNameCompany === "MELI PREMIUM" ||
          order.fullNameCompany === "C-NOVA"
      );
      setOrderData(mostImportantOrders);
    } else {
      setOrderData(tempHolderOfOrders);
    }
  }

  return (
    <Flex
      bg="brand.mainBG"
      color="black"
      height={{ base: "100%", md: "100%" }}
      minHeight="90vh"
      width="100%"
      flexDirection="column"
      padding="1rem 2rem"
      gap={{ base: "1rem" }}
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
            <Flex>
              <List display="flex" gap={{ base: "1rem", md: "1.5rem" }}>
                {alertaDeCanais.map((a, index) => {
                  return (
                    <ListItem
                      display="flex"
                      key={index}
                      flexDirection="column"
                      alignItems="center"
                      padding={{ base: "0.6rem 0.4rem", md: "1rem" }}
                    >
                      <Box
                        color={a.cor}
                        fontSize={{ base: "1.2rem", md: "2rem" }}
                        fontWeight="bold"
                      >
                        {a.valor}
                      </Box>
                      <Box
                        fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}
                      >
                        {a.nome}
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
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
                Qtde. Pedidos (SP)
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {pedidosPorEstado[0]}
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
                {pedidosPorEstado[1]}
              </Text>
            </Flex>
          </Card>
        </Flex>

        <Flex gap={{ base: "0.5rem" }} justifyContent="space-between">
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
                {totalDeVendas.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  style: "currency",
                  currency: "BRL",
                })}
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
                Tempo Médio de Integração
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {tempoMedioIntegracao}
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Flex>
      <Flex h={{ base: "100%", md: "200px", xl: "280px", "2xl": "100%" }}>
        <Card width="100%">
          <VerticalBarChart data={graphData} />
        </Card>
      </Flex>
      <Grid
        column
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
          xl: "repeat(6, 1fr)",
          "2xl": "repeat(8, 1fr)",
        }}
        gap="0.5rem"
        width="100%"
      >
        {orderData.map((order, index) => {
          return (
            <GridItem width="100%" key={index}>
              <Card
                height={{ base: "145px", md: "160px" }}
                width={{ base: "170px", md: "195px" }}
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
                  fontSize={{ md: "1.2rem" }}
                  w={"100%"}
                >
                  <Text
                    textAlign="center"
                    fontWeight="bold"
                    fontSize={{ base: "1.2rem", md: "1.6rem" }}
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
                    <Flex fontSize="1.2rem">{order.timeElapsed[0]}</Flex>
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
