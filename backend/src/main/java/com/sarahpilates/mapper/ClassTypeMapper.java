package com.sarahpilates.mapper;

import com.sarahpilates.domain.classtype.ClassType;
import com.sarahpilates.dto.classtype.ClassTypeRequestDTO;
import com.sarahpilates.dto.classtype.ClassTypeResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ClassTypeMapper {

    ClassTypeMapper INSTANCE = Mappers.getMapper(ClassTypeMapper.class);

    @Mapping(target = "id", ignore = true)
    ClassType toEntity(ClassTypeRequestDTO dto);

    ClassTypeResponseDTO toResponseDTO(ClassType entity);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDto(ClassTypeRequestDTO dto, @MappingTarget ClassType entity);
}
