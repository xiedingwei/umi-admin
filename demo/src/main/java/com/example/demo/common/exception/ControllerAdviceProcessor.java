package com.example.demo.common.exception;


import com.example.demo.common.Result;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
/*
* 监听异常类并放回前端提示
* */
@RestControllerAdvice
public class ControllerAdviceProcessor {

    @ExceptionHandler(ServiceCustomerException.class)
    public Result handleException(HttpServletRequest request, ServiceCustomerException ex) {
        return Result.error(ex.getCode(), ex.getMessage());
    }
}


