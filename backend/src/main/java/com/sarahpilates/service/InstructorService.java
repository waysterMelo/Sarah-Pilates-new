package com.sarahpilates.service;

import com.sarahpilates.domain.instructor.Instructor;
import com.sarahpilates.dto.instructor.InstructorRequestDTO;
import com.sarahpilates.dto.instructor.InstructorResponseDTO;
import com.sarahpilates.mapper.InstructorMapper;
import com.sarahpilates.repository.InstructorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorService {

    private final InstructorRepository instructorRepository;
    private final InstructorMapper instructorMapper;

    @Transactional
    public InstructorResponseDTO createInstructor(InstructorRequestDTO instructorDTO) {
        if (instructorRepository.existsByEmail(instructorDTO.email())) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (StringUtils.hasText(instructorDTO.emergencyContact()) && !StringUtils.hasText(instructorDTO.emergencyPhone())) {
            throw new IllegalArgumentException("Emergency phone must be provided if emergency contact is present.");
        }

        Instructor instructor = instructorMapper.toEntity(instructorDTO);
        if (instructor.getWorkingHours() != null) {
            instructor.getWorkingHours().forEach(wh -> wh.setInstructor(instructor));
        }
        Instructor savedInstructor = instructorRepository.save(instructor);
        return instructorMapper.toResponseDTO(savedInstructor);
    }

    @Transactional(readOnly = true)
    public Page<InstructorResponseDTO> findAllInstructors(Pageable pageable) {
        return instructorRepository.findAll(pageable)
                .map(instructorMapper::toResponseDTO);
    }

    @Transactional(readOnly = true)
    public InstructorResponseDTO findInstructorById(Long id) {
        return instructorRepository.findById(id)
                .map(instructorMapper::toResponseDTO)
                .orElseThrow(() -> new EntityNotFoundException("Instructor not found with id: " + id));
    }

    @Transactional
    public InstructorResponseDTO updateInstructor(Long id, InstructorRequestDTO dto) {
        Instructor existingInstructor = instructorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Instructor not found with id: " + id));

        // Custom validation for emergency contact
        if (StringUtils.hasText(dto.emergencyContact()) && !StringUtils.hasText(dto.emergencyPhone())) {
            throw new IllegalArgumentException("Emergency phone must be provided if emergency contact is present.");
        }
        
        // Check for email uniqueness if it's being changed
        if (dto.email() != null && !dto.email().equals(existingInstructor.getEmail())) {
            if(instructorRepository.existsByEmail(dto.email())) {
                throw new IllegalArgumentException("Email already in use");
            }
        }

        // Use the mapper to update basic fields
        instructorMapper.updateEntityFromDto(dto, existingInstructor);


        // Handle nested working hours update
        if (dto.workingHours() != null) {
            // Clear old collection and add new ones
            existingInstructor.getWorkingHours().clear();
            dto.workingHours().forEach(whDto -> {
                var wh = instructorMapper.toWorkingHoursList(List.of(whDto)).get(0);
                wh.setInstructor(existingInstructor);
                existingInstructor.getWorkingHours().add(wh);
            });
        }

        Instructor updatedInstructor = instructorRepository.save(existingInstructor);
        return instructorMapper.toResponseDTO(updatedInstructor);
    }

    @Transactional
    public void deleteInstructor(Long id) {
        if (!instructorRepository.existsById(id)) {
            throw new EntityNotFoundException("Instructor not found with id: " + id);
        }
        instructorRepository.deleteById(id);
    }
}
