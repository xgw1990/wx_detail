package cn.com.detail.wx;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Created by Administrator on 2018/8/9.
 *
 * @Author: xgw
 * @Date: 2018/8/9 18:46
 * @Descriphion:
 */

@SpringBootApplication
@EnableJpaRepositories(basePackages = "cn.com.detail.wx")
@EntityScan(basePackages = "cn.com.detail.wx.model")
@EnableScheduling
@EnableCaching
public class ApiStartService {

    private final static Logger log = LoggerFactory.getLogger(ApiStartService.class);

    public static void main(String[] args) {
        SpringApplication.run(ApiStartService.class, args);
    }

}
