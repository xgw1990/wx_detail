package cn.com.detail.wx;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;

/**
 * Created by Administrator on 2018/8/9.
 *
 * @Author: xgw
 * @Date: 2018/8/9 18:46
 * @Descriphion:
 */

public class ApiStartService {

    private final static Logger log = LoggerFactory.getLogger(ApiStartService.class);

    public static void main(String[] args) {
        SpringApplication.run(ApiStartService.class, args);
    }

}
