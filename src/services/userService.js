import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

function register(user) {
  console.log(apiEndpoint, user.name, user.email, user.phone);
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.email,
    phone: user.phone
  });
}

function alreadyExist(user) {
  const currentEndPoint = apiUrl + "/users/" + user.phone;
  return http.get(currentEndPoint, {});
}

function getUsers() {
  return http.get(apiEndpoint, {});
}

export default {
  register,
  alreadyExist,
  getUsers
};
