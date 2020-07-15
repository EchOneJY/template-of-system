import request from 'umi-request';

export async function queryRoutes() {
  return request('/api/routes', {
    method: 'GET',
  });
}
