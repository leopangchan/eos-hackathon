// script to interact with our eos blockchain
// send data from kelley blue book

// initialize values to be sent to blockchain
let localGenre = "Auto";
let localCategory = "N/A";
let localDetail = "N/A";

function sendToBlockchain(genre, category, detail) {
  // put data into array so I can go through and verify each data field as valid
  let dataArray = [genre, category, detail];
  // processes values that may be null
  for(let i = 0; i < dataArray.length; i++) {
    if(dataArray[i] == null) {
      console.log('data at index ' + i + ' was null');
      dataArray[i] = "N/A";
    } else {
      // just making the data to pass pretty, capitalizing the first letter
      dataArray[i] = dataArray[i].charAt(0).toUpperCase() + dataArray[i].slice(1);
    }
  }

  console.log('Data to send to blockchain:', dataArray);

  // send to blockchain logic
  let message = "No response yet";
  const defaultPrivateKey = "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5"; // useraaaaaaaa
  const rpc = new eosjs_jsonrpc.default('http://127.0.0.1:8888');
  const signatureProvider = new eosjs_jssig.default([defaultPrivateKey]);
  const api = new eosjs_api.default({ rpc, signatureProvider });

  (async () => {
    try {
      const result = await api.transact({
        actions: [{
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: 'useraaaaaaaa',
            permission: 'active',
          }],
          data: {
            from: 'useraaaaaaaa',
            to: 'useraaaaaaab',
            quantity: '0.0001 SYS',
            memo: '',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      message += '\n\nTransaction pushed!\n\n' + JSON.stringify(result, null, 2);
      console.log(message);
    } catch (e) {
      message = '\nCaught exception: ' + e;
      console.log(message);
      if (e instanceof eosjs_rpcerror.default)
      message += '\n\n' + JSON.stringify(e.json, null, 2);
      console.log(message);
    }
  })();

}

function isCategoryPath(path) {
  if(path === "/sedan/" || path === "/suv/" || path === "/crossover/" ||
  path === "/luxury-car/" || path === "/pickup-truck/" || path === "/van-minivan/" ||
  path === "/hybrid/" || path === "/electric-car/" || path === "/coupe/" ||
  path === "/hatchback/" || path === "/wagon/" || path === "/convertible") {
    return true;
  } else {
    return false;
  }
}

function isCategoryModelPath(path) {
  const slashLength = (path.match(/\//g) || []).length;
  console.log(slashLength);
  if(slashLength === 3) {
    return true;
  } else {
    return false;
  }
}

function getModel(path) {
  const pathArray = path.split('/');
  localDetail = pathArray[1];
}

function getCategory(path) {
  const pathArray = path.split('/');
  localCategory = pathArray[1];
}

function getCategoryModel(path) {
  const pathArray = path.split('/');
  localCategory = pathArray[2];
  localDetail = pathArray[1];
}

const path = window.location.pathname;
console.log('window path:', path);

if(path === "/") {
  localCategory = "N/A";
  localDetail = "N/A";
} else if(path === "/new-cars/") {
  localCategory = "New Cars";
  localDetail = "N/A";
} else if(isCategoryPath(path)) {
  getCategory(path);
} else if(isCategoryModelPath(path)){
  getCategoryModel(path);
} else {
  // was model path, get model
  getModel(path);
}

sendToBlockchain(localGenre, localCategory, localDetail);

console.log('content script active');
