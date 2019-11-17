package cn.com.detail.wx.repository.card;

import cn.com.detail.wx.model.product.Product;

/**
 * Created by Administrator on 2018/8/10.
 *
 * @Author: xgw
 * @Date: 2018/8/10 14:36
 * @Descriphion:
 */
public interface CardRepositoryInterface {

    Product findById(Long id);  //JpaRepository<Customer , String>

}
