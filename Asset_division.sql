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
select a.np_number,b.start_time,b.end_time,a.biopsy_type,a.specimen from asset a inner join transaction b on a.np_number=b.np_number;

