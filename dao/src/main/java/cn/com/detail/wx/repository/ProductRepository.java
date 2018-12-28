package cn.com.detail.wx.repository;

import cn.com.detail.wx.model.product.Product;
import cn.com.detail.wx.model.user.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by Administrator on 2018/8/10.
 *
 * @Author: xgw
 * @Date: 2018/8/10 14:36
 * @Descriphion:
 */
public interface ProductRepository extends PagingAndSortingRepository<Product, String>,JpaSpecificationExecutor<Product> {

    User findById(String id);  //JpaRepository<User , String>

}
