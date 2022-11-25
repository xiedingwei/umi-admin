package com.example.demo.common.utils;

import cn.hutool.core.date.DateUtil;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.project.system.entity.SystemUser;
import com.example.demo.project.system.service.SystemUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
@Component
public class TokenUtils {

    @Autowired
    private SystemUserService systemUserService;

    private static SystemUserService staticSystemUserService;

    @PostConstruct
    public void init() {
        staticSystemUserService = systemUserService;
    }
    /**
     * 生成token
     */
    public static String genToken(SystemUser systemUser) {
        return JWT.create().withExpiresAt((DateUtil.offsetHour(new Date(),2)))
                .withAudience(systemUser.getUsername())
                .sign(Algorithm.HMAC256(systemUser.getPassword()));
    }
    /**
     * 获取token中的用户信息
     * @return
     */
    public static SystemUser getSystemUser() {
        try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            String token = request.getHeader("TOKEN");
            String userId = JWT.decode(token).getAudience().get(0);
            return staticSystemUserService.getById(userId);
        } catch (Exception e) {
            return null;
        }
    }
}
