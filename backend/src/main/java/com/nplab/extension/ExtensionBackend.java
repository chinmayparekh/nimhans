package com.nplab.extension;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.Cacheable;

@SpringBootApplication
public class ExtensionBackend extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(ExtensionBackend.class, args);
	}

}
