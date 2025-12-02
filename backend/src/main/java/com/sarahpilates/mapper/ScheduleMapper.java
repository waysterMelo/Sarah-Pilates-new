package com.sarahpilates.mapper;

import com.sarahpilates.domain.schedule.Schedule;
import com.sarahpilates.dto.schedule.ScheduleRequestDTO;
import com.sarahpilates.dto.schedule.ScheduleResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {

    // MapStruct can't resolve entities from IDs, so we'll handle that in the service.
    // The mapper will just transfer the IDs.
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    @Mapping(target = "classType", ignore = true)
    Schedule toEntity(ScheduleRequestDTO dto);

    @Mapping(source = "student", target = "student")
    @Mapping(source = "instructor", target = "instructor")
    @Mapping(source = "classType", target = "classType")
    ScheduleResponseDTO toResponseDTO(Schedule entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    @Mapping(target = "classType", ignore = true)
    void updateEntityFromDto(ScheduleRequestDTO dto, @MappingTarget Schedule entity);
}
