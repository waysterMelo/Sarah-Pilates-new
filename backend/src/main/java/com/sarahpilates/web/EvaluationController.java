package com.sarahpilates.web;

import com.sarahpilates.dto.evaluation.EvolutionRecordRequestDTO;
import com.sarahpilates.dto.evaluation.EvolutionRecordResponseDTO;
import com.sarahpilates.dto.evaluation.PhysicalEvaluationRequestDTO;
import com.sarahpilates.dto.evaluation.PhysicalEvaluationResponseDTO;
import com.sarahpilates.service.EvaluationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/evaluations")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;

    // --- Physical Evaluation Endpoints ---

    @PostMapping("/physical")
    public ResponseEntity<PhysicalEvaluationResponseDTO> createPhysicalEvaluation(@Valid @RequestBody PhysicalEvaluationRequestDTO dto) {
        PhysicalEvaluationResponseDTO created = evaluationService.createPhysicalEvaluation(dto);
        return ResponseEntity.created(URI.create("/api/evaluations/physical/" + created.id())).body(created);
    }

    @GetMapping("/physical/{id}")
    public ResponseEntity<PhysicalEvaluationResponseDTO> getPhysicalEvaluationById(@PathVariable Long id) {
        return ResponseEntity.ok(evaluationService.findPhysicalEvaluationById(id));
    }
    
    @GetMapping("/physical")
    public ResponseEntity<Page<PhysicalEvaluationResponseDTO>> getAllPhysicalEvaluations(Pageable pageable) {
        return ResponseEntity.ok(evaluationService.findAllPhysicalEvaluations(pageable));
    }

    @PutMapping("/physical/{id}")
    public ResponseEntity<PhysicalEvaluationResponseDTO> updatePhysicalEvaluation(@PathVariable Long id, @Valid @RequestBody PhysicalEvaluationRequestDTO dto) {
        return ResponseEntity.ok(evaluationService.updatePhysicalEvaluation(id, dto));
    }

    @DeleteMapping("/physical/{id}")
    public ResponseEntity<Void> deletePhysicalEvaluation(@PathVariable Long id) {
        evaluationService.deletePhysicalEvaluation(id);
        return ResponseEntity.noContent().build();
    }

    // --- Evolution Record Endpoints ---

    @PostMapping("/evolution")
    public ResponseEntity<EvolutionRecordResponseDTO> createEvolutionRecord(@Valid @RequestBody EvolutionRecordRequestDTO dto) {
        EvolutionRecordResponseDTO created = evaluationService.createEvolutionRecord(dto);
        return ResponseEntity.created(URI.create("/api/evaluations/evolution/" + created.id())).body(created);
    }

    @GetMapping("/evolution/{id}")
    public ResponseEntity<EvolutionRecordResponseDTO> getEvolutionRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(evaluationService.findEvolutionRecordById(id));
    }

    @GetMapping("/evolution")
    public ResponseEntity<Page<EvolutionRecordResponseDTO>> getAllEvolutionRecords(Pageable pageable) {
        return ResponseEntity.ok(evaluationService.findAllEvolutionRecords(pageable));
    }

    @PutMapping("/evolution/{id}")
    public ResponseEntity<EvolutionRecordResponseDTO> updateEvolutionRecord(@PathVariable Long id, @Valid @RequestBody EvolutionRecordRequestDTO dto) {
        return ResponseEntity.ok(evaluationService.updateEvolutionRecord(id, dto));
    }

    @DeleteMapping("/evolution/{id}")
    public ResponseEntity<Void> deleteEvolutionRecord(@PathVariable Long id) {
        evaluationService.deleteEvolutionRecord(id);
        return ResponseEntity.noContent().build();
    }
}
