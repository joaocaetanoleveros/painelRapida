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
  } from "@chakra-ui/react";
  import { Icon } from "@iconify/react";
  import logo from "./logoNegative.png";
  import { Link as RouterLink } from "react-router-dom";
  export default function Navbar() {
    const navLinks = [
      {
        name: "TABELA PEDIDOS",
        icon: "bi:table",
        to: "/pedidos",
      },
      {
        name: "CHAMADOS GLPI",
        icon: "material-symbols:support-agent",
        to: "/glpi",
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
          <RouterLink to="/">
            <Flex w={{base:'12rem',md:"16rem"}}>
              <Image
                alt="Logo em cores negativas da empresa Leveros"
                src={logo}
              />
            </Flex>
          </RouterLink>
  
          <Flex display={{ base: "none", md: "flex" }}>
            <List display="flex" alignItems="center" gap="1rem">
              {navLinks.map((link, index) => {
                return (
                  <RouterLink key={index} to={link.to}>
                    <ListItem key={index} display="flex">
                      <Button
                        bg="brand.P2"
                        color="white"
                        fontSize={{md:'1.4rem'}}
                        h={{md:'4rem'}}
                        _hover={{
                          backgroundColor: "brand.S2",
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
          <Flex display={{ base: "flex", md: "none" }} >
            <Menu>
              <MenuButton
                as={Icon}
                aria-label="Options"
                icon="material-symbols:menu"
              />
              <MenuList color="white" bg="brand.P2"  fontSize={{ base: "1.4rem" }}>
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
  