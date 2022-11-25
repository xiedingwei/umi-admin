// @ts-ignore
/* eslint-disable */
import { message } from 'antd';
import { request } from 'umi';

/** 获取角色 GET /systemRole/pageList */
export async function role(
  params: {
    // query
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response>('/systemRole/pageList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建角色 POST /systemRole/updateOrSave */
export async function updateOrSaveRole(data: any,options?: { [key: string]: any }) {
  return request<API.Response>('/systemRole/updateOrSave', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除角色 GET/systemRole/delete*/
export async function deleteRole(params: any,options?: { [key: string]: any }) {
  if(params.id.length===0) return message.error('不能删除系统角色！')
  return request<API.Response>('/systemRole/delete', {
    method: 'GET',
    params: {...params},
    ...(options || {}),
  });
}

/** 查看角色菜单 GET /systemRole/roleMenuList */
export async function roleMenuList(params: any,options?: { [key: string]: any }) {
  return request<API.Response>('/systemRole/roleMenuList', {
    method: 'GET',
    params: {...params},
    ...(options || {}),
  });
}

/** 查看所有角色 GET /systemRole/list */
export async function list(params?: any,options?: { [key: string]: any }) {
  return request<API.Response>('/systemRole/list', {
    method: 'GET',
    params: {...params},
    ...(options || {}),
  });
}

/** 更新角色菜单 POST /systemRole/updateRoleMenu */
export async function updateRoleMenu(data: any,options?: { [key: string]: any }) {
  return request<API.Response>('/systemRole/updateRoleMenu', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
