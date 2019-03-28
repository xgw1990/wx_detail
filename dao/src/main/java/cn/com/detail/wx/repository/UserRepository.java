package cn.com.detail.wx.repository;

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
public interface UserRepository extends PagingAndSortingRepository<User , Long>,JpaSpecificationExecutor<User> {

    User findById(Long id);  //JpaRepository<User , String>

}
