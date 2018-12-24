package cn.com.detail.wx.model.user;

import cn.com.detail.wx.model.commom.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
* @Description:    城市表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 23:02
* @Version:        1.0
*/
@Entity
public class City extends BaseEntity {

    @ManyToOne
    public Province province;

    public String name;

    public String cityNumber;

}
