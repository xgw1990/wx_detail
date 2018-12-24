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
@Table(name = "user")
public class User extends BaseEntity {

    @NotNull
    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "pwd")
    private String pwd;

    @Column(name = "telPhone")
    private String telPhone;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getTelPhone() {
        return telPhone;
    }

    public void setTelPhone(String telPhone) {
        this.telPhone = telPhone;
    }
}
