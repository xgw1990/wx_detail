package cn.com.detail.wx.model.card;


import cn.com.detail.wx.model.commom.BaseEntity;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * @Descriphion:  优惠券总表（自动生成）
 * @Author: xgw
 * @Date: 2018/8/9 18:51
 */

@Entity
@Table(name = "t_couponLink")
public class CouponLink extends BaseEntity {

    @Column(name = "number")
    public String number;

    @Column(name = "valueDate")
    public int valueDate;

    @Column(name = "startDate")
    @Type(type = "datetime")
    public DateTime startDate;

    public int typeKey;

    @ManyToOne
    public CouponCard couponCard;

    public long linkTypeId;


}
