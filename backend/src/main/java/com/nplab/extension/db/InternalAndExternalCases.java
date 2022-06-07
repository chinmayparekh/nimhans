package com.nplab.extension.db;

import com.nplab.extension.dao.AssetSummaryDao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.Local;
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
public class InternalAndExternalCases {
    private long internalCasesCount;
    private long externalCasesCount;

    private static List<String> Case = List.of("Blocks", "Epilepsy surgery", "Muscle biopsy",
            "Nerve biopsy",
            "NULL",
            "Others",
            "Sheet",
            "Skin biopsy",
            "Slides for Opinion",
            "Surgical Biopsy"
    );
    private static List<String> Sample = List.of("Epilepsy surgery", "Muscle biopsy",
            "Nerve biopsy",
            "NULL",
            "Others",
            "Skin biopsy",
            "Surgical Biopsy",
            "Multiple biopsies",
            "Tissue"
    );
    private static List<String> Block = List.of("Blocks", "Block");
    private static List<String> Slide = List.of("Blocks", "Epilepsy surgery", "Muscle biopsy",
            "Nerve biopsy",
            "Tissue",
            "Skin biopsy",
            "Slides for Opinion",
            "Surgical Biopsy",
            "Block"
    );
    public static Map<String, Integer> months;

    public InternalAndExternalCases(String to, String from, String specimen, AssetSummaryDao assetSummaryDao) {

        this.internalCasesCount = assetSummaryDao.countSamplesByCriteria(
                "a.npNumber not like 'X%' AND a.specimen like '" + specimen + "' AND a.startTime BETWEEN '" + from + "' AND '" + to + "'");

        this.externalCasesCount = assetSummaryDao.countSamplesByCriteria(
                "a.npNumber like 'X%' AND a.specimen like '" + specimen + "' AND a.startTime BETWEEN '" +
                        from + "' AND '" + to + "'");
    }

    public InternalAndExternalCases(String to, String from, int assetType, String specimen, AssetSummaryDao assetSummaryDao) {

        this.internalCasesCount = assetSummaryDao.countSamplesByCriteria(
                "a.npNumber not like 'X%' AND a.asset_type = " + assetType + "AND a.specimen like '" + specimen + "' AND a.startTime BETWEEN '" + from + "' AND '" + to + "'");

        this.externalCasesCount = assetSummaryDao.countSamplesByCriteria(
                "a.npNumber like 'X%' AND a.asset_type = " + assetType + "AND a.specimen like '" + specimen + "' AND a.startTime BETWEEN '" + from + "' AND '" + to + "'");
    }

    public static List<InternalAndExternalCases> findInternalSamples(String from, String to, String specimen, AssetSummaryDao assetSummaryDao) {

        String fromDate[] = from.split("-");
        String to_Date[] = to.split("-");
        int fromYear = Integer.parseInt(fromDate[0]);
        int toYear = Integer.parseInt(to_Date[0]);
        int yearDiff = toYear - fromYear;

        int fromMonth = Integer.parseInt(fromDate[1]);
        int toMonth = Integer.parseInt(to_Date[1]);
        int monthDiff = toMonth - fromMonth;

        int numberOfIterations = monthDiff + (12 * yearDiff) + 1;

        LocalDate FirstDayOfStartMonth = LocalDate.of(fromYear, fromMonth, 1);
        LocalDate LastDayOfStartMonth = FirstDayOfStartMonth.with(lastDayOfMonth());

        LocalDate FirstDayOfEndMonth = LocalDate.of(toYear, toMonth, 1);

        List<InternalAndExternalCases> sampleCount = new ArrayList<>();

        for (int i = 0; i < numberOfIterations; i++) {
            if (i == 0) {
                sampleCount.add(new InternalAndExternalCases(LastDayOfStartMonth.toString(), from, specimen, assetSummaryDao));

            } else if (i == numberOfIterations - 1) {
                sampleCount.add(new InternalAndExternalCases(to, FirstDayOfEndMonth.toString(), specimen, assetSummaryDao));

            } else {
                fromMonth += 1;

                if (fromMonth == 13) {
                    fromMonth = 1;
                    fromYear += 1;

                }
                LocalDate temp = LocalDate.of(fromYear, fromMonth, 1);
                LocalDate endDay = temp.with(lastDayOfMonth());
                LocalDate startDay = temp.with(firstDayOfMonth());
                sampleCount.add(new InternalAndExternalCases(endDay.toString(), startDay.toString(), specimen, assetSummaryDao));
            }

        }

        return sampleCount;
    }

    public static List<InternalAndExternalCases> Report(String from, String to, int assetType, AssetSummaryDao assetSummaryDao) {
        List<String> Assets;
        switch (assetType) {
            case 0:
                Assets = Case;
                break;
            case 1:
                Assets = Sample;
                break;
            case 2:
                Assets = Block;
                break;
            case 3:
                Assets = Slide;
                break;
            default:
                Assets = Sample;
                break;
        }
        List<InternalAndExternalCases> sampleCount = new ArrayList<>();
        for (String specimenType : Assets) {
            sampleCount.add(new InternalAndExternalCases(to, from, assetType, specimenType, assetSummaryDao));
        }


        return sampleCount;
    }


}