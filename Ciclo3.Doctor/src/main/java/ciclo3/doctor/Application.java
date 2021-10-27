package ciclo3.doctor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

/**
 * @Configuration
 * @EnableAutoConfiguration
 * @ComponentScan({basePackages = "ciclo3.doctor"}
*/
@EnableConfigurationProperties
@EntityScan(basePackages = {"ciclo3.doctor"})  // scan JPA entities
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
