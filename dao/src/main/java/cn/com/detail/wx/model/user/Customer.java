package cn.com.detail.wx.model.user;


import cn.com.detail.wx.model.commom.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * Created by Administrator on 2018/8/9.
 * @Author: xgw
 * @Date: 2018/8/9 18:51
 * @Descriphion:  用户表
 */

@Entity
@Table(name = "c_customer")
public class Customer extends BaseEntity {

    @NotNull
    @Column(name = "name",nullable = false)
    public String name;

    @Column(name = "pwd")
    public String pwd;

    @Column(name = "telPhone")
    public String telPhone;

}
