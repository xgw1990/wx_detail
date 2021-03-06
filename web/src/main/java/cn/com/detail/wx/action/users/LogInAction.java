package cn.com.detail.wx.action.users;

import cn.com.detail.wx.model.user.Customer;
import cn.com.detail.wx.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.beans.Transient;

import static cn.com.detail.wx.utils.CollectionUtil.entry;
import static cn.com.detail.wx.utils.CollectionUtil.map;

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

    /**
     * 品号管理列表
     */
    @RequestMapping("/login/product")
    public ModelAndView list() {
        return new ModelAndView("/product/list", map(entry("design", false)));
    }


    @RequestMapping(value = "/login")
    public String getLogIn(){
//        Customer customer = userRepository.findById(1l);
//        System.out.println("the customer is :"+ customer.name);
        return "index";
    }

    @RequestMapping(value = "/login/confirm",method = RequestMethod.POST)
    @Transient
    public String login(@RequestParam(required = false) String name,
                        @RequestParam(required = false) Integer age,
                        @RequestParam(required = false) String pwd,
                        @RequestParam(required = false) String telPhone){

        System.out.println(name + pwd + age + telPhone);
        Customer customer = new Customer();
        customer.name = name;
        customer.pwd = pwd;
        customer.telPhone = telPhone;
        userRepository.save(customer);

        System.out.println("the customer is :"+ customer.telPhone + customer.name);
        return "comm/success";
    }

}
