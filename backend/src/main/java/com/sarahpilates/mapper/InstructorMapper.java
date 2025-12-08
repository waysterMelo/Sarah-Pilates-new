package com.sarahpilates.mapper;

import com.sarahpilates.domain.instructor.Instructor;
import com.sarahpilates.domain.instructor.WorkingHours;
import com.sarahpilates.dto.instructor.InstructorRequestDTO;
import com.sarahpilates.dto.instructor.InstructorResponseDTO;
import com.sarahpilates.dto.instructor.WorkingHoursDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface InstructorMapper {

    InstructorMapper INSTANCE = Mappers.getMapper(InstructorMapper.class);

    @Mapping(target = "id", ignore = true)
    Instructor toEntity(InstructorRequestDTO dto);

    InstructorResponseDTO toResponseDTO(Instructor entity);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDto(InstructorRequestDTO dto, @MappingTarget Instructor entity);

    // MapStruct will automatically handle the list mapping
    List<WorkingHours> toWorkingHoursList(List<WorkingHoursDTO> dtoList);
    List<WorkingHoursDTO> toWorkingHoursDtoList(List<WorkingHours> entityList);
}