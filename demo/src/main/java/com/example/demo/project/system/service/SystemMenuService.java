package com.example.demo.project.system.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.project.system.entity.SystemMenu;
import com.example.demo.project.system.mapper.SystemMenuMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SystemMenuService extends ServiceImpl<SystemMenuMapper, SystemMenu> {
    @Autowired
    private SystemMenuMapper systemMenuMapper;
    public List<SystemMenu> getSystemMenu(Long roleId){
        return systemMenuMapper.getSystemMenu(roleId);
    }
}
