package com.sarahpilates.dto.evaluation;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public record EvolutionRecordRequestDTO(
    @NotNull Long studentId,
    @NotNull Long instructorId,
    @NotNull LocalDate date,
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
