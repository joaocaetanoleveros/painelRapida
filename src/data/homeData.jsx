import axios from "axios";

export const alertaDeCanais = [
  {
    valor: 1,
    nome: "Normal",
    cor: "#005A64",
  },
  {
    valor: 2,
    nome: "Atenção",
    cor: "#FFCE00",
  },
  {
    valor: 3,
    nome: "Perigo",
    cor: "#FF0000",
  },
  {
    valor: 4,
    nome: "Todos",
    cor: "black",
  },
];

export async function dadosDeVendas() {
  const listaDeVendas = [];
  let allOrders = [];

  for (let page = 1; page <= 5; page++) {
    const response = await axios.get(
      `https://apiv2.leveros.com.br/monitoramento/${page}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    //HERE I RECEIVED THE RESPONSE. EACH PAGE OF THE ARRAY HAS 100 OBJECTS, THEREFORE FOR EACH ITEM OF MY ORDERS I HAVE AN ARRAY OF 100 OBJECTS.
    listaDeVendas.push(response.data.list);
  }

  //TRANSFORMING ORDER INTO ONE UNIQUE ARRAY OF ARRAYS. IT WILL CONTAIN THE NUMBER OF PAGES IN THE FOR OPERATION * 100
  allOrders = [].concat.apply([], listaDeVendas);

  return allOrders;
}

//GLOBAL VARIABLES


var allOrders = [];
var orderData = [];
var estadoDosCanais = [];

export async function init(){
// console.log("allOrders state after update:", allOrders);
var data = await dadosDeVendas();

let blt = [];
let bnr = [];
let bww = [];
let cmd = [];
let crf = [];
let dkn = [];
let fsh = [];
let gln = [];
let lrm = [];
let mdm = [];
let mgz = [];
let mlb = [];
let mlp = [];
let mzn = [];
let nmd = [];
let nvp = [];
let pfz = [];
let ecom = [];

blt.push(filterArray("BLT",data));
bnr.push(filterArray("BNR",data));
bww.push(filterArray("bww",data));
cmd.push(filterArray("CMD",data));
crf.push(filterArray("CRF",data));
dkn.push(filterArray("DKN",data));
fsh.push(filterArray("FSH",data));
gln.push(filterArray("GLN",data));
lrm.push(filterArray("LRM",data));
mdm.push(filterArray("MDM",data));
mgz.push(filterArray("MGZ",data));
mlb.push(filterArray("MLB",data));
mlp.push(filterArray("MLP",data));
mzn.push(filterArray("MZN",data));
nmd.push(filterArray("NMD",data));
nvp.push(filterArray("NVP",data));
pfz.push(filterArray("PFZ",data));

// console.log(blt[0]);
ecom.push(
  data.filter(
    (item) =>
      item.orderId.includes("mltr") &&
      checkIfMoreThan24Hours(item.creationDate)
  )
);


//AFTER FILTERING IT I PUSH THEN INTO A NEW ARRAY. I CONSIDERED EASIER TO MANIPULATE THE DATA THIS WAY
let tempCompanies = [];
tempCompanies.push(
  ecom,
  mzn,
  mgz,
  bww,
  mlb,
  mlp,
  nvp,
  blt,
  bnr,
  cmd,
  crf,
  dkn,
  fsh,
  gln,
  mdm,
  nmd,
  pfz
);

//GOT AN ERROR BY UNDEFINED TYPE THEN I CREATED THIS FILTER
tempCompanies.forEach((company) => {
  if (company != undefined) {
    getData(company);
  }
});

return orderData;
}






function filterArray(companyName, data) {
  let filtro = data;
  return filtro.filter(
    (item) =>
      item.affiliateId === companyName &&
      checkIfMoreThan24Hours(item.creationDate)
  );
}

function checkIfMoreThan24Hours(hoursAPI) {
  let check24Hours = compareHours(hoursAPI);

  if (check24Hours[0] <= 24) {
    return true;
  }
}

function compareHours(hoursAPI) {
  let dateNow = Date.now();
  let tempDate = Date.parse(hoursAPI);

  //PROCESSING INTO OURS TIME ZONE
  tempDate -= 3 * 3600000;

  const difMs = dateNow - tempDate;

  const hoursDif = Math.floor(difMs / 3600000);

  const minutesDif = Math.floor((difMs % 3600000) / 60000);
  const secondsDif = Math.floor((difMs % 60000) / 1000);

  const fullTimeDif = [hoursDif, minutesDif, secondsDif];

  return fullTimeDif;
}

function getData(array) {
  const tempObj = {
    index: 0,
    nameCompany: "",
    fullNameCompany: "",
    cont: 0,
    lastTicket: "",
    totalValue: "",
    mediumTicket: "",
    notifyWhats: false,
    timeElapsed: [],
  };

  let indexArray = 0;
  let numberTotal = 0;
  let numberMedium = 0;
  let ticket = 0;
  let i = 0;
  let tempTempHolder = [];
  let tempOrderData = [];

  array.forEach((item) => {
    item.forEach((sub, count) => {
      count++;

      //PROCESSING THE COMPANIES NAMES

      if (sub.affiliateId === "BLT") {
        tempObj.fullNameCompany = "BALAROTI";
      } else if (sub.affiliateId === "BNR") {
        tempObj.fullNameCompany = "INTER SHOP";
      } else if (sub.affiliateId === "bww") {
        tempObj.fullNameCompany = "B2W";
      } else if (sub.affiliateId === "CMD") {
        tempObj.fullNameCompany = "CAMICADO";
      } else if (sub.affiliateId === "CRF") {
        tempObj.fullNameCompany = "CARREFOUR";
      } else if (sub.affiliateId === "DKN") {
        tempObj.fullNameCompany = "DAIKIN";
      } else if (sub.affiliateId === "FSH") {
        tempObj.fullNameCompany = "FAST SHOP";
      } else if (sub.affiliateId === "GLN") {
        tempObj.fullNameCompany = "ANGELONI";
      } else if (sub.affiliateId === "LRM") {
        tempObj.fullNameCompany = "LEROY MERLIN";
      } else if (sub.affiliateId === "MDM") {
        tempObj.fullNameCompany = "MADEIRA M.";
      } else if (sub.affiliateId === "MGZ") {
        tempObj.fullNameCompany = "MAGAZINE LUIZA";
      } else if (sub.affiliateId === "MLB") {
        tempObj.fullNameCompany = "MELI CLÁSSICO";
      } else if (sub.affiliateId === "MLP") {
        tempObj.fullNameCompany = "MELI PREMIUM";
      } else if (sub.affiliateId === "MZN") {
        tempObj.fullNameCompany = "AMAZON";
      } else if (sub.affiliateId === "NMD") {
        tempObj.fullNameCompany = "NOVO MUNDO";
      } else if (sub.affiliateId === "NVP") {
        tempObj.fullNameCompany = "C-NOVA";
      } else if (sub.affiliateId === "PFZ") {
        tempObj.fullNameCompany = "PROFIZ";
      }

      if (sub.orderId.includes("mltr")) {
        tempObj.nameCompany = "SITE";
        tempObj.fullNameCompany = "SITE";
      } else if (sub.affiliateId === "bww") {
        tempObj.nameCompany = "B2W";
      } else {
        tempObj.nameCompany = sub.affiliateId;
      }

      tempObj.cont = count;

      numberTotal = numberTotal + sub.totalValue;

      numberMedium = numberTotal / count;

      //HERE I GET ONLY THE NEWEST ORDER OF EACH COMPANY TO APPLY THE RULE OF MORE THAN 5 HOURS
      while (i < 1) {
        tempObj.lastOrder = sub.creationDate.slice(0, 19);
        ticket = sub.totalValue / 100;
        i++;
      }
    });

    //PROCESSING THE TOTAL VALUE OF ORDERS AND MEDIUM TICKET
    numberTotal /= 100;
    numberMedium /= 100;

    let tempTotalTickets = 0;
    tempTotalTickets += numberTotal;

 

    tempObj.lastTicket = ticket.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    tempObj.totalValue = numberTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    tempObj.mediumTicket = numberMedium.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    //PROCESSING TIME
    tempObj.timeElapsed.push(hoursManipulated(tempObj));

    //ONLY OBJECTS THAT HAD SOME NEW ORDER IN THE LAST 24H PASS HERE
    if (tempObj.cont > 0) {
      // console.log(tempObj.cont)
      tempObj.index = indexArray;
      indexArray++;
      orderData.push(tempObj)
      tempTempHolder.push(tempObj);
      tempOrderData.push(tempObj);

    }
  });


  // console.log(orderData);
  // // console.log(alertaDeCanais);
  // console.log(orderData);
}

function hoursManipulated(tempObj) {
  let fullTimeDif = compareHours(tempObj.lastOrder);
  let lessThan3 = false;
  let moreThan3 = false;
  let moreThan5 = false;
  // // console.log("teste: " )
  // // console.log(tempObj)

  //CHECK IF THE LAST ORDER IS SUPERIOR THAN 5 HOURS
  let normal = 0;
  let warning = 0;
  let danger = 0;
  if (fullTimeDif[0] < 3) {
    lessThan3 = true;
    normal += 1;
  } else if (fullTimeDif[0] >= 3 && fullTimeDif[0] < 5) {
    moreThan3 = true;
   warning += 1;
  } else if (fullTimeDif[0] >= 5) {
    moreThan5 = true;
    danger += 1;
  }

  // // console.log(normal);

  estadoDosCanais = [normal, warning, danger, normal + warning + danger];

  const timeIntoString = `${fullTimeDif[0]
    .toString()
    .padStart(2, "0")}:${fullTimeDif[1]
    .toString()
    .padStart(2, "0")}:${fullTimeDif[2].toString().padStart(2, "0")}`;

  let timeManipulated = [];
  timeManipulated.push(timeIntoString);
  timeManipulated.push(lessThan3);
  timeManipulated.push(moreThan3);
  timeManipulated.push(moreThan5);

  return timeManipulated;
}