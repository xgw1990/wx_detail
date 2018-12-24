package cn.com.detail.wx.model.product;

import cn.com.detail.wx.model.commom.BaseEntity;
import cn.com.detail.wx.model.user.User;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

/**
* @Description:    产品购物车表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 22:59
* @Version:        1.0
*/
@Entity
public class ShopCart extends BaseEntity {
    /**
     * 用户
     */
    @OneToMany
    public User user;
    /**
     * 产品
     */
    @OneToMany
    public Product product;
    /**
     * 产品数量
     */
    public int count;

}
