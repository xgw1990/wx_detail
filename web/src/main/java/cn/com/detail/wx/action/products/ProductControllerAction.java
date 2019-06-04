package cn.com.detail.wx.action.products;

import cn.com.detail.wx.model.product.Product;
import cn.com.detail.wx.model.user.Customer;
import cn.com.detail.wx.repository.ProductRepository;
import cn.com.detail.wx.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.beans.Transient;
import java.util.HashMap;
import java.util.Map;

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
        Customer customer = userRepository.findById(1l);
        System.out.println("the customer is :"+ customer.name);
        return "product/index";
    }
    @RequestMapping(value = "/product/search")
    public @ResponseBody Map<String, Object> productSearch(@RequestParam (required = false) String name,
                                                           @RequestParam (required = false) Long id){
        Map<String,Object> result = new HashMap<>();
        Customer customer = userRepository.findById(id);
        System.out.println("the customer is :"+ customer.name);
        result.put("result", customer);
        result.put("errNum",0);
        return result;
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

        productRepository.findById(1l);

        productRepository.save(product);

        System.out.println(name + picture + age + telPhone);

        System.out.println("the customer is :"+telPhone +name);
        return "success";
    }


}
