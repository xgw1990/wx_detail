package cn.com.detail.wx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

/**
 * Created by Administrator on 2018/8/14.
 *
 * @Author: xgw
 * @Date: 2018/8/14 11:09
 * @Descriphion:
 */
@SpringBootApplication
@EntityScan(basePackages = "cn.com.detail.wx.model")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
}
