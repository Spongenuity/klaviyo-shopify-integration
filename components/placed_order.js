import {} from 'dotenv/config';

import timestamp from 'unix-timestamp';
import sendPayloadToKlaviyo from '../utils/send_to_klaviyo';
import { billingDetails, shippingDetails } from '../utils/personal_details';
import { addressCheck, itemURL } from '../utils/helper_functions';

const placedOrder = (data) => {
  const payload = {
    token: process.env.KLAVIYO_API_KEY,
    event: 'Placed Order',
    customer_properties: {
      $email: data.email,
      $first_name: data.customer.first_name,
      $last_name: data.customer.last_name,
      $phone_number: data.customer.phone,
      $address1: addressCheck(data, 'address1'),
      $city: addressCheck(data, 'city'),
      $zip: addressCheck(data, 'zip'),
      $region: addressCheck(data, 'province_code'),
      $country: addressCheck(data, 'country'),
    },
    properties: {
      $event_id: data.id,
      $value: data.total_price,
      Categories: [].concat([], ...data.line_items.map((item) => item.properties)),
      ItemNames: data.line_items.map((itemNames) => itemNames.name),
      'Discount Code': (data.discount_codes.length > 0) ? (data.discount_codes.map((result) => result.code)).toString() : '',
      'Discount Value': data.total_discounts,
      Items: data.line_items.map((item) => ({
        ProductID: item.id,
        SKU: item.sku,
        ProductName: item.name,
        Quantity: item.quantity,
        ItemPrice: item.price,
        RowTotal: (item.price * item.quantity),
        ProductURL: itemURL(item),
        Categories: item.properties,
      })),

      BillingAddress: billingDetails(data),
      ShippingAddress: shippingDetails(data),
    },
    time: timestamp.fromDate(data.processed_at),
  };
  sendPayloadToKlaviyo(payload)
  .catch((error) => console.log(`error: ${error}`));
};

export default placedOrder;
