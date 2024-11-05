package com.example.attendance.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Define HTTP security configurations
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF protection for development; enable for production
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Configure CORS
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers(HttpMethod.POST,"/api/login", "/api/register","/api/attendance_data", "/api/location/track", "/api/location/get-location", "/api/attendance/add").permitAll() // Permit these endpoints
                                
                                .anyRequest().authenticated()
                )
                                .sessionManagement(session -> session
                                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Use HTTP Basic Authentication // All other requests require authentication
                )
                .exceptionHandling(handling -> handling
                        .authenticationEntryPoint((request, response, authException) -> {
                            // log authentication failure
                            System.out.println("Authentication failed: " + authException.getMessage());
                                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: " + authException.getMessage());
                                }
                        ));
      
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Allow frontend origin
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setAllowCredentials(true); // Allow credentials for authentication cookies if needed
        
        // Apply CORS configuration
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}