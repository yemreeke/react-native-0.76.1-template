import { ApiErrorResponse, create } from 'apisauce';
import Loading from 'components/Loading';
import { API_BASE_URL } from 'constants/Constants';

const baseInstance = create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'tr',
  },
});
const multipartInstance = create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept-Language': 'tr',
  },
});

function setAuthorizationHeader(token: string) {
  baseInstance.setHeader('Authorization', `Bearer ${token}`);
  multipartInstance.setHeader('Authorization', `Bearer ${token}`);
}


function setAcceptLanguage(lang: string) {
  baseInstance.setHeader('Accept-Language', lang);
  multipartInstance.setHeader('Accept-Language', lang);
}


const ErrorHandling = (error: ApiErrorResponse<unknown>) => {
  if (error.status == 403) {
    setAuthorizationHeader("");
    // Store.dispatch(logout());
  }
}

async function GET<T>(endpoint: string, loading?: boolean): Promise<T> {
  return new Promise((resolve, reject) => {
    loading && Loading.show();
    baseInstance
      .get(endpoint)
      .then(response => {
        loading && Loading.hide();
        if (response.ok) {
          resolve(<T>response.data);
        } else {
          ErrorHandling(response);
          reject(response.data);
        }
      })
      .catch(error => {
        loading && Loading.hide();
        reject(error.data);
      });

  });
}



async function POST<T>(
  endpoint: string,
  params?: any,
  loading?: boolean,
  multipart?: boolean,
): Promise<T> {
  return new Promise((resolve, reject) => {
    loading && Loading.show(0);
    if (multipart) {
      multipartInstance
        .post(endpoint, params, {
          onUploadProgress: function (progressEvent: any) {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            if (percent >= 99) {
              percent = 99;
            }
            console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
            if (loading) {
              console.log("Loading.progress(percent)->", percent);
              Loading.show(percent);
            }
          },
        })
        .then(response => {
          loading && Loading.hide();
          if (response.ok) {
            resolve(<T>response.data);
          } else {
            ErrorHandling(response);
            reject(response.data);
          }
        })
        .catch(error => {
          loading && Loading.hide();
          reject(error.data);
        });
    } else {
      baseInstance
        .post(endpoint, params)
        .then(response => {
          loading && Loading.hide();
          if (response.ok) {
            resolve(<T>response.data);
          } else {
            ErrorHandling(response);
            reject(response.data);
          }
        })
        .catch(error => {
          loading && Loading.hide();
          reject(error.data);
        });
    }
  });
}


async function PUT<T>(
  endpoint: string,
  params?: any,
  loading?: boolean,
): Promise<T> {
  return new Promise((resolve, reject) => {
    loading && Loading.show();
    baseInstance
      .put(endpoint, params)
      .then(response => {
        loading && Loading.hide();
        if (response.ok) {
          resolve(<T>response.data);
        } else {
          ErrorHandling(response);
          reject(response.data);
        }
      })
      .catch(error => {
        loading && Loading.hide();
        reject(error.data);
      });
  });
}
async function DELETE<T>(endpoint: string, params?: any, loading?: boolean): Promise<T> {
  return new Promise((resolve, reject) => {
    loading && Loading.show();
    baseInstance
      .delete(endpoint, params)
      .then(response => {
        loading && Loading.hide();
        if (response.ok) {
          resolve(<T>response.data);
        } else {
          ErrorHandling(response);
          reject(response.data);
        }
      })
      .catch(error => {
        loading && Loading.hide();
        reject(error.data);
      });
  });
}

const API = {
  setAuthorizationHeader,
  setAcceptLanguage,
  GET,
  PUT,
  POST,
  DELETE,
};

export default API;
