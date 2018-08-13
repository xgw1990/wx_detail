package cn.com.detail.wx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Created by Administrator on 2018/8/10.
 *
 * @Author: xgw
 * @Date: 2018/8/10 14:52
 * @Descriphion:
 */

//@ComponentScan("cn.com.detail.wx")
@ImportAutoConfiguration
@SpringBootConfiguration
@SpringBootApplication
@EnableJpaRepositories(basePackages = "cn.com.detail.wx")
@EntityScan(basePackages = "cn.com.detail.wx.model")
@EnableScheduling
@EnableCaching
public class WebStartService {

    public static void main(String[] args) {
        SpringApplication.run(WebStartService.class,args);
    }
}
