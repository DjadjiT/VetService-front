import {User} from "../models/user";

export class GoogleMapService {

  static generateGoogleMapUri(user: User){
    let address = user.street + user.postalCode + user.city;
    const gMapUri = "https://www.google.com/maps/search/?api=1&query=";
    return gMapUri+encodeURIComponent(address)
  }
}
