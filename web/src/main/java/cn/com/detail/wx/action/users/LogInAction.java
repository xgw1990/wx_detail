package cn.com.detail.wx.action.users;

import cn.com.detail.wx.model.user.User;
import cn.com.detail.wx.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

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
        User user = userRepository.findById(1l);
        System.out.println("the user is :"+user.name);
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
        user.name = name;
        user.pwd = pwd;
        user.telPhone = telPhone;
        userRepository.save(user);

        System.out.println("the user is :"+user.telPhone +user.name);
        return "comm/success";
    }

}
