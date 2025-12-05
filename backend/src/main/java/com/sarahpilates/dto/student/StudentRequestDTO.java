package com.sarahpilates.dto.student;

import com.sarahpilates.domain.enums.StudentStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import java.time.LocalDate;

public record StudentRequestDTO(
    @NotBlank(message = "Name cannot be blank")
    String name,

    @Email(message = "Email should be valid")
    String email,

    String phone,

    @PastOrPresent(message = "Birth date must be in the past or present")
    LocalDate birthDate,

    String sex,

    String address,
    String emergencyContact,
    String emergencyPhone,

    @NotNull(message = "Status cannot be null")
    StudentStatus status,

    String plan,

    @Valid
    AnamnesisDTO anamnesis
) {}
