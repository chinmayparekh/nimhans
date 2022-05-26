package com.nplab.extension.db;

import com.nplab.extension.dao.AssetSummaryDao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.DateTime;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetDivisionService {
    private long internalCasesCount;
    private long externalCasesCount;

    private static List<String> sampleTypes = List.of("Tumor", "Nerve", "Muscle",
            "Multiple Biopsies", "Epilepsy", "Block", "Slides", "Other");
    public static Map<String, Integer> months;

    static {
        months = new HashMap<>();
        months.put("January", 1);
        months.put("February", 2);
        months.put("March", 3);
        months.put("April", 4);
        months.put("May", 5);
        months.put("June", 6);
        months.put("July", 7);
        months.put("August", 8);
        months.put("September", 9);
        months.put("October", 10);
        months.put("November", 11);
        months.put("December", 12);
    }

    public AssetDivisionService(String to, String from, String specimen, AssetSummaryDao assetSummaryDao) {

        this.internalCasesCount = assetSummaryDao.countSamplesByCriteria(
                "a.npNumber not like 'X%' AND a.specimen like '" + specimen + "' AND a.startTime BETWEEN '" + from + "' AND '" + to + "'");

        this.externalCasesCount = assetSummaryDao.countSamplesByCriteria(
                "a.npNumber like 'X%' AND a.specimen like '" + specimen + "' AND a.startTime BETWEEN '" +
                        from + "' AND '" + to + "'");
    }

    public static List<AssetDivisionService> findInternalSamples(String from, String to, String specimen, AssetSummaryDao assetSummaryDao) {
        List<AssetDivisionService> sampleCount = new ArrayList<>();
        DateTime currentTime = new DateTime();
        int currentYear = currentTime.getYear();
        int fromMonth = months.get(from);
        int toMonth = months.get(to);
        LocalDate toDate = LocalDate.of(currentYear, toMonth, 1);
        LocalDate end = toDate.with(lastDayOfMonth());
        LocalDate startMonth = toDate.with(firstDayOfMonth());

        long monthDiff = toMonth - fromMonth;
        for (long i = 0; i <= monthDiff; i++) {
            sampleCount.add(new AssetDivisionService(end.toString(), startMonth.toString(), specimen, assetSummaryDao));
            toMonth--;
            if(toMonth<1)
            {
                toMonth =12;
                currentYear--;
            }
            toDate = LocalDate.of(currentYear, toMonth, 1);
            end = toDate.with(lastDayOfMonth());
            startMonth = toDate.with(firstDayOfMonth());
        }
        return sampleCount;
    }
}