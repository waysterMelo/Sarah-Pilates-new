package com.sarahpilates.mapper;

import com.sarahpilates.domain.student.Document;
import com.sarahpilates.dto.document.DocumentResponseDTO;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T23:16:44-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class DocumentMapperImpl implements DocumentMapper {

    @Override
    public DocumentResponseDTO toResponseDTO(Document document) {
        if ( document == null ) {
            return null;
        }

        Long id = null;
        String fileName = null;
        String fileType = null;
        long size = 0L;
        LocalDateTime uploadDate = null;

        id = document.getId();
        fileName = document.getFileName();
        fileType = document.getFileType();
        size = document.getSize();
        uploadDate = document.getUploadDate();

        DocumentResponseDTO documentResponseDTO = new DocumentResponseDTO( id, fileName, fileType, size, uploadDate );

        return documentResponseDTO;
    }
}
