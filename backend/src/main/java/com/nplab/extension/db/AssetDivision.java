package com.nplab.extension.db;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Immutable
@Entity
@Table(name = "asset_division")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class AssetDivision {
    @Id
    @Column(name = "np_number")
    private String npNumber;

    @Column(name = "biopsy_type")
    private String biopsyType;

    @Column(name = "specimen")
    private String specimen;

    @Column(name = "start_time")
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime startTime;

    @Column(name = "end_time")
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime endTime;

}
