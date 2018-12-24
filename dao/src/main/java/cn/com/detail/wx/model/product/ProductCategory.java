package cn.com.detail.wx.model.product;

import cn.com.detail.wx.model.card.CouponLink;
import cn.com.detail.wx.model.commom.BaseEntity;

import javax.persistence.Entity;

/**
* @Description:    产品类别表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 22:59
* @Version:        1.0
*/
@Entity
public class ProductCategory extends BaseEntity {
    /**
     * 产品类别名
     */
    public String name;
    /**
     * 类别说明
     */
    public String memo;
    /**
     * 优惠券信息 todo
     */
    public CouponLink couponLink;

}
