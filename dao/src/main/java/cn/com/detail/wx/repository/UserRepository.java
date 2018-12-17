package cn.com.detail.wx.repository;

import cn.com.detail.wx.model.entity.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by Administrator on 2018/8/10.
 *
 * @Author: xgw
 * @Date: 2018/8/10 14:36
 * @Descriphion:
 */
public interface UserRepository extends PagingAndSortingRepository<User , String>,JpaSpecificationExecutor<User> {

    User findById(String id);  //JpaRepository<User , String>

}
