package cn.com.detail.wx.model.commom;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import org.jadira.usertype.dateandtime.joda.PersistentDateTime;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.UUID;

@TypeDefs({
//        @TypeDef(name = "json", typeClass = JsonType.class),
//        @TypeDef(name = "enum", typeClass = EnumUserType.class),
        @TypeDef(name = "datetime", typeClass = PersistentDateTime.class),
//        @TypeDef(name = "collection", typeClass = EntityCollection2JsonUserType.class),
})
@MappedSuperclass
@EntityListeners({AuditingEntityListener.class, BaseEntity.BaseEntityListener.class})
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseEntity implements Serializable, Cloneable {

    private static final long serialVersionUID = -1;

    @Id
    @GeneratedValue(generator="native")
    @GenericGenerator(name="native", strategy="native")
    public long id;

    @JsonIgnore
    @Type(type="uuid-char")
    public UUID uid = UUID.randomUUID();

    @JsonIgnore
    @DiffIgnore
    @CreatedDate
    @Type(type="datetime")
    public DateTime createdDate;

    @JsonIgnore
    @DiffIgnore
    @Version
    @Column(columnDefinition="INT(11) DEFAULT 0")
    public int ver = 0;

    @JsonIgnore
    @Column(columnDefinition="BIT(1) DEFAULT 0")
    public boolean deleted;

    //*************************************************************************
    // Entity Listener
    //*************************************************************************

    public static class BaseEntityListener {
        @PrePersist
        @PreUpdate
        public void beforeSaved(BaseEntity baseEntity) {
            if (baseEntity.uid == null) baseEntity.uid = UUID.randomUUID();
        }
    }

    //*************************************************************************
    // Json Serialization
    //*************************************************************************

    public static class IDSerializer extends JsonSerializer<BaseEntity> {
        @Override
        public void serialize(BaseEntity value, JsonGenerator jgen, SerializerProvider provider)
                throws IOException {
            jgen.writeNumber(value.id);
        }
    }

    public static class NameSerializer extends JsonSerializer<BaseEntity> {

        private final static Logger log = LoggerFactory.getLogger(NameSerializer.class);

        @Override
        public void serialize(BaseEntity value, JsonGenerator jgen, SerializerProvider provider)
                throws IOException {
            Field field = null;
            try {
                field = value.getClass().getField("name");
                String name = field.get(value).toString();
                jgen.writeString(name);
            } catch (Exception e) {
                log.error("Field 'name' is not found in "+value.getClass().getSimpleName()
                        +" during Json serialization.");
            }
        }
    }

    //*************************************************************************
    // Object Overridden
    //*************************************************************************

    @Override
    public boolean equals(Object another) {
        if (this == another) return true;
        if (another == null) return false;
        BaseEntity anotherBaseEntity = (BaseEntity) another;
        return this.id != 0 && this.id == anotherBaseEntity.id;
    }

    @Override
    public int hashCode() {
        return new Long(id).hashCode();
    }

}
