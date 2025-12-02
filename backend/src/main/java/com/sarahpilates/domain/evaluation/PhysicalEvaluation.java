package com.sarahpilates.domain.evaluation;

import com.sarahpilates.domain.converter.AnatomicalMarkerListConverter;
import com.sarahpilates.domain.enums.EvaluationType;
import com.sarahpilates.domain.instructor.Instructor;
import com.sarahpilates.domain.student.Student;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "physical_evaluations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class PhysicalEvaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", nullable = false)
    private Instructor instructor;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EvaluationType type;

    // --- ANAMNESIS (Specific to evaluation) ---
    @Column(columnDefinition = "TEXT")
    private String mainComplaint;
    @Column(columnDefinition = "TEXT")
    private String clinicalDiagnosis;
    @Column(columnDefinition = "TEXT")
    private String medications;

    // --- ANTHROPOMETRY ---
    private Double weight; // kg
    private Double height; // m
    private Double bmi;
    private String bloodPressure;
    private Integer heartRate;
    private Double bodyFat;
    private Double muscleMass;

    @Embedded
    private BodyMeasurements measurements;

    // --- FUNCTIONAL TESTS ---
    @Embedded
    private FmsScores fmsScores;

    @Embedded
    private FlexibilityScores flexibilityScores;

    @Embedded
    private StrengthScores strengthScores;

    @Embedded
    private BalanceScores balanceScores;

    // --- POSTURAL ANALYSIS ---
    @Lob
    @Column(columnDefinition = "JSON")
    @Convert(converter = AnatomicalMarkerListConverter.class)
    private List<AnatomicalMarker> anatomicalMarkers;

    // --- CONCLUSION ---
    @Column(columnDefinition = "TEXT")
    private String medicalObservations;
    @Column(columnDefinition = "TEXT")
    private String objectives;
    @Column(columnDefinition = "TEXT")
    private String treatmentPlan;

    private LocalDate nextEvaluationDate;
}
