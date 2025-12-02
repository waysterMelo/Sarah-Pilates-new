package com.sarahpilates.domain.classtype;

import com.sarahpilates.domain.enums.ClassIntensity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "class_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ClassType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer duration; // in minutes

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClassIntensity intensity;

    private String color;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "class_type_equipment", joinColumns = @JoinColumn(name = "class_type_id"))
    @Column(name = "equipment")
    private List<String> equipment;
}
