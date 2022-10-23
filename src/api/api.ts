import { Customer } from "../store/Customer";
import { CUSTOMERS, LOADINGS, RAMPS } from "./fakeApi";
import { Loading } from "../store/Loading";
import { Ramp } from "../store/Ramp";
import { FromResponse } from "./parse";

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
      loading.deliveries,
    ));
  }
}

export const api = new API();
