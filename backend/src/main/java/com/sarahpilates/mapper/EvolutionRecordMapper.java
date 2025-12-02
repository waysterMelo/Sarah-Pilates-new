package com.sarahpilates.mapper;

import com.sarahpilates.domain.evaluation.EvolutionRecord;
import com.sarahpilates.dto.evaluation.EvolutionRecordRequestDTO;
import com.sarahpilates.dto.evaluation.EvolutionRecordResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface EvolutionRecordMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    EvolutionRecord toEntity(EvolutionRecordRequestDTO dto);

    EvolutionRecordResponseDTO toResponseDTO(EvolutionRecord entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    void updateEntityFromDto(EvolutionRecordRequestDTO dto, @MappingTarget EvolutionRecord entity);
}
