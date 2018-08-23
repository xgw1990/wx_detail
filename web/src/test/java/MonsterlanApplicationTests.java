//import org.apache.tomcat.jdbc.pool.DataSource;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import javax.sql.DataSource;
import java.util.List;

/**
 * Created by Administrator on 2018/8/23.
 *
 * @Author: xgw
 * @Date: 2018/8/23 10:30
 * @Descriphion:
 */

@RunWith(SpringRunner.class)
//@SpringBootTest
@ContextConfiguration
public class MonsterlanApplicationTests {

//    @Autowired
//    DataSource dataSource;

//    @Autowired(required = false)
//    @Autowired
//    DataSourceProperties dataSourceProperties;

    @Autowired
    ApplicationContext applicationContext;

    @Test
    public void contextLoads() {
        // 获取配置的数据源
        DataSource dataSource = applicationContext.getBean(DataSource.class);
        DataSourceProperties dataSourceProperties = applicationContext.getBean(DataSourceProperties.class);
        // 查看配置数据源信息
        System.out.println(dataSource);
        System.out.println(dataSource.getClass().getName());
        System.out.println(dataSourceProperties);
        //执行SQL,输出查到的数据
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List<?> resultList = jdbcTemplate.queryForList("select * from user");
        System.out.println("===>>>>>>>>>>>" + resultList);
    }
}