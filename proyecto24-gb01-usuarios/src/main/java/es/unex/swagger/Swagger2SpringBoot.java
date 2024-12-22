package es.unex.swagger;


import es.unex.asee.gb01.contents.entities.UserEntity;
import es.unex.asee.gb01.contents.entities.UserProfileEntity;
import es.unex.asee.gb01.contents.repositories.UserProfileRepository;
import es.unex.asee.gb01.contents.repositories.UserRepository;
import es.unex.swagger.configuration.LocalDateConverter;

import es.unex.swagger.configuration.LocalDateTimeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

import javax.annotation.PostConstruct;

import org.openapitools.jackson.nullable.JsonNullableModule;
import org.springframework.context.annotation.Bean;
import com.fasterxml.jackson.databind.Module;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@EnableJpaRepositories("es.unex.asee.gb01.contents.repositories")
@EntityScan(basePackages = "es.unex.asee.gb01.contents.entities")
@EnableFeignClients(basePackages = "es.unex.asee.gb01.contents.clients")
@ComponentScan(basePackages = {"es.unex.swagger", "es.unex.swagger.api", "es.unex.swagger.configuration", "es.unex.asee.gb01.contents"})

public class Swagger2SpringBoot implements CommandLineRunner {
    private static final String DEFAULT_PASSWORD = "12345";
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserProfileRepository userProfileRepository;

    public static void main(String[] args) {
        new SpringApplication(Swagger2SpringBoot.class).run(args);
    }

    @Override
    public void run(String... arg0) throws Exception {
        if (arg0.length > 0 && arg0[0].equals("exitcode")) {
            throw new ExitException();
        }
    }

    @Bean
    public Module jsonNullableModule() {
        return new JsonNullableModule();
    }

    @PostConstruct
    public void init() {
        List<UserEntity> listaUsers = new ArrayList<>();
        List<UserProfileEntity> listaUserProfiles = new ArrayList<>();
        listaUsers.add(new UserEntity("Sergio", "Martín", "semartinl", "semartinl@gmail.com", DEFAULT_PASSWORD));
        listaUserProfiles.add(new UserProfileEntity(1L, "Sergio", "1234"));
        listaUsers.add(new UserEntity("Perico", "Martín", "pericomartin", "perico@gmail.com", DEFAULT_PASSWORD));
        listaUsers.add(new UserEntity("Pablo", "Fernández", "pafergon", "pafergon@gmail.com", DEFAULT_PASSWORD));
        listaUsers.add(new UserEntity("Daniel", "Mocinha", "danielmocinha", "dmocinha@alumnos.unex.es", DEFAULT_PASSWORD));
        listaUsers.add(new UserEntity("Sara", "Guillén", "sara", "sguillenl@alumnos.unex.es", "sara"));

        userRepository.saveAll(listaUsers);
    }

    @Configuration
    static class CustomDateConfig extends WebMvcConfigurerAdapter {
        @Override
        public void addFormatters(FormatterRegistry registry) {
            registry.addConverter(new LocalDateConverter("yyyy-MM-dd"));
            registry.addConverter(new LocalDateTimeConverter("yyyy-MM-dd'T'HH:mm:ss.SSS"));
        }
    }

    class ExitException extends RuntimeException implements ExitCodeGenerator {
        private static final long serialVersionUID = 1L;

        @Override
        public int getExitCode() {
            return 10;
        }
    }
}
