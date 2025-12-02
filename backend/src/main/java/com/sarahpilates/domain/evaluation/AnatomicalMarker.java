package com.sarahpilates.domain.evaluation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Plain Old Java Object (POJO) for storing structured marker data. Not an entity.
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnatomicalMarker {
    private double x;
    private double y;
    private String type; // e.g., 'pain', 'tension', 'deviation'
    private String description;
}
