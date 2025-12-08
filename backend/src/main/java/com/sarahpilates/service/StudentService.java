package com.sarahpilates.service;

import com.sarahpilates.domain.student.Student;
import com.sarahpilates.dto.document.DocumentResponseDTO;
import com.sarahpilates.dto.student.StudentRequestDTO;
import com.sarahpilates.dto.student.StudentResponseDTO;
import com.sarahpilates.mapper.StudentMapper;
import com.sarahpilates.repository.DocumentRepository;
import com.sarahpilates.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.sarahpilates.domain.student.Document;
import com.sarahpilates.mapper.DocumentMapper;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final DocumentRepository documentRepository;
    private final StudentMapper studentMapper;
    private final DocumentMapper documentMapper;
    private final FileStorageService fileStorageService;

    @Transactional
    public StudentResponseDTO createStudent(StudentRequestDTO studentDTO) {
        // TODO: Add validation, e.g., check if email is unique
        Student student = studentMapper.toEntity(studentDTO);
        Student savedStudent = studentRepository.save(student);
        return studentMapper.toResponseDTO(savedStudent);
    }

    @Transactional(readOnly = true)
    public StudentResponseDTO findStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with id: " + id));
        return studentMapper.toResponseDTO(student);
    }

    @Transactional(readOnly = true)
    public Page<StudentResponseDTO> findAllStudents(Pageable pageable) {
        return studentRepository.findAll(pageable)
                .map(studentMapper::toResponseDTO);
    }

    @Transactional
    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO studentDTO) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with id: " + id));
        
        studentMapper.updateEntityFromDto(studentDTO, existingStudent);
        
        Student updatedStudent = studentRepository.save(existingStudent);
        return studentMapper.toResponseDTO(updatedStudent);
    }

    @Transactional
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new EntityNotFoundException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    @Transactional
    public DocumentResponseDTO uploadDocument(Long studentId, MultipartFile file) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with id: " + studentId));

        String fullPath = fileStorageService.storeFile(file);
        String fileName = java.nio.file.Paths.get(fullPath).getFileName().toString();
        
        Document doc = new Document();
        doc.setStudent(student);
        doc.setFileName(fileName);
        doc.setFilePath(fullPath); // Stores the real absolute path
        doc.setFileType(file.getContentType());
        doc.setSize(file.getSize());
        doc.setUploadDate(LocalDateTime.now());

        Document savedDoc = documentRepository.save(doc);
        return documentMapper.toResponseDTO(savedDoc);
    }

    @Transactional(readOnly = true)
    public org.springframework.core.io.Resource downloadDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new EntityNotFoundException("Document not found with id: " + documentId));
        
        return fileStorageService.loadFileAsResource(document.getFilePath());
    }
}
