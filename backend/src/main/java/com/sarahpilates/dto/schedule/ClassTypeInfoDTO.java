package com.sarahpilates.dto.schedule;

// A simple DTO to avoid cyclic dependencies and over-fetching
public record ClassTypeInfoDTO(
    Long id,
    String name,
    String color
) {}
