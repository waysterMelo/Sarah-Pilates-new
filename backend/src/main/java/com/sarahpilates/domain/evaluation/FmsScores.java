package com.sarahpilates.domain.evaluation;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FmsScores {
    // Functional Movement Screen Scores (0-3)
    private Integer deepSquat;
    private Integer hurdleStep;
    private Integer inLineLunge;
    private Integer shoulderMobility;
    private Integer activeStraightLegRaise;
    private Integer trunkStabilityPushUp;
    private Integer rotaryStability;
}
