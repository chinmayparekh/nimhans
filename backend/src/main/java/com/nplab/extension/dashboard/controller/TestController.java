package com.nplab.extension.dashboard.controller;

import java.util.List;

import com.nplab.extension.dashboard.service.TestService;
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
@RequestMapping("/api/test")
public class TestController {
    private TestService testService;
    private JwtUtil jwtUtil;

    @Autowired
    public TestController(TestService testService, JwtUtil jwtUtil) {
        this.testService = testService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping(path = "/cases/{sampleType}")
    public List<Long> getSampleTypeStats(@PathVariable("sampleType")String sampleType, @RequestHeader(name = "Authorization") String token) {
        token = token.substring(7);
        if (jwtUtil.isTokenExpired(token)) {
            throw new AccessDeniedException("Unauthorized");
        }
        return testService.findBreakoutType(sampleType);
    }

    @GetMapping(path = "/cases/assetDivision")
    public List<Long> getSampleTypeStats( @RequestHeader(name = "Authorization") String token) {
        token = token.substring(7);
        if (jwtUtil.isTokenExpired(token)) {
            throw new AccessDeniedException("Unauthorized");
        }
        return testService.findAssetDivisionCount();
    }

}