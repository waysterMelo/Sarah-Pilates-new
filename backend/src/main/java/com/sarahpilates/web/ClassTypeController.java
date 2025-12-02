package com.sarahpilates.web;

import com.sarahpilates.dto.classtype.ClassTypeRequestDTO;
import com.sarahpilates.dto.classtype.ClassTypeResponseDTO;
import com.sarahpilates.service.ClassTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/classtypes")
@RequiredArgsConstructor
public class ClassTypeController {

    private final ClassTypeService classTypeService;

    @PostMapping
    public ResponseEntity<ClassTypeResponseDTO> createClassType(@Valid @RequestBody ClassTypeRequestDTO dto) {
        ClassTypeResponseDTO created = classTypeService.createClassType(dto);
        return ResponseEntity.created(URI.create("/api/classtypes/" + created.id())).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassTypeResponseDTO> getClassTypeById(@PathVariable Long id) {
        return ResponseEntity.ok(classTypeService.findClassTypeById(id));
    }

    @GetMapping
    public ResponseEntity<Page<ClassTypeResponseDTO>> getAllClassTypes(Pageable pageable) {
        return ResponseEntity.ok(classTypeService.findAllClassTypes(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClassTypeResponseDTO> updateClassType(@PathVariable Long id, @Valid @RequestBody ClassTypeRequestDTO dto) {
        return ResponseEntity.ok(classTypeService.updateClassType(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClassType(@PathVariable Long id) {
        classTypeService.deleteClassType(id);
        return ResponseEntity.noContent().build();
    }
}
