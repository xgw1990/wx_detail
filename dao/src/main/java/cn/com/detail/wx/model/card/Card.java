package cn.com.detail.wx.model.card;


import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Created by Administrator on 2018/8/9.
 *
 * @Author: xgw
 * @Date: 2018/8/9 18:51
 * @Descriphion:
 */

@Entity
@Table(name = "card")
public class Card {

    @NotNull
    @Column(nullable = false)
    public String id;

    public String number;

    public int valueDate;

    public DateTime startDate;

}
