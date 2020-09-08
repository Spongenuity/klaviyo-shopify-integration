import {} from 'dotenv/config'
import orderedProduct from './components/ordered_product'
import placedOrder from './components/placed_order'
import {dateFormatter} from './utils/helper_functions'


import Shopify from 'shopify-api-node' 

/*
Although this could have been done manually through the URL endpoint explained in the example in 1b-iv,
the 'shopify-api-node' package can make the task a bit easier
*/

const shopify = new Shopify({
    shopName: process.env.SHOP_NAME,
    apiKey: process.env.SHOPIFY_API_KEY,
    password: process.env.PASSWORD
  });

  /* Function utilising the 'shopify-api-node' capabilities, takes in the class "shopify" with information from the .env config file.
  This returns a Promise that resolves with the result
  */
const getShopifyOrders = (created_at_min, created_at_max, financial_status) => { 
    return shopify.order
    .list({ created_at_min, created_at_max, financial_status })
    .catch((err) => console.error(err));
};

const rangeStart = dateFormatter(new Date("01 January 2016 00:00:00 UTC")); // I opted to allow input of the date in an easy to understand format. Please see ./helper_functions for a more in depth explaination
const rangeEnd = dateFormatter(new Date("31 December 2016 23:59:59 UTC"));

const orderedProductsFromShopfiy = getShopifyOrders(rangeStart, rangeEnd, 'paid') //finds orders within the range input above
.then((items) => {
    items.forEach((item) => { //Sends orders to Klaviyo
        orderedProduct(item);
        placedOrder(item);
    })
    
  })
.catch((error) => console.log(`error: ${error}`));