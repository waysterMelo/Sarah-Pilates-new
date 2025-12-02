package com.sarahpilates.dto.schedule;

import com.sarahpilates.domain.enums.PaymentStatus;
import com.sarahpilates.domain.enums.ScheduleStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public record ScheduleResponseDTO(
    Long id,
    StudentInfoDTO student,
    InstructorInfoDTO instructor,
    ClassTypeInfoDTO classType,
    LocalDate date,
    LocalTime startTime,
    LocalTime endTime,
    ScheduleStatus status,
    PaymentStatus paymentStatus,
    BigDecimal price,
    String room,
    String notes
) {}
