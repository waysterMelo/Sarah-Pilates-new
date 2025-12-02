package com.sarahpilates.repository;

import com.sarahpilates.domain.evaluation.PhysicalEvaluation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhysicalEvaluationRepository extends JpaRepository<PhysicalEvaluation, Long> {
    Page<PhysicalEvaluation> findByStudentId(Long studentId, Pageable pageable);
}
