package cn.com.detail.wx.action;

import cn.com.detail.wx.model.entity.User;
import cn.com.detail.wx.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/login")
    public String getLogIn(){
        User user = userRepository.findById("1");
        System.out.println("the user is :"+user.getAge()+user.getName());
        return "index";
    }

    @RequestMapping(value = "/login/confirm",method = RequestMethod.POST)
    @Transient
    public String login(@RequestParam(required = false) String name,
                        @RequestParam(required = false) Integer age,
                        @RequestParam(required = false) String pwd,
                        @RequestParam(required = false) String telPhone){

        System.out.println(name + pwd + age + telPhone);
        User user = new User();
        user.setAge(age);
        user.setName(name);
        user.setPwd(pwd);
        user.setTelPhone(telPhone);
        userRepository.save(user);

        System.out.println("the user is :"+user.getAge()+user.getName());
        return "comm/success";
    }

}
