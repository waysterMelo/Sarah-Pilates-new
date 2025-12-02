package com.sarahpilates.web;

import com.sarahpilates.dto.instructor.InstructorRequestDTO;
import com.sarahpilates.dto.instructor.InstructorResponseDTO;
import com.sarahpilates.service.InstructorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/instructors")
@RequiredArgsConstructor
public class InstructorController {

    private final InstructorService instructorService;

    @PostMapping
    public ResponseEntity<InstructorResponseDTO> createInstructor(@Valid @RequestBody InstructorRequestDTO instructorDTO) {
        InstructorResponseDTO createdInstructor = instructorService.createInstructor(instructorDTO);
        return ResponseEntity.created(URI.create("/api/instructors/" + createdInstructor.id())).body(createdInstructor);
    }
    
    @GetMapping
    public ResponseEntity<Page<InstructorResponseDTO>> getAllInstructors(Pageable pageable) {
        return ResponseEntity.ok(instructorService.findAllInstructors(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorResponseDTO> getInstructorById(@PathVariable Long id) {
        return ResponseEntity.ok(instructorService.findInstructorById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InstructorResponseDTO> updateInstructor(@PathVariable Long id, @Valid @RequestBody InstructorRequestDTO instructorDTO) {
        return ResponseEntity.ok(instructorService.updateInstructor(id, instructorDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstructor(@PathVariable Long id) {
        instructorService.deleteInstructor(id);
        return ResponseEntity.noContent().build();
    }
}
