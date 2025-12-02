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
public class StrengthScores {
    // 0-5 scale
    private Integer core;
    private Integer upperBody;
    private Integer lowerBody;
    private Double grip; // in kg
}
