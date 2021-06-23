import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8000/api',
});

const fullLogging = false;

instance.interceptors.request.use((request) => {
  const transform = (r) => ({
    withCredentials: r.withCredentials,
    timeout: r.timeout,
    url: r.baseURL + r.url,
    method: r.method,
  });
  console.log(
    'Starting Request',
    JSON.stringify(fullLogging ? request : transform(request), null, 2)
  );
  return request;
});

instance.interceptors.response.use((response) => {
  const transform = (r) => ({
    data: r.data,
    status: r.status,
    config: {
      withCredentials: r.config.withCredentials,
      timeout: r.config.timeout,
      url: r.config.baseURL + r.config.url,
      method: r.config.method,
    },
  });
  console.log(
    'Response:',
    JSON.stringify(fullLogging ? response : transform(response), null, 2)
  );
  return response;
});

export default instance;
