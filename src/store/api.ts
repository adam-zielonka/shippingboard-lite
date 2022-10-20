import { Customer } from "./Customer";
import { CUSTOMERS } from "./fakeApi";

export class API {
  getCustomers(): Customer[] {
    return CUSTOMERS.map(c => new Customer(c.kunnr, c.name1, c.ort01, c.land1));
  }
}

export const api = new API();
