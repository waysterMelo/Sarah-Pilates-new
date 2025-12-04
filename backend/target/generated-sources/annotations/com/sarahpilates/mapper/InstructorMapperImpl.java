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
    date = "2025-12-03T18:00:50-0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.9 (Eclipse Adoptium)"
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
        instructor.setEmergencyContact( dto.emergencyContact() );
        instructor.setEmergencyPhone( dto.emergencyPhone() );
        List<String> list = dto.specialties();
        if ( list != null ) {
            instructor.setSpecialties( new ArrayList<String>( list ) );
        }
        List<String> list1 = dto.certifications();
        if ( list1 != null ) {
            instructor.setCertifications( new ArrayList<String>( list1 ) );
        }
        instructor.setBio( dto.bio() );
        instructor.setExperience( dto.experience() );
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
        String emergencyContact = null;
        String emergencyPhone = null;
        List<String> specialties = null;
        List<String> certifications = null;
        String bio = null;
        String experience = null;
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
        emergencyContact = entity.getEmergencyContact();
        emergencyPhone = entity.getEmergencyPhone();
        List<String> list = entity.getSpecialties();
        if ( list != null ) {
            specialties = new ArrayList<String>( list );
        }
        List<String> list1 = entity.getCertifications();
        if ( list1 != null ) {
            certifications = new ArrayList<String>( list1 );
        }
        bio = entity.getBio();
        experience = entity.getExperience();
        status = entity.getStatus();
        hireDate = entity.getHireDate();
        hourlyRate = entity.getHourlyRate();
        workingHours = toWorkingHoursDtoList( entity.getWorkingHours() );

        InstructorResponseDTO instructorResponseDTO = new InstructorResponseDTO( id, name, email, role, phone, birthDate, address, emergencyContact, emergencyPhone, specialties, certifications, bio, experience, status, hireDate, hourlyRate, workingHours );

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
        entity.setEmergencyContact( dto.emergencyContact() );
        entity.setEmergencyPhone( dto.emergencyPhone() );
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
        if ( entity.getCertifications() != null ) {
            List<String> list1 = dto.certifications();
            if ( list1 != null ) {
                entity.getCertifications().clear();
                entity.getCertifications().addAll( list1 );
            }
            else {
                entity.setCertifications( null );
            }
        }
        else {
            List<String> list1 = dto.certifications();
            if ( list1 != null ) {
                entity.setCertifications( new ArrayList<String>( list1 ) );
            }
        }
        entity.setBio( dto.bio() );
        entity.setExperience( dto.experience() );
        entity.setStatus( dto.status() );
        entity.setHireDate( dto.hireDate() );
        entity.setHourlyRate( dto.hourlyRate() );
        if ( entity.getWorkingHours() != null ) {
            List<WorkingHours> list2 = toWorkingHoursList( dto.workingHours() );
            if ( list2 != null ) {
                entity.getWorkingHours().clear();
                entity.getWorkingHours().addAll( list2 );
            }
            else {
                entity.setWorkingHours( null );
            }
        }
        else {
            List<WorkingHours> list2 = toWorkingHoursList( dto.workingHours() );
            if ( list2 != null ) {
                entity.setWorkingHours( list2 );
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
