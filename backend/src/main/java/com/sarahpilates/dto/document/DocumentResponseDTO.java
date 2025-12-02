package com.sarahpilates.dto.document;

import java.time.LocalDateTime;

public record DocumentResponseDTO(
    Long id,
    String fileName,
    String fileType,
    long size,
    LocalDateTime uploadDate
    // We don't expose the full path for security reasons.
    // A download link would be exposed via a dedicated endpoint.
) {}
