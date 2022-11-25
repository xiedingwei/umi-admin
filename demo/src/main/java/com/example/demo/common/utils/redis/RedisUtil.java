package com.example.demo.common.utils.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import javax.annotation.PostConstruct;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Component
public class RedisUtil {
    @Autowired
    private RedisTemplate<String, Object> redis;

    public static RedisTemplate<String, Object> redisTemplate;
    @PostConstruct
    public void getRedisTemplate(){
        redisTemplate=this.redis;
    }
    //===============缓存相关方法===============

    //指定缓存失效时间
    public static boolean expire(String key, long time) {
        try {
            if (time > 0) {
                redisTemplate.expire(key, time, TimeUnit.SECONDS);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //根据key获取过期时间,返回0代表为永久有效
    public static long getExpire(String key) {
        return redisTemplate.getExpire(key, TimeUnit.SECONDS);
    }

    //===============数据类型为String或者对象类型的相关方法===============

    //根据key值获取缓存值
    public static Object Get(String key) {
        return key == null ? null : redisTemplate.opsForValue().get(key);
    }

    //根据key值存入数据类型为String的缓存值
    public static boolean Set(String key, Object value) {
        try {
            redisTemplate.opsForValue().set(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //根据key值存入数据类型为String的缓存值并设置时间
    public static boolean Set(String key, Object value, long time) {
        try {
            if (time > 0) {
                redisTemplate.opsForValue().set(key, value, time, TimeUnit.SECONDS);
            } else {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //删除缓存
    public static void Delete(String... key) {
        if (key != null && key.length > 0) {
            if (key.length == 1) {
                redisTemplate.delete(key[0]);
            } else {
                redisTemplate.delete((Collection<String>) CollectionUtils.arrayToList(key));
            }
        }
    }

    //===============数据类型为Hash的相关方法===============

    //根据key和item获取缓存值
    public static Object hashGet(String key, String item) {
        return redisTemplate.opsForHash().get(key, item);
    }

    //根据key和item存入数据类型为Hash的缓存值
    public static boolean hashSet(String key, String item, Object value) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //根据key和item存入数据类型为Hash的缓存值并设置时间
    public static boolean hashSetWithTime(String key, String item, Object value, long time) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            if (time > 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //删除缓存
    public static void hashDelete(String key, Object... item) {
        redisTemplate.opsForHash().delete(key, item);
    }

    //===============数据类型为SET的相关方法===============

    //根据key值获取缓存值
    public static Set<Object> setGet(String key) {
        try {
            return redisTemplate.opsForSet().members(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //根据key值存入数据类型为SET的缓存值
    public static long setSet(String key, Object... values) {
        try {
            return redisTemplate.opsForSet().add(key, values);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    //根据key值存入数据类型为SET的缓存值并设置时间
    public static long setSetWithTime(String key, long time, Object... values) {
        try {
            Long count = redisTemplate.opsForSet().add(key, values);
            if (time > 0) {
                expire(key, time);
            }
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    //删除缓存
    public static long setDelete(String key, Object... values) {
        try {
            Long count = redisTemplate.opsForSet().remove(key, values);
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    //===============数据类型为LIST的相关方法===============
    //获取List缓存的内容，从start到end，若从0到-1代表所有值
    public static List<Object> listGet(String key, long start, long end) {
        try {
            return redisTemplate.opsForList().range(key, start, end);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //根据key值存入数据类型为List的缓存值
    public static boolean listSet(String key, Object value) {
        try {
            redisTemplate.opsForList().rightPush(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //根据key值存入数据类型为List的缓存值并设置时间
    public static boolean listSetWithTime(String key, Object value, long time) {
        try {
            redisTemplate.opsForList().rightPush(key, value);
            if (time > 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //删除缓存
    public static long listDelete(String key, long count, Object value) {
        try {
            Long remove = redisTemplate.opsForList().remove(key, count, value);
            return remove;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }


}
