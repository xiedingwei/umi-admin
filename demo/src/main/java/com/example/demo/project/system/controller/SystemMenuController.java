package com.example.demo.project.system.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.common.Result;
import com.example.demo.project.system.entity.SystemMenu;
import com.example.demo.project.system.entity.SystemRoleMenu;
import com.example.demo.project.system.service.SystemMenuService;
import com.example.demo.project.system.service.SystemRoleMenuService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collection;

@RestController
@RequestMapping("/systemMenu")
public class SystemMenuController {
    @Autowired
    private SystemRoleMenuService systemRoleMenuService;
    @Autowired
    private SystemMenuService systemMenuService;
    @GetMapping("/list")
    public Result list(){
        return Result.success(systemMenuService.list());
    }
    @GetMapping("/pageList")
    public Result pageList(@RequestParam(defaultValue = "") String path,
                           @RequestParam(defaultValue = "") String name,
                           @RequestParam(defaultValue = "") String createUser,
                           @RequestParam(defaultValue = "1") int pageNum,
                           @RequestParam(defaultValue = "8") int pageSize
    ){
        PageHelper.startPage(pageNum, pageSize);
        QueryWrapper<SystemMenu> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("id");
        if(!path.equals("")){
            queryWrapper.like("path",path);
        }
        if(!name.equals("")){
            queryWrapper.like("name",name);
        }
        if(!createUser.equals("")){
            queryWrapper.like("create_user",createUser);
        }
        PageInfo<SystemMenu> pageInfo = new PageInfo<>(systemMenuService.list(queryWrapper));
        return Result.success(pageInfo);
    }
    @PostMapping("/updateOrSave")
    public Result updateOrSave(
            @RequestBody SystemMenu systemMenu
    ){
        return Result.success(systemMenuService.saveOrUpdate(systemMenu));
    }
    @GetMapping("/delete")
    public Result delete(@RequestParam String[] id){
        try{
            Collection ids = Arrays.asList(id);
            QueryWrapper<SystemRoleMenu> systemRoleMenuQueryWrapper = new QueryWrapper<>();
            for (int i=0;i<id.length;i++){
                systemRoleMenuQueryWrapper.eq("menu_id",id[i]);
                systemRoleMenuService.remove(systemRoleMenuQueryWrapper);
            }
            systemMenuService.removeByIds(ids);
            return Result.success();
        }catch (Exception e){
            return Result.error();
        }
    }
}
