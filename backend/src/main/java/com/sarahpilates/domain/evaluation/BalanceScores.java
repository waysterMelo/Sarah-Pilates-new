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
public class BalanceScores {
    // 0-5 scale
    private Integer staticBalance;
    private Integer dynamicBalance;
    private Integer proprioception;
}
