import {getValue} from '../utils/helper_functions'

const billingDetails = (data) => ({
  FirstName: getValue(data, 'billing_address.first_name', ''),
  LastName: getValue(data, 'billing_address.last_name', ''),
  Company: getValue(data, 'billing_address.company', ''),
  Address1: getValue(data, 'billing_address.address1', ''),
  Address2: getValue(data, 'billing_address.address2', ''),
  City: getValue(data, 'billing_address.city', ''),
  Region: getValue(data, 'billing_address.province', ''),
  RegionCode: getValue(data, 'billing_address.province_code', ''),
  Country: getValue(data, 'billing_address.country', ''),
  CountryCode: getValue(data, 'billing_address.country_code', ''),
  Zip: getValue(data, 'billing_address.zip', ''),
  Phone: getValue(data, 'billing_address.phone', ''),
});

const shippingDetails = ( data) => ({
    FirstName: getValue(data, 'shipping_address.first_name', ''),
    LastName: getValue(data, 'shipping_address.last_name', ''),
    Company: getValue(data, 'shipping_address.company', ''),
    Address1: getValue(data, 'shipping_address.address1', ''),
    Address2: getValue(data, 'shipping_address.address2', ''),
    City: getValue(data, 'shipping_address.city', ''),
    Region: getValue(data, 'shipping_address.province', ''),
    Region_code: getValue(data, 'shipping_address.province_code', ''),
    Country: getValue(data, 'shipping_address.country', ''),
    Country_code: getValue(data, 'shipping_address.country_code', ''),
    Zip: getValue(data, 'shipping_address.zip', ''),
    Phone: getValue(data, 'shipping_address.phone', ''),
  });

export {billingDetails, shippingDetails}