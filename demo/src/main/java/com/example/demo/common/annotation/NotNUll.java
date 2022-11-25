

package com.example.demo.common.annotation;

import java.lang.annotation.*;

@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface NotNUll {
    int[] lengthLimit() default {0, 0};

    String message() default "";

    String pattern() default "";
}
