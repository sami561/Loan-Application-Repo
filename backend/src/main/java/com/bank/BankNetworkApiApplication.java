package com.bank;

import com.bank.role.Role;
import com.bank.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
@SpringBootApplication

public class BankNetworkApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankNetworkApiApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository) {
		return args -> {
			if (roleRepository.findByName("USER").isEmpty()) {
				roleRepository.save(Role.builder().name("USER").build());
			}
			if (roleRepository.findByName("Admin").isEmpty()) {
				roleRepository.save(Role.builder().name("Admin").build());
			}
			if (roleRepository.findByName("Manager").isEmpty()) {
				roleRepository.save(Role.builder().name("Manager").build());
			}
		};
	}
}
