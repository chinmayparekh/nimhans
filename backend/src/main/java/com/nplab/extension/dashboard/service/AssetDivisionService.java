//package com.nplab.extension.dashboard.service;
//
//import com.nplab.extension.dao.AssetSummaryDao;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.Hashtable;
//import java.util.List;
//import java.util.Map;
//
//import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
//import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;
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
////    Hashtable<String, Integer> months = new Hashtable<String, Integer>();
////    months.put("January",1);
////    months.put("February",2);
////    months.put("March",3);
////    months.put("April",4);
////    months.put("May",5);
////    months.put("June",6);
////    months.put("July",7);
////    months.put("August",8);
////    months.put("September",9);
////    months.put("October",10);
////    months.put("November",11);
////    months.put("December",12);
//
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
////        LocalDate initial = LocalDate.of(2014, 2, 13);
////        LocalDate start = initial.with(firstDayOfMonth());
////        LocalDate end = initial.with(lastDayOfMonth());
//        //store the last day of the to month as a DateTime object
//
////        for (int i = 1; i <= days; i++) {
////            casesCount.add(new CasesCount(currentTime.minusDays(i - 1).toString().substring(0, 10),
////                    currentTime.minusDays(i).toString().substring(0, 10), assetSummaryDao));
////        }
//
//        return sampleCount;
//    }
//}