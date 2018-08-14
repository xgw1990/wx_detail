package cn.com.detail.wx.repository;

import cn.com.detail.wx.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Administrator on 2018/8/10.
 *
 * @Author: xgw
 * @Date: 2018/8/10 14:36
 * @Descriphion:
 */
public interface UserRepository extends JpaRepository<User , String> {

//    User findById(String id);

}
