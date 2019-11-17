package cn.com.detail.wx.repository.card;

import cn.com.detail.wx.model.user.Customer;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by Administrator on 2018/8/10.
 *
 * @Author: xgw
 * @Date: 2018/8/10 14:36
 * @Descriphion:
 */
public interface CardRepository extends PagingAndSortingRepository<Customer, Long>, JpaSpecificationExecutor<Customer> //JpaRepository<CouponCard, String>
{

//    Customer findById(String id);

}
