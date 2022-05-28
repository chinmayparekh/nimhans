package com.nplab.extension.dashboard.service;

import java.util.ArrayList;
import java.util.List;

import com.nplab.extension.dao.AssetSummaryDao;
import com.nplab.extension.db.RequestCount;

public class AnnualReportService {
	private AssetSummaryDao assetSummaryDao;
	private String startTime;
	private String endTime;
	
	private static List<String> sampleTypes = List.of("Tumor", "Nerve", "Muscle", 
			"Multiple Biopsies", "Epilepsy", "Block", "Slides", "Other");
	
	public AnnualReportService(AssetSummaryDao assetSummaryDao) {
		this.assetSummaryDao = assetSummaryDao;
	}
    public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
    public List<Long> findBreakoutBySampleTypeb(String sptype,String startTime, String endTime) {
		List<Long> sampleTypeCount = new ArrayList<>();
		this.setStartTime(startTime);
		this.setEndTime(endTime);
		for (String sampleType: sampleTypes) {
			sampleTypeCount.add(assetSummaryDao
					.countByDateAndCriteriab("a.biopsyType like '%" + sampleType + "%' and a.specimen like '%" +sptype + "%'", this.startTime, this.endTime));
		}
		
		return sampleTypeCount;
	}
}
