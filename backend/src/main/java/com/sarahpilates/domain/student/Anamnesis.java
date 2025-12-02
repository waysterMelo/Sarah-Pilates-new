package com.sarahpilates.domain.student;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Anamnesis {
    @Column(columnDefinition = "TEXT")
    private String allergies;
    @Column(columnDefinition = "TEXT")
    private String surgeries;
    @Column(columnDefinition = "TEXT")
    private String medications;
    @Column(columnDefinition = "TEXT")
    private String restrictions;
    private boolean heartCondition;
    private boolean dizziness;
    private boolean boneJointProblem;
    private boolean diabetes;
    private boolean hypertension;
    @Column(columnDefinition = "TEXT")
    private String objectives;
}
