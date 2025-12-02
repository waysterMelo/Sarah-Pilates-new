package com.sarahpilates.service;

import com.sarahpilates.domain.classtype.ClassType;
import com.sarahpilates.dto.classtype.ClassTypeRequestDTO;
import com.sarahpilates.dto.classtype.ClassTypeResponseDTO;
import com.sarahpilates.mapper.ClassTypeMapper;
import com.sarahpilates.repository.ClassTypeRepository;
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
public class ClassTypeService {

    private final ClassTypeRepository classTypeRepository;
    private final ClassTypeMapper classTypeMapper;

    @Transactional
    public ClassTypeResponseDTO createClassType(ClassTypeRequestDTO dto) {
        ClassType classType = classTypeMapper.toEntity(dto);
        ClassType savedClassType = classTypeRepository.save(classType);
        return classTypeMapper.toResponseDTO(savedClassType);
    }

    @Transactional(readOnly = true)
    public ClassTypeResponseDTO findClassTypeById(Long id) {
        return classTypeRepository.findById(id)
                .map(classTypeMapper::toResponseDTO)
                .orElseThrow(() -> new EntityNotFoundException("ClassType not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public Page<ClassTypeResponseDTO> findAllClassTypes(Pageable pageable) {
        return classTypeRepository.findAll(pageable)
                .map(classTypeMapper::toResponseDTO);
    }

    @Transactional
    public ClassTypeResponseDTO updateClassType(Long id, ClassTypeRequestDTO dto) {
        ClassType existingClassType = classTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ClassType not found with id: " + id));

        classTypeMapper.updateEntityFromDto(dto, existingClassType);

        ClassType updatedClassType = classTypeRepository.save(existingClassType);
        return classTypeMapper.toResponseDTO(updatedClassType);
    }

    @Transactional
    public void deleteClassType(Long id) {
        if (!classTypeRepository.existsById(id)) {
            throw new EntityNotFoundException("ClassType not found with id: " + id);
        }
        classTypeRepository.deleteById(id);
    }
}
