package com.sarahpilates.mapper;

import com.sarahpilates.domain.student.Student;
import com.sarahpilates.dto.student.StudentRequestDTO;
import com.sarahpilates.dto.student.StudentResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface StudentMapper {

    StudentMapper INSTANCE = Mappers.getMapper(StudentMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "documents", ignore = true)
    Student toEntity(StudentRequestDTO dto);

    StudentResponseDTO toResponseDTO(Student entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "documents", ignore = true)
    void updateEntityFromDto(StudentRequestDTO dto, @MappingTarget Student entity);
}
