import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/sendSMS";

function sendOTP() {
  return http.get(apiEndpoint, {});
}

export default sendOTP;
