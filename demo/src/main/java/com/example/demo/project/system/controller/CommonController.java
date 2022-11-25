package com.example.demo.project.system.controller;

        import cn.hutool.core.util.IdUtil;
        import cn.hutool.json.JSONObject;
        import com.example.demo.common.Result;
        import com.example.demo.common.constant.Constants;
        import com.example.demo.common.enums.vo.EnumUtils;
        import com.example.demo.common.exception.ServiceCustomerException;
        import com.example.demo.common.utils.StringUtils;
        import com.example.demo.common.utils.redis.RedisUtil;
        import com.wf.captcha.SpecCaptcha;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RestController;

        import javax.servlet.ServletOutputStream;
        import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/common")
public class CommonController{

    @GetMapping("/getEnum")
    public Result getEnum(String name, String type) {
        String pack = "com.example.demo.common.enums.";
        if (StringUtils.isNotEmpty(type)) {
            pack = pack + type + ".";
        }
        if (!name.endsWith("Enum")) {
            throw new ServiceCustomerException(Constants.CODE_400,"参数不对");
        }
        try {
            return Result.success(EnumUtils.listSelect(Class.forName(pack + name)));
        } catch (ClassNotFoundException e) {
            throw new ServiceCustomerException(Constants.CODE_400,"不支持的操作");
        }
    }
    /**
     * 生成验证码
     * @return
     * @throws Exception
     */
    @GetMapping("/getCode")
    public Result getCode(HttpServletResponse response) throws Exception {
        ServletOutputStream outputStream = response.getOutputStream();

        //算术验证码 数字加减乘除. 建议2位运算就行:captcha.setLen(2);
//        ArithmeticCaptcha captcha = new ArithmeticCaptcha(120, 40);

        // 中文验证码
//        ChineseCaptcha captcha = new ChineseCaptcha(120, 40);
        //英文与数字动态验证码
//        GifCaptcha captcha = new GifCaptcha(120, 40);

//         英文与数字验证码
        SpecCaptcha captcha = new SpecCaptcha(120, 40,4);
        String verCode = captcha.text().toLowerCase();
        String uuid = IdUtil.fastSimpleUUID();
        RedisUtil.Set(uuid,verCode,60);

        // 中文动态验证码
//        ChineseGifCaptcha captcha = new ChineseGifCaptcha(120, 40);
        // 几位数运算，默认是两位
//        captcha.setLen(2);
        // 获取运算的结果
//        String result = captcha.text();
//        System.out.println(result);
//        captcha.out(outputStream);
        JSONObject result = new JSONObject();
        result.set("verKey",uuid);
        result.set("base64",captcha.toBase64());
        return Result.success(result);
    }
}
