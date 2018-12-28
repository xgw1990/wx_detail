package cn.com.detail.wx.action.products;

import cn.com.detail.wx.model.product.Product;
import cn.com.detail.wx.model.user.User;
import cn.com.detail.wx.repository.ProductRepository;
import cn.com.detail.wx.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.beans.Transient;

/**
 * Created by Administrator on 2018/8/9.
 * @Author: xgw
 * @Date: 2018/8/9 18:53
 * @Descriphion:
 */

@Controller()
public class ProductControllerAction {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @RequestMapping(value = "/product")
    public String getLogIn(){
        User user = userRepository.findById("1");
        System.out.println("the user is :"+user.name);
        return "product/index";
    }

    @Transient
    @RequestMapping(value = "/product/upload",method = RequestMethod.POST)
    public String login(@RequestParam(required = false) String name,
                        @RequestParam(required = false) Integer age,
                        @RequestParam(required = false) String picture,
                        @RequestParam(required = false) String telPhone){

        Product product = new Product();
        product.name = name;
        product.picture = picture;

        productRepository.findById("1l");

        productRepository.save(product);

        System.out.println(name + picture + age + telPhone);

        System.out.println("the user is :"+telPhone +name);
        return "success";
    }


}
