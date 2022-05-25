//package com.nplab.extension.dashboard.service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import com.nplab.extension.dao.AssetSummaryDao;
//import com.nplab.extension.db.RequestCount;
//import org.joda.time.DateTime;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AssetDivisionService {
//    private AssetSummaryDao assetSummaryDao;
//    private String startTime;
//    private String endTime;
//    private long internalCasesCount;
//    private long externalCasesCount;
//    private static List<String> sampleTypes = List.of("Tumor", "Nerve", "Muscle",
//            "Multiple Biopsies", "Epilepsy", "Block", "Slides", "Other");
//
//    private static List<String> months = List.of("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
//
//    public AssetDivisionService(String to, String from, String specimen, AssetSummaryDao assetSummaryDao) {
//        this.internalCasesCount = assetSummaryDao.countSamplesByCriteria(
//                "a.npNumber not like 'X%' AND a.specimen like '" + specimen + "' AND a.startTime BETWEEN '" + from + "' AND '" + to + "'");
//
//        this.externalCasesCount = assetSummaryDao.countSamplesByCriteria(
//                "a.npNumber like 'X%' AND a.specimen like '" + specimen + "' AND a.startTime BETWEEN '" +
//                        from + "' AND '" + to + "'");
//    }
//
////    function to find the days between the first day of the from month and last day of the to month
//
//    public static List<Long> findInternalSamples(String from, String to, AssetSummaryDao assetSummaryDao) {
//        List<Long> sampleCount = new ArrayList<>();
//        //store the last day of the to month as a DateTime object
//
//
////        for (int i = 1; i <= days; i++) {
////            casesCount.add(new CasesCount(currentTime.minusDays(i - 1).toString().substring(0, 10),
////                    currentTime.minusDays(i).toString().substring(0, 10), assetSummaryDao));
////        }
//
//        return sampleCount;
//    }
//}