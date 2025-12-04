package com.sarahpilates.dto.instructor;

import com.sarahpilates.domain.enums.InstructorStatus;
import com.sarahpilates.domain.enums.UserRole;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.Valid;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record InstructorRequestDTO(
    @NotBlank String name,
    @NotBlank @Email String email,
    @Size(min = 8) String password,
    @NotNull UserRole role,
    String phone,
    LocalDate birthDate,
    String address,
    String emergencyContact,
    String emergencyPhone,
    List<String> specialties,
    List<String> certifications,
    String bio,
    String experience,
    @NotNull InstructorStatus status,
    LocalDate hireDate,
    @DecimalMin("0.0") BigDecimal hourlyRate,
    @Valid List<WorkingHoursDTO> workingHours
) {}
