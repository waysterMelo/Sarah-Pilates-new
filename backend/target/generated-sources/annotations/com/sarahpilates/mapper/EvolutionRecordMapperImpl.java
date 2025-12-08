package com.sarahpilates.mapper;

import com.sarahpilates.domain.evaluation.EvolutionRecord;
import com.sarahpilates.domain.instructor.Instructor;
import com.sarahpilates.domain.student.Student;
import com.sarahpilates.dto.evaluation.EvolutionRecordRequestDTO;
import com.sarahpilates.dto.evaluation.EvolutionRecordResponseDTO;
import com.sarahpilates.dto.schedule.InstructorInfoDTO;
import com.sarahpilates.dto.schedule.StudentInfoDTO;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-08T14:05:02-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class EvolutionRecordMapperImpl implements EvolutionRecordMapper {

    @Override
    public EvolutionRecord toEntity(EvolutionRecordRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        EvolutionRecord evolutionRecord = new EvolutionRecord();

        evolutionRecord.setSessionNumber( dto.session() );
        evolutionRecord.setDate( dto.date() );
        evolutionRecord.setFocus( dto.focus() );
        List<String> list = dto.exercisesPerformed();
        if ( list != null ) {
            evolutionRecord.setExercisesPerformed( new ArrayList<String>( list ) );
        }
        evolutionRecord.setProgressNotes( dto.progressNotes() );
        evolutionRecord.setDifficultiesObserved( dto.difficultiesObserved() );
        evolutionRecord.setImprovements( dto.improvements() );
        evolutionRecord.setNextSessionGoals( dto.nextSessionGoals() );
        evolutionRecord.setOverallRating( dto.overallRating() );
        evolutionRecord.setPainLevel( dto.painLevel() );
        evolutionRecord.setMobilityLevel( dto.mobilityLevel() );
        evolutionRecord.setStrengthLevel( dto.strengthLevel() );
        evolutionRecord.setBalanceLevel( dto.balanceLevel() );
        evolutionRecord.setEnduranceLevel( dto.enduranceLevel() );
        evolutionRecord.setObservations( dto.observations() );
        List<String> list1 = dto.equipment();
        if ( list1 != null ) {
            evolutionRecord.setEquipment( new ArrayList<String>( list1 ) );
        }
        evolutionRecord.setDuration( dto.duration() );

        return evolutionRecord;
    }

    @Override
    public EvolutionRecordResponseDTO toResponseDTO(EvolutionRecord entity) {
        if ( entity == null ) {
            return null;
        }

        Long id = null;
        StudentInfoDTO student = null;
        InstructorInfoDTO instructor = null;
        LocalDate date = null;
        Integer sessionNumber = null;
        String focus = null;
        List<String> exercisesPerformed = null;
        String progressNotes = null;
        String difficultiesObserved = null;
        String improvements = null;
        String nextSessionGoals = null;
        Integer overallRating = null;
        Integer painLevel = null;
        Integer mobilityLevel = null;
        Integer strengthLevel = null;
        Integer balanceLevel = null;
        Integer enduranceLevel = null;
        String observations = null;
        List<String> equipment = null;
        Integer duration = null;

        id = entity.getId();
        student = studentToStudentInfoDTO( entity.getStudent() );
        instructor = instructorToInstructorInfoDTO( entity.getInstructor() );
        date = entity.getDate();
        sessionNumber = entity.getSessionNumber();
        focus = entity.getFocus();
        List<String> list = entity.getExercisesPerformed();
        if ( list != null ) {
            exercisesPerformed = new ArrayList<String>( list );
        }
        progressNotes = entity.getProgressNotes();
        difficultiesObserved = entity.getDifficultiesObserved();
        improvements = entity.getImprovements();
        nextSessionGoals = entity.getNextSessionGoals();
        overallRating = entity.getOverallRating();
        painLevel = entity.getPainLevel();
        mobilityLevel = entity.getMobilityLevel();
        strengthLevel = entity.getStrengthLevel();
        balanceLevel = entity.getBalanceLevel();
        enduranceLevel = entity.getEnduranceLevel();
        observations = entity.getObservations();
        List<String> list1 = entity.getEquipment();
        if ( list1 != null ) {
            equipment = new ArrayList<String>( list1 );
        }
        duration = entity.getDuration();

        EvolutionRecordResponseDTO evolutionRecordResponseDTO = new EvolutionRecordResponseDTO( id, student, instructor, date, sessionNumber, focus, exercisesPerformed, progressNotes, difficultiesObserved, improvements, nextSessionGoals, overallRating, painLevel, mobilityLevel, strengthLevel, balanceLevel, enduranceLevel, observations, equipment, duration );

        return evolutionRecordResponseDTO;
    }

    @Override
    public void updateEntityFromDto(EvolutionRecordRequestDTO dto, EvolutionRecord entity) {
        if ( dto == null ) {
            return;
        }

        entity.setSessionNumber( dto.session() );
        entity.setDate( dto.date() );
        entity.setFocus( dto.focus() );
        if ( entity.getExercisesPerformed() != null ) {
            List<String> list = dto.exercisesPerformed();
            if ( list != null ) {
                entity.getExercisesPerformed().clear();
                entity.getExercisesPerformed().addAll( list );
            }
            else {
                entity.setExercisesPerformed( null );
            }
        }
        else {
            List<String> list = dto.exercisesPerformed();
            if ( list != null ) {
                entity.setExercisesPerformed( new ArrayList<String>( list ) );
            }
        }
        entity.setProgressNotes( dto.progressNotes() );
        entity.setDifficultiesObserved( dto.difficultiesObserved() );
        entity.setImprovements( dto.improvements() );
        entity.setNextSessionGoals( dto.nextSessionGoals() );
        entity.setOverallRating( dto.overallRating() );
        entity.setPainLevel( dto.painLevel() );
        entity.setMobilityLevel( dto.mobilityLevel() );
        entity.setStrengthLevel( dto.strengthLevel() );
        entity.setBalanceLevel( dto.balanceLevel() );
        entity.setEnduranceLevel( dto.enduranceLevel() );
        entity.setObservations( dto.observations() );
        if ( entity.getEquipment() != null ) {
            List<String> list1 = dto.equipment();
            if ( list1 != null ) {
                entity.getEquipment().clear();
                entity.getEquipment().addAll( list1 );
            }
            else {
                entity.setEquipment( null );
            }
        }
        else {
            List<String> list1 = dto.equipment();
            if ( list1 != null ) {
                entity.setEquipment( new ArrayList<String>( list1 ) );
            }
        }
        entity.setDuration( dto.duration() );
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
}
