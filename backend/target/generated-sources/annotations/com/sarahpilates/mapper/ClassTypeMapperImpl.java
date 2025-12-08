package com.sarahpilates.mapper;

import com.sarahpilates.domain.classtype.ClassType;
import com.sarahpilates.domain.enums.ClassIntensity;
import com.sarahpilates.dto.classtype.ClassTypeRequestDTO;
import com.sarahpilates.dto.classtype.ClassTypeResponseDTO;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-08T14:05:05-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class ClassTypeMapperImpl implements ClassTypeMapper {

    @Override
    public ClassType toEntity(ClassTypeRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        ClassType classType = new ClassType();

        classType.setName( dto.name() );
        classType.setDescription( dto.description() );
        classType.setDuration( dto.duration() );
        classType.setPrice( dto.price() );
        classType.setCapacity( dto.capacity() );
        classType.setIntensity( dto.intensity() );
        classType.setColor( dto.color() );
        List<String> list = dto.equipment();
        if ( list != null ) {
            classType.setEquipment( new ArrayList<String>( list ) );
        }

        return classType;
    }

    @Override
    public ClassTypeResponseDTO toResponseDTO(ClassType entity) {
        if ( entity == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        String description = null;
        Integer duration = null;
        BigDecimal price = null;
        Integer capacity = null;
        ClassIntensity intensity = null;
        String color = null;
        List<String> equipment = null;

        id = entity.getId();
        name = entity.getName();
        description = entity.getDescription();
        duration = entity.getDuration();
        price = entity.getPrice();
        capacity = entity.getCapacity();
        intensity = entity.getIntensity();
        color = entity.getColor();
        List<String> list = entity.getEquipment();
        if ( list != null ) {
            equipment = new ArrayList<String>( list );
        }

        ClassTypeResponseDTO classTypeResponseDTO = new ClassTypeResponseDTO( id, name, description, duration, price, capacity, intensity, color, equipment );

        return classTypeResponseDTO;
    }

    @Override
    public void updateEntityFromDto(ClassTypeRequestDTO dto, ClassType entity) {
        if ( dto == null ) {
            return;
        }

        entity.setName( dto.name() );
        entity.setDescription( dto.description() );
        entity.setDuration( dto.duration() );
        entity.setPrice( dto.price() );
        entity.setCapacity( dto.capacity() );
        entity.setIntensity( dto.intensity() );
        entity.setColor( dto.color() );
        if ( entity.getEquipment() != null ) {
            List<String> list = dto.equipment();
            if ( list != null ) {
                entity.getEquipment().clear();
                entity.getEquipment().addAll( list );
            }
            else {
                entity.setEquipment( null );
            }
        }
        else {
            List<String> list = dto.equipment();
            if ( list != null ) {
                entity.setEquipment( new ArrayList<String>( list ) );
            }
        }
    }
}
