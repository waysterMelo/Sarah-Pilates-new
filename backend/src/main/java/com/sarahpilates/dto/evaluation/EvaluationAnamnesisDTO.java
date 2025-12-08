package com.sarahpilates.dto.evaluation;

public record EvaluationAnamnesisDTO(
    String mainComplaint,
    String clinicalDiagnosis,
    String medications,
    String responsibleDoctor,
    String previousPilatesExperience,
    String historyOfPresentIllness,
    String associatedPathologies,
    String complementaryExams,
    String historyOfPastIllness,
    String physicalFunctionalExam
) {}
