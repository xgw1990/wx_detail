package cn.com.detail.wx.model.product;

import cn.com.detail.wx.model.card.CouponLink;
import cn.com.detail.wx.model.commom.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
* @Description:    产品表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 22:59
* @Version:        1.0
*/
@Entity
@Table(name = "p_product")
public class Product extends BaseEntity {
    /**
     * 产品状态：0，未上线 1.在售 2，下架 4，缺货
     */
    public int status;
    /**
     * 产品名称
     */
    public String name;
    /**
     * 产品图片
     */
    public String picture;
    /**
     * 产品类别
     */
//    @OneToMany
    public ProductCategory category;
    /**
     * 优惠券信息 todo
     */
    public CouponLink couponLink;
    /**
     * 产品备注说明
     */
    public String meno;
}
