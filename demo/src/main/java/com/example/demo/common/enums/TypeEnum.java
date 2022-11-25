package com.example.demo.common.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.example.demo.common.enums.vo.IEnumVo;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum TypeEnum implements IEnumVo{
    BANNER(0, "头部"),
    SERVICE(1, "产品");
    @EnumValue
    private int value;
    @JsonValue
    private String desc;

    TypeEnum(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }


    @Override
    public int value() {
        return this.value;
    }

    @Override
    public String desc() {
        return this.desc;
    }
}
