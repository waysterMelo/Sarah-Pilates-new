package com.sarahpilates.domain.instructor;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sarahpilates.domain.enums.InstructorStatus;
import com.sarahpilates.domain.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "instructors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Instructor implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    private String phone;
    private LocalDate birthDate;
    private String address;

    private String emergencyContact;
    private String emergencyPhone;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "instructor_specialties", joinColumns = @JoinColumn(name = "instructor_id"))
    @Column(name = "specialty")
    private List<String> specialties;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "instructor_certifications", joinColumns = @JoinColumn(name = "instructor_id"))
    @Column(name = "certification")
    private List<String> certifications;
    
    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(columnDefinition = "TEXT")
    private String experience;

    @Enumerated(EnumType.STRING)
    private InstructorStatus status;
    
    private LocalDate hireDate;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal hourlyRate;

    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<WorkingHours> workingHours;

    // UserDetails methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status == InstructorStatus.ATIVO;
    }
}
