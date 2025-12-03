package com.sarahpilates.service;

import com.sarahpilates.domain.User;
import com.sarahpilates.domain.enums.UserRole;
import com.sarahpilates.dto.auth.RegisterRequestDTO;
import com.sarahpilates.dto.auth.UserResponseDTO;
import com.sarahpilates.exception.ResourceAlreadyExistsException;
import com.sarahpilates.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserResponseDTO register(RegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResourceAlreadyExistsException("Email já está em uso.");
        }

        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(UserRole.ROLE_USER); // Default role
        // Status ATIVO is set by default in the User entity @PrePersist or can be explicitly set here

        User savedUser = userRepository.save(newUser);
        return new UserResponseDTO(savedUser);
    }
}
