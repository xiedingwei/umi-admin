package com.example.demo.common;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.demo.common.constant.Constants;
import com.example.demo.common.exception.ServiceCustomerException;
import com.example.demo.common.utils.redis.RedisUtil;
import com.example.demo.project.system.entity.SystemUser;
import com.example.demo.project.system.service.SystemUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtInterceptor implements HandlerInterceptor {
    @Autowired
    private SystemUserService systemUserService;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
        String token = request.getHeader("TOKEN");
//        if(!(handler instanceof HandlerMethod)){
//            return true;
//        }
        if(token == null){
            throw new ServiceCustomerException(Constants.CODE_401,"请登入后再访问");
        }
        String userId;
        try{
            userId = JWT.decode(token).getAudience().get(0);
        }catch (JWTDecodeException j){
            throw new ServiceCustomerException(Constants.CODE_401,"Token验证失败");
        }
        if(!RedisUtil.Get("USER_TOKEN"+userId).toString().equals(token)){
            throw new ServiceCustomerException(Constants.CODE_401,"你的账号已经在别处登入，请重新登入如果非本人操作，请尽快联系管理员修改密码！");
        }
        SystemUser user = systemUserService.getById(userId);
        if(user == null){
            throw new ServiceCustomerException(Constants.CODE_401,"用户不存在");
        }
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getPassword())).build();
        try {
            jwtVerifier.verify(token);
        }catch (JWTVerificationException e){
            throw new ServiceCustomerException(Constants.CODE_401,"Token验证失败");
        }
        return true;
    }
}
