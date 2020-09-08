/*
This function is necessary to parse and handle the data from a nested object
*/
const getValue = (obj, path, def) => (() => typeof path === 'string' ? path.replace(/\[(\d+)]/g,'.$1') : path.join('.'))()
  .split('.')
  .filter(Boolean)
  .every(step => ((obj = obj[step]) !== undefined)) ? obj : def

const dateFormatter = (input) => input.toISOString().split('.')[0];  /* Although the Shopify documentation example asks for a slightly different date format, this format is a valid ISO 8601 time zone designator format and works with the Shopify API.*/

const jsonToBase64 = (obj) => {
    let objToStr = JSON.stringify(obj);
    let strToBase64 = Buffer.from(objToStr).toString("base64");
    return strToBase64;
}

//Both of these functions handle for 'undefined' responses, theyre essentially there to keep the "placed_order.js" cleaner as it is quite cumbersome

const addressCheck = (data, value) => {
    const check = typeof data.customer.default_address;
    if(check === 'undefined'){
        return ''
    } else{
    return data.customer.default_address.value
    }
}

const itemURL = (data) => {
    if (data.url !== undefined) {
      return `${process.env.SHOP_NAME}.myshopify.com${data.url}`;
    }
    return '';
  };

export {getValue, dateFormatter, jsonToBase64, addressCheck, itemURL}