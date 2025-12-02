package com.sarahpilates.dto.evaluation;

import com.sarahpilates.domain.enums.EvaluationType;
import com.sarahpilates.domain.evaluation.AnatomicalMarker;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record PhysicalEvaluationRequestDTO(
    @NotNull Long studentId,
    @NotNull Long instructorId,
    @NotNull LocalDate date,
    @NotNull EvaluationType type,
    String mainComplaint,
    String clinicalDiagnosis,
    String medications,
    Double weight,
    Double height,
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
