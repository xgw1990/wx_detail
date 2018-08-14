package cn.com.detail.wx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by Administrator on 2018/8/10.
 *
 * @Author: xgw
 * @Date: 2018/8/10 14:52
 * @Descriphion:
 */

@ImportAutoConfiguration
@SpringBootConfiguration
@SpringBootApplication
@EnableJpaRepositories(basePackages = "cn.com.detail.wx")
@EntityScan(basePackages = "cn.com.detail.wx.model")
//@EnableScheduling
//@EnableCaching
//@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class WebStartService {

    public static void main(String[] args) throws IOException {
        Properties properties = new Properties();
        InputStream inputStream = Application.class.getClassLoader().getResourceAsStream("application.properties");
        properties.load(inputStream);
        SpringApplication application = new SpringApplication(Application.class);
        application.setDefaultProperties(properties);
        application.run(WebStartService.class,args);
//        SpringApplication.run(WebStartService.class,args);
    }
//
//    @Override
//    protected final SpringApplicationBuilder configure(final SpringApplicationBuilder application) {
//
//        return application.sources(WebStartService.class);
//    }

}
