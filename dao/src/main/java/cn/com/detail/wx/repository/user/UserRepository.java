package cn.com.detail.wx.repository.user;

import cn.com.detail.wx.model.user.Customer;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

/**
 * Created by Administrator on 2018/8/10.
 *
 * @Author: xgw
 * @Date: 2018/8/10 14:36
 * @Descriphion:
 */
public interface UserRepository extends  PagingAndSortingRepository<Customer, Long>,JpaSpecificationExecutor<Customer> {

    Optional<Customer> findById(Long id);  //JpaRepository<Customer , String>

}
