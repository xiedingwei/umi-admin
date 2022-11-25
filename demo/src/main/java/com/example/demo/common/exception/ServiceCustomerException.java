package com.example.demo.common.exception;


import lombok.Data;
/*
* 自定义异常类
* */

@Data
public class ServiceCustomerException extends RuntimeException {

    private int code;

    public ServiceCustomerException(int errorCode,String msg) {
        super(msg);
        this.code = errorCode;
    }
}



