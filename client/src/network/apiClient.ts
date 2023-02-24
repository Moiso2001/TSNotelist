import axios from "axios"
import { BACK_URL, FRONT_URL } from "../constants/variables"


/* Initialize our axiosClient to make request to our API :)) */
export const axiosClient = axios.create({
    baseURL: BACK_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
})

/* Interceptors will "intercepting" our response before our then, this in case an error appears to handle it better  */
axiosClient.interceptors.response.use(
    /* First parameter working as if the response is not an error */
    function (response) {
      return response;
    }, 

    /* Second parameter, callback where we'll redirect the user to our notfound route */
    function (error) {
      console.log("it's intercepted here")
      let res = error.response;
      if (Number(res.status) === 404) {
        window.location.href = `${FRONT_URL}notfound`;
      }
      console.error('Looks like there was a problem. Status Code: ' + res.status);
      return Promise.reject(error);
    }
  );