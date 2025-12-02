package com.sarahpilates.service;

import com.sarahpilates.domain.evaluation.EvolutionRecord;
import com.sarahpilates.domain.evaluation.PhysicalEvaluation;
import com.sarahpilates.domain.instructor.Instructor;
import com.sarahpilates.domain.student.Student;
import com.sarahpilates.dto.evaluation.EvolutionRecordRequestDTO;
import com.sarahpilates.dto.evaluation.EvolutionRecordResponseDTO;
import com.sarahpilates.dto.evaluation.PhysicalEvaluationRequestDTO;
import com.sarahpilates.dto.evaluation.PhysicalEvaluationResponseDTO;
import com.sarahpilates.mapper.EvolutionRecordMapper;
import com.sarahpilates.mapper.PhysicalEvaluationMapper;
import com.sarahpilates.repository.EvolutionRecordRepository;
import com.sarahpilates.repository.InstructorRepository;
import com.sarahpilates.repository.PhysicalEvaluationRepository;
import com.sarahpilates.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EvaluationService {

    private final PhysicalEvaluationRepository physicalEvaluationRepository;
    private final EvolutionRecordRepository evolutionRecordRepository;
    private final StudentRepository studentRepository;
    private final InstructorRepository instructorRepository;
    private final PhysicalEvaluationMapper physicalEvaluationMapper;
    private final EvolutionRecordMapper evolutionRecordMapper;

    // --- Physical Evaluation Methods ---

    @Transactional
    public PhysicalEvaluationResponseDTO createPhysicalEvaluation(PhysicalEvaluationRequestDTO dto) {
        Student student = studentRepository.findById(dto.studentId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        Instructor instructor = instructorRepository.findById(dto.instructorId())
                .orElseThrow(() -> new EntityNotFoundException("Instructor not found"));

        PhysicalEvaluation eval = physicalEvaluationMapper.toEntity(dto);
        eval.setStudent(student);
        eval.setInstructor(instructor);

        if (dto.weight() != null && dto.height() != null && dto.height() > 0) {
            double bmi = dto.weight() / (dto.height() * dto.height());
            eval.setBmi(Math.round(bmi * 10.0) / 10.0);
        }

        return physicalEvaluationMapper.toResponseDTO(physicalEvaluationRepository.save(eval));
    }
    
    @Transactional(readOnly = true)
	public PhysicalEvaluationResponseDTO findPhysicalEvaluationById(Long id) {
        return physicalEvaluationRepository.findById(id)
                .map(physicalEvaluationMapper::toResponseDTO)
                .orElseThrow(() -> new EntityNotFoundException("Physical Evaluation not found"));
    }
    
    @Transactional(readOnly = true)
    public Page<PhysicalEvaluationResponseDTO> findAllPhysicalEvaluations(Pageable pageable) {
        return physicalEvaluationRepository.findAll(pageable)
                .map(physicalEvaluationMapper::toResponseDTO);
    }

    @Transactional(readOnly = true)
    public Page<PhysicalEvaluationResponseDTO> findAllPhysicalEvaluationsByStudent(Long studentId, Pageable pageable) {
        return physicalEvaluationRepository.findByStudentId(studentId, pageable)
                .map(physicalEvaluationMapper::toResponseDTO);
    }

    @Transactional
    public PhysicalEvaluationResponseDTO updatePhysicalEvaluation(Long id, PhysicalEvaluationRequestDTO dto) {
        PhysicalEvaluation existingEval = physicalEvaluationRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Physical Evaluation not found"));

        physicalEvaluationMapper.updateEntityFromDto(dto, existingEval);
        
        if (dto.weight() != null && dto.height() != null && dto.height() > 0) {
            double bmi = dto.weight() / (dto.height() * dto.height());
            existingEval.setBmi(Math.round(bmi * 10.0) / 10.0);
        }

        return physicalEvaluationMapper.toResponseDTO(physicalEvaluationRepository.save(existingEval));
    }

    @Transactional
    public void deletePhysicalEvaluation(Long id) {
        if (!physicalEvaluationRepository.existsById(id)) {
            throw new EntityNotFoundException("Physical Evaluation not found");
        }
        physicalEvaluationRepository.deleteById(id);
    }


    // --- Evolution Record Methods ---

    @Transactional
    public EvolutionRecordResponseDTO createEvolutionRecord(EvolutionRecordRequestDTO dto) {
        Student student = studentRepository.findById(dto.studentId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        Instructor instructor = instructorRepository.findById(dto.instructorId())
                .orElseThrow(() -> new EntityNotFoundException("Instructor not found"));

        EvolutionRecord record = evolutionRecordMapper.toEntity(dto);
        record.setStudent(student);
        record.setInstructor(instructor);

        return evolutionRecordMapper.toResponseDTO(evolutionRecordRepository.save(record));
    }
    
    @Transactional(readOnly = true)
    public EvolutionRecordResponseDTO findEvolutionRecordById(Long id) {
        return evolutionRecordRepository.findById(id)
                .map(evolutionRecordMapper::toResponseDTO)
                .orElseThrow(() -> new EntityNotFoundException("Evolution Record not found"));
    }
    
    @Transactional(readOnly = true)
    public Page<EvolutionRecordResponseDTO> findAllEvolutionRecords(Pageable pageable) {
        return evolutionRecordRepository.findAll(pageable)
            .map(evolutionRecordMapper::toResponseDTO);
    }

    @Transactional(readOnly = true)
    public Page<EvolutionRecordResponseDTO> findAllEvolutionRecordsByStudent(Long studentId, Pageable pageable) {
        return evolutionRecordRepository.findByStudentId(studentId, pageable)
                .map(evolutionRecordMapper::toResponseDTO);
    }

    @Transactional
    public EvolutionRecordResponseDTO updateEvolutionRecord(Long id, EvolutionRecordRequestDTO dto) {
        EvolutionRecord existingRecord = evolutionRecordRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Evolution Record not found"));
        
        evolutionRecordMapper.updateEntityFromDto(dto, existingRecord);

        return evolutionRecordMapper.toResponseDTO(evolutionRecordRepository.save(existingRecord));
    }

    @Transactional
    public void deleteEvolutionRecord(Long id) {
        if (!evolutionRecordRepository.existsById(id)) {
            throw new EntityNotFoundException("Evolution Record not found");
        }
        evolutionRecordRepository.deleteById(id);
    }
}
