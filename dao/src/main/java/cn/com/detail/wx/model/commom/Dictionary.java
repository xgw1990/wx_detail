package cn.com.detail.wx.model.commom;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
* @Description:    字典表
* @Author:         xgw
* @CreateDate:     2018/12/24 0024 23:02
* @Version:        1.0
*/
@Entity
@Table(name = "s_dictionary")
public class Dictionary extends BaseEntity {
    /**
     * 字典key
     */
    public int key;
    /**
     * 字典值
     */
    public int value;
    /**
     * 字典名
     */
    public String name;
    /**
     * 字典说明
     */
    public String memo;
}
