package com.nplab.extension.dashboard.controller;

import java.util.List;

import com.nplab.extension.db.InternalAndExternalCases;
import com.nplab.extension.dashboard.service.ReportAssets;
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

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class AssetDivisionController {
    private TestService testService;
    private JwtUtil jwtUtil;

    @Autowired
    public AssetDivisionController(TestService testService, JwtUtil jwtUtil) {
        this.testService = testService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping(path = "/assetDivision/{specimen}/{startTime}/{endTime}")
    public List<InternalAndExternalCases> getAssetDivision(@PathVariable("specimen") String specimen, @PathVariable("startTime") String from, @PathVariable("endTime") String to, @RequestHeader(name = "Authorization") String token) {
        token = token.substring(7);
        if (jwtUtil.isTokenExpired(token)) {
            throw new AccessDeniedException("Unauthorized");
        }
        return ReportAssets.findDivision(from, to, specimen);

    }

    @GetMapping(path = "/report/{assetType}/{startTime}/{endTime}")
    public List<InternalAndExternalCases> getAssetDivision(@PathVariable("assetType") int assetType, @PathVariable("startTime") String from, @PathVariable("endTime") String to, @RequestHeader(name = "Authorization") String token) {
        token = token.substring(7);
        if (jwtUtil.isTokenExpired(token)) {
            throw new AccessDeniedException("Unauthorized");
        }
        return ReportAssets.generateReports(from, to, assetType);
    }
}