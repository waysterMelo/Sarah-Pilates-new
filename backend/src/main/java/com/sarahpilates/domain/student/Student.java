package com.sarahpilates.domain.student;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sarahpilates.domain.enums.StudentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;

    private String phone;
    private LocalDate birthDate;
    private String sex;
    private String address;
    private String emergencyContact;
    private String emergencyPhone;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StudentStatus status;

    private String plan;

    @Embedded
    private Anamnesis anamnesis;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Document> documents;
}
