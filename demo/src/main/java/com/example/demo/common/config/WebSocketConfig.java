package com.example.demo.common.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class WebSocketConfig {
    /**
     * 注入一个ServerEndpointExporter,该Bean会自动注册使用@ServerEndpoint注解申明的websocket endpoint
     */
//    @Bean
//    public ServerEndpointExporter serverEndpointExporter() {
//        return new ServerEndpointExporter();
//    }
//    @Autowired
//    public void userService(UserService userService){
//        WebSocketServer.userService = userService;
//    }
//    @Autowired
//    public void mongoTemplate(MongoTemplate mongoTemplate){
//        WebSocketServer.mongoTemplate = mongoTemplate;
//    }
//    @Autowired
//    public void qqUserDao(QQUserDao qqUserDao){
//        WebSocketServer.qqUserDao = qqUserDao;
//    }
}
