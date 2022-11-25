package com.example.demo.project.system.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "system_role_menu")
public class SystemRoleMenu{
    @TableField(value = "role_id")
    private Long roleId;

    @TableField(value = "menu_id")
    private Long menuId;
}