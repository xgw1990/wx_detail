package cn.com.detail.wx.model.commom;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
* @Description:    省份表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 23:02
* @Version:        1.0
*/
@Entity
@Table(name = "s_province")
public class Province extends BaseEntity {

    public String name;

    public String number;

}
