/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

// import { useAuth } from 'src/contexts/auth';
import { api } from './api';

export default {
  // eslint-disable-next-line
  getDadosApi: async (webApiUrl: string, tokenStr: string) => {
    // eslint-disable-next-line prettier/prettier
    const  json  = api
      .get(webApiUrl, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then(response => {
        // Success 🎉
        // console.log(response);
        return response.data;
      })
      .catch(error => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          /// console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          return error.response.data;
        }
        if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          // console.log(error.request);
          return error.request;
        }
        // Something happened in setting up the request and triggered an Error
        // console.log('Error', error.message);
        return error.message;
      });

    return json;
  },

  // eslint-disable-next-line
  Gravar: async (
    webApiUrl: string,
    tokenStr: string,
    payload: any,
  ) => {
    // eslint-disable-next-line prettier/prettier
        const  json  = api.post(webApiUrl, payload, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then(response => {
        // Success 🎉
        // console.log(response);

        return response.data;
      })
      .catch(error => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          /// console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          return error.response.data;
        }
        if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          // console.log(error.request);
          return error.request;
        }
        // Something happened in setting up the request and triggered an Error
        // console.log('Error', error.message);
        return error.message;
      });

    return json;
  },

  Apagar: async (webApiUrl: string, tokenStr: string) => {
    // eslint-disable-next-line prettier/prettier
        const  json  = api.delete(webApiUrl, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then(response => {
        // Success 🎉
        // console.log(response);
        return response.data;
      })
      .catch(error => {
        // Error 😨
        if (error.response) {
          /// console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          return error.response.data;
        }
        if (error.request) {
          // console.log(error.request);
          return error.request;
        }
        // Something happened in setting up the request and triggered an Error
        // console.log('Error', error.message);
        return error.message;
      });

    return json;
  },
};
