package com.sarahpilates.dto.student;

import jakarta.validation.constraints.NotNull;

public record AnamnesisDTO(
    String allergies,
    String surgeries,
    String medications,
    String restrictions,
    @NotNull Boolean heartCondition,
    @NotNull Boolean dizziness,
    @NotNull Boolean boneJointProblem,
    @NotNull Boolean diabetes,
    @NotNull Boolean hypertension,
    String objectives
) {}
