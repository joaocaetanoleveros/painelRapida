import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import logoNegative from "./logoNegative.png";
import imagemLogin from "./imagemLogin.png";
import logo from "./logo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");
  const [titleMsg, setTitleMsg] = useState("");
  const [gcAuth, setGcAuth] = useState(null);
  const [loadBar, setLoadBar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    login(email, password);
  };

  async function login(pEmail, pPassword, pGcAuth = null) {
    localStorage.setItem("email", pEmail.toLowerCase());

    // window.location.href = "/";
    setTitleMsg("");
    setLoadingMsg("Validando usuário, aguarde...");
    setLoadBar(true);
    setIsLoading(true);

    if (!pEmail && !password && pGcAuth === null) {
      callDialogError("Dados inválidos!", "Campo Usuário e/ou Senha vazios!");
    } else {
      let body;

      body = {
        user: pEmail,
        pass: password,
        gcAuth: pGcAuth,
      };

      await axios({
        method: "post",
        url: `https://leverosintegra.dev.br/api/auth`,
        data: body,
      })
        .then(async (res) => {
          if (res.data.token == null) {
            {
              callDialogError(
                "Dados inválidos!",
                "Usuário e/ou senha Incorretos!"
              );
            }
            setEmail("");
            setPassword("");
            setIsLoading(false);
            setLoadBar(false);
            return;
          }
          localStorage.setItem("email", pEmail.toLowerCase());
          localStorage.setItem("token", res.data.token);
          navigate("/");
        })
        .catch((err) => {
          setLoadBar(false);
          setIsLoading(false);
          console.log(err.response.data.statusCode);
          if (err.response.data.statusCode == 401) {
            callDialogError("Erro!", `Acesso não autorizado!`);
          } else {
            callDialogError("Erro!", `Erro: ${err}`);
          }
          console.log(err);
        });
    }
  }

  const handleLoginSuccess = async (response) => {
    setTitleMsg("");
    setLoadingMsg("Validando usuário, aguarde...");
    setLoadBar(true);
    setIsLoading(true);
    const responsemail = response.profileObj.email;

    if (responsemail.includes("@leveros.com.br")) {
      const accessToken = response.accessToken;
      setGcAuth(accessToken);
      login(responsemail, "", accessToken);
    } else {
      callDialogError("Erro!", `Acesso não autorizado!`);
      setEmail("");
      setPassword("");
      setIsLoading(false);
      setLoadBar(false);
    }
  };

  const handleLoginFailure = (response) => {
    callDialogError("Erro!", `Acesso não autorizado!`);
    setEmail("");
    setPassword("");
    setIsLoading(false);
    setLoadBar(false);
    console.log("Login failed:", response);
  };

  function callDialogError(title, msg) {
    setError(msg);
    setLoadingMsg(msg);
    setTitleMsg(title);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, "2000");
  }

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex h="100vh" w="100%">
      <Flex h="100%" w="30%" position="relative">
        <Flex
          zIndex="2"
          position="absolute"
          backgroundImage={logoNegative}
          backgroundSize="contain"
          backgroundPosition="start"
          backgroundRepeat="no-repeat"
          h="80px"
          w="200px"
          top="0"
          left="5"
        />
        <Flex
          zIndex="1"
          bg="brand.P2"
          h="100%"
          w="100%"
          position="absolute"
          opacity="0.4"
        />
        <Flex
          backgroundImage={imagemLogin}
          backgroundPosition="center"
          h="100%"
          w="100%"
          backgroundSize="cover"
        />
      </Flex>
      <Flex
        h="100%"
        w="70%"
        justify="center"
        align="center"
        position="relative"
      >
        <Flex
          position="absolute"
          h="100vh"
          w="100%"
          bg="brand."
          zIndex="10"
          align="center"
          justify="center"
        >
          <Flex
          position="absolute"
            border="1px solid"
            borderColor="brand.P1"
            w="20%"
            h="20%"
            borderRadius="4px"
            shadow="lg"
          >

          </Flex>
        </Flex>
        <Flex w="50%" h="80%" direction="column" justify="space-evenly">
          <Flex>
            <Image src={logo} maxH="130px" maxW="360px" />
          </Flex>
          <Flex>
            <Text fontWeight="bold" fontSize="1.8rem">
              Acesse o Painel de Monitoramento
            </Text>
          </Flex>
          <Flex direction="column" h="40%" gap="2rem">
            <Flex direction="column" gap="1.5rem">
              <FormControl isRequired isInvalid={!!error}>
                <FormLabel color="brand.P1" fontSize="1.4rem">
                  E-Mail
                </FormLabel>
                <Input
                  bg="#f6f8f8"
                  boxShadow="inner"
                  type="email"
                  value={email}
                  h={{ base: "40px", md: "45px" }}
                  onChange={(e) => setEmail(e.target.value)}
                  _hover={{ borderColor: "brand.P1" }}
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!error}>
                <FormLabel color="brand.P1" fontSize="1.4rem">
                  Senha
                </FormLabel>
                <InputGroup>
                  <Input
                    bg="#f6f8f8"
                    h={{ base: "40px", md: "45px" }}
                    boxShadow="inner"
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    _hover={{ borderColor: "brand.P1" }}
                  />
                  <InputRightElement
                    width={{ base: "4.5rem", md: "5.5rem" }}
                    h="100%"
                  >
                    <Button
                      color="white"
                      bg="brand.P2"
                      h={{ base: "1.75rem" }}
                      size={{ base: "sm", md: "sm" }}
                      onClick={handleClick}
                      _hover={{ bg: "brand.S2", color: "black" }}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Flex>
            <Flex justify="space-between">
              <Button
                type="submit"
                bg="brand.P1"
                color="white"
                width={{ base: "160px", md: "40%", xl: "25%" }}
                height={{ base: "46px", md: "50px", xl: "50px" }}
                fontSize="1.6rem"
                _hover={{ bg: "brand.P2" }}
              >
                Entrar
              </Button>
              <GoogleLogin
                buttonText="Login com Google"
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy="single_host_origin"
                // Add any additional props or styling you need
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
