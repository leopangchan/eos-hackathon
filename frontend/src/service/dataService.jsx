import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs'; // https://github.com/EOSIO/eosjs

export function getTable(cb, errCb) {
    const endpoint = "http://localhost:8888";
    const rpc = new JsonRpc(endpoint);
//     var temp_data = {rows :[{prim_key: "1",fingerprint:"679764",publisher:"Kelly Blue Book",intentCategory:"Auto", intentSubCategory:"SUV",intentDetail:"Ford Escape", timestamp:1541915559},
//     {prim_key: "2","fingerprint":"123567",publisher:"Kelly Blue Book",intentCategory:"Auto", intentSubCategory:"Truck",intentDetail:"Chevrolet", timestamp:1541915559},
//     {prim_key: "3","fingerprint":"345698",publisher:"Kelly Blue Book",intentCategory:"Auto", intentSubCategory:"SUV",intentDetail:"Honda CR-V", timestamp:1541915559},
//     {prim_key: "4","fingerprint":"976587",publisher:"Kelly Blue Book",intentCategory:"Auto", intentSubCategory:"SUV",intentDetail:"Toyota RAV4", timestamp:1541915559},
//     {prim_key: "5","fingerprint":"348975",publisher:"Kelly Blue Book",intentCategory:"Auto", intentSubCategory:"SUV",intentDetail:"Mazda CX-5", timestamp:1541915559}
// ]}
//     var promise = new Promise(function(resolve, reject) {
//         /* missing implementation */
//         resolve(temp_data);
//     });

//   return promise
    rpc.get_table_rows({
      "json": true,
      "code": "blockiesacc",   // contract who owns the table
      "scope": "blockiesacc",  // scope of the table
      "table": "intents",    // name of the table as specified by the contract abi
      "limit": 1000,
    })
    .then(cb)
    .catch(errCb);
}

export function deleteRecord(finger_pt, cate1, cate2, cate3, cb, errCb) {
    const endpoint = "http://localhost:8888";
    const rpc = new JsonRpc(endpoint);
    
    rpc.delete_table_record({
      "json": true,
      "finger_print": finger_pt,  
      "cate2": cate1,  
      "cate2": cate2,  
      "cate3":cate3,
      "limit": 100,
    })
    .then(cb)
    .catch(errCb);
}