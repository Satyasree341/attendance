package com.example.attendance.controller;

import com.example.attendance.model.AttendanceData;
import com.example.attendance.model.User;
import com.example.attendance.repository.UserRepository;
import com.example.attendance.service.AttendanceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
/* 
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private UserRepository userRepository;

    private static final double INSTITUTE_LATITUDE = 12.9165171;
    private static final double INSTITUTE_LONGITUDE = 77.6014199;



    @PostMapping("/add")
    public ResponseEntity<String> markAttendance(@RequestBody AttendanceData attendanceData) {
        // Fetch the user from the database using userId from attendanceData
        System.out.println("Marking attendance: " + attendanceData);
        User user = userRepository.findById(attendanceData.getUser().getId()).orElse(null);
        
        if (user != null) {
             // Ensure required fields are present
             if (attendanceData.getLoginOption() == null || attendanceData.getLatitude() == null
             || attendanceData.getLongitude() == null) {
         return ResponseEntity.status(400).body("Missing required fields: loginOption, latitude, or longitude");
     }

            // Check if the user is within the allowed radius
            if (!isWithinRadius(attendanceData.getLatitude(), attendanceData.getLongitude())) {
                return ResponseEntity.status(403).body("You can't mark your attendance!!! You must be within 50 meters of the institute.");
            }

            // Set the user and current date details
            attendanceData.setUser(user);
            attendanceData.setLoginTime(new Date());
            attendanceData.setDate(new Date());

           
            // Save attendance data
            attendanceService.saveAttendance(attendanceData);
            return ResponseEntity.ok("Attendance marked successfully.");
        }
        
        return ResponseEntity.status(404).body("User not found.");
    }


    // Method to check if the student is within the 50m radius
    private boolean isWithinRadius(double studentLatitude, double studentLongitude) {
        double distance = haversine(INSTITUTE_LATITUDE, INSTITUTE_LONGITUDE, studentLatitude, studentLongitude);
        return distance <= 50.0; // 50 meters
    }

    // Haversine formula to calculate distance between two points
    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters
        return distance;
    }

    
}
   */

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private UserRepository userRepository;

    private static final double INSTITUTE_LATITUDE = 0;
    private static final double INSTITUTE_LONGITUDE = 0;

    @PostMapping("/add")
    public ResponseEntity<String> markAttendance(@RequestBody AttendanceData attendanceData) {
        // Fetch the user from the database using userId from attendanceData
        System.out.println("Marking attendance: " + attendanceData);
        User user = userRepository.findById(attendanceData.getUser().getId()).orElse(null);

        if (user != null) {
            // Ensure required fields are present
            if (attendanceData.getLoginOption() == null || attendanceData.getLoginOption().isEmpty()) {
                return ResponseEntity.status(400).body("Missing required field: loginOption");
            }

            // Set default user latitude and longitude to match the institute's location
            attendanceData.setUserLatitude(INSTITUTE_LATITUDE);
            attendanceData.setUserLongitude(INSTITUTE_LONGITUDE);

            // Set the user and current date details
            attendanceData.setUser(user);
            attendanceData.setLoginTime(new Date());
            attendanceData.setDate(new Date());

            // Save attendance data
            attendanceService.saveAttendance(attendanceData);
            return ResponseEntity.ok("Attendance marked successfully.");
        }

        return ResponseEntity.status(404).body("User not found.");
    }
}

/*
 * @RestController
 * 
 * @RequestMapping("/api/attendance")
 * // @RequestMapping("/attendance")
 * public class AttendanceController {
 * 
 * @Autowired
 * private AttendanceRepository attendanceRepository;
 * 
 * @Autowired
 * private UserRepository userRepository;
 * 
 * @PostMapping("/add")
 * public ResponseEntity<String> markAttendance(@RequestBody AttendanceData
 * attendanceData) {
 * // Validate user information
 * if (attendanceData.getUser() == null || attendanceData.getUser().getId() ==
 * null) {
 * return ResponseEntity.badRequest().
 * body("User information is required for attendance marking.");
 * }
 * 
 * // Fetch the user from the database
 * User user =
 * userRepository.findById(attendanceData.getUser().getId()).orElse(null);
 * if (user == null) {
 * return ResponseEntity.badRequest().body("User not found.");
 * }
 * 
 * // Validate and log email
 * String email = user.getEmail();
 * if (email == null || email.isEmpty()) {
 * return ResponseEntity.badRequest().body("User email is required.");
 * }
 * 
 * // Set user, login time, and date
 * attendanceData.setUser(user);
 * attendanceData.setLoginTime(new Date());
 * attendanceData.setDate(new Date());
 * 
 * // Validate and set login option
 * String loginOption = attendanceData.getLoginOption();
 * if (loginOption == null || !(loginOption.equals("tea") ||
 * loginOption.equals("lunch")
 * || loginOption.equals("breakfast") || loginOption.equals("exit"))) {
 * return ResponseEntity.badRequest().body("Invalid login option.");
 * }
 * 
 * // Default coordinates if not provided (assume they come from the frontend)
 * if (attendanceData.getInstituteLatitude() == null ||
 * attendanceData.getInstituteLongitude() == null) {
 * attendanceData.setInstituteLatitude(12.9716); // Example latitude for
 * Bangalore
 * attendanceData.setInstituteLongitude(77.5946); // Example longitude for
 * Bangalore
 * }
 * 
 * if (attendanceData.getUserLatitude() == null ||
 * attendanceData.getUserLongitude() == null) {
 * return
 * ResponseEntity.badRequest().body("User latitude and longitude are required."
 * );
 * }
 * 
 * // Validate institute name
 * if (attendanceData.getInstituteName() == null ||
 * attendanceData.getInstituteName().isEmpty()) {
 * return ResponseEntity.badRequest().body("Institute name is required.");
 * }
 * 
 * // Save attendance data
 * attendanceRepository.save(attendanceData);
 * return ResponseEntity.ok("Attendance marked successfully.");
 * }
 * }
 */
