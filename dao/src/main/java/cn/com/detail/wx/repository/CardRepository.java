package cn.com.detail.wx.repository;

import cn.com.detail.wx.model.card.Card;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Administrator on 2018/8/10.
 *
 * @Author: xgw
 * @Date: 2018/8/10 14:36
 * @Descriphion:
 */
public interface CardRepository extends JpaRepository<Card, String> {

//    User findById(String id);

}
