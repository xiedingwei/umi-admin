package com.example.demo.project.system.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.example.demo.common.base.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
@TableName(value = "system_menu")
public class SystemMenu extends BaseEntity {
    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 路径
     */
    @TableField(value = "path")
    private String path;

    /**
     * 名字
     */
    @TableField(value = "name")
    private String name;

    /**
     * 图标（可选）
     */
    @TableField(value = "icon",updateStrategy = FieldStrategy.IGNORED)
    private String icon;

    /**
     * 父id
     */
    @TableField(value = "parent_id",updateStrategy = FieldStrategy.IGNORED)
    private Long parentId;

}