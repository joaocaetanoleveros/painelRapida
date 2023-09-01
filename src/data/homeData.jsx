import axios from "axios";



export async function dadosDeVendas() {
  const listaDeVendas = [];
  let allOrders = [];

  for (let page = 1; page <= 20; page++) {
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


var orderData = [];
var estadoDosCanais = [];
var normal = 0;
var warning = 0;
var danger = 0;
var tempTotalTickets = 0;
var totalCountTickets = 0;


function clearVariables(){
  orderData= [];
  estadoDosCanais = [];
  normal = 0;
  warning = 0;
  danger = 0;
  tempTotalTickets = 0;
  totalCountTickets = 0;
}

export async function init(){
clearVariables();
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
manipulatePanelData();
return [orderData, estadoDosCanais, tempTotalTickets, totalCountTickets];
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
    color: undefined,
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
        tempObj.color = "#F2B04"
      } else if (sub.affiliateId === "BNR") {
        tempObj.fullNameCompany = "INTER SHOP";
        tempObj.color = "#FC7B04"
      } else if (sub.affiliateId === "bww") {
        tempObj.fullNameCompany = "B2W";
        tempObj.color = "#04EBC3"
      } else if (sub.affiliateId === "CMD") {
        tempObj.fullNameCompany = "CAMICADO";
        tempObj.color = "#A40413"
      } else if (sub.affiliateId === "CRF") {
        tempObj.fullNameCompany = "CARREFOUR";
        tempObj.color = '#2852A3'
      } else if (sub.affiliateId === "DKN") {
        tempObj.fullNameCompany = "DAIKIN";
        tempObj.color = "#049CCC"
      } else if (sub.affiliateId === "FSH") {
        tempObj.fullNameCompany = "FAST SHOP";
        tempObj.color = "#DB333B"
      } else if (sub.affiliateId === "GLN") {
        tempObj.fullNameCompany = "ANGELONI";
        tempObj.color = "#0453B3"
      } else if (sub.affiliateId === "LRM") {
        tempObj.fullNameCompany = "LEROY MERLIN";
        tempObj.color = "#74BC44"
      } else if (sub.affiliateId === "MDM") {
        tempObj.fullNameCompany = "MADEIRA M.";
        tempObj.color = "#FC9314"
      } else if (sub.affiliateId === "MGZ") {
        tempObj.fullNameCompany = "MAGAZINE LUIZA";
        tempObj.color = "#0684FA"
      } else if (sub.affiliateId === "MLB") {
        tempObj.fullNameCompany = "MELI CLÁSSICO";
        tempObj.color = "#F2E31E"
      } else if (sub.affiliateId === "MLP") {
        tempObj.fullNameCompany = "MELI PREMIUM";
        tempObj.color = "#060E63"
      } else if (sub.affiliateId === "MZN") {
        tempObj.fullNameCompany = "AMAZON";
        tempObj.color = "#040404"
      } else if (sub.affiliateId === "NMD") {
        tempObj.fullNameCompany = "NOVO MUNDO";
        tempObj.color = "#04048B"
      } else if (sub.affiliateId === "NVP") {
        tempObj.fullNameCompany = "C-NOVA";
        tempObj.color = "#E43C0C"
      } else if (sub.affiliateId === "PFZ") {
        tempObj.fullNameCompany = "PROFIZ";
        tempObj.color = "#A3FB04"
      }

      if (sub.orderId.includes("mltr")) {
        tempObj.nameCompany = "SITE";
        tempObj.fullNameCompany = "SITE";
        tempObj.color = "#045C64"
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
      tempObj.index = indexArray;
      indexArray++;
      orderData.push(tempObj)
      tempTempHolder.push(tempObj);
      tempOrderData.push(tempObj);

    }
  });



}


function hoursManipulated(tempObj) {
  let fullTimeDif = compareHours(tempObj.lastOrder);
  let lessThan3 = false;
  let moreThan3 = false;
  let moreThan5 = false;


  //CHECK IF THE LAST ORDER IS SUPERIOR THAN 5 HOURS
 
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


function manipulatePanelData() {
     

  orderData.forEach((company) => {
    totalCountTickets += company.cont;
  });

  tempTotalTickets = tempTotalTickets.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}