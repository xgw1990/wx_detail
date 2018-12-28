package cn.com.detail.wx.model.card;


import cn.com.detail.wx.model.commom.BaseEntity;
import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @Descriphion: vip会员卡
 * @Author: xgw
 * @Date: 2018/8/9 18:51
 */
@Entity
//@Table(name = "card")
public class VipCard extends BaseEntity {
    @Column(name = "number")
    public String number;

    @Column(name = "valueDate")
    public int valueDate;

    @Column(name = "startDate")
    public DateTime startDate;

    public int status;

    public int level;

    public String memo;

}
