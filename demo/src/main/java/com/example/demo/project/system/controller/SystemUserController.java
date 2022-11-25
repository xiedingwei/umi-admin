package com.example.demo.project.system.controller;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import com.example.demo.common.Result;
import com.example.demo.common.constant.Constants;
import com.example.demo.common.utils.TokenUtils;
import com.example.demo.common.utils.redis.RedisUtil;
import com.example.demo.project.system.entity.SystemMenu;
import com.example.demo.project.system.entity.SystemUser;
import com.example.demo.project.system.entity.muti.SystemUserMuti;
import com.example.demo.project.system.service.SystemMenuService;
import com.example.demo.project.system.service.SystemUserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * @author  xiedingwei
 * @date 2022-10-27 21:26
 */
@RestController
@RequestMapping("/systemUser")
public class SystemUserController {
    @Autowired
    private SystemUserService systemUserService;
    @Autowired
    private SystemMenuService systemMenuService;
    //用户登入判断
    @PostMapping("/login")
    public Result login(@RequestBody SystemUser systemUser){

        // 获取redis中的验证码
        Object redisCode = RedisUtil.Get(systemUser.getVerKey());
        if(redisCode==null){
            return Result.error(600,"验证码已过期");
        }
        // 判断验证码
        if (systemUser.getVerCode()==null) {
            return Result.error(600,"验证码不能为空");
        }
        if(!redisCode.toString().equals(systemUser.getVerCode().trim().toLowerCase())){
            return Result.error(600,"验证码不正确");
        }
        if(systemUserService.login(systemUser)!=null){
            return Result.success(systemUserService.login(systemUser));
        }
        return Result.error(600,"账号或密码不正确");
    }
    @GetMapping("/getCurrentUser")
    public Result getCurrentUser(String username) {
        if(TokenUtils.getSystemUser().getUsername().equals(username)){
            SystemUser systemUser=systemUserService.getById(username);
            List<SystemMenu> systemMenu=systemMenuService.getSystemMenu(systemUser.getRoleId());
            systemUser.setRoutes(systemMenu);
            return Result.success(systemUser);
        }
        return Result.info(Constants.CODE_401,"用户token和username不同");
    }
    @GetMapping("/pageList")
    public Result pageList(@RequestParam(defaultValue = "") String username,
                           @RequestParam(defaultValue = "") String name,
                           @RequestParam(defaultValue = "") Long roleId,
                           @RequestParam(defaultValue = "") String createUser,
                           @RequestParam(defaultValue = "1") int pageNum,
                           @RequestParam(defaultValue = "8") int pageSize
    ){
        PageHelper.startPage(pageNum, pageSize);
        SystemUser systemUser=new SystemUser();
        systemUser.setUsername(username);
        systemUser.setName(name);
        systemUser.setRoleId(roleId);
        systemUser.setCreateUser(createUser);
        PageInfo<SystemUserMuti> pageInfo = new PageInfo<>(systemUserService.getPageList(systemUser));
        return Result.success(pageInfo);
    }
    @PostMapping("/updateOrSave")
    public Result updateOrSave(
            String username,
            String password,
            String name,
            String avatar,
            String createUser,
            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")Date createTime,
            Long roleId,
            Long isDelete,
            MultipartFile fileImg
    ){
//        String resourceUrl = Thread.currentThread().getContextClassLoader().getResource("").getPath() + "static/files/";
        String resourceUrl = "C:/Users/谢定伟/Desktop/基于umi后台管理项目/demo/target/classes/static/files/";
        SystemUser newSystemUser=new SystemUser();
//        String resourceUrl = fileUploadPath;
//           找到之前的文件
        if(isDelete!=null&&!isDelete.equals("")){
            SystemUser oldSystemUser = systemUserService.getById(username);
            if(oldSystemUser==null){
                return Result.error(401,"文件id错误");
            }
            if(fileImg!=null){
                File tempFile=new File(oldSystemUser.getAvatar());
                //删除以前照片
                String realPath =  resourceUrl+tempFile.getName();
                File fileBefore = new File(realPath);
                //如果原来有图片则删除
                if (fileBefore.exists()) {
                    fileBefore.delete();
                }
            }
        }
        if(fileImg!=null){
            String uuid= IdUtil.fastSimpleUUID();
            String fileUrl = "/files/" + uuid + fileImg.getOriginalFilename();
            String filePath = resourceUrl + uuid + fileImg.getOriginalFilename();
            File newFile=new File(filePath);
            File parentFile = newFile.getParentFile();
            if (!parentFile.exists()) {
                parentFile.mkdirs();
            }
            try {
                FileUtil.writeBytes(fileImg.getBytes(), filePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
            newSystemUser.setAvatar(fileUrl);
        }
        newSystemUser.setUsername(username);
        newSystemUser.setPassword(password);
        newSystemUser.setName(name);
        newSystemUser.setCreateUser(createUser);
        newSystemUser.setCreateTime(createTime);
        newSystemUser.setRoleId(roleId);
        if(isDelete!=null&&!isDelete.equals("")){
            return Result.success(systemUserService.saveOrUpdate(newSystemUser));
        }else{
            try{
                return Result.success(systemUserService.save(newSystemUser));
            }catch (Exception e){
                return Result.info(405,"账号已存在！");
            }
        }
    }
    @GetMapping("/delete")
    public Result delete(@RequestParam String[] id){
        try{
            Collection ids = Arrays.asList(id);
            systemUserService.removeByIds(ids);
            return Result.success();
        }catch (Exception e){
            return Result.error();
        }
    }
}
