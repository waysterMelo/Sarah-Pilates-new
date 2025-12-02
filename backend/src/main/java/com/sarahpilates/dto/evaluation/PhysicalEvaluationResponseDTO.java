package com.sarahpilates.dto.evaluation;

import com.sarahpilates.domain.enums.EvaluationType;
import com.sarahpilates.domain.evaluation.AnatomicalMarker;
import com.sarahpilates.dto.schedule.InstructorInfoDTO;
import com.sarahpilates.dto.schedule.StudentInfoDTO;

import java.time.LocalDate;
import java.util.List;

public record PhysicalEvaluationResponseDTO(
    Long id,
    StudentInfoDTO student,
    InstructorInfoDTO instructor,
    LocalDate date,
    EvaluationType type,
    String mainComplaint,
    String clinicalDiagnosis,
    String medications,
    Double weight,
    Double height,
    Double bmi,
    String bloodPressure,
    Integer heartRate,
    Double bodyFat,
    Double muscleMass,
    BodyMeasurementsDTO measurements,
    FmsScoresDTO fmsScores,
    FlexibilityScoresDTO flexibilityScores,
    StrengthScoresDTO strengthScores,
    BalanceScoresDTO balanceScores,
    List<AnatomicalMarker> anatomicalMarkers,
    String medicalObservations,
    String objectives,
    String treatmentPlan,
    LocalDate nextEvaluationDate
) {}
