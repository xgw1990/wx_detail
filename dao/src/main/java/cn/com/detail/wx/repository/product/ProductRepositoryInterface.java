package cn.com.detail.wx.repository.product;

import cn.com.detail.wx.model.product.Product;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by Administrator on 2018/8/10.
 *
 * @Author: xgw
 * @Date: 2018/8/10 14:36
 * @Descriphion:
 */
public interface ProductRepositoryInterface  {

    Product findById(Long id);  //JpaRepository<Customer , String>

}
