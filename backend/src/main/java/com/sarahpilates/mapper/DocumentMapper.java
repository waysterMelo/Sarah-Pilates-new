package com.sarahpilates.mapper;

import com.sarahpilates.domain.student.Document;
import com.sarahpilates.dto.document.DocumentResponseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DocumentMapper {
    DocumentResponseDTO toResponseDTO(Document document);
}
