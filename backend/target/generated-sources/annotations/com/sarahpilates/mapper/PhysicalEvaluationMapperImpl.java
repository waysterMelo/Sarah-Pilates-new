package com.sarahpilates.mapper;

import com.sarahpilates.domain.enums.EvaluationType;
import com.sarahpilates.domain.evaluation.AnatomicalMarker;
import com.sarahpilates.domain.evaluation.BalanceScores;
import com.sarahpilates.domain.evaluation.BodyMeasurements;
import com.sarahpilates.domain.evaluation.FlexibilityScores;
import com.sarahpilates.domain.evaluation.FmsScores;
import com.sarahpilates.domain.evaluation.PhysicalEvaluation;
import com.sarahpilates.domain.evaluation.StrengthScores;
import com.sarahpilates.domain.instructor.Instructor;
import com.sarahpilates.domain.student.Student;
import com.sarahpilates.dto.evaluation.BalanceScoresDTO;
import com.sarahpilates.dto.evaluation.BodyMeasurementsDTO;
import com.sarahpilates.dto.evaluation.EvaluationAnamnesisDTO;
import com.sarahpilates.dto.evaluation.FlexibilityScoresDTO;
import com.sarahpilates.dto.evaluation.FmsScoresDTO;
import com.sarahpilates.dto.evaluation.PhysicalEvaluationRequestDTO;
import com.sarahpilates.dto.evaluation.PhysicalEvaluationResponseDTO;
import com.sarahpilates.dto.evaluation.StrengthScoresDTO;
import com.sarahpilates.dto.schedule.InstructorInfoDTO;
import com.sarahpilates.dto.schedule.StudentInfoDTO;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-08T14:05:01-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class PhysicalEvaluationMapperImpl implements PhysicalEvaluationMapper {

    @Override
    public PhysicalEvaluation toEntity(PhysicalEvaluationRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        PhysicalEvaluation physicalEvaluation = new PhysicalEvaluation();

        physicalEvaluation.setFmsScores( fmsScoresDTOToFmsScores( dto.fms() ) );
        physicalEvaluation.setFlexibilityScores( flexibilityScoresDTOToFlexibilityScores( dto.flexibility() ) );
        physicalEvaluation.setStrengthScores( strengthScoresDTOToStrengthScores( dto.strength() ) );
        physicalEvaluation.setBalanceScores( balanceScoresDTOToBalanceScores( dto.balance() ) );
        physicalEvaluation.setMainComplaint( dtoAnamnesisMainComplaint( dto ) );
        physicalEvaluation.setClinicalDiagnosis( dtoAnamnesisClinicalDiagnosis( dto ) );
        physicalEvaluation.setMedications( dtoAnamnesisMedications( dto ) );
        physicalEvaluation.setResponsibleDoctor( dtoAnamnesisResponsibleDoctor( dto ) );
        physicalEvaluation.setPreviousPilatesExperience( dtoAnamnesisPreviousPilatesExperience( dto ) );
        physicalEvaluation.setHistoryOfPresentIllness( dtoAnamnesisHistoryOfPresentIllness( dto ) );
        physicalEvaluation.setAssociatedPathologies( dtoAnamnesisAssociatedPathologies( dto ) );
        physicalEvaluation.setComplementaryExams( dtoAnamnesisComplementaryExams( dto ) );
        physicalEvaluation.setHistoryOfPastIllness( dtoAnamnesisHistoryOfPastIllness( dto ) );
        physicalEvaluation.setPhysicalFunctionalExam( dtoAnamnesisPhysicalFunctionalExam( dto ) );
        physicalEvaluation.setDate( dto.date() );
        physicalEvaluation.setType( dto.type() );
        physicalEvaluation.setWeight( dto.weight() );
        physicalEvaluation.setHeight( dto.height() );
        physicalEvaluation.setBloodPressure( dto.bloodPressure() );
        physicalEvaluation.setHeartRate( dto.heartRate() );
        physicalEvaluation.setBodyFat( dto.bodyFat() );
        physicalEvaluation.setMuscleMass( dto.muscleMass() );
        physicalEvaluation.setMeasurements( bodyMeasurementsDTOToBodyMeasurements( dto.measurements() ) );
        List<AnatomicalMarker> list = dto.anatomicalMarkers();
        if ( list != null ) {
            physicalEvaluation.setAnatomicalMarkers( new ArrayList<AnatomicalMarker>( list ) );
        }
        physicalEvaluation.setMedicalObservations( dto.medicalObservations() );
        physicalEvaluation.setObjectives( dto.objectives() );
        physicalEvaluation.setTreatmentPlan( dto.treatmentPlan() );
        physicalEvaluation.setNextEvaluationDate( dto.nextEvaluationDate() );

        return physicalEvaluation;
    }

    @Override
    public PhysicalEvaluationResponseDTO toResponseDTO(PhysicalEvaluation entity) {
        if ( entity == null ) {
            return null;
        }

        Long id = null;
        StudentInfoDTO student = null;
        InstructorInfoDTO instructor = null;
        LocalDate date = null;
        EvaluationType type = null;
        String mainComplaint = null;
        String clinicalDiagnosis = null;
        String medications = null;
        Double weight = null;
        Double height = null;
        Double bmi = null;
        String bloodPressure = null;
        Integer heartRate = null;
        Double bodyFat = null;
        Double muscleMass = null;
        BodyMeasurementsDTO measurements = null;
        FmsScoresDTO fmsScores = null;
        FlexibilityScoresDTO flexibilityScores = null;
        StrengthScoresDTO strengthScores = null;
        BalanceScoresDTO balanceScores = null;
        List<AnatomicalMarker> anatomicalMarkers = null;
        String medicalObservations = null;
        String objectives = null;
        String treatmentPlan = null;
        LocalDate nextEvaluationDate = null;

        id = entity.getId();
        student = studentToStudentInfoDTO( entity.getStudent() );
        instructor = instructorToInstructorInfoDTO( entity.getInstructor() );
        date = entity.getDate();
        type = entity.getType();
        mainComplaint = entity.getMainComplaint();
        clinicalDiagnosis = entity.getClinicalDiagnosis();
        medications = entity.getMedications();
        weight = entity.getWeight();
        height = entity.getHeight();
        bmi = entity.getBmi();
        bloodPressure = entity.getBloodPressure();
        heartRate = entity.getHeartRate();
        bodyFat = entity.getBodyFat();
        muscleMass = entity.getMuscleMass();
        measurements = bodyMeasurementsToBodyMeasurementsDTO( entity.getMeasurements() );
        fmsScores = fmsScoresToFmsScoresDTO( entity.getFmsScores() );
        flexibilityScores = flexibilityScoresToFlexibilityScoresDTO( entity.getFlexibilityScores() );
        strengthScores = strengthScoresToStrengthScoresDTO( entity.getStrengthScores() );
        balanceScores = balanceScoresToBalanceScoresDTO( entity.getBalanceScores() );
        List<AnatomicalMarker> list = entity.getAnatomicalMarkers();
        if ( list != null ) {
            anatomicalMarkers = new ArrayList<AnatomicalMarker>( list );
        }
        medicalObservations = entity.getMedicalObservations();
        objectives = entity.getObjectives();
        treatmentPlan = entity.getTreatmentPlan();
        nextEvaluationDate = entity.getNextEvaluationDate();

        PhysicalEvaluationResponseDTO physicalEvaluationResponseDTO = new PhysicalEvaluationResponseDTO( id, student, instructor, date, type, mainComplaint, clinicalDiagnosis, medications, weight, height, bmi, bloodPressure, heartRate, bodyFat, muscleMass, measurements, fmsScores, flexibilityScores, strengthScores, balanceScores, anatomicalMarkers, medicalObservations, objectives, treatmentPlan, nextEvaluationDate );

        return physicalEvaluationResponseDTO;
    }

    @Override
    public void updateEntityFromDto(PhysicalEvaluationRequestDTO dto, PhysicalEvaluation entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.fms() != null ) {
            if ( entity.getFmsScores() == null ) {
                entity.setFmsScores( new FmsScores() );
            }
            fmsScoresDTOToFmsScores1( dto.fms(), entity.getFmsScores() );
        }
        else {
            entity.setFmsScores( null );
        }
        if ( dto.flexibility() != null ) {
            if ( entity.getFlexibilityScores() == null ) {
                entity.setFlexibilityScores( new FlexibilityScores() );
            }
            flexibilityScoresDTOToFlexibilityScores1( dto.flexibility(), entity.getFlexibilityScores() );
        }
        else {
            entity.setFlexibilityScores( null );
        }
        if ( dto.strength() != null ) {
            if ( entity.getStrengthScores() == null ) {
                entity.setStrengthScores( new StrengthScores() );
            }
            strengthScoresDTOToStrengthScores1( dto.strength(), entity.getStrengthScores() );
        }
        else {
            entity.setStrengthScores( null );
        }
        if ( dto.balance() != null ) {
            if ( entity.getBalanceScores() == null ) {
                entity.setBalanceScores( new BalanceScores() );
            }
            balanceScoresDTOToBalanceScores1( dto.balance(), entity.getBalanceScores() );
        }
        else {
            entity.setBalanceScores( null );
        }
        entity.setMainComplaint( dtoAnamnesisMainComplaint( dto ) );
        entity.setClinicalDiagnosis( dtoAnamnesisClinicalDiagnosis( dto ) );
        entity.setMedications( dtoAnamnesisMedications( dto ) );
        entity.setResponsibleDoctor( dtoAnamnesisResponsibleDoctor( dto ) );
        entity.setPreviousPilatesExperience( dtoAnamnesisPreviousPilatesExperience( dto ) );
        entity.setHistoryOfPresentIllness( dtoAnamnesisHistoryOfPresentIllness( dto ) );
        entity.setAssociatedPathologies( dtoAnamnesisAssociatedPathologies( dto ) );
        entity.setComplementaryExams( dtoAnamnesisComplementaryExams( dto ) );
        entity.setHistoryOfPastIllness( dtoAnamnesisHistoryOfPastIllness( dto ) );
        entity.setPhysicalFunctionalExam( dtoAnamnesisPhysicalFunctionalExam( dto ) );
        entity.setDate( dto.date() );
        entity.setType( dto.type() );
        entity.setWeight( dto.weight() );
        entity.setHeight( dto.height() );
        entity.setBloodPressure( dto.bloodPressure() );
        entity.setHeartRate( dto.heartRate() );
        entity.setBodyFat( dto.bodyFat() );
        entity.setMuscleMass( dto.muscleMass() );
        if ( dto.measurements() != null ) {
            if ( entity.getMeasurements() == null ) {
                entity.setMeasurements( new BodyMeasurements() );
            }
            bodyMeasurementsDTOToBodyMeasurements1( dto.measurements(), entity.getMeasurements() );
        }
        else {
            entity.setMeasurements( null );
        }
        if ( entity.getAnatomicalMarkers() != null ) {
            List<AnatomicalMarker> list = dto.anatomicalMarkers();
            if ( list != null ) {
                entity.getAnatomicalMarkers().clear();
                entity.getAnatomicalMarkers().addAll( list );
            }
            else {
                entity.setAnatomicalMarkers( null );
            }
        }
        else {
            List<AnatomicalMarker> list = dto.anatomicalMarkers();
            if ( list != null ) {
                entity.setAnatomicalMarkers( new ArrayList<AnatomicalMarker>( list ) );
            }
        }
        entity.setMedicalObservations( dto.medicalObservations() );
        entity.setObjectives( dto.objectives() );
        entity.setTreatmentPlan( dto.treatmentPlan() );
        entity.setNextEvaluationDate( dto.nextEvaluationDate() );
    }

    protected FmsScores fmsScoresDTOToFmsScores(FmsScoresDTO fmsScoresDTO) {
        if ( fmsScoresDTO == null ) {
            return null;
        }

        FmsScores fmsScores = new FmsScores();

        fmsScores.setDeepSquat( fmsScoresDTO.deepSquat() );
        fmsScores.setHurdleStep( fmsScoresDTO.hurdleStep() );
        fmsScores.setInLineLunge( fmsScoresDTO.inLineLunge() );
        fmsScores.setShoulderMobility( fmsScoresDTO.shoulderMobility() );
        fmsScores.setActiveStraightLegRaise( fmsScoresDTO.activeStraightLegRaise() );
        fmsScores.setTrunkStabilityPushUp( fmsScoresDTO.trunkStabilityPushUp() );
        fmsScores.setRotaryStability( fmsScoresDTO.rotaryStability() );

        return fmsScores;
    }

    protected FlexibilityScores flexibilityScoresDTOToFlexibilityScores(FlexibilityScoresDTO flexibilityScoresDTO) {
        if ( flexibilityScoresDTO == null ) {
            return null;
        }

        FlexibilityScores flexibilityScores = new FlexibilityScores();

        flexibilityScores.setShoulderFlexion( flexibilityScoresDTO.shoulderFlexion() );
        flexibilityScores.setSpinalFlexion( flexibilityScoresDTO.spinalFlexion() );
        flexibilityScores.setHipFlexion( flexibilityScoresDTO.hipFlexion() );
        flexibilityScores.setAnkleFlexion( flexibilityScoresDTO.ankleFlexion() );

        return flexibilityScores;
    }

    protected StrengthScores strengthScoresDTOToStrengthScores(StrengthScoresDTO strengthScoresDTO) {
        if ( strengthScoresDTO == null ) {
            return null;
        }

        StrengthScores strengthScores = new StrengthScores();

        strengthScores.setCore( strengthScoresDTO.core() );
        strengthScores.setUpperBody( strengthScoresDTO.upperBody() );
        strengthScores.setLowerBody( strengthScoresDTO.lowerBody() );
        strengthScores.setGrip( strengthScoresDTO.grip() );

        return strengthScores;
    }

    protected BalanceScores balanceScoresDTOToBalanceScores(BalanceScoresDTO balanceScoresDTO) {
        if ( balanceScoresDTO == null ) {
            return null;
        }

        BalanceScores balanceScores = new BalanceScores();

        balanceScores.setStaticBalance( balanceScoresDTO.staticBalance() );
        balanceScores.setDynamicBalance( balanceScoresDTO.dynamicBalance() );
        balanceScores.setProprioception( balanceScoresDTO.proprioception() );

        return balanceScores;
    }

    private String dtoAnamnesisMainComplaint(PhysicalEvaluationRequestDTO physicalEvaluationRequestDTO) {
        if ( physicalEvaluationRequestDTO == null ) {
            return null;
        }
        EvaluationAnamnesisDTO anamnesis = physicalEvaluationRequestDTO.anamnesis();
        if ( anamnesis == null ) {
            return null;
        }
        String mainComplaint = anamnesis.mainComplaint();
        if ( mainComplaint == null ) {
            return null;
        }
        return mainComplaint;
    }

    private String dtoAnamnesisClinicalDiagnosis(PhysicalEvaluationRequestDTO physicalEvaluationRequestDTO) {
        if ( physicalEvaluationRequestDTO == null ) {
            return null;
        }
        EvaluationAnamnesisDTO anamnesis = physicalEvaluationRequestDTO.anamnesis();
        if ( anamnesis == null ) {
            return null;
        }
        String clinicalDiagnosis = anamnesis.clinicalDiagnosis();
        if ( clinicalDiagnosis == null ) {
            return null;
        }
        return clinicalDiagnosis;
    }

    private String dtoAnamnesisMedications(PhysicalEvaluationRequestDTO physicalEvaluationRequestDTO) {
        if ( physicalEvaluationRequestDTO == null ) {
            return null;
        }
        EvaluationAnamnesisDTO anamnesis = physicalEvaluationRequestDTO.anamnesis();
        if ( anamnesis == null ) {
            return null;
        }
        String medications = anamnesis.medications();
        if ( medications == null ) {
            return null;
        }
        return medications;
    }

    private String dtoAnamnesisResponsibleDoctor(PhysicalEvaluationRequestDTO physicalEvaluationRequestDTO) {
        if ( physicalEvaluationRequestDTO == null ) {
            return null;
        }
        EvaluationAnamnesisDTO anamnesis = physicalEvaluationRequestDTO.anamnesis();
        if ( anamnesis == null ) {
            return null;
        }
        String responsibleDoctor = anamnesis.responsibleDoctor();
        if ( responsibleDoctor == null ) {
            return null;
        }
        return responsibleDoctor;
    }

    private String dtoAnamnesisPreviousPilatesExperience(PhysicalEvaluationRequestDTO physicalEvaluationRequestDTO) {
        if ( physicalEvaluationRequestDTO == null ) {
            return null;
        }
        EvaluationAnamnesisDTO anamnesis = physicalEvaluationRequestDTO.anamnesis();
        if ( anamnesis == null ) {
            return null;
        }
        String previousPilatesExperience = anamnesis.previousPilatesExperience();
        if ( previousPilatesExperience == null ) {
            return null;
        }
        return previousPilatesExperience;
    }

    private String dtoAnamnesisHistoryOfPresentIllness(PhysicalEvaluationRequestDTO physicalEvaluationRequestDTO) {
        if ( physicalEvaluationRequestDTO == null ) {
            return null;
        }
        EvaluationAnamnesisDTO anamnesis = physicalEvaluationRequestDTO.anamnesis();
        if ( anamnesis == null ) {
            return null;
        }
        String historyOfPresentIllness = anamnesis.historyOfPresentIllness();
        if ( historyOfPresentIllness == null ) {
            return null;
        }
        return historyOfPresentIllness;
    }

    private String dtoAnamnesisAssociatedPathologies(PhysicalEvaluationRequestDTO physicalEvaluationRequestDTO) {
        if ( physicalEvaluationRequestDTO == null ) {
            return null;
        }
        EvaluationAnamnesisDTO anamnesis = physicalEvaluationRequestDTO.anamnesis();
        if ( anamnesis == null ) {
            return null;
        }
        String associatedPathologies = anamnesis.associatedPathologies();
        if ( associatedPathologies == null ) {
            return null;
        }
        return associatedPathologies;
    }

    private String dtoAnamnesisComplementaryExams(PhysicalEvaluationRequestDTO physicalEvaluationRequestDTO) {
        if ( physicalEvaluationRequestDTO == null ) {
            return null;
        }
        EvaluationAnamnesisDTO anamnesis = physicalEvaluationRequestDTO.anamnesis();
        if ( anamnesis == null ) {
            return null;
        }
        String complementaryExams = anamnesis.complementaryExams();
        if ( complementaryExams == null ) {
            return null;
        }
        return complementaryExams;
    }

    private String dtoAnamnesisHistoryOfPastIllness(PhysicalEvaluationRequestDTO physicalEvaluationRequestDTO) {
        if ( physicalEvaluationRequestDTO == null ) {
            return null;
        }
        EvaluationAnamnesisDTO anamnesis = physicalEvaluationRequestDTO.anamnesis();
        if ( anamnesis == null ) {
            return null;
        }
        String historyOfPastIllness = anamnesis.historyOfPastIllness();
        if ( historyOfPastIllness == null ) {
            return null;
        }
        return historyOfPastIllness;
    }

    private String dtoAnamnesisPhysicalFunctionalExam(PhysicalEvaluationRequestDTO physicalEvaluationRequestDTO) {
        if ( physicalEvaluationRequestDTO == null ) {
            return null;
        }
        EvaluationAnamnesisDTO anamnesis = physicalEvaluationRequestDTO.anamnesis();
        if ( anamnesis == null ) {
            return null;
        }
        String physicalFunctionalExam = anamnesis.physicalFunctionalExam();
        if ( physicalFunctionalExam == null ) {
            return null;
        }
        return physicalFunctionalExam;
    }

    protected BodyMeasurements bodyMeasurementsDTOToBodyMeasurements(BodyMeasurementsDTO bodyMeasurementsDTO) {
        if ( bodyMeasurementsDTO == null ) {
            return null;
        }

        BodyMeasurements bodyMeasurements = new BodyMeasurements();

        bodyMeasurements.setChest( bodyMeasurementsDTO.chest() );
        bodyMeasurements.setWaist( bodyMeasurementsDTO.waist() );
        bodyMeasurements.setHip( bodyMeasurementsDTO.hip() );
        bodyMeasurements.setThigh( bodyMeasurementsDTO.thigh() );
        bodyMeasurements.setArm( bodyMeasurementsDTO.arm() );

        return bodyMeasurements;
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

    protected BodyMeasurementsDTO bodyMeasurementsToBodyMeasurementsDTO(BodyMeasurements bodyMeasurements) {
        if ( bodyMeasurements == null ) {
            return null;
        }

        Double chest = null;
        Double waist = null;
        Double hip = null;
        Double thigh = null;
        Double arm = null;

        chest = bodyMeasurements.getChest();
        waist = bodyMeasurements.getWaist();
        hip = bodyMeasurements.getHip();
        thigh = bodyMeasurements.getThigh();
        arm = bodyMeasurements.getArm();

        BodyMeasurementsDTO bodyMeasurementsDTO = new BodyMeasurementsDTO( chest, waist, hip, thigh, arm );

        return bodyMeasurementsDTO;
    }

    protected FmsScoresDTO fmsScoresToFmsScoresDTO(FmsScores fmsScores) {
        if ( fmsScores == null ) {
            return null;
        }

        Integer deepSquat = null;
        Integer hurdleStep = null;
        Integer inLineLunge = null;
        Integer shoulderMobility = null;
        Integer activeStraightLegRaise = null;
        Integer trunkStabilityPushUp = null;
        Integer rotaryStability = null;

        deepSquat = fmsScores.getDeepSquat();
        hurdleStep = fmsScores.getHurdleStep();
        inLineLunge = fmsScores.getInLineLunge();
        shoulderMobility = fmsScores.getShoulderMobility();
        activeStraightLegRaise = fmsScores.getActiveStraightLegRaise();
        trunkStabilityPushUp = fmsScores.getTrunkStabilityPushUp();
        rotaryStability = fmsScores.getRotaryStability();

        FmsScoresDTO fmsScoresDTO = new FmsScoresDTO( deepSquat, hurdleStep, inLineLunge, shoulderMobility, activeStraightLegRaise, trunkStabilityPushUp, rotaryStability );

        return fmsScoresDTO;
    }

    protected FlexibilityScoresDTO flexibilityScoresToFlexibilityScoresDTO(FlexibilityScores flexibilityScores) {
        if ( flexibilityScores == null ) {
            return null;
        }

        Integer shoulderFlexion = null;
        Integer spinalFlexion = null;
        Integer hipFlexion = null;
        Integer ankleFlexion = null;

        shoulderFlexion = flexibilityScores.getShoulderFlexion();
        spinalFlexion = flexibilityScores.getSpinalFlexion();
        hipFlexion = flexibilityScores.getHipFlexion();
        ankleFlexion = flexibilityScores.getAnkleFlexion();

        FlexibilityScoresDTO flexibilityScoresDTO = new FlexibilityScoresDTO( shoulderFlexion, spinalFlexion, hipFlexion, ankleFlexion );

        return flexibilityScoresDTO;
    }

    protected StrengthScoresDTO strengthScoresToStrengthScoresDTO(StrengthScores strengthScores) {
        if ( strengthScores == null ) {
            return null;
        }

        Integer core = null;
        Integer upperBody = null;
        Integer lowerBody = null;
        Double grip = null;

        core = strengthScores.getCore();
        upperBody = strengthScores.getUpperBody();
        lowerBody = strengthScores.getLowerBody();
        grip = strengthScores.getGrip();

        StrengthScoresDTO strengthScoresDTO = new StrengthScoresDTO( core, upperBody, lowerBody, grip );

        return strengthScoresDTO;
    }

    protected BalanceScoresDTO balanceScoresToBalanceScoresDTO(BalanceScores balanceScores) {
        if ( balanceScores == null ) {
            return null;
        }

        Integer staticBalance = null;
        Integer dynamicBalance = null;
        Integer proprioception = null;

        staticBalance = balanceScores.getStaticBalance();
        dynamicBalance = balanceScores.getDynamicBalance();
        proprioception = balanceScores.getProprioception();

        BalanceScoresDTO balanceScoresDTO = new BalanceScoresDTO( staticBalance, dynamicBalance, proprioception );

        return balanceScoresDTO;
    }

    protected void fmsScoresDTOToFmsScores1(FmsScoresDTO fmsScoresDTO, FmsScores mappingTarget) {
        if ( fmsScoresDTO == null ) {
            return;
        }

        mappingTarget.setDeepSquat( fmsScoresDTO.deepSquat() );
        mappingTarget.setHurdleStep( fmsScoresDTO.hurdleStep() );
        mappingTarget.setInLineLunge( fmsScoresDTO.inLineLunge() );
        mappingTarget.setShoulderMobility( fmsScoresDTO.shoulderMobility() );
        mappingTarget.setActiveStraightLegRaise( fmsScoresDTO.activeStraightLegRaise() );
        mappingTarget.setTrunkStabilityPushUp( fmsScoresDTO.trunkStabilityPushUp() );
        mappingTarget.setRotaryStability( fmsScoresDTO.rotaryStability() );
    }

    protected void flexibilityScoresDTOToFlexibilityScores1(FlexibilityScoresDTO flexibilityScoresDTO, FlexibilityScores mappingTarget) {
        if ( flexibilityScoresDTO == null ) {
            return;
        }

        mappingTarget.setShoulderFlexion( flexibilityScoresDTO.shoulderFlexion() );
        mappingTarget.setSpinalFlexion( flexibilityScoresDTO.spinalFlexion() );
        mappingTarget.setHipFlexion( flexibilityScoresDTO.hipFlexion() );
        mappingTarget.setAnkleFlexion( flexibilityScoresDTO.ankleFlexion() );
    }

    protected void strengthScoresDTOToStrengthScores1(StrengthScoresDTO strengthScoresDTO, StrengthScores mappingTarget) {
        if ( strengthScoresDTO == null ) {
            return;
        }

        mappingTarget.setCore( strengthScoresDTO.core() );
        mappingTarget.setUpperBody( strengthScoresDTO.upperBody() );
        mappingTarget.setLowerBody( strengthScoresDTO.lowerBody() );
        mappingTarget.setGrip( strengthScoresDTO.grip() );
    }

    protected void balanceScoresDTOToBalanceScores1(BalanceScoresDTO balanceScoresDTO, BalanceScores mappingTarget) {
        if ( balanceScoresDTO == null ) {
            return;
        }

        mappingTarget.setStaticBalance( balanceScoresDTO.staticBalance() );
        mappingTarget.setDynamicBalance( balanceScoresDTO.dynamicBalance() );
        mappingTarget.setProprioception( balanceScoresDTO.proprioception() );
    }

    protected void bodyMeasurementsDTOToBodyMeasurements1(BodyMeasurementsDTO bodyMeasurementsDTO, BodyMeasurements mappingTarget) {
        if ( bodyMeasurementsDTO == null ) {
            return;
        }

        mappingTarget.setChest( bodyMeasurementsDTO.chest() );
        mappingTarget.setWaist( bodyMeasurementsDTO.waist() );
        mappingTarget.setHip( bodyMeasurementsDTO.hip() );
        mappingTarget.setThigh( bodyMeasurementsDTO.thigh() );
        mappingTarget.setArm( bodyMeasurementsDTO.arm() );
    }
}
