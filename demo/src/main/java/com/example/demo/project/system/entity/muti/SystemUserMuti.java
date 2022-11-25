package com.example.demo.project.system.entity.muti;

import com.baomidou.mybatisplus.annotation.TableField;
import com.example.demo.project.system.entity.SystemUser;
import lombok.Data;

@Data
public class SystemUserMuti extends SystemUser {
    @TableField(value = "role_name")
    private String roleName;
}
