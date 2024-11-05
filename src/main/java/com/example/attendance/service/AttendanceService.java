package com.example.attendance.service;

import com.example.attendance.model.AttendanceData;
import com.example.attendance.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendanceService {
    @Autowired
    private AttendanceRepository attendanceRepository;

    public void saveAttendance(AttendanceData attendanceData) {
        attendanceRepository.save(attendanceData);
    }
}
