import { request } from '@/util/request';

export function addRole(data) {
  return request.post('/role', data);
}

export function removeRole(id) {
  return request.delete(`/role/${id}`);
}

export function roles() {
  return request.get('/role');
}

export function updateRole(data) {
  return request.put('/role', data);
}



