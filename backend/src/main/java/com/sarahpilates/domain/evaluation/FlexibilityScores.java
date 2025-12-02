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
public class FlexibilityScores {
    // Degrees
    private Integer shoulderFlexion;
    private Integer spinalFlexion;
    private Integer hipFlexion;
    private Integer ankleFlexion;
}
