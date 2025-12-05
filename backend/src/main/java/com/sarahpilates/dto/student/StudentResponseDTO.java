package com.sarahpilates.dto.student;

import com.sarahpilates.domain.enums.StudentStatus;
import com.sarahpilates.dto.document.DocumentResponseDTO;
import java.time.LocalDate;
import java.util.List;

public record StudentResponseDTO(
    Long id,
    String name,
    String email,
    String phone,
    LocalDate birthDate,
    String sex,
    String address,
    String emergencyContact,
    String emergencyPhone,
    StudentStatus status,
    String plan,
    AnamnesisDTO anamnesis,
    List<DocumentResponseDTO> documents
) {}
