# Execute the following statements in the mysql workbench/ terminal one after the other.

### updation scripts
# these are the commands to update biopsy type, which is a missing field when asset_type = 0

# update where specimen = multiple
update asset ac
set biopsy_type = 'Multiple Biopsies'
where  EXISTS (select distinct(SUBSTR(a.np_number, 1, regexp_instr(a.np_number,':')-1)) np_number
               from (select * from asset) a
               where specimen = 'Multiple Biopsies'
                 and a.np_number = ac.np_number);

#update where multiple biopsies - 876
update asset ac
set biopsy_type = 'Multiple Biopsies'
where asset_type =0
  and EXISTS(  select 1
               from (select count(distinct (biopsy_type)) types,SUBSTR(a.np_number, 1, regexp_instr(a.np_number,':')-1) np
                     from (select * from asset) a
                     group by np
                     having types > 1) ref
               where ref.np = ac.np_number
    )
  and ac.asset_id is not null
  and ac.np_number is not null;

# updating the other biopsy types with base np numbers
update asset ac
set biopsy_type = (select biopsy_type
                   from (select count(distinct (biopsy_type)) types,SUBSTR(a.np_number, 1, regexp_instr(a.np_number,':')-1) np, biopsy_type
                         from (select * from asset) a
                         group by np
                         having types = 1) ref
                   where ac.np_number = ref.np)
where asset_type = 0
  and ac.biopsy_type = ''
  and ac.asset_id is not null
  and ac.np_number is not null;

# updating the biopsy types for block
update  asset ac
set biopsy_type = 'Block'
where EXISTS(select 1
            from(select np, min(asset_type) new_type
                from (select SUBSTR(a.np_number, 1, regexp_instr(a.np_number,':')-1) np,asset_type
                       from asset a
                         where SUBSTR(a.np_number, 1, regexp_instr(a.np_number,':')-1) <> ''
                         and np_number like '%:00:%'
                      ) refer
             group by np
             having new_type = 2) temp
            where np = ac.np_number);

#updating the biopsy types for slides
update  asset ac
set biopsy_type = 'Slide'
where EXISTS(select 1
             from(select np, min(asset_type) new_type
                  from (select SUBSTR(a.np_number, 1, regexp_instr(a.np_number,':')-1) np,asset_type
                        from asset a
                        where SUBSTR(a.np_number, 1, regexp_instr(a.np_number,':')-1) <> ''
                          and np_number like '%:00:%'
                       ) refer
                  group by np
                  having new_type = 3) temp
             where np = ac.np_number);

#####

# creating a view in order to have real time updation in the information required for the dashboard to present charts and reports.

# create final asset_division
create or replace view asset_division as
select tat_table.np_number np_number,
       start_time,
       end_time,
       biopsy_type,
       specimen
from (select np_number, start_time, end_time,
             case when end_time is not null then TIMESTAMPDIFF(DAY, start_time, end_time) end TAT
      from
          (select start_tab.np_number np_number,
                  start_time,
                  case when start_tab.np_number like 'X%' then end_external.end_time else end_internal.end_time end end_time
           from (select distinct (np_number) np_number, min(start_time) start_time
                 from transaction
                 where station_id = 1
                   and np_number not like '%:%'
                 group by np_number)start_tab
                left outer join
                (select distinct (np_number) np_number, max(end_time) end_time
                 from transaction
                 where station_id = 8
                   and np_number not like 'X%'
                 group by np_number) end_internal on start_tab.np_number = end_internal.np_number
                 left outer join
                (select distinct(np_number) np_number, max(end_time) end_time
                 from transaction
                 where station_id = 9
                 group by np_number) end_external on start_tab.np_number = end_external.np_number) final_time) tat_table right outer join
     (select np_number, biopsy_type, specimen 
      from (select refer.np_number,
                   biopsy_type,
                   specimen
            from (select ac.np_number as np_number,
                         biopsy_type as biopsy_type,
                         specimen as specimen
                  from asset ac left join special_request sr on ac.np_number = SUBSTRING(sr.np_number, 1, LOCATE(':', sr.np_number) - 1)
                  where ac.asset_type = 0) refer
            group by refer.np_number) final) biopy_request_table on  tat_table.np_number = biopy_request_table.np_number;
			
##################
