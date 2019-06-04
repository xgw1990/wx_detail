package cn.com.detail.wx.model.card;


import cn.com.detail.wx.model.commom.BaseEntity;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * Created by Administrator on 2018/8/9.
 *
 * @Author: xgw
 * @Date: 2018/8/9 18:51
 * @Descriphion:  优惠券
 */

@Entity
@Table(name = "t_couponCard")
public class CouponCard extends BaseEntity {
    @Column(name = "number")
    public String number;

    @Column(name = "valueDate")
    public int valueDate;

    @Column(name = "startDate")
    @Type(type = "datetime")
    public DateTime startDate;

    public int status;

    public int sum;

    public int leftCount;

}
