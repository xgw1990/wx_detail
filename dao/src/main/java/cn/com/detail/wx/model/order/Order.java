package cn.com.detail.wx.model.order;

import cn.com.detail.wx.model.commom.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
* @Description:   订单表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 22:52
* @Version:        1.0
*/
@Entity
@Table(name = "o_order")
public class Order extends BaseEntity {

    public String name;

    public int status;

    public String address;


}
