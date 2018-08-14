package cn.com.detail.wx.model.card;


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
 * @Descriphion:
 */

@Entity
@Table(name = "card")
public class Card implements Serializable {

    @Id
    @NotNull
    @Column(name = "id",nullable = false)
    public String id;

    @Column(name = "number")
    public String number;

    @Column(name = "valueDate")
    public int valueDate;

    @Column(name = "startDate")
    public DateTime startDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
