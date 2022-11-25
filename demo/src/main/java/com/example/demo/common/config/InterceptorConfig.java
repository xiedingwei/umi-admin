package com.example.demo.common.config;

import com.example.demo.common.CheckParamsInterceptor;
import com.example.demo.common.JwtInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    CheckParamsInterceptor checkSourceInterceptor = new CheckParamsInterceptor();
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(checkSourceInterceptor).addPathPatterns("/**");
        registry.addInterceptor(jwtInterceptor_t())
                .addPathPatterns("/**").excludePathPatterns(
                 "/systemUser/login",
                "/files/**",
                "/common/**");
    }
    @Bean
    public JwtInterceptor jwtInterceptor_t(){
        return new JwtInterceptor();
    }
}
