package com.sarahpilates.repository;

import com.sarahpilates.domain.schedule.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByDateBetween(LocalDate startDate, LocalDate endDate);
    long countByDate(LocalDate date);
    Optional<Schedule> findFirstByStudentIdAndDateAfterOrderByDateAscStartTimeAsc(Long studentId, LocalDate date);
}
