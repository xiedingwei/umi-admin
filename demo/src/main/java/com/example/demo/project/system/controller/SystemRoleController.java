package com.example.demo.project.system.controller;

import cn.hutool.json.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.demo.common.Result;
import com.example.demo.common.annotation.NotNUll;
import com.example.demo.project.system.entity.SystemRole;
import com.example.demo.project.system.entity.SystemRoleMenu;
import com.example.demo.project.system.service.SystemRoleMenuService;
import com.example.demo.project.system.service.SystemRoleService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/systemRole")
public class SystemRoleController {
    @Autowired
    private SystemRoleMenuService systemRoleMenuService;
    @Autowired
    private SystemRoleService systemRoleService;

    @PostMapping("/updateRoleMenu")
    public Result updateRoleMenu(@RequestBody JSONObject object){
        try{
            List<JSONObject> jsonObjects= (List<JSONObject>) object.get("list");
            for(int i=0;i<jsonObjects.size();i++){
                if(jsonObjects.get(i).get("type").equals("add")){
                    SystemRoleMenu systemRoleMenu = new SystemRoleMenu();
                    systemRoleMenu.setRoleId(((Integer) jsonObjects.get(i).get("roleId")).longValue());
                    systemRoleMenu.setMenuId(((Integer) jsonObjects.get(i).get("menuId")).longValue());
                    systemRoleMenuService.save(systemRoleMenu);
                }else{
                    QueryWrapper<SystemRoleMenu> queryWrapper = new QueryWrapper<>();
                    queryWrapper.eq("role_id",jsonObjects.get(i).get("roleId"));
                    queryWrapper.eq("menu_id",jsonObjects.get(i).get("menuId"));
                    systemRoleMenuService.remove(queryWrapper);
                }
            }
            return Result.success();
        }catch (Exception e){
            return Result.error();
        }
    }
    @GetMapping("/list")
    public Result list(){
        return Result.success(systemRoleService.list());
    }
    @GetMapping("/roleMenuList")
    public Result roleMenuList(@NotNUll long id){
        QueryWrapper<SystemRoleMenu> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("role_id",id);
        return Result.success(systemRoleMenuService.list(queryWrapper));
    }
    @GetMapping("/pageList")
    public Result pageList(@RequestParam(defaultValue = "") String name,
                           @RequestParam(defaultValue = "") String createUser,
                           @RequestParam(defaultValue = "1") int pageNum,
                           @RequestParam(defaultValue = "8") int pageSize
    ){
        PageHelper.startPage(pageNum, pageSize);
        QueryWrapper<SystemRole> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("id");
        if(!name.equals("")){
            queryWrapper.like("name",name);
        }
        if(!createUser.equals("")){
            queryWrapper.like("create_user",createUser);
        }
        PageInfo<SystemRole> pageInfo = new PageInfo<>(systemRoleService.list(queryWrapper));
        return Result.success(pageInfo);
    }
    @PostMapping("/updateOrSave")
    public Result updateOrSave(
            @RequestBody SystemRole systemRole
    ){
        return Result.success(systemRoleService.saveOrUpdate(systemRole));
    }
    @GetMapping("/delete")
    public Result delete(@RequestParam String[] id){
        try{
            Collection ids = Arrays.asList(id);
            QueryWrapper<SystemRoleMenu> systemRoleMenuQueryWrapper = new QueryWrapper<>();
            for (int i=0;i<id.length;i++){
                systemRoleMenuQueryWrapper.eq("role_id",id[i]);
                systemRoleMenuService.remove(systemRoleMenuQueryWrapper);
            }
            systemRoleService.removeByIds(ids);
            return Result.success();
        }catch (Exception e){
            return Result.error();
        }
    }
}
