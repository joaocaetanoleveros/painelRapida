import { Flex } from "@chakra-ui/react";
import GlpiTable from "../../components/Tables/glpiTable/glpiTable";
import Card from "../../components/Card/card";

export default function Glpi() {
  return (
    <Flex h={{ base: "100%", md: "90vh" }} w="100%" flexDirection="column"  padding="1rem 2rem" bg='brand.mainBG'>
      <Flex>CARDS</Flex>
      <Flex h=''>BARRA DE PESQUISA</Flex>
      <Flex>
        <Card width='100%' height='70vh'>
          <GlpiTable />
        </Card>
      </Flex>
    </Flex>
  );
}
