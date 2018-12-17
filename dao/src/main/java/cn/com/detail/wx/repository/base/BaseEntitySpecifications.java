package cn.com.detail.wx.repository.base;

import cn.com.detail.wx.exception.BizException;
import cn.com.detail.wx.utils.Checker;
import cn.com.detail.wx.utils.ErrorCode;
import com.google.common.collect.Maps;
import org.joda.time.DateTime;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@SuppressWarnings("unused")
public class BaseEntitySpecifications {

    public static Specification notDelete() {
        return (root, query, cb) -> cb.or(cb.isFalse(root.get("deleted")), cb.isNull(root.get("deleted")));
    }

    public static <T> Specifications<T> whereOrAnd(Specifications<T> spec, Specification<T> newSpec) {
        return spec != null ? spec.and(newSpec) : Specifications.where(newSpec);
    }

    public static <T> Specification<T> idIn(List<Long> ids) {
        return (root, query, cb) -> !Checker.isEmpty(ids) ?  root.get("id").in(ids) : null;
    }

    public static <T> Specification<T> idNotEqual(Long id) {
        return (root, query, cb) -> cb.notEqual(root.get("id"), id);
    }

    //*************************************************************************
    // Generic Specification
    //*************************************************************************

    public static <T>Specification<T> genericLike(String fieldName, String value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return !Checker.isEmpty(value) ? cb.like(path, "%" + value + "%") : null;
        };
    }

    public static <T>Specification<T> genericEqual(String fieldName, Object value) {
        return (root, query, cb) -> {
            Path<T> path = getFieldPath(fieldName, root);
            return value != null ? cb.equal(path, value) : null;
        };
    }

    public static <T>Specification<T> genericStartWith(String fieldName, String value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return !Checker.isEmpty(value) ? cb.like(path, value + "%") : null;
        };
    }

    public static <T>Specification<T> genericNotNull(String fieldName) {
        return (root, query, cb) -> cb.isNotNull(getFieldPath(fieldName, root));
    }

    public static <T>Specification<T> genericNull(String fieldName) {
        return (root, query, cb) -> cb.isNull(getFieldPath(fieldName, root)) ;
    }

    public static <T>Specification<T> genericNotEmpty(String fieldName) {
        return (root, query, cb) ->
                cb.and(cb.isNotNull(getFieldPath(fieldName, root)), cb.notEqual(getFieldPath(fieldName, root), ""));
    }

    public static <T>Specification<T> genericEmpty(String fieldName) {
        return (root, query, cb) -> cb.or(cb.isNull(getFieldPath(fieldName, root)), cb.equal(getFieldPath(fieldName, root), "")) ;
    }

    public static <T>Specification<T> dateLessThan(String fieldName, DateTime value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return value != null ? cb.lessThan(path, value) : null;
        };
    }

    public static <T>Specification<T> dateGreaterThanOrEqualTo(String fieldName, DateTime value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return value != null ? cb.greaterThanOrEqualTo(path, value) : null;
        };
    }

    public static <T>Specification<T> dateLessThanOrEqualTo(String fieldName, DateTime value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return value != null ? cb.lessThanOrEqualTo(path, value) : null;
        };
    }

    public static <T>Specification<T> dateBetween(String fieldName, DateTime startTime, DateTime endTime) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return startTime != null && endTime != null ? cb.between(path, startTime, endTime.minus(1))
                : startTime != null                     ? cb.greaterThanOrEqualTo(path, startTime)
                : endTime != null                       ? cb.lessThan(path, endTime)
                                                        : null;
        };
    }

    public static <T>Specification<T> genericIn(String fieldName, List<?> fieldValues) {
        return (root, query, cb) -> !Checker.isEmpty(fieldValues) ?
                getFieldPath(fieldName, root).in(fieldValues) : null;
    }

    public static <T>Specification<T> genericNotIn(String fieldName, List<?> fieldValues) {
        return (root, query, cb) -> !Checker.isEmpty(fieldValues) ?
                cb.not(getFieldPath(fieldName, root).in(fieldValues)) : null;
    }

    public static <T>Specification<T> genericIn(String fieldName, String fieldValues) {
        return (root, query, cb) -> !Checker.isEmpty(fieldValues) ?
                getFieldPath(fieldName, root).in((Object[]) fieldValues.replace("[", "").replace("]", "").split(",")) : null;
    }

    public static <T>Specification<T> genericNotEqual(String fieldName, Object value) {
        return (root, query, cb) ->
                value != null ? cb.notEqual(getFieldPath(fieldName, root), value) : null;
    }

    public static <T>Specification<T> genericGreaterThan(String fieldName, Comparable value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return value != null ? cb.greaterThan(path, value) : null;
        };
    }

    public static <T>Specification<T> genericLessThan(String fieldName, Comparable value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return value != null ? cb.lessThan(path, value) : null;
        };
    }

    public static <T>Specification<T> genericGreaterThanOrEqualTo(String fieldName, Comparable value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return value != null ? cb.greaterThanOrEqualTo(path, value) : null;
        };
    }

    public static <T>Specification<T> genericLessThanOrEqualTo(String fieldName, Comparable value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return value != null ? cb.lessThanOrEqualTo(path, value) : null;
        };
    }

    public static <T>Specification<T> genericIsEmpty(String fieldName) {
        return (root, query, cb) -> cb.isEmpty(root.get(fieldName));
    }

    public static <T>Specification<T> genericIsNotEmpty(String fieldName) {
        return (root, query, cb) -> cb.isNotEmpty(root.get(fieldName));
    }

    //*************************************************************************
    // Resolve Path
    //*************************************************************************

    public static <T> Path<T> getJoinFieldPath(String fieldName, Join joinRoot) {
        Path<T> path = null;
        if (fieldName.contains(".")) {
            String[] fieldNames = fieldName.split("\\.");
            for(int i = 0; i < fieldNames.length; i++) {
                if (i == 0) {
                    path = joinRoot.get(fieldNames[i]);
                } else {
                    path = path.get(fieldNames[i]);
                }
            }
        } else{
            path = joinRoot.get(fieldName);
        }
        return path;
    }

    public static <T> Join getJoinField(Root<T> root, String fieldName) {
        Join join = null;
        if (fieldName.contains(".")) {
            String[] fieldNames = fieldName.split("\\.");
            for(int i = 0; i < fieldNames.length; i++) {
                if (i == 0) {
                    join = root.join(fieldNames[i]);
                } else {
                    join = join.join(fieldNames[i]);
                }
            }
        } else {
            join = root.join(fieldName);
        }
        return join;
    }

    public static <T> Path<T> getFieldPath(String fieldName, Root<T> root) {
        Path<T> path = null;
        if (fieldName.contains(".")) {
            String[] fieldNames = fieldName.split("\\.");
            for (int i = 0; i < fieldNames.length; i++) {
                if (i == 0) {
                    path = root.get(fieldNames[i]);
                } else {
                    path = path.get(fieldNames[i]);
                }
            }
        } else{
            path = root.get(fieldName);
        }
        return path;
    }

    //*************************************************************************
    // Generic Join Specification
    //*************************************************************************

    public static class JoinProvider {

        String joinFieldName;

        public Map<Root, Map<String, Join>> joinMap = Maps.newConcurrentMap();

        public JoinProvider(String joinFieldName) {
            if (Checker.isEmpty(joinFieldName))
                throw new BizException(ErrorCode.INTERNAL_SERVER_ERROR, "joinFieldName cannot be empty.");
            this.joinFieldName = joinFieldName;
        }

        public Join getJoin(Root root) {
            if (!joinMap.containsKey(root)) {
                joinMap.put(root, Maps.newConcurrentMap());
            }
            if (!joinMap.get(root).containsKey(joinFieldName)) {
                joinMap.get(root).put(joinFieldName, getJoinField(root, joinFieldName));
            }
            return joinMap.get(root).get(joinFieldName);
        }
    }

    public static <T>Specification<T> genericJoinNull(JoinProvider joinProvider, String joinEntityFieldName) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(joinEntityFieldName)) return null;
            query.distinct(true);
            return cb.isNull(getJoinFieldPath(joinEntityFieldName, joinProvider.getJoin(root)));
        };
    }

    public static <T>Specification<T> genericJoinNotNull(JoinProvider joinProvider, String joinEntityFieldName) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(joinEntityFieldName)) return null;
            query.distinct(true);
            return cb.isNotNull(getJoinFieldPath(joinEntityFieldName, joinProvider.getJoin(root)));
        };
    }

    public static <T>Specification<T> genericJoinEqual(JoinProvider joinProvider, String joinEntityFieldName, Object value) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(joinEntityFieldName) || value == null) return null;
            query.distinct(true);
            return cb.equal(getJoinFieldPath(joinEntityFieldName, joinProvider.getJoin(root)), value);
        };
    }

    public static <T>Specification<T> genericJoinLike(JoinProvider joinProvider, String joinEntityFieldName, String value) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(joinEntityFieldName) ||Checker.isEmpty(value)) return null;
            query.distinct(true);
            return cb.like(getJoinFieldPath(joinEntityFieldName, joinProvider.getJoin(root)), "%" + value + "%");
        };
    }

    public static <T>Specification<T> genericJoinIn(JoinProvider joinProvider, String joinEntityFieldName, List<?> value) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(joinEntityFieldName) || Checker.isEmpty(value)) return null;
            query.distinct(true);
            return cb.in(getJoinFieldPath(joinEntityFieldName, joinProvider.getJoin(root))).value(value);
        };
    }

    public static <T>Specification<T> genericJoinStartWith(JoinProvider joinProvider, String joinEntityFieldName, String value) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(joinEntityFieldName) ||Checker.isEmpty(value)) return null;
            query.distinct(true);
            return cb.like(getJoinFieldPath(joinEntityFieldName, joinProvider.getJoin(root)), value + "%");
        };
    }

    //*************************************************************************
    // Optional Generic Specification
    //*************************************************************************

    public static <T>Specification<T> optGenericLike(String fieldName, Optional<String> value) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(value)) return null;
            Path path = getFieldPath(fieldName, root);
            return cb.like(path, "%" + value.get() + "%");
        };
    }

    public static <T>Specification<T> optGenericStartWith(String fieldName, Optional<String> value) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(value)) return null;
            Path path = getFieldPath(fieldName, root);
            return cb.like(path, value.get() + "%");
        };
    }

    public static <T>Specification<T> optGenericEqual(String fieldName, Optional value) {
        return (root, query, cb) -> {
            if (!value.isPresent()) return null;
            Path path = getFieldPath(fieldName, root);
            return cb.equal(path, value.get());
        };
    }

    public static <T>Specification<T> optGenericNotEqual(String fieldName, Optional value) {
        return (root, query, cb) -> {
            if (!value.isPresent()) return null;
            Path path = getFieldPath(fieldName, root);
            return cb.notEqual(path, value.get());
        };
    }

    public static <T>Specification<T> optGenericGreaterThan(String fieldName, Optional<? extends Comparable> value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return value != null && value.isPresent() ? cb.greaterThan(path, value.get()) : null;
        };
    }

    public static <T>Specification<T> optGenericLessThan(String fieldName, Optional<? extends Comparable> value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return value != null && value.isPresent() ? cb.lessThan(path, value.get()) : null;
        };
    }

    public static <T>Specification<T> optGenericGreaterThanOrEqualTo(String fieldName, Optional<? extends Comparable> value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return value != null && value.isPresent() ? cb.greaterThanOrEqualTo(path, value.get()) : null;
        };
    }

    public static <T>Specification<T> optGenericLessThanOrEqualTo(String fieldName, Optional<? extends Comparable> value) {
        return (root, query, cb) -> {
            Path path = getFieldPath(fieldName, root);
            return value != null && value.isPresent() ? cb.lessThanOrEqualTo(path, value.get()) : null;
        };
    }

    //*************************************************************************
    // Optional Generic Join Specification
    //*************************************************************************

    public static <T>Specification<T> optGenericJoinEqual(
            JoinProvider joinProvider, String joinEntityFieldName, Optional<?> value) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(joinEntityFieldName) || value == null || !value.isPresent()) return null;
            query.distinct(true);
            return cb.equal(getJoinFieldPath(joinEntityFieldName, joinProvider.getJoin(root)), value.get());
        };
    }

    public static <T>Specification<T> optGenericJoinLike(
            JoinProvider joinProvider, String joinEntityFieldName, Optional<String> value) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(joinEntityFieldName) || Checker.isEmpty(value)) return null;
            query.distinct(true);
            return cb.like(getJoinFieldPath(joinEntityFieldName, joinProvider.getJoin(root)), "%" + value.get() + "%");
        };
    }

    public static <T>Specification<T> optGenericJoinStartWith(
            JoinProvider joinProvider, String joinEntityFieldName, Optional<String> value) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(joinEntityFieldName) || Checker.isEmpty(value)) return null;
            query.distinct(true);
            return cb.like(getJoinFieldPath(joinEntityFieldName, joinProvider.getJoin(root)), value.get() + "%");
        };
    }

    public static <T>Specification<T> optGenericJoinDateGreaterThanOrEqualTo(
            JoinProvider joinProvider, String joinEntityFieldName, DateTime value) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(joinEntityFieldName) || null == value) return null;
            query.distinct(true);
            return cb.greaterThanOrEqualTo(getJoinFieldPath(joinEntityFieldName, joinProvider.getJoin(root)), "%" + value + "%");
        };
    }
    public static <T>Specification<T> optGenericJoinDateLessThanOrEqualTo(
            JoinProvider joinProvider, String joinEntityFieldName, DateTime value) {
        return (root, query, cb) -> {
            if (Checker.isEmpty(joinEntityFieldName) || null == value) return null;
            query.distinct(true);
            return cb.lessThanOrEqualTo(getJoinFieldPath(joinEntityFieldName, joinProvider.getJoin(root)), "%" + value + "%");
        };
    }

}
