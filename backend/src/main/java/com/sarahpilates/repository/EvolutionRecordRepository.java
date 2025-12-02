package com.sarahpilates.repository;

import com.sarahpilates.domain.evaluation.EvolutionRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvolutionRecordRepository extends JpaRepository<EvolutionRecord, Long> {
    Page<EvolutionRecord> findByStudentId(Long studentId, Pageable pageable);
}
