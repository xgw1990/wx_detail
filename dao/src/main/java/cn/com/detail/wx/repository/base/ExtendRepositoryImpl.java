package cn.com.detail.wx.repository.base;

import cn.com.detail.wx.model.commom.BaseEntity;
import cn.com.detail.wx.utils.BeanUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.io.Serializable;

import static org.springframework.data.jpa.repository.query.QueryUtils.getQueryString;

public class ExtendRepositoryImpl<T, ID extends Serializable>
        extends SimpleJpaRepository<T, ID> implements PagingAndSortingRepository<T, ID> {

    public static final String COUNT_QUERY_STRING_WITH_DELETED = "select count(%s) from %s x where deleted is null or deleted = false";
    public static final String COUNT_QUERY_STRING = "select count(%s) from %s x";

    public ExtendRepositoryImpl(Class<T> domainClass, EntityManager em) {
        super(domainClass, em);
    }

    public ExtendRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
    }

    public EntityManager em() {
        return BeanUtil.getFieldValue(this, "em");
    }

    public JpaEntityInformation<T, ?> entityInformation() {
        return BeanUtil.getFieldValue(this, "entityInformation");
    }

    public void softDelete(T entity) {
        ((BaseEntity)entity).deleted = true;
        save(entity);
    }

    @Override
    public long count() {
        return em().createQuery(getCountQueryString(), Long.class).getSingleResult();
    }

    private String getCountQueryString() {
        String countQuery = String.format(BaseEntity.class.isAssignableFrom(entityInformation().getJavaType())
                ? COUNT_QUERY_STRING_WITH_DELETED : COUNT_QUERY_STRING, "x", "%s");
        return getQueryString(countQuery, entityInformation().getEntityName());
    }

    @Override
    protected TypedQuery<T> getQuery(Specification<T> spec, Pageable pageable) {
        if (BaseEntity.class.isAssignableFrom(entityInformation().getJavaType())) {
            spec = Specifications.where(spec).and(BaseEntitySpecifications.notDelete());
        }
        return super.getQuery(spec, pageable);
    }

    @Override
    protected TypedQuery<T> getQuery(Specification<T> spec, Sort sort) {
        if (BaseEntity.class.isAssignableFrom(entityInformation().getJavaType())) {
            spec = Specifications.where(spec).and(BaseEntitySpecifications.notDelete());
        }
        return super.getQuery(spec, sort);
    }

    @Override
    protected TypedQuery<Long> getCountQuery(Specification<T> spec) {
        if (BaseEntity.class.isAssignableFrom(entityInformation().getJavaType())) {
            spec = Specifications.where(spec).and(BaseEntitySpecifications.notDelete());
        }
        return super.getCountQuery(spec);
    }

    @Override
    protected <S extends T> TypedQuery<Long> getCountQuery(Specification<S> spec, Class<S> domainClass) {
        if (BaseEntity.class.isAssignableFrom(entityInformation().getJavaType())) {
            spec = Specifications.where(spec).and(BaseEntitySpecifications.notDelete());
        }
        return super.getCountQuery(spec, domainClass);
    }

}
