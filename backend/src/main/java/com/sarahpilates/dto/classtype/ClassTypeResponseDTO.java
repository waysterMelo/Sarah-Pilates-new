package com.sarahpilates.dto.classtype;

import com.sarahpilates.domain.enums.ClassIntensity;

import java.math.BigDecimal;
import java.util.List;

public record ClassTypeResponseDTO(
    Long id,
    String name,
    String description,
    Integer duration,
    BigDecimal price,
    Integer capacity,
    ClassIntensity intensity,
    String color,
    List<String> equipment
) {}
