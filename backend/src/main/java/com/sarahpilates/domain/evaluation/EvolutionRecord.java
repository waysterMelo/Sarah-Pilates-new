package com.sarahpilates.domain.evaluation;

import com.sarahpilates.domain.instructor.Instructor;
import com.sarahpilates.domain.student.Student;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "evolution_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class EvolutionRecord {

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

    private Integer sessionNumber;
    private String focus;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "evolution_record_exercises", joinColumns = @JoinColumn(name = "record_id"))
    @Column(name = "exercise")
    private List<String> exercisesPerformed;

    @Column(columnDefinition = "TEXT")
    private String progressNotes;
    
    @Column(columnDefinition = "TEXT")
    private String difficultiesObserved;
    
    @Column(columnDefinition = "TEXT")
    private String improvements;
    
    @Column(columnDefinition = "TEXT")
    private String nextSessionGoals;

    // Subjective evaluation
    private Integer overallRating; // 1-5
    private Integer painLevel; // 0-10
    private Integer mobilityLevel; // 0-5
    private Integer strengthLevel; // 0-5
    private Integer balanceLevel; // 0-5
    private Integer enduranceLevel; // 0-5

    @Column(columnDefinition = "TEXT")
    private String observations;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "evolution_record_equipment", joinColumns = @JoinColumn(name = "record_id"))
    @Column(name = "equipment")
    private List<String> equipment;
    
    private Integer duration; // in minutes
}
