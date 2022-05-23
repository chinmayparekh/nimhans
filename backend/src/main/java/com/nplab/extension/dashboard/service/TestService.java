package com.nplab.extension.dashboard.service;

import java.util.ArrayList;
import java.util.List;

import com.nplab.extension.dao.AssetSummaryDao;
import com.nplab.extension.db.RequestCount;
import org.springframework.stereotype.Service;

@Service
public class TestService {
    private AssetSummaryDao assetSummaryDao;
    private String startTime;
    private String endTime;

    private static List<String> sampleTypes = List.of("Tumor", "Nerve", "Muscle",
            "Multiple Biopsies", "Epilepsy", "Block", "Slides", "Other");

    public TestService(AssetSummaryDao assetSummaryDao) {
        this.assetSummaryDao = assetSummaryDao;
    }

    public List<Long> findBreakoutType(String sampleType) {
        List<Long> sampleTypeCount = new ArrayList<>();
        sampleTypeCount.add(assetSummaryDao.testFunctionLong("a.biopsyType like '%" + sampleType + "%'"));
        return sampleTypeCount;
    }
}