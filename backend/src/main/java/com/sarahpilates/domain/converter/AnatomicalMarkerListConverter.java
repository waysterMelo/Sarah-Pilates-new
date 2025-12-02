package com.sarahpilates.domain.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sarahpilates.domain.evaluation.AnatomicalMarker;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;

@Converter
@RequiredArgsConstructor
public class AnatomicalMarkerListConverter implements AttributeConverter<List<AnatomicalMarker>, String> {

    private static final Logger logger = LoggerFactory.getLogger(AnatomicalMarkerListConverter.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<AnatomicalMarker> attribute) {
        if (attribute == null || attribute.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            logger.error("Error converting marker list to JSON", e);
            throw new IllegalArgumentException("Error converting marker list to JSON", e);
        }
    }

    @Override
    public List<AnatomicalMarker> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isBlank()) {
            return Collections.emptyList();
        }
        try {
            return objectMapper.readValue(dbData, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            logger.error("Error converting JSON to marker list", e);
            throw new IllegalArgumentException("Error converting JSON to marker list", e);
        }
    }
}
