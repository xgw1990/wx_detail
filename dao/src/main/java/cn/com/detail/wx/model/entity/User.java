package cn.com.detail.wx.model.entity;


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
@Table(name = "user")
public class User {

    @NotNull
    @Column(nullable = false)
    public String name;

    public String pwd;

    public int age;

    public String telPhone;

}
