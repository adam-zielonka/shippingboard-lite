import { Customer } from "./Customer";
import { CUSTOMERS, LOADINGS, RAMPS } from "./fakeApi";
import { DateTime, Loading } from "./Loading";
import { Ramp } from "./Ramp";

export class API {
  getCustomers(): Customer[] {
    return CUSTOMERS.map(c => new Customer(c.kunnr, c.name1, c.ort01, c.land1));
  }
  
  getRamps(): Ramp[] {
    return RAMPS.map(r => new Ramp(r.ramp_id, r.description));
  }

  getLoadings(ramps: Ramp[]): Loading[] {
    function findRamp(ramp_id: string): Ramp {
      return ramps.find(ramp => ramp.id === ramp_id) || new Ramp(ramp_id, `(${ramp_id})`);
    }

    return LOADINGS.map(l => new Loading(
      l.loading_id,
      findRamp(l.ramp_id),
      l.pallets,
      l.picked_hus,
      dateTimeFromServer(l.planned_start),
      dateTimeFromServer(l.planned_end),
      l.deliveries,
    ));
  }
}

export const api = new API();

function dateTimeFromServer(dataTime: number): DateTime {
  const [, year, month, date, hours, minutes] = dataTime.toString()
    .match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/) || [];
  return new DateTime(new Date(+year, (+month)-1, +date, +hours, +minutes)); 
}

function dateTimeToSever(dateTime: DateTime): number {
  const year = dateTime.dateTime.getFullYear();
  const month = dateTime.dateTime.toLocaleDateString("en", { month: "2-digit" });
  const day = dateTime.dateTime.toLocaleDateString("en", { day: "2-digit" });
  const hour = dateTime.dateTime.toLocaleTimeString("en", { hour: "2-digit", hour12: false });
  const minutes = dateTime.dateTime.toLocaleTimeString("en", {  minute: "2-digit" });
  return +`${year}${month}${day}${hour}${minutes}`;
}
