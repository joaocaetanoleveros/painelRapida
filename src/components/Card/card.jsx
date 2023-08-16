import {  Flex } from "@chakra-ui/react";


export default function Card({height, width, maxW, children}) {
  return (
    <Flex
      bg="white"
      color="black"
      height={height}
      maxW={maxW}
      width={width}
      shadow="lg"
      borderRadius="4px"
      align="center"
      justify="center"
    >
      {children}
    </Flex>
  );
}
