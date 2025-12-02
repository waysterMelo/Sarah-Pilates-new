package com.sarahpilates.dto.classtype;

import com.sarahpilates.domain.enums.ClassIntensity;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public record ClassTypeRequestDTO(
    @NotBlank String name,
    String description,
    @NotNull @Min(1) Integer duration,
    @NotNull @DecimalMin("0.0") BigDecimal price,
    @NotNull @Min(1) Integer capacity,
    @NotNull ClassIntensity intensity,
    String color,
    List<String> equipment
) {}
