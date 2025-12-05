package com.sarahpilates.web;

import com.sarahpilates.dto.document.DocumentResponseDTO;
import com.sarahpilates.dto.evaluation.EvolutionRecordResponseDTO;
import com.sarahpilates.dto.evaluation.PhysicalEvaluationResponseDTO;
import com.sarahpilates.dto.student.StudentRequestDTO;
import com.sarahpilates.dto.student.StudentResponseDTO;
import com.sarahpilates.dto.schedule.ScheduleResponseDTO;
import com.sarahpilates.service.EvaluationService;
import com.sarahpilates.service.ScheduleService;
import com.sarahpilates.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final EvaluationService evaluationService;
    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<StudentResponseDTO> createStudent(@Valid @RequestBody StudentRequestDTO studentDTO) {
        StudentResponseDTO createdStudent = studentService.createStudent(studentDTO);
        return ResponseEntity.created(URI.create("/api/students/" + createdStudent.id())).body(createdStudent);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> getStudentById(@PathVariable Long id) {
        StudentResponseDTO student = studentService.findStudentById(id);
        return ResponseEntity.ok(student);
    }

    @GetMapping("/{id}/next-class")
    public ResponseEntity<ScheduleResponseDTO> getNextClass(@PathVariable Long id) {
        Optional<ScheduleResponseDTO> nextClass = scheduleService.findNextClassByStudent(id);
        return nextClass.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<StudentResponseDTO>> getAllStudents(Pageable pageable) {
        Page<StudentResponseDTO> students = studentService.findAllStudents(pageable);
        return ResponseEntity.ok(students);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> updateStudent(@PathVariable Long id, @Valid @RequestBody StudentRequestDTO studentDTO) {
        StudentResponseDTO updatedStudent = studentService.updateStudent(id, studentDTO);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/documents")
    public ResponseEntity<DocumentResponseDTO> uploadDocument(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        DocumentResponseDTO document = studentService.uploadDocument(id, file);
        return new ResponseEntity<>(document, HttpStatus.CREATED);
    }

    // --- Nested Evaluation Endpoints ---

    @GetMapping("/{studentId}/evaluations/physical")
    public ResponseEntity<Page<PhysicalEvaluationResponseDTO>> getPhysicalEvaluationsByStudent(
            @PathVariable Long studentId, Pageable pageable) {
        return ResponseEntity.ok(evaluationService.findAllPhysicalEvaluationsByStudent(studentId, pageable));
    }

    @GetMapping("/{studentId}/evaluations/evolution")
    public ResponseEntity<Page<EvolutionRecordResponseDTO>> getEvolutionRecordsByStudent(
            @PathVariable Long studentId, Pageable pageable) {
        return ResponseEntity.ok(evaluationService.findAllEvolutionRecordsByStudent(studentId, pageable));
    }
}
