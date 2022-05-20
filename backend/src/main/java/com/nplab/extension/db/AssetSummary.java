/**
 * DB class for mapping to asset_summary table in TrackerDb. This is a table with all asset details
 * with TAT and special requests.
 * Contains getters, setters and overridden toString()
 *
 * @author Vaibhavi Lokegaonkar
 */
package com.nplab.extension.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
import org.joda.time.Days;

@Immutable
@Entity
@Table(name = "asset_summary")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetSummary {

    @Id
    @Column(name = "np_number")
    private String npNumber;

    @Column(name = "biopsy_type")
    private String biopsyType;

    @Column(name = "start_time")
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime startTime;

    @Column(name = "end_time")
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime endTime;

    @Column(name = "special_stain")
    private boolean specialStains;

    @Column(name = "ihc")
    private boolean ihc;

    @Column(name = "decal")
    private boolean decal;

    @Column(name = "deeper")
    private boolean deeper;

    @Column(name = "process_all")
    private boolean processAll;

    @Column(name = "kept_for_fixation")
    private boolean keptForFixation;

    @Column(name = "ehc")
    private boolean ehc;

    @Column(name = "semithin")
    private boolean semithin;

    @Column(name = "em")
    private boolean em;

    @Column(name = "TAT")
    private Integer tat;

    @Column(name = "request_code")
    private String requestCode;


    @Override
    public String toString() {
        return "AssetSummary [npNumber=" + npNumber + ", biopsyType=" + biopsyType + "]";
    }

}
