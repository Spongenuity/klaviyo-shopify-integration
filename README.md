# Klaviyo Shopify Integration

#### Language
Node.js and Javascript (ES2019/ES2020)

#### Installation
###### Prerequisites:
* **Node** Version used is : `v13.2.0`
* **Yarn** Version used is : `1.19.2`

##### Setup:
* `git clone https://github.com/Spongenuity/klaviyo-shopify-integration.git`
* `cd klaviyo-shopify-integration`
* `yarn`

###### Env:
* `cp .env.sample ./.env`
* Enter API keys for Klaviyo.
* It should be structured as the following:
```
KLAVIYO_API_KEY= PLEASE_CHANGE

SHOP_URL=PLEASECHANGE.myshopify.com
SHOPIFY_API_KEY=PLEASE_CHANGE
SHOP_PASSWORD=PLEASE_CHANGE

```

##### Commands:
* **Start**   : `yarn start`  - *builds and fires script once*

     

#### Script Requirements / Task
1. Pull all past Shopify Order data from 2016
    - For this I used the 'shopify-api-node' module to handle pulling the data in from Shopify.
    - I used the params `processed_at_min` and `processed_at_max` to find the set constraints of the range.
    - I used `financial_status` and searched for `paid` to retrieve completed orders.

2. For each order, Klaviyo wants two event types: “Placed Order” and “Ordered Product”.
    - Pulled data in from Shopify, then iterated over each order once for “Placed Order” and again for “Ordered Product” over each order and formatted the data into their respective payloads
