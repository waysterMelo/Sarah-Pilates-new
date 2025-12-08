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
    String phone,
    String sex,
    LocalDate birthDate,
    String address,
    String emergencyContact,
    String emergencyPhone,
    List<String> specialties,
    List<String> certifications,
    String bio,
    String experience,
    InstructorStatus status,
    LocalDate hireDate,
    BigDecimal hourlyRate,
    List<WorkingHoursDTO> workingHours
) {}
