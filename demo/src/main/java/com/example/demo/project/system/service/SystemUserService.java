package com.example.demo.project.system.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.common.utils.TokenUtils;
import com.example.demo.common.utils.redis.RedisUtil;
import com.example.demo.project.system.entity.SystemUser;
import com.example.demo.project.system.entity.muti.SystemUserMuti;
import com.example.demo.project.system.mapper.SystemUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SystemUserService extends ServiceImpl<SystemUserMapper, SystemUser> {
    @Autowired
    private SystemUserMapper systemUserMapper;
    public SystemUser login(SystemUser systemUser) {
        QueryWrapper<SystemUser> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("username",systemUser.getUsername());
        queryWrapper.eq("password",systemUser.getPassword());
        SystemUser one= getOne(queryWrapper);
        if(one!=null){
            String token = TokenUtils.genToken(one);
            RedisUtil.Set("USER_TOKEN"+systemUser.getUsername(),token);
            one.setToken(token);
        }
//        throw new ServiceCustomerException(Constants.CODE_500,"系统异常");
        return one;
    }
    public List<SystemUserMuti> getPageList(SystemUser systemUser){
        return systemUserMapper.getPageList(systemUser);
    }
}
