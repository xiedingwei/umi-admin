package com.example.demo.project.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.project.system.entity.SystemMenu;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SystemMenuMapper extends BaseMapper<SystemMenu> {
    List<SystemMenu> getSystemMenu(Long roleId);
}