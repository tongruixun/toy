import { trxRequest } from '@/util/request';

export function addRole(data) {
  return trxRequest(
    {
      url: 'role',
      method: 'post',
      data
    });
}

export function removeRole(id) {
  return trxRequest(
    {
      url: `role/${id}`,
      method: 'delete',
    });
}

export function roles() {
  return trxRequest(
    {
      url: 'role',
      method: 'get',
    });
}

export function updateRole(data) {
  return trxRequest(
    {
      url: 'role',
      method: 'put',
      data
    });
}



