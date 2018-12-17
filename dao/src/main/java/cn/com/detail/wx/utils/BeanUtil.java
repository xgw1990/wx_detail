package cn.com.detail.wx.utils;

import cn.com.detail.wx.exception.BizException;
import cn.com.detail.wx.repository.base.BaseEntitySpecifications;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.BeanFactoryUtils;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.Assert;
import org.springframework.validation.Errors;

import java.io.*;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Collection;
import java.util.List;

public class BeanUtil {

    /**
     * 从A对象复制值到B对象, 不会嵌套复制.
     * 如果field是Collection, 不会直接赋值, 而是调用addAll()方法.
     * 因此如果target的Collection类型为null的话, 不会进行复制
     *
     * @param ignoreFields, 不进行复制的fields
     */
    public static <E> void copyFields(E source, E target, String... ignoreFields) {
        copyIncludeOrExcludeFields(source, target, false,
                ArrayUtils.addAll(ignoreFields, "id", "uid", "createdBy", "createdDate", "updatedBy", "updatedDate"));
    }

    /**
     * 从A对象复制值到B对象, 不会嵌套复制.
     * 如果field是Collection, 不会直接赋值, 而是调用addAll()方法.
     * 因此如果target的Collection类型为null的话, 不会进行复制
     *
     * @param specifiedFields, 只复制的fields
     */
    public static <E> void copySpecifiedFields(E source, E target, String... specifiedFields) {
        copyIncludeOrExcludeFields(source, target, true, specifiedFields);
    }

    /**
     * 从A对象复制值到B对象, 不会嵌套复制.
     * 如果field是Collection, 不会直接赋值, 而是调用addAll()方法.
     * 因此如果target的Collection类型为null的话, 不会进行复制
     *
     * @param fields, 包含或者排除的fields
     * @param isInclude, true的时候只复制fields的字段，false则排除fields字段
     */
    public static <E> void copyIncludeOrExcludeFields(E source, E target, boolean isInclude, String... fields) {
        Assert.notNull(source, "Source must not be null");
        Assert.notNull(target, "Target must not be null");

        if (source == target) return;

        for (Field field : source.getClass().getFields()) {
            try {
                if (Modifier.isStatic(field.getModifiers())
                        || Modifier.isPrivate(field.getModifiers())
                        || Modifier.isProtected(field.getModifiers())
                        || (isInclude && ArrayUtils.indexOf(fields, field.getName()) < 0)
                        || (!isInclude && ArrayUtils.indexOf(fields, field.getName()) >= 0)) continue;

                Field targetField;
                try {
                    targetField = target.getClass().getField(field.getName());
                } catch (NoSuchFieldException e) {
                    continue;
                }

                if (Collection.class.isAssignableFrom(field.getType())) {
                    Collection srcCollection = (Collection) field.get(source);
                    Collection targetCollection = (Collection) targetField.get(target);
                    if (srcCollection == null && targetCollection == null) continue;
                    if (srcCollection == null) {
                        targetCollection.clear();
                    } else {
                        if (targetCollection == null) {
                            targetField.set(target, srcCollection);
                        } else {
                            targetCollection.clear();
                            targetCollection.addAll(srcCollection);
                        }
                    }

                } else {
                    targetField.set(target, field.get(source));
                }
            } catch (Exception e) {
                throw new RuntimeException(
                        "Copy field "+ field.getName()+" failed.", e);
            }
        }
    }

    public static <T> T fromJSON(final Class type,
                                 final String jsonPacket) {
        try {
            ObjectMapper objectMapper = ApplicationContextProvider.getApplicationContext().getBean(ObjectMapper.class);
            return objectMapper.readValue(jsonPacket, (Class<T>) type);
        } catch (Exception e) {
            throw new RuntimeException("Deserialize json text failed. "+jsonPacket, e);
        }
    }

    public static <T> T fromJSON(final TypeReference<T> type,
                                 final String jsonPacket) {
        try {
            ObjectMapper objectMapper = ApplicationContextProvider.getApplicationContext().getBean(ObjectMapper.class);
            return objectMapper.readValue(jsonPacket, type);
        } catch (Exception e) {
            throw new RuntimeException("Deserialize json text failed. "+jsonPacket, e);
        }
    }

    /**
     * 兼容之前的刷出JSON数据到页面上处理方式
     * 20151208 后续不建议使用
     * **/
    public static <T> T fromJSONLegacy(final TypeReference<T> type,
                                       final String jsonPacket) {
        try {
            return new ObjectMapper().readValue(jsonPacket, type);
        } catch (Exception e) {
            throw new RuntimeException("Deserialize json text failed. "+jsonPacket, e);
        }
    }

    public static String toJSON(Object obj, Class<?> serializationView) {
        try {
            ObjectMapper objectMapper = ApplicationContextProvider.getApplicationContext().getBean(ObjectMapper.class);
            return objectMapper.writerWithView(serializationView).writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("Serialize object<"+obj.getClass().getName()+"> to json failed.", e);
        }
    }

    public static String toJSON(Object obj) {
        try {
            ObjectMapper objectMapper = ApplicationContextProvider.getApplicationContext().getBean(ObjectMapper.class);
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("Serialize object<"+obj.getClass().getName()+"> to json failed.", e);
        }
    }

    /**
     * 兼容之前的刷出JSON数据到页面上处理方式
     * 20151208 后续不建议使用
     * **/
    public static String toJSONLegacy(Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("Serialize object<"+obj.getClass().getName()+"> to json failed.", e);
        }
    }

    public static <T> Collection<T> getBeans(ListableBeanFactory beanFactory,
                                             Class<T> type) {
        return BeanFactoryUtils.beansOfTypeIncludingAncestors(beanFactory, type).values();
    }

    @SuppressWarnings("unchecked")
    public static <T> T getFieldValue(Object target, String fieldName) {
        return (T) getFieldValue(target, target.getClass(), fieldName);
    }

    public static Class getFieldClass(Object target,String fieldName) {
        try {
            return target.getClass().getDeclaredField(fieldName).getType();
        } catch (Exception e) {
            throw new RuntimeException("Get Field class"+fieldName+" failed.", e);
        }
    }

    private static Object getFieldValue(Object target, Class clazz, String fieldName) {
        try {
            Field field = clazz.getDeclaredField(fieldName);
            field.setAccessible(true);
            return field.get(target);
        } catch (NoSuchFieldException nsfe) {
            if (clazz.getSuperclass() != null) {
                return getFieldValue(target, clazz.getSuperclass(), fieldName);
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public static void setFieldValue(Object target, String fieldName, Object value) {
        setFieldValue(target, target.getClass(), fieldName, value);
    }

    private static void setFieldValue(Object target, Class clazz, String fieldName, Object value) {
        try {
            Field field = target.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(target, value);
        } catch (NoSuchFieldException nsfe) {
            if (clazz.getSuperclass() != null) {
                setFieldValue(target, clazz.getSuperclass(), fieldName, value);
            } else {
                throw new RuntimeException("Set Private Field "+fieldName+" failed.", nsfe);
            }
        } catch (Exception e) {
            throw new RuntimeException("Set Private Field "+fieldName+" failed.", e);
        }
    }

    @SuppressWarnings("unchecked")
    public static <T> T getSharedObject(Class<?> holderClass, String providerName) {
        try {
            Field field = holderClass.getField(providerName);
            if (field != null) {
                return (T) field.get(holderClass);
            }

            Method method = holderClass.getDeclaredMethod(providerName);
            return (T) method.invoke(holderClass);
        } catch (Exception e) {
            throw new BizException(ErrorCode.GET_SHARED_OBJECT_FAILED,
                    "Get shared object failed", e);
        }
    }

    public static <T> T getSharedObject(String holderClassName, String providerName) {
        try {
            Class holderClass = Class.forName(holderClassName);
            try {
                Field field = holderClass.getField(providerName);
                if (field != null) {
                    return (T) field.get(holderClass);
                }
            } catch (NoSuchFieldException ignored) {}

            Method method = holderClass.getMethod(providerName);
            return (T) method.invoke(holderClass);
        } catch (Exception e) {
            throw new BizException(ErrorCode.GET_SHARED_OBJECT_FAILED,
                    "Get shared object failed", e);
        }
    }

    public static <T extends Serializable> T deepClone(T o) {
        try {
            ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
            ObjectOutputStream out = new ObjectOutputStream(byteOut);
            out.writeObject(o);
            out.flush();
            ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(byteOut.toByteArray()));
            return (T) o.getClass().cast(in.readObject());
        } catch (Exception e) {
            throw new RuntimeException("Failed to copy Object "+o.getClass().getName(), e);
        }
    }

    public static void validateApprovalObjectDuplicateField(Object approvalObject, Errors errors,
                         String fieldName, String errorMsgKey,
                         JpaSpecificationExecutor formalRepository,
                         JpaSpecificationExecutor approvalRepository) {
        String stringFieldValue = BeanUtil.getFieldValue(approvalObject, fieldName);
        Specifications nameSpecification = Specifications.where(
                BaseEntitySpecifications.genericEqual(fieldName, stringFieldValue));
        Specifications pendingSpecification =
                Specifications.where(BaseEntitySpecifications.genericEqual("approvalCommon.approvalState", Constants.APPROVAL_STATE_EDIT_PENDING)).
                        or(BaseEntitySpecifications.genericEqual("approvalCommon.approvalState", Constants.APPROVAL_STATE_NEW_PENDING)).
                        or(BaseEntitySpecifications.genericEqual("approvalCommon.approvalState", Constants.APPROVAL_STATE_EDIT_REJECT)).
                        or(BaseEntitySpecifications.genericEqual("approvalCommon.approvalState", Constants.APPROVAL_STATE_NEW_REJECT));
        Long approvalId = BeanUtil.getFieldValue(approvalObject, "id");
        pendingSpecification = pendingSpecification.and(BaseEntitySpecifications.idNotEqual(approvalId));
        // check in submitToApproval approval
        if (!Checker.isEmpty(stringFieldValue) ) {
            List approvalList = approvalRepository.
                    findAll(pendingSpecification.and(nameSpecification));
            if (approvalList.size() > 0) errors.rejectValue(fieldName, errorMsgKey);
        }
        // check in formal
        Object mainRecord = BeanUtil.getFieldValue(approvalObject, "mainRecord");
        List formalList = null;
        if (mainRecord != null) {
            Long mainRecordId = BeanUtil.getFieldValue(mainRecord, "id");
            formalList = formalRepository.findAll(
                    nameSpecification.and(BaseEntitySpecifications.idNotEqual(mainRecordId))
            );

        } else {
            formalList = formalRepository.findAll(nameSpecification);
        }
        if (formalList.size() > 0) errors.rejectValue(fieldName, errorMsgKey);
    }

    public static Method getMethodSafe(Class<?> clazz, String methodName, Class... parameterTypes) {
        try {
            if (parameterTypes.length > 0) return clazz.getMethod(methodName, parameterTypes);
            else return clazz.getMethod(methodName);
        } catch (NoSuchMethodException e) {
            return null;
        }
    }
}
