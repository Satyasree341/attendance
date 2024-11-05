package com.example.attendance.repository;

import com.example.attendance.model.AttendanceData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<AttendanceData, Long> {
}
