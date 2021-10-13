package com.notifications.clearedin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@SpringBootApplication
@EnableSwagger2
public class ClearedInNotificationApp {

	public static void main(String[] args) {
		SpringApplication.run(ClearedInNotificationApp.class, args);
	}

	@Bean
	public Docket swaggerConf() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))
				.paths(PathSelectors.ant("/api/**"))
				.build()
				.apiInfo(apiDetails());
	}

	//String title, String description, String version, String termsOfServiceUrl, Contact contact, String license, String licenseUrl, Collection<VendorExtension> vendorExtensions
	private ApiInfo apiDetails() {
		return new ApiInfo("Blog API's",
				"This is all about Sharing the API's",
				"2.0",
				"Free",
				new Contact("Pavan Marri", "https://www.zemosolabs.com", "pavan.marri@zemosolabs.com"),
				"API License",
				"https://www.zemosolabs.com",
				Collections.<VendorExtension>emptyList());
	}

}
