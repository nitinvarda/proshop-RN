import base64 from 'base-64';
let baseUrl = "https://api-m.sandbox.paypal.com"
import {CLIENT_ID,SECRET_KEY} from '@env';



// let clientId = "Ae__HFQHQA-KJ5le17JEsgURIC2ZR8jjb6zLck6SSzNSJTBE4p17DFEKXSIeXE9gZ1whknlS6sQqsLpl";
// let secretKey = "EDuSq3VvXSjjaQ1AzNO441AeewlcePiE2M7PexybA9gGJiomDUA9xusayO2KSItYv9kimtqnlgHGkzNv";
let clientId = CLIENT_ID;
let secretKey = SECRET_KEY;

const generateToken = () =>{
    const header = new Headers();
    header.append("Content-Type","application/x-www-form-urlencoded");
    header.append("Authorization","Basic " + base64.encode(`${clientId}:${secretKey}`));
    var requestOptions = {
        method:'POST',
        headers:header,
        body:'grant_type=client_credentials'
    }

    return new Promise((resolve,reject)=>{
        fetch(baseUrl+'/v1/oauth2/token',requestOptions)
        .then(response=>response.json()).then(result=>{
           const {access_token} = result;
            resolve(access_token);
        })
        .catch((error)=>{
            console.log(error);
            reject(error);
        
        })
    })
}

const createPaypalOrder = (token,{cartItems,totalPrice,itemsPrice,shippingPrice,taxPrice,address}) =>{

    var requestOptions = {
        method:'POST',
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body:JSON.stringify({
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "items": cartItems.map((item)=>(
                        {
                            "name": item.name,
                            "quantity": item.qty,
                            "unit_amount": {
                                "currency_code": "USD",
                                "value": item.price
                            }
                        }
                    )),
                    "shipping":{
                        "type":"SHIPPING",
                        "address":address
                    },
                    "amount": {
                        "currency_code": "USD",
                        "value": totalPrice,
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                "value": itemsPrice
                            },
                            "tax_total":{
                              "currency_code": "USD",
                              "value": taxPrice
                            },
                            "shipping":{
                                "currency_code": "USD",
                                "value": shippingPrice
                            }
                        }
                    }
                }
            ],
            "application_context": {
                "return_url": "https://example.com/return",
                "cancel_url": "https://example.com/cancel"
            }
        })
    }


    return new Promise((resolve,reject)=>{
        fetch(baseUrl+'/v2/checkout/orders',requestOptions).
        then(response=>response.json()).then(result=>{
           const res = result;
            resolve(res);
        })
        .catch((error)=>{
            console.log(error);
            reject(error);
        
        })
    })

}

const capturePayment = (orderId,token) =>{

    var requestOptions = {
        method:'POST',
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        
    }

    return new Promise((resolve,reject)=>{
        fetch(baseUrl+`/v2/checkout/orders/${orderId}/capture`,requestOptions).
        then(response=>response.json()).then(result=>{
            
           const res = result;
            resolve(res);
        })
        .catch((error)=>{
            console.log(error);
            reject(error);
        
        })
    })

}


export {generateToken,createPaypalOrder,capturePayment};