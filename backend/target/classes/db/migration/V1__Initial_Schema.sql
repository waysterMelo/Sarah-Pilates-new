-- V1__Initial_Schema.sql

-- Instructor and User Management
CREATE TABLE instructors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone VARCHAR(50),
    birth_date DATE,
    address VARCHAR(255),
    bio TEXT,
    status VARCHAR(50),
    hire_date DATE,
    hourly_rate DECIMAL(10, 2)
);

CREATE TABLE instructor_specialties (
    instructor_id BIGINT NOT NULL,
    specialty VARCHAR(255),
    FOREIGN KEY (instructor_id) REFERENCES instructors(id)
);

-- Student Management
CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    birth_date DATE,
    address VARCHAR(255),
    emergency_contact VARCHAR(255),
    emergency_phone VARCHAR(50),
    status VARCHAR(50) NOT NULL,
    plan VARCHAR(100),
    -- Embedded Anamnesis
    allergies TEXT,
    surgeries TEXT,
    medications TEXT,
    restrictions TEXT,
    heart_condition BOOLEAN,
    dizziness BOOLEAN,
    bone_joint_problem BOOLEAN,
    diabetes BOOLEAN,
    hypertension BOOLEAN,
    objectives TEXT
);

-- Class and Schedule Management
CREATE TABLE class_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    duration INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    capacity INT NOT NULL,
    intensity VARCHAR(50) NOT NULL,
    color VARCHAR(50)
);

CREATE TABLE class_type_equipment (
    class_type_id BIGINT NOT NULL,
    equipment VARCHAR(255),
    FOREIGN KEY (class_type_id) REFERENCES class_types(id)
);

CREATE TABLE schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    instructor_id BIGINT NOT NULL,
    class_type_id BIGINT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2),
    room VARCHAR(100),
    notes TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(id),
    FOREIGN KEY (class_type_id) REFERENCES class_types(id)
);

-- Evaluation and Records
CREATE TABLE evolution_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    instructor_id BIGINT NOT NULL,
    date DATE NOT NULL,
    session_number INT,
    focus VARCHAR(255),
    progress_notes TEXT,
    difficulties_observed TEXT,
    improvements TEXT,
    next_session_goals TEXT,
    overall_rating INT,
    pain_level INT,
    mobility_level INT,
    strength_level INT,
    balance_level INT,
    endurance_level INT,
    observations TEXT,
    duration INT,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(id)
);

CREATE TABLE evolution_record_exercises (
    record_id BIGINT NOT NULL,
    exercise VARCHAR(255),
    FOREIGN KEY (record_id) REFERENCES evolution_records(id)
);

CREATE TABLE evolution_record_equipment (
    record_id BIGINT NOT NULL,
    equipment VARCHAR(255),
    FOREIGN KEY (record_id) REFERENCES evolution_records(id)
);

CREATE TABLE physical_evaluations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    instructor_id BIGINT NOT NULL,
    date DATE NOT NULL,
    type VARCHAR(50) NOT NULL,
    main_complaint TEXT,
    clinical_diagnosis TEXT,
    medications TEXT,
    weight DOUBLE,
    height DOUBLE,
    bmi DOUBLE,
    blood_pressure VARCHAR(50),
    heart_rate INT,
    body_fat DOUBLE,
    muscle_mass DOUBLE,
    -- Embedded BodyMeasurements
    chest DOUBLE,
    waist DOUBLE,
    hip DOUBLE,
    thigh DOUBLE,
    arm DOUBLE,
    -- Embedded FmsScores
    deep_squat INT,
    hurdle_step INT,
    in_line_lunge INT,
    shoulder_mobility INT,
    active_straight_leg_raise INT,
    trunk_stability_push_up INT,
    rotary_stability INT,
    -- Embedded FlexibilityScores
    shoulder_flexion INT,
    spinal_flexion INT,
    hip_flexion INT,
    ankle_flexion INT,
    -- Embedded StrengthScores
    core INT,
    upper_body INT,
    lower_body INT,
    grip DOUBLE,
    -- Embedded BalanceScores
    static_balance INT,
    dynamic_balance INT,
    proprioception INT,
    -- Postural Analysis
    anatomical_markers TEXT, -- Stored as JSON
    -- Conclusion
    medical_observations TEXT,
    objectives TEXT,
    treatment_plan TEXT,
    next_evaluation_date DATE,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(id)
);
