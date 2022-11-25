// @ts-ignore
/* eslint-disable */
import { message } from 'antd';
import { request } from 'umi';

/** 获取菜单 GET /systemMenu/pageList */
export async function menu(
  params: {
    // query
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response>('/systemMenu/pageList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建菜单 POST /systemMenu/updateOrSave */
export async function updateOrSaveMenu(data: any,options?: { [key: string]: any }) {
  return request<API.Response>('/systemMenu/updateOrSave', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除菜单 GET /api/rule */
export async function deleteMenu(params: any,options?: { [key: string]: any }) {
  if(params.id.length===0) return message.error('不能删除系统菜单！')
  return request<API.Response>('/systemMenu/delete', {
    method: 'GET',
    params: {...params},
    ...(options || {}),
  });
}

/** 查看所有菜单 GET /api/rule */
export async function list(params?: any,options?: { [key: string]: any }) {
  return request<API.Response>('/systemMenu/list', {
    method: 'GET',
    ...(options || {}),
  });
}
