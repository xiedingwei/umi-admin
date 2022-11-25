package com.example.demo.project.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.project.system.entity.SystemUser;
import com.example.demo.project.system.entity.muti.SystemUserMuti;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SystemUserMapper extends BaseMapper<SystemUser> {
    List<SystemUserMuti> getPageList(SystemUser systemUser);
}