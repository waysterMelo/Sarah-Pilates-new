package com.sarahpilates.mapper;

import com.sarahpilates.domain.evaluation.PhysicalEvaluation;
import com.sarahpilates.dto.evaluation.PhysicalEvaluationRequestDTO;
import com.sarahpilates.dto.evaluation.PhysicalEvaluationResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PhysicalEvaluationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    @Mapping(target = "bmi", ignore = true)
    @Mapping(target = "fmsScores", source = "fms")
    @Mapping(target = "flexibilityScores", source = "flexibility")
    @Mapping(target = "strengthScores", source = "strength")
    @Mapping(target = "balanceScores", source = "balance")
    @Mapping(target = "mainComplaint", source = "anamnesis.mainComplaint")
    @Mapping(target = "clinicalDiagnosis", source = "anamnesis.clinicalDiagnosis")
    @Mapping(target = "medications", source = "anamnesis.medications")
    @Mapping(target = "responsibleDoctor", source = "anamnesis.responsibleDoctor")
    @Mapping(target = "previousPilatesExperience", source = "anamnesis.previousPilatesExperience")
    @Mapping(target = "historyOfPresentIllness", source = "anamnesis.historyOfPresentIllness")
    @Mapping(target = "associatedPathologies", source = "anamnesis.associatedPathologies")
    @Mapping(target = "complementaryExams", source = "anamnesis.complementaryExams")
    @Mapping(target = "historyOfPastIllness", source = "anamnesis.historyOfPastIllness")
    @Mapping(target = "physicalFunctionalExam", source = "anamnesis.physicalFunctionalExam")
    PhysicalEvaluation toEntity(PhysicalEvaluationRequestDTO dto);

    PhysicalEvaluationResponseDTO toResponseDTO(PhysicalEvaluation entity);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    @Mapping(target = "bmi", ignore = true)
    @Mapping(target = "fmsScores", source = "fms")
    @Mapping(target = "flexibilityScores", source = "flexibility")
    @Mapping(target = "strengthScores", source = "strength")
    @Mapping(target = "balanceScores", source = "balance")
    @Mapping(target = "mainComplaint", source = "anamnesis.mainComplaint")
    @Mapping(target = "clinicalDiagnosis", source = "anamnesis.clinicalDiagnosis")
    @Mapping(target = "medications", source = "anamnesis.medications")
    @Mapping(target = "responsibleDoctor", source = "anamnesis.responsibleDoctor")
    @Mapping(target = "previousPilatesExperience", source = "anamnesis.previousPilatesExperience")
    @Mapping(target = "historyOfPresentIllness", source = "anamnesis.historyOfPresentIllness")
    @Mapping(target = "associatedPathologies", source = "anamnesis.associatedPathologies")
    @Mapping(target = "complementaryExams", source = "anamnesis.complementaryExams")
    @Mapping(target = "historyOfPastIllness", source = "anamnesis.historyOfPastIllness")
    @Mapping(target = "physicalFunctionalExam", source = "anamnesis.physicalFunctionalExam")
    void updateEntityFromDto(PhysicalEvaluationRequestDTO dto, @MappingTarget PhysicalEvaluation entity);
}
