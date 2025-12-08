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
    
    EvaluationAnamnesisDTO anamnesis, // Updated to specific DTO
    
    Double weight,
    Double height,
    Double bmi, // Added BMI
    String bloodPressure,
    Integer heartRate,
    Double bodyFat,
    Double muscleMass,
    
    BodyMeasurementsDTO measurements,
    
    // Renamed to match frontend keys (fms, flexibility, strength, balance)
    FmsScoresDTO fms, 
    FlexibilityScoresDTO flexibility,
    StrengthScoresDTO strength,
    BalanceScoresDTO balance,
    
    List<AnatomicalMarker> anatomicalMarkers,
    String medicalObservations,
    String objectives,
    String treatmentPlan,
    LocalDate nextEvaluationDate
) {}