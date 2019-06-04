import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import javax.sql.DataSource;
import java.security.PublicKey;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

/**
 * Created by Administrator on 2018/8/23.
 *
 * @Author: xgw
 * @Date: 2018/8/23 10:30
 * @Descriphion:
 */

//@RunWith(SpringRunner.class)
//@SpringBootTest
public class MonsterlanApplicationTests {

//    @Autowired
//    DataSource dataSource;

//    @Autowired
//    @Autowired(required = false)
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

    @Test
    public void test(){
        HashMap<String,String> hashMap = new HashMap<>();

        hashMap.put("1","1");
        hashMap.put("3","3");


        for (String key : hashMap.keySet()) {
            System.out.printf("test ===================");
            if (key.equals("3")) {
                hashMap.remove("3");
            }
        }
    }


    @Test
    public void testWhile() {

        int i=0;
        while (true) {
            System.out.println("keep healthy "+i++ );
            int j = new Random(123).nextInt();
            if (i== j )
            {
                System.out.printf("random equals ");
                break;
            }
            if (i==100) {
                System.out.printf("random not equals ,print 100");
                break;
            }
        }

    }
}