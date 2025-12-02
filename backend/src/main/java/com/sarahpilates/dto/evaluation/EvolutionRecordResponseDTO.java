package com.sarahpilates.dto.evaluation;

import com.sarahpilates.dto.schedule.InstructorInfoDTO;
import com.sarahpilates.dto.schedule.StudentInfoDTO;
import java.time.LocalDate;
import java.util.List;

public record EvolutionRecordResponseDTO(
    Long id,
    StudentInfoDTO student,
    InstructorInfoDTO instructor,
    LocalDate date,
    Integer sessionNumber,
    String focus,
    List<String> exercisesPerformed,
    String progressNotes,
    String difficultiesObserved,
    String improvements,
    String nextSessionGoals,
    Integer overallRating,
    Integer painLevel,
    Integer mobilityLevel,
    Integer strengthLevel,
    Integer balanceLevel,
    Integer enduranceLevel,
    String observations,
    List<String> equipment,
    Integer duration
) {}
