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
public class BodyMeasurements {
    // Circumferences in cm
    private Double chest;
    private Double waist;
    private Double hip;
    private Double thigh;
    private Double arm;
}
