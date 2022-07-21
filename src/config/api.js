// information from the backend, URL

import axios from "axios";

const jitterAPI = axios.create({
  baseURL: 'https://jitter-rails-api.herokuapp.com/'
})

jitterAPI.interceptors.request.use(req => {
  //send the token in the request
  const token = sessionStorage.getItem("token")
  // Authorization -> Bearer token - paste the token
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`

  }

  return req
})

export default jitterAPI