package com.example.attendance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.attendance.model.User;
import com.example.attendance.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void registerUser(String username, String email, String password){
        @SuppressWarnings("unused")
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(username, email);
        user.setPassword(hashedPassword);
        userRepository.save(user);
    }

    @SuppressWarnings("null")
    public boolean loginUser(String email, String password){
        User user = userRepository.findByEmail(email);
        return user != null & passwordEncoder.matches(password, user.getPassword());
    }
}
