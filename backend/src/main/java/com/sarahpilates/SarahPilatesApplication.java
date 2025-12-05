package com.sarahpilates;

import com.sarahpilates.config.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(FileStorageProperties.class)
public class SarahPilatesApplication {

    public static void main(String[] args) {
        SpringApplication.run(SarahPilatesApplication.class, args);
    }

}
