// @ts-ignore
/* eslint-disable */

declare namespace SYSTEM_API {
  type MenuItem = {
    id: number;
    path?: string;
    name?: string;
    icon?: string;
    parentId?: number;
    createUser?: string;
    createTime?: string;
    isDelete?: number;
  };

  type RoleItem = {
    id: number;
    name?: string;
    describe?: string;
    createUser?: string;
    createTime?: string;
    isStart?: number;
    isDelete?: number;
  };
  type UserItem = {
    username?: string;
    password?: string;
    avatar?: string;
    name?: string;
    createUser?: string;
    createTime?: string;
    roleId?: number;
    isDelete?: number;
  };
}
