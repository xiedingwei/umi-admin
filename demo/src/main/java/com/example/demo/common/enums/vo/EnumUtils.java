package com.example.demo.common.enums.vo;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class EnumUtils {
    public static boolean isContain(Class clazz, Integer value) {
        boolean flag = false;
        List<EnumVo> list = listEnumVo(clazz);
        for (EnumVo enumVo : list) {
            if (enumVo.getValue() == value) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    /**
     * 导出符合前端select2规范的数据格式
     *
     * @param enumT
     * @param <T>
     * @return
     */
    public static <T> List<SelectVo> listSelect(Class<T> enumT) {
        List<SelectVo> enumVoList = new ArrayList<>();
        if (!enumT.isEnum()) {
            return enumVoList;
        }
        T[] enums = enumT.getEnumConstants();
        if (enums == null || enums.length <= 0) {
            return enumVoList;
        }
        /*默认接口value方法*/
        String valueMathod = "getValue";
        /*默认接口typeName方法*/
        String desMathod = "getDesc";
        for (int i = 0, len = enums.length; i < len; i++) {
            T tobj = enums[i];
            try {
                SelectVo enumVo = new SelectVo();
                /*获取value值*/
                Object resultValue = getMethodValue(valueMathod, tobj);
                if ("".equals(resultValue)) {
                    continue;
                }
                /*获取desc描述值*/
                Object resultDes = getMethodValue(desMathod, tobj);
                /*如果描述不存在获取属性值*/
                if ("".equals(resultDes)) {
                    resultDes = tobj;
                }
                enumVo.setId((Integer) resultValue);
                enumVo.setText(resultDes + "");
                enumVoList.add(enumVo);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return enumVoList;
    }

    /**
     * 根据值获取描述
     *
     * @param value
     * @param enumT
     * @param <T>
     * @return
     */
    public static <T> String getDescByValue(Object value, Class<T> enumT) {
        /*不是枚举则返回""*/
        if (!enumT.isEnum()) {
            return "";
        }
        T[] enums = enumT.getEnumConstants();
        if (enums == null || enums.length <= 0) {
            return "";
        }
        String valueMathod = "getValue";
        String desMathod = "getDesc";
        for (int i = 0, len = enums.length; i < len; i++) {
            T t = enums[i];
            try {
                /*获取枚举对象value*/
                Object resultValue = getMethodValue(valueMathod, t);
                if (resultValue.toString().equals(value + "")) {
                    /*存在则返回对应描述*/
                    Object resultDes = getMethodValue(desMathod, t);
                    return resultDes + "";
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return "";
    }

    public static <T> Integer getValueByDesc(Object value, Class<T> enumT) {
        /*不是枚举则返回""*/
        if (!enumT.isEnum()) {
            return null;
        }
        T[] enums = enumT.getEnumConstants();
        if (enums == null || enums.length <= 0) {
            return null;
        }
        String valueMathod = "getValue";
        String desMathod = "getDesc";
        for (int i = 0, len = enums.length; i < len; i++) {
            T t = enums[i];
            try {
                /*获取枚举对象value*/
                Object resultDes = getMethodValue(desMathod, t);
                if (resultDes == null) {
                    return null;
                }
                if (resultDes.toString().equals(value + "")) {
                    /*存在则返回对应描述*/
                    Object resultValue = getMethodValue(valueMathod, t);
                    return (Integer) resultValue;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return -1;
    }

    /**
     * 返回list
     *
     * @param enumT
     * @param <T>
     * @return
     */
    public static <T> List<EnumVo> listEnumVo(Class<T> enumT) {
        List<EnumVo> enumVoList = new ArrayList<>();
        if (!enumT.isEnum()) {
            return enumVoList;
        }
        T[] enums = enumT.getEnumConstants();
        if (enums == null || enums.length <= 0) {
            return enumVoList;
        }
        /*默认接口value方法*/
        String valueMathod = "getValue";
        /*默认接口typeName方法*/
        String desMathod = "getDesc";
        for (int i = 0, len = enums.length; i < len; i++) {
            T tobj = enums[i];
            try {
                EnumVo enumVo = new EnumVo();
                /*获取value值*/
                Object resultValue = getMethodValue(valueMathod, tobj);
                if ("".equals(resultValue)) {
                    continue;
                }
                /*获取desc描述值*/
                Object resultDes = getMethodValue(desMathod, tobj);
                /*如果描述不存在获取属性值*/
                if ("".equals(resultDes)) {
                    resultDes = tobj;
                }
                enumVo.setValue((Integer) resultValue);
                enumVo.setDesc(resultDes + "");
                enumVoList.add(enumVo);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return enumVoList;
    }

    /**
     * 根据方法名获取值
     *
     * @param methodName
     * @param obj
     * @param args
     * @param <T>
     * @return
     */
    private static <T> Object getMethodValue(String methodName, T obj, Object... args) {
        Object resut = "";
        try {
            Method[] methods = obj.getClass().getMethods();
            if (methods.length <= 0) {
                return resut;
            }
            Method method = null;
            for (int i = 0, len = methods.length; i < len; i++) {
                if (methods[i].getName().equalsIgnoreCase(methodName)) {
                    methodName = methods[i].getName();
                    method = methods[i];
                    break;
                }
            }
            if (method == null) {
                return resut;
            }
            resut = method.invoke(obj, args);
            if (resut == null) {
                resut = "";
            }
            return resut;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resut;
    }



}
