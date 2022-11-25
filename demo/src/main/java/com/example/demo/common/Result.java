package com.example.demo.common;

import com.example.demo.common.constant.Constants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private boolean success;
    private int code;
    private String msg;
    private Object data;
    private int showType;
    public static Result success(){
        return new Result(true,Constants.CODE_200,"",null,0);
    }
    public static Result success(Object data){
        return new Result(true,Constants.CODE_200,"",data,0);
    }
    public static Result error(int code,String msg){
        return new Result(false,code,msg,null,2);
    }
    public static Result error(){
        return new Result(false,Constants.CODE_500,"系统错误",null,2);
    }
    public static Result info(int code,String msg){
        return new Result(false,code,msg,null,1);
    }
}
