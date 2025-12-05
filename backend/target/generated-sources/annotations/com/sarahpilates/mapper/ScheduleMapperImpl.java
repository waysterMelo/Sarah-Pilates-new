package com.sarahpilates.mapper;

import com.sarahpilates.domain.classtype.ClassType;
import com.sarahpilates.domain.enums.PaymentStatus;
import com.sarahpilates.domain.enums.ScheduleStatus;
import com.sarahpilates.domain.instructor.Instructor;
import com.sarahpilates.domain.schedule.Schedule;
import com.sarahpilates.domain.student.Student;
import com.sarahpilates.dto.schedule.ClassTypeInfoDTO;
import com.sarahpilates.dto.schedule.InstructorInfoDTO;
import com.sarahpilates.dto.schedule.ScheduleRequestDTO;
import com.sarahpilates.dto.schedule.ScheduleResponseDTO;
import com.sarahpilates.dto.schedule.StudentInfoDTO;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-05T12:18:40-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class ScheduleMapperImpl implements ScheduleMapper {

    @Override
    public Schedule toEntity(ScheduleRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Schedule schedule = new Schedule();

        schedule.setDate( dto.date() );
        schedule.setStartTime( dto.startTime() );
        schedule.setEndTime( dto.endTime() );
        schedule.setStatus( dto.status() );
        schedule.setPaymentStatus( dto.paymentStatus() );
        schedule.setPrice( dto.price() );
        schedule.setRoom( dto.room() );
        schedule.setNotes( dto.notes() );

        return schedule;
    }

    @Override
    public ScheduleResponseDTO toResponseDTO(Schedule entity) {
        if ( entity == null ) {
            return null;
        }

        StudentInfoDTO student = null;
        InstructorInfoDTO instructor = null;
        ClassTypeInfoDTO classType = null;
        Long id = null;
        LocalDate date = null;
        LocalTime startTime = null;
        LocalTime endTime = null;
        ScheduleStatus status = null;
        PaymentStatus paymentStatus = null;
        BigDecimal price = null;
        String room = null;
        String notes = null;

        student = studentToStudentInfoDTO( entity.getStudent() );
        instructor = instructorToInstructorInfoDTO( entity.getInstructor() );
        classType = classTypeToClassTypeInfoDTO( entity.getClassType() );
        id = entity.getId();
        date = entity.getDate();
        startTime = entity.getStartTime();
        endTime = entity.getEndTime();
        status = entity.getStatus();
        paymentStatus = entity.getPaymentStatus();
        price = entity.getPrice();
        room = entity.getRoom();
        notes = entity.getNotes();

        ScheduleResponseDTO scheduleResponseDTO = new ScheduleResponseDTO( id, student, instructor, classType, date, startTime, endTime, status, paymentStatus, price, room, notes );

        return scheduleResponseDTO;
    }

    @Override
    public void updateEntityFromDto(ScheduleRequestDTO dto, Schedule entity) {
        if ( dto == null ) {
            return;
        }

        entity.setDate( dto.date() );
        entity.setStartTime( dto.startTime() );
        entity.setEndTime( dto.endTime() );
        entity.setStatus( dto.status() );
        entity.setPaymentStatus( dto.paymentStatus() );
        entity.setPrice( dto.price() );
        entity.setRoom( dto.room() );
        entity.setNotes( dto.notes() );
    }

    protected StudentInfoDTO studentToStudentInfoDTO(Student student) {
        if ( student == null ) {
            return null;
        }

        Long id = null;
        String name = null;

        id = student.getId();
        name = student.getName();

        StudentInfoDTO studentInfoDTO = new StudentInfoDTO( id, name );

        return studentInfoDTO;
    }

    protected InstructorInfoDTO instructorToInstructorInfoDTO(Instructor instructor) {
        if ( instructor == null ) {
            return null;
        }

        Long id = null;
        String name = null;

        id = instructor.getId();
        name = instructor.getName();

        InstructorInfoDTO instructorInfoDTO = new InstructorInfoDTO( id, name );

        return instructorInfoDTO;
    }

    protected ClassTypeInfoDTO classTypeToClassTypeInfoDTO(ClassType classType) {
        if ( classType == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        String color = null;

        id = classType.getId();
        name = classType.getName();
        color = classType.getColor();

        ClassTypeInfoDTO classTypeInfoDTO = new ClassTypeInfoDTO( id, name, color );

        return classTypeInfoDTO;
    }
}
