package cn.com.detail.wx.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.beans.Transient;

/**
 * Created by Administrator on 2018/8/9.
 *
 * @Author: xgw
 * @Date: 2018/8/9 18:53
 * @Descriphion:
 */

@Controller()
public class LogInAction {


    @RequestMapping(value = "/login")
    public String getLogIn(){
        return "index";
    }

    @RequestMapping(value = "/login/confirm",method = RequestMethod.POST)
    @Transient
    public String login(@RequestParam(required = false) String name,
                        @RequestParam(required = false) String age,
                        @RequestParam(required = false) String pwd,
                        @RequestParam(required = false) String telPhone){

        System.out.println(name + pwd + age + telPhone);
        return "comm/success";
    }

}
