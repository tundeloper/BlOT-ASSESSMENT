import { getAuthTokensFromLocalStorage } from "@/store/authstore";
import generateSocketId from "./generateID";

export function socketUrl () {
    const token = getAuthTokensFromLocalStorage()
  
  return `wss://lazeapi-v2.onrender.com/ws?token=${token}&socket_id=${generateSocketId()}`;

}