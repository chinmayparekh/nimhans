package com.nplab.extension.dashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nplab.extension.auth.JwtUtil;
import com.nplab.extension.dashboard.service.SampleStatsService;
import com.nplab.extension.db.RequestCount;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class AnnualReportController {
    private SampleStatsService sampleStatsService;
    private JwtUtil jwtUtil;

    @Autowired
    public AnnualReportController(SampleStatsService sampleStatsService, JwtUtil jwtUtil) {
        this.sampleStatsService = sampleStatsService;
        this.jwtUtil = jwtUtil;
    }
    @GetMapping(path = "/cases/{sptype}/{startTime}/{endTime}")
    public List<Long> getSampleTypeStats(@PathVariable String sptype,
                                         @PathVariable String startTime,
                                         @PathVariable String endTime,
                                         @RequestHeader(name = "Authorization") String token) {
        token = token.substring(7);
        if (jwtUtil.isTokenExpired(token)) {
            throw new AccessDeniedException("Unauthorized");
        }
        return sampleStatsService.findSampleTypeBreakoutb(sptype,startTime, endTime);
    }
}