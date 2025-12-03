package com.sarahpilates.service;

import com.sarahpilates.dto.dashboard.DashboardStatsDTO;
import com.sarahpilates.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final StudentRepository studentRepository;
    private final ScheduleService scheduleService;

    @Transactional(readOnly = true)
    public DashboardStatsDTO getDashboardStats() {
        long totalStudents = studentRepository.count();
        long todayClasses = scheduleService.countTodayClasses();
        
        // Mocked revenue for now
        BigDecimal revenue = new BigDecimal("18200.00");
        String revenueChange = "+12%";
        String studentsChange = "+4";
        String classesChange = "Normal";

        return new DashboardStatsDTO(
            revenue,
            revenueChange,
            totalStudents,
            studentsChange,
            todayClasses,
            classesChange
        );
    }
}
