// @ts-ignore
/* eslint-disable */
import { message } from 'antd';
import { request } from 'umi';

/** 获取用户 GET /systemUser/pageList */
export async function user(
  params: {
    // query
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response>('/systemUser/pageList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建用户 POST /systemUser/updateOrSave */
export async function updateOrSaveUser(data: any,options?: { [key: string]: any }) {
  const form=new FormData();
  for(let key in data){
    if(data[key]!=null){
      form.append(key,data[key])
    }
  }
  return request<API.Response>('/systemUser/updateOrSave', {
    method: 'POST',
    processData: false,
    contentType: false,
    data:form,
    ...(options || {}),
  });
}

/** 删除用户 GET /api/rule */
export async function deleteUser(params: any,options?: { [key: string]: any }) {
  if(params.id.length===0) return message.error('不能删除系统用户！')
  return request<API.Response>('/systemUser/delete', {
    method: 'GET',
    params: {...params},
    ...(options || {}),
  });
}
