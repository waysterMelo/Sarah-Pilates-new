package com.sarahpilates.service;

import com.sarahpilates.domain.classtype.ClassType;
import com.sarahpilates.domain.instructor.Instructor;
import com.sarahpilates.domain.schedule.Schedule;
import com.sarahpilates.domain.student.Student;
import com.sarahpilates.dto.schedule.ScheduleRequestDTO;
import com.sarahpilates.dto.schedule.ScheduleResponseDTO;
import com.sarahpilates.mapper.ScheduleMapper;
import com.sarahpilates.repository.ClassTypeRepository;
import com.sarahpilates.repository.InstructorRepository;
import com.sarahpilates.repository.ScheduleRepository;
import com.sarahpilates.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final StudentRepository studentRepository;
    private final InstructorRepository instructorRepository;
    private final ClassTypeRepository classTypeRepository;
    private final ScheduleMapper scheduleMapper;

    @Transactional
    public ScheduleResponseDTO createSchedule(ScheduleRequestDTO dto) {
        Student student = studentRepository.findById(dto.studentId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        Instructor instructor = instructorRepository.findById(dto.instructorId())
                .orElseThrow(() -> new EntityNotFoundException("Instructor not found"));
        ClassType classType = classTypeRepository.findById(dto.classTypeId())
                .orElseThrow(() -> new EntityNotFoundException("ClassType not found"));

        Schedule schedule = scheduleMapper.toEntity(dto);
        schedule.setStudent(student);
        schedule.setInstructor(instructor);
        schedule.setClassType(classType);

        Schedule savedSchedule = scheduleRepository.save(schedule);
        return scheduleMapper.toResponseDTO(savedSchedule);
    }

    @Transactional(readOnly = true)
    public ScheduleResponseDTO findScheduleById(Long id) {
        return scheduleRepository.findById(id)
                .map(scheduleMapper::toResponseDTO)
                .orElseThrow(() -> new EntityNotFoundException("Schedule not found"));
    }

    @Transactional(readOnly = true)
    public Page<ScheduleResponseDTO> findAllSchedules(LocalDate startDate, LocalDate endDate, Pageable pageable) {
        if (startDate != null && endDate != null) {
            // This is not optimal for large datasets as it fetches all, then paginates in memory.
            // A custom repository method with Pageable would be better. For now, this works.
            List<ScheduleResponseDTO> list = scheduleRepository.findByDateBetween(startDate, endDate).stream()
                    .map(scheduleMapper::toResponseDTO)
                    .collect(Collectors.toList());
            
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), list.size());
            return new PageImpl<>(list.subList(start, end), pageable, list.size());

        } else {
            return scheduleRepository.findAll(pageable)
                    .map(scheduleMapper::toResponseDTO);
        }
    }

    @Transactional(readOnly = true)
    public long countTodayClasses() {
        return scheduleRepository.countByDate(LocalDate.now());
    }

    @Transactional
    public ScheduleResponseDTO updateSchedule(Long id, ScheduleRequestDTO dto) {
        Schedule existingSchedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Schedule not found"));

        // Fetch related entities if they are being updated
        Student student = studentRepository.findById(dto.studentId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        Instructor instructor = instructorRepository.findById(dto.instructorId())
                .orElseThrow(() -> new EntityNotFoundException("Instructor not found"));
        ClassType classType = classTypeRepository.findById(dto.classTypeId())
                .orElseThrow(() -> new EntityNotFoundException("ClassType not found"));

        scheduleMapper.updateEntityFromDto(dto, existingSchedule);
        existingSchedule.setStudent(student);
        existingSchedule.setInstructor(instructor);
        existingSchedule.setClassType(classType);

        Schedule updatedSchedule = scheduleRepository.save(existingSchedule);
        return scheduleMapper.toResponseDTO(updatedSchedule);
    }

    @Transactional
    public void deleteSchedule(Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new EntityNotFoundException("Schedule not found");
        }
        scheduleRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Optional<ScheduleResponseDTO> findNextClassByStudent(Long studentId) {
        return scheduleRepository.findFirstByStudentIdAndDateAfterOrderByDateAscStartTimeAsc(studentId, LocalDate.now().minusDays(1))
                .map(scheduleMapper::toResponseDTO);
    }
}
