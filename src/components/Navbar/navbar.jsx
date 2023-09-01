import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  List,
  ListItem,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import logo from "./logoNegative.png";
import { Link as RouterLink, useLocation } from "react-router-dom";
import wap from "./wapstore.png"
export default function Navbar() {
  const location = useLocation();
  const navLinks = [
    {
      name: "MONITORAMENTO",
      icon: "fluent-mdl2:b-i-dashboard",
      to: "/",
    },
    {
      name: "COMPROU, CHEGOU",
      icon: "material-symbols:local-shipping-outline-sharp",
      to: "/comprouChegou",
    },
    {
      name: "PEDIDOS WEBART",
      icon: "mdi:marketplace-outline",
      to: "/webart",
      color: "#FC5205",
      hover: "#ff9d6f",
    },
    {
      name: "PROFIZ",
      icon: "mdi:marketplace-outline",
      to: "/profiz",
      color: "#A3FB04",
      hover: "##ccec8f",
    },
  ];
  return (
    <>
      <Flex
        as="nav"
        h="10vh"
        bg="brand.P1"
        color="white"
        align="center"
        justify="space-between"
        padding="2rem"
        fontSize={{ base: "2rem" }}
        textAlign="center"
      >
        <Flex alignItems="center" gap="1rem">
          <RouterLink to="/">
            <Flex w={{ base: "12rem", md: "16rem" }}>
              <Image
                alt="Logo em cores negativas da empresa Leveros"
                src={logo}
              />
            </Flex>
          </RouterLink>
          <Text
            display={{ base: "none", md: "inline-flex" }}
            fontWeight={location.pathname == "/webart" ? "bold" : ""}
            fontSize={
              location.pathname == "/webart"
                ? { md: "1.2rem", lg: "2.4rem" }
                : { md: "1.2rem", lg: "1.4rem" }
            }
          >
            {location.pathname == "/"
              ? "MONITORAMENTO DE PEDIDOS: Periodo de 24h"
              : location.pathname == "/comprouChegou"
              ? "COMPROU, CHEGOU!"
              : location.pathname == "/webart"
              ? "+"
              : ""}
          </Text>
          <Flex display={location.pathname == "/webart" ? "flex" : "none"} w={{ base: "12rem", md: "16rem" }}>
          <Image alt="Logo da empresa wapStore" src={wap} />
        </Flex>
        </Flex>
     

        <Flex display={{ base: "none", md: "flex" }}>
          <List display="flex" alignItems="center" gap="1rem">
            {navLinks.map((link, index) => {
              return (
                <RouterLink key={index} to={link.to} >
                  <ListItem key={index} display="flex" >
                    <Button
                      bg={link.color || "brand.P2"}
                      color="white"
                      fontSize={{ md: "1.4rem" }}
                      minW='80px'
                      h={{ md: "4rem" }}
                      _hover={{
                        backgroundColor: link.hover || "brand.S2",
                        color: "black",
                        transition: "0.5s",
                      }}
                    >
                      {link.name}
                    </Button>
                  </ListItem>
                </RouterLink>
              );
            })}
          </List>
        </Flex>
        <Flex display={{ base: "flex", md: "none" }}>
          <Menu>
            <MenuButton
              as={Icon}
              aria-label="Options"
              icon="material-symbols:menu"
            />
            <MenuList color="white" bg="brand.P2" fontSize={{ base: "1.4rem" }}>
              {navLinks.map((link, index) => {
                return (
                  <RouterLink key={index} to={link.to}>
                    <MenuItem display="flex" gap="1rem" bg="brand.P2">
                      <Icon icon={link.icon} />
                      {link.name}
                    </MenuItem>
                  </RouterLink>
                );
              })}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
}
