package com.example.demo.project.system.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.example.demo.common.base.entity.BaseEntity;
import lombok.Data;

@Data
@TableName(value = "`system_user`")
public class SystemUser extends BaseEntity {
    /**
     * 账号
     */
    @TableId(value = "username")
    private String username;

    /**
     * 密码
     */
    @TableField(value = "password")
    private String password;

    /**
     * 名字
     */
    @TableField(value = "name")
    private String name;

    /**
     * 角色id
     */
    @TableField(value = "role_id")
    private Long roleId;

    /**
     * 头像
     */
    @TableField(value = "avatar")
    private String avatar;

    @TableField(exist = false)
    private String verCode;
    @TableField(exist = false)
    private String verKey;
    @TableField(exist = false)
    private String token;
    @TableField(exist = false)
    private Object routes;
}