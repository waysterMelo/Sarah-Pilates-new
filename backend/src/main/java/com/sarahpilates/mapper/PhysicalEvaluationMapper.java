package com.sarahpilates.mapper;

import com.sarahpilates.domain.evaluation.PhysicalEvaluation;
import com.sarahpilates.dto.evaluation.PhysicalEvaluationRequestDTO;
import com.sarahpilates.dto.evaluation.PhysicalEvaluationResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PhysicalEvaluationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    @Mapping(target = "bmi", ignore = true) // Calculated field
    PhysicalEvaluation toEntity(PhysicalEvaluationRequestDTO dto);

    PhysicalEvaluationResponseDTO toResponseDTO(PhysicalEvaluation entity);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    @Mapping(target = "bmi", ignore = true)
    void updateEntityFromDto(PhysicalEvaluationRequestDTO dto, @MappingTarget PhysicalEvaluation entity);
}
