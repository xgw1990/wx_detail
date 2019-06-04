package cn.com.detail.wx.model.user;

import cn.com.detail.wx.model.commom.BaseEntity;
import cn.com.detail.wx.model.product.Product;
import cn.com.detail.wx.model.user.Customer;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
* @Description:    产品购物车表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 22:59
* @Version:        1.0
*/
@Entity
@Table(name = "c_shopCart")
public class ShopCart extends BaseEntity {
    /**
     * 用户
     */
    @ManyToOne
    public Customer customer;
    /**
     * 产品
     */
    @ManyToOne
    public Product product;
    /**
     * 产品数量
     */
    public int count;

}
