package cn.com.detail.wx.model.order;

import cn.com.detail.wx.model.commom.BaseEntity;

import javax.persistence.Entity;
/**
* @Description:    订单表的产品表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 22:52
* @Version:        1.0
*/
@Entity
public class OrderProducts extends BaseEntity {

    public String name;

    public int status;

    public String address;

    public Order order;
}
