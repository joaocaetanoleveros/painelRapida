import { Flex, Text, Input, Spinner, Button } from "@chakra-ui/react";
import Card from "../../components/Card/card";
import { Icon } from "@iconify/react";
import { fetchOrders } from "../../data/webArtData_v2";
import { useEffect, useState } from "react";
import WebArtTable from "../../components/Tables/webArtTable/webartTable_v2";

export default function WebArt() {
  const [orders, setOrders] = useState([]);
  const [contador, setContador] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [valorTotal, setValorTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [tempOrders, setTempOrders] = useState([]);
  const [totalPendente, setTotalPendente] = useState(0);

  useEffect(() => {
    let pedidos = 0;
    let valorTotal = 0;
    let cancelados = 0;
    let bloqueios = 0;
    let aguardando = 0;
    let totalPendente = 0;
    async function init() {
      try {
        let pedidosArray = [];
        let data = await fetchOrders();

        data.forEach((d) => {
          d.forEach((o) => {
            pedidos++;

            if (o != undefined) {
              if (!o.status.descricao.includes("Cancelado")) {
                valorTotal += o.valores.totalPedido;
                pedidosArray.push(o);
                if (
                  o.status.descricao.includes("Parcialmente") ||
                  o.status.descricao == "Aguardando Pagamento"
                ) {
                  aguardando++;
                  totalPendente += o.valores.totalPedido;
                }
              } else {
                cancelados++;
              }
            }
          });
          pedidosArray.forEach((o) => {
            if (o != undefined) {
              o.idWebArt = o.numeroPedido.slice(4, 8);

              if (o.bloqueios.length > 0) {
                if (o.bloqueios.length < 1) {
                  if (o.status != "aprovado") {
                    o.bloqueios =
                      o.nomeBloqueio + " - " + o.descricaoTipoBloqueio;
                    bloqueios++;
                    o.temBloqueio = true;
                  } else {
                    o.bloqueios = "";
                    o.temBloqueio = false;
                  }
                } else {
                  try {
                    o.bloqueios.forEach((b) => {
                      if (b.status != "aprovado") {
                        o.bloqueios =
                          b.nomeBloqueio + " - " + b.descricaoTipoBloqueio;
                        bloqueios++;
                        o.temBloqueio = true;
                      } else {
                        o.bloqueios = "";
                        o.temBloqueio = false;
                      }
                    });
                  } catch (error) {
                    console.log(error);
                    console.log(o.numeroPedido);
                  }
                }
              }

              if (o.historico.length > 0) {
                o.historico.forEach((h) => {
                  if (h.idStatus === 3) {
                    o.dataPedidoAprovado = h.dataOcorrencia;
                  }
                });
              }
            }
          });
        });
        pedidosArray.reverse();
        setOrders(pedidosArray);
        setTempOrders(pedidosArray);
        setContador([pedidos, cancelados, bloqueios, aguardando]);
        setValorTotal(valorTotal);
        setTotalPendente(totalPendente);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    init();
    return () => {};
  }, []);

  function filterAllOrders() {
    const filterOrder = tempOrders.filter((item) =>
      item.numeroPedido.toLowerCase().includes(filter.toLowerCase())
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
                Pedidos com Bloqueio
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {contador[2]}
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
                Pedidos Cancelados
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {contador[1]}
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
                Aguardando Pagamento
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {contador[3]}
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
                Pagamentos Pendentes
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {totalPendente.toLocaleString("pt-BR", {
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
              padding={{ base: "0.2rem 0.4rem", md: "1rem" }}
              justify="space-around"
            >
              <Text fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}>
                Número Total de Pedidos
              </Text>
              <Text fontSize={{ base: "1.2rem", md: "2rem" }} fontWeight="bold">
                {contador[0]}
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
            <WebArtTable orders={orders} />
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
}
