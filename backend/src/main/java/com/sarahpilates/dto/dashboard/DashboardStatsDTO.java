package com.sarahpilates.dto.dashboard;

import java.math.BigDecimal;

public record DashboardStatsDTO(
    BigDecimal revenue,
    String revenueChange,
    Long totalStudents,
    String studentsChange,
    Long todayClasses,
    String classesChange
) {}
