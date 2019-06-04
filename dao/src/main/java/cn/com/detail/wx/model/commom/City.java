package cn.com.detail.wx.model.commom;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
* @Description:    城市表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 23:02
* @Version:        1.0
*/
@Entity
@Table(name = "s_city")
public class City extends BaseEntity {

    @ManyToOne
    public Province province;

    public String name;

    public String cityNumber;

}
