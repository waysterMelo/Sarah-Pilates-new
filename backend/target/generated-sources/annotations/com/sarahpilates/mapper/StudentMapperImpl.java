package com.sarahpilates.mapper;

import com.sarahpilates.domain.enums.StudentStatus;
import com.sarahpilates.domain.student.Anamnesis;
import com.sarahpilates.domain.student.Document;
import com.sarahpilates.domain.student.Student;
import com.sarahpilates.dto.document.DocumentResponseDTO;
import com.sarahpilates.dto.student.AnamnesisDTO;
import com.sarahpilates.dto.student.StudentRequestDTO;
import com.sarahpilates.dto.student.StudentResponseDTO;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-08T14:05:02-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class StudentMapperImpl implements StudentMapper {

    @Autowired
    private DocumentMapper documentMapper;

    @Override
    public Student toEntity(StudentRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Student student = new Student();

        student.setName( dto.name() );
        student.setEmail( dto.email() );
        student.setPhone( dto.phone() );
        student.setBirthDate( dto.birthDate() );
        student.setSex( dto.sex() );
        student.setAddress( dto.address() );
        student.setEmergencyContact( dto.emergencyContact() );
        student.setEmergencyPhone( dto.emergencyPhone() );
        student.setStatus( dto.status() );
        student.setPlan( dto.plan() );
        student.setAnamnesis( anamnesisDTOToAnamnesis( dto.anamnesis() ) );

        return student;
    }

    @Override
    public StudentResponseDTO toResponseDTO(Student entity) {
        if ( entity == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        String email = null;
        String phone = null;
        LocalDate birthDate = null;
        String sex = null;
        String address = null;
        String emergencyContact = null;
        String emergencyPhone = null;
        StudentStatus status = null;
        String plan = null;
        AnamnesisDTO anamnesis = null;
        List<DocumentResponseDTO> documents = null;

        id = entity.getId();
        name = entity.getName();
        email = entity.getEmail();
        phone = entity.getPhone();
        birthDate = entity.getBirthDate();
        sex = entity.getSex();
        address = entity.getAddress();
        emergencyContact = entity.getEmergencyContact();
        emergencyPhone = entity.getEmergencyPhone();
        status = entity.getStatus();
        plan = entity.getPlan();
        anamnesis = anamnesisToAnamnesisDTO( entity.getAnamnesis() );
        documents = documentListToDocumentResponseDTOList( entity.getDocuments() );

        StudentResponseDTO studentResponseDTO = new StudentResponseDTO( id, name, email, phone, birthDate, sex, address, emergencyContact, emergencyPhone, status, plan, anamnesis, documents );

        return studentResponseDTO;
    }

    @Override
    public void updateEntityFromDto(StudentRequestDTO dto, Student entity) {
        if ( dto == null ) {
            return;
        }

        entity.setName( dto.name() );
        entity.setEmail( dto.email() );
        entity.setPhone( dto.phone() );
        entity.setBirthDate( dto.birthDate() );
        entity.setSex( dto.sex() );
        entity.setAddress( dto.address() );
        entity.setEmergencyContact( dto.emergencyContact() );
        entity.setEmergencyPhone( dto.emergencyPhone() );
        entity.setStatus( dto.status() );
        entity.setPlan( dto.plan() );
        if ( dto.anamnesis() != null ) {
            if ( entity.getAnamnesis() == null ) {
                entity.setAnamnesis( new Anamnesis() );
            }
            anamnesisDTOToAnamnesis1( dto.anamnesis(), entity.getAnamnesis() );
        }
        else {
            entity.setAnamnesis( null );
        }
    }

    protected Anamnesis anamnesisDTOToAnamnesis(AnamnesisDTO anamnesisDTO) {
        if ( anamnesisDTO == null ) {
            return null;
        }

        Anamnesis anamnesis = new Anamnesis();

        anamnesis.setAllergies( anamnesisDTO.allergies() );
        anamnesis.setSurgeries( anamnesisDTO.surgeries() );
        anamnesis.setMedications( anamnesisDTO.medications() );
        anamnesis.setRestrictions( anamnesisDTO.restrictions() );
        if ( anamnesisDTO.heartCondition() != null ) {
            anamnesis.setHeartCondition( anamnesisDTO.heartCondition() );
        }
        if ( anamnesisDTO.dizziness() != null ) {
            anamnesis.setDizziness( anamnesisDTO.dizziness() );
        }
        if ( anamnesisDTO.boneJointProblem() != null ) {
            anamnesis.setBoneJointProblem( anamnesisDTO.boneJointProblem() );
        }
        if ( anamnesisDTO.diabetes() != null ) {
            anamnesis.setDiabetes( anamnesisDTO.diabetes() );
        }
        if ( anamnesisDTO.hypertension() != null ) {
            anamnesis.setHypertension( anamnesisDTO.hypertension() );
        }
        anamnesis.setObjectives( anamnesisDTO.objectives() );

        return anamnesis;
    }

    protected AnamnesisDTO anamnesisToAnamnesisDTO(Anamnesis anamnesis) {
        if ( anamnesis == null ) {
            return null;
        }

        String allergies = null;
        String surgeries = null;
        String medications = null;
        String restrictions = null;
        Boolean heartCondition = null;
        Boolean dizziness = null;
        Boolean boneJointProblem = null;
        Boolean diabetes = null;
        Boolean hypertension = null;
        String objectives = null;

        allergies = anamnesis.getAllergies();
        surgeries = anamnesis.getSurgeries();
        medications = anamnesis.getMedications();
        restrictions = anamnesis.getRestrictions();
        heartCondition = anamnesis.isHeartCondition();
        dizziness = anamnesis.isDizziness();
        boneJointProblem = anamnesis.isBoneJointProblem();
        diabetes = anamnesis.isDiabetes();
        hypertension = anamnesis.isHypertension();
        objectives = anamnesis.getObjectives();

        AnamnesisDTO anamnesisDTO = new AnamnesisDTO( allergies, surgeries, medications, restrictions, heartCondition, dizziness, boneJointProblem, diabetes, hypertension, objectives );

        return anamnesisDTO;
    }

    protected List<DocumentResponseDTO> documentListToDocumentResponseDTOList(List<Document> list) {
        if ( list == null ) {
            return null;
        }

        List<DocumentResponseDTO> list1 = new ArrayList<DocumentResponseDTO>( list.size() );
        for ( Document document : list ) {
            list1.add( documentMapper.toResponseDTO( document ) );
        }

        return list1;
    }

    protected void anamnesisDTOToAnamnesis1(AnamnesisDTO anamnesisDTO, Anamnesis mappingTarget) {
        if ( anamnesisDTO == null ) {
            return;
        }

        mappingTarget.setAllergies( anamnesisDTO.allergies() );
        mappingTarget.setSurgeries( anamnesisDTO.surgeries() );
        mappingTarget.setMedications( anamnesisDTO.medications() );
        mappingTarget.setRestrictions( anamnesisDTO.restrictions() );
        if ( anamnesisDTO.heartCondition() != null ) {
            mappingTarget.setHeartCondition( anamnesisDTO.heartCondition() );
        }
        if ( anamnesisDTO.dizziness() != null ) {
            mappingTarget.setDizziness( anamnesisDTO.dizziness() );
        }
        if ( anamnesisDTO.boneJointProblem() != null ) {
            mappingTarget.setBoneJointProblem( anamnesisDTO.boneJointProblem() );
        }
        if ( anamnesisDTO.diabetes() != null ) {
            mappingTarget.setDiabetes( anamnesisDTO.diabetes() );
        }
        if ( anamnesisDTO.hypertension() != null ) {
            mappingTarget.setHypertension( anamnesisDTO.hypertension() );
        }
        mappingTarget.setObjectives( anamnesisDTO.objectives() );
    }
}
