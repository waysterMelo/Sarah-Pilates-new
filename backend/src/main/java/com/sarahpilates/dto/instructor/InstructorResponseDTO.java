package com.sarahpilates.dto.instructor;

import com.sarahpilates.domain.enums.InstructorStatus;
import com.sarahpilates.domain.enums.UserRole;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record InstructorResponseDTO(
    Long id,
    String name,
    String email,
    UserRole role,
    String phone,
    LocalDate birthDate,
    String address,
    List<String> specialties,
    String bio,
    InstructorStatus status,
    LocalDate hireDate,
    BigDecimal hourlyRate,
    List<WorkingHoursDTO> workingHours
) {}
