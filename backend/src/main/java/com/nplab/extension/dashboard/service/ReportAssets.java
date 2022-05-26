package com.nplab.extension.dashboard.service;

import com.nplab.extension.dao.AssetSummaryDao;
import com.nplab.extension.db.AssetDivisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportAssets {
    private static AssetSummaryDao assetSummaryDao;

    @Autowired
    public ReportAssets(AssetSummaryDao assetSummaryDao) {
        this.assetSummaryDao = assetSummaryDao;
    }

    public static List<AssetDivisionService> findDivision(String from, String to, String specimen) {
        return AssetDivisionService.findInternalSamples(from, to, specimen, assetSummaryDao);

    }
}