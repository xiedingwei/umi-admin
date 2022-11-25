package com.example.demo.common.enums;

import com.example.demo.common.enums.vo.IEnumVo;
import lombok.Getter;

@Getter
public enum PageEnum implements IEnumVo {
    index(0, "首页"),
    SERVICE(1, "产品服务"),
    CERT(2, "证书"),
    ABOUT(3, "关于我们");
    private int value;
    private String desc;

    PageEnum(int value, String desc) {
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
