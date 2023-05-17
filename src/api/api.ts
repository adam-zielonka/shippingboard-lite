import { Customer } from "../store/Customer";
import { LOADINGS } from "./fakeApi";
import { Loading } from "../store/Loading";
import { Ramp } from "../store/Ramp";
import { FromResponse } from "./parse";
import { Delivery } from "../store/Delivery";
import CUSTOMERS from "./CUSTOMERS.json";
import RAMPS from "./RAMPS.json";


export class API {
  getCustomers(): Customer[] {
    return CUSTOMERS.map(c => new Customer(c.kunnr, c.name1, c.ort01, c.land1));
  }
  
  getRamps(): Ramp[] {
    return RAMPS.map(r => new Ramp(r.ramp_id, r.description));
  }

  getLoadings(): Loading[] {
    return LOADINGS.map(loading => new Loading(
      loading.loading_id,
      FromResponse.ramp(loading.ramp_id),
      loading.pallets,
      loading.picked_hus,
      FromResponse.dateTime(loading.planned_start),
      FromResponse.dateTime(loading.planned_end),
      loading.deliveries.map(delivery => new Delivery(
        FromResponse.customer(delivery.ship_to)
      )),
    ));
  }
}

export const api = new API();
