package com.example.demo.common.enums;

import com.example.demo.common.enums.vo.IEnumVo;
import lombok.Getter;

@Getter
public enum ChOrEnEnum implements IEnumVo {
    CH(0, "中文"),
    EN(1, "英文");
    private int value;
    private String desc;

    ChOrEnEnum(int value, String desc) {
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

