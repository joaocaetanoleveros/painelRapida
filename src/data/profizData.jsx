import axios from "axios";

export async function fetchOrders() {
  const authorization = await getToken();
  let todosPedidos = [];
  let limit = 100;
  for (let i = 0; i < 100; i++) {
    await axios({
      method: "get",
      url: `${import.meta.env.VITE_PROFIZ_URL}/orders?offset=${
        i * 100
      }&limit=${limit}`,
      headers: {
        "App-Token": import.meta.env.VITE_WEBART_APPTOKEN,
        Authorization: `Bearer ${authorization}`,
      },
    })
      .then(async (res) => {
         if (res.data.pedidos.length == 0) {
            i = 105;
          }
console.log(i)
        todosPedidos.push(res.data.pedidos);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return todosPedidos;
}

async function getToken() {
  let token = import.meta.env.VITE_PROFIZ_TOKEN;
  let secret = import.meta.env.VITE_PROFIZ_SECRET;
  let body = {
    apiKey: token,
    secretKey: secret,
  };
  return await axios({
    method: "post",
    url: `${import.meta.env.VITE_PROFIZ_URL}/auth`,
    data: body,
    headers: {
      "App-Token": "wapstore",
    },
  })
    .then(async (res) => {
      return res.data.token;
    })
    .catch((err) => {
      console.log(err);
    });
}
