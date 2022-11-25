package com.example.demo.common;

import com.example.demo.common.annotation.NotNUll;
import com.example.demo.common.constant.Constants;
import com.example.demo.common.exception.ServiceCustomerException;
import com.example.demo.common.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Parameter;
import java.util.ArrayList;
import java.util.List;

/**
 * @author hef
 * @date 2019-03-25 14:26
 */
public class CheckParamsInterceptor  extends HandlerInterceptorAdapter {
    private static Logger LOG = LoggerFactory.getLogger(CheckParamsInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        if (!(handler instanceof HandlerMethod)) {
            LOG.warn("UnSupport handler");
            return true;
        }
        //拿到该方法上加了注解的参数名称
        List<String> list = getParamsName((HandlerMethod) handler);
        for (String s : list) {
            //获取到参数名称并判断是否为空
            String parameter = request.getParameter(s);
            if (StringUtils.isEmpty(parameter)){
                throw new ServiceCustomerException(Constants.CODE_400,"参数不能为空");
            }
        }
        //如果拿到的对象为空,说明没有此注解,直接放行
        return true;
    }

    /**
     * 拿到在参数上加了该注解的参数名称
     */
    private List getParamsName(HandlerMethod handlerMethod) {
        Parameter[] parameters = handlerMethod.getMethod().getParameters();
        List<String> list = new ArrayList<String>();
        for (Parameter parameter : parameters) {
            if(parameter.isAnnotationPresent(NotNUll.class)){
                list.add(parameter.getName());
            }
        }
        return list;
    }
}
