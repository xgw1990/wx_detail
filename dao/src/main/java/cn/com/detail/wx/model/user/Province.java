package cn.com.detail.wx.model.user;

import cn.com.detail.wx.model.commom.BaseEntity;

import javax.persistence.Entity;

/**
* @Description:    省份表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 23:02
* @Version:        1.0
*/
@Entity
public class Province extends BaseEntity {

    public String name;

    public String number;

}
