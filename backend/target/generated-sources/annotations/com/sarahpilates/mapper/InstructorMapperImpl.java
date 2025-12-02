package com.sarahpilates.mapper;

import com.sarahpilates.domain.enums.InstructorStatus;
import com.sarahpilates.domain.enums.UserRole;
import com.sarahpilates.domain.instructor.Instructor;
import com.sarahpilates.domain.instructor.WorkingHours;
import com.sarahpilates.dto.instructor.InstructorRequestDTO;
import com.sarahpilates.dto.instructor.InstructorResponseDTO;
import com.sarahpilates.dto.instructor.WorkingHoursDTO;
import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T23:16:43-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class InstructorMapperImpl implements InstructorMapper {

    @Override
    public Instructor toEntity(InstructorRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Instructor instructor = new Instructor();

        instructor.setName( dto.name() );
        instructor.setEmail( dto.email() );
        instructor.setRole( dto.role() );
        instructor.setPhone( dto.phone() );
        instructor.setBirthDate( dto.birthDate() );
        instructor.setAddress( dto.address() );
        List<String> list = dto.specialties();
        if ( list != null ) {
            instructor.setSpecialties( new ArrayList<String>( list ) );
        }
        instructor.setBio( dto.bio() );
        instructor.setStatus( dto.status() );
        instructor.setHireDate( dto.hireDate() );
        instructor.setHourlyRate( dto.hourlyRate() );
        instructor.setWorkingHours( toWorkingHoursList( dto.workingHours() ) );

        return instructor;
    }

    @Override
    public InstructorResponseDTO toResponseDTO(Instructor entity) {
        if ( entity == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        String email = null;
        UserRole role = null;
        String phone = null;
        LocalDate birthDate = null;
        String address = null;
        List<String> specialties = null;
        String bio = null;
        InstructorStatus status = null;
        LocalDate hireDate = null;
        BigDecimal hourlyRate = null;
        List<WorkingHoursDTO> workingHours = null;

        id = entity.getId();
        name = entity.getName();
        email = entity.getEmail();
        role = entity.getRole();
        phone = entity.getPhone();
        birthDate = entity.getBirthDate();
        address = entity.getAddress();
        List<String> list = entity.getSpecialties();
        if ( list != null ) {
            specialties = new ArrayList<String>( list );
        }
        bio = entity.getBio();
        status = entity.getStatus();
        hireDate = entity.getHireDate();
        hourlyRate = entity.getHourlyRate();
        workingHours = toWorkingHoursDtoList( entity.getWorkingHours() );

        InstructorResponseDTO instructorResponseDTO = new InstructorResponseDTO( id, name, email, role, phone, birthDate, address, specialties, bio, status, hireDate, hourlyRate, workingHours );

        return instructorResponseDTO;
    }

    @Override
    public void updateEntityFromDto(InstructorRequestDTO dto, Instructor entity) {
        if ( dto == null ) {
            return;
        }

        entity.setName( dto.name() );
        entity.setEmail( dto.email() );
        entity.setRole( dto.role() );
        entity.setPhone( dto.phone() );
        entity.setBirthDate( dto.birthDate() );
        entity.setAddress( dto.address() );
        if ( entity.getSpecialties() != null ) {
            List<String> list = dto.specialties();
            if ( list != null ) {
                entity.getSpecialties().clear();
                entity.getSpecialties().addAll( list );
            }
            else {
                entity.setSpecialties( null );
            }
        }
        else {
            List<String> list = dto.specialties();
            if ( list != null ) {
                entity.setSpecialties( new ArrayList<String>( list ) );
            }
        }
        entity.setBio( dto.bio() );
        entity.setStatus( dto.status() );
        entity.setHireDate( dto.hireDate() );
        entity.setHourlyRate( dto.hourlyRate() );
        if ( entity.getWorkingHours() != null ) {
            List<WorkingHours> list1 = toWorkingHoursList( dto.workingHours() );
            if ( list1 != null ) {
                entity.getWorkingHours().clear();
                entity.getWorkingHours().addAll( list1 );
            }
            else {
                entity.setWorkingHours( null );
            }
        }
        else {
            List<WorkingHours> list1 = toWorkingHoursList( dto.workingHours() );
            if ( list1 != null ) {
                entity.setWorkingHours( list1 );
            }
        }
    }

    @Override
    public List<WorkingHours> toWorkingHoursList(List<WorkingHoursDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<WorkingHours> list = new ArrayList<WorkingHours>( dtoList.size() );
        for ( WorkingHoursDTO workingHoursDTO : dtoList ) {
            list.add( workingHoursDTOToWorkingHours( workingHoursDTO ) );
        }

        return list;
    }

    @Override
    public List<WorkingHoursDTO> toWorkingHoursDtoList(List<WorkingHours> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<WorkingHoursDTO> list = new ArrayList<WorkingHoursDTO>( entityList.size() );
        for ( WorkingHours workingHours : entityList ) {
            list.add( workingHoursToWorkingHoursDTO( workingHours ) );
        }

        return list;
    }

    protected WorkingHours workingHoursDTOToWorkingHours(WorkingHoursDTO workingHoursDTO) {
        if ( workingHoursDTO == null ) {
            return null;
        }

        WorkingHours workingHours = new WorkingHours();

        workingHours.setId( workingHoursDTO.id() );
        workingHours.setDayOfWeek( workingHoursDTO.dayOfWeek() );
        workingHours.setStartTime( workingHoursDTO.startTime() );
        workingHours.setEndTime( workingHoursDTO.endTime() );

        return workingHours;
    }

    protected WorkingHoursDTO workingHoursToWorkingHoursDTO(WorkingHours workingHours) {
        if ( workingHours == null ) {
            return null;
        }

        Long id = null;
        DayOfWeek dayOfWeek = null;
        LocalTime startTime = null;
        LocalTime endTime = null;

        id = workingHours.getId();
        dayOfWeek = workingHours.getDayOfWeek();
        startTime = workingHours.getStartTime();
        endTime = workingHours.getEndTime();

        boolean isAvailable = false;

        WorkingHoursDTO workingHoursDTO = new WorkingHoursDTO( id, dayOfWeek, startTime, endTime, isAvailable );

        return workingHoursDTO;
    }
}
