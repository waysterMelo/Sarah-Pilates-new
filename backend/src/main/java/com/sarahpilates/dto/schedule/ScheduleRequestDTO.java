package com.sarahpilates.dto.schedule;

import com.sarahpilates.domain.enums.PaymentStatus;
import com.sarahpilates.domain.enums.ScheduleStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public record ScheduleRequestDTO(
    @NotNull Long studentId,
    @NotNull Long instructorId,
    @NotNull Long classTypeId,

    @NotNull @FutureOrPresent LocalDate date,
    @NotNull LocalTime startTime,
    @NotNull LocalTime endTime,

    @NotNull ScheduleStatus status,
    @NotNull PaymentStatus paymentStatus,
    BigDecimal price,
    String room,
    String notes
) {}
