package com.example.demo.project.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.example.demo.common.base.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
@TableName(value = "system_role")
public class SystemRole extends BaseEntity {
    /**
     * id主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 角色名字
     */
    @TableField(value = "name")
    private String name;

    /**
     * 角色描述
     */
    @TableField(value = "`describe`")
    private String describe;

    /**
     * 是否启用
     */
    @TableField(value = "is_start")
    private Integer isStart;
}