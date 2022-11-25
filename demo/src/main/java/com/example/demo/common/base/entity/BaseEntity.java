package com.example.demo.common.base.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
@Data
public class BaseEntity {
    /**
     * 创建人
     */
    @TableField(value = "create_user")
    private String createUser;
    /**
     * 创建时间
     */
    @TableField(value = "create_time")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;
    /**
     * 是否能删除
     */
    @TableField(value = "is_delete")
    private Integer isDelete;

}
