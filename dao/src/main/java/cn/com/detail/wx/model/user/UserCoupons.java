package cn.com.detail.wx.model.user;

import cn.com.detail.wx.model.card.CouponCard;
import cn.com.detail.wx.model.commom.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.List;

/**
* @Description:    用户的优惠券表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 22:55
* @Version:        1.0
*/
@Entity
public class UserCoupons extends BaseEntity {

    public String memo;

    @ManyToMany
    public List<CouponCard> userCoupon;
}
