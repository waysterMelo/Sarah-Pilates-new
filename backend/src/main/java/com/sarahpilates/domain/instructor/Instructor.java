package com.sarahpilates.domain.instructor;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sarahpilates.domain.enums.InstructorStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "instructors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;
    private String sex;
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

}
