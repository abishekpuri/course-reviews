  drop table course cascade;
  drop table instructor cascade;
  drop table review cascade;

  create table course (
    id int primary key,
    subject text,
    code text,
    name text,
    description text,
    credits int,
    ratingcontent float,
    ratingteaching float,
    ratinggrading float,
    ratingworkload float
  );
  create table instructor (
      id int primary key,
      name text
    );
    insert into instructor values(0,'No Instructor Inserted');
  create table review (
    courseid int references course(id) on delete cascade,
    instructorid int references instructor(id) on delete cascade,
    reviewid int,
    semester text,
    author text,
    title text,
    commentcontent text,
    commentteaching text,
    commentgrading text,
    commentworkload text,
    ratingcontent float,
    ratingteaching float,
    ratinggrading float,
    ratingworkload float,
    hasmidterm bool,
    hasfinal bool,
    hasquiz bool,
    hasassignment bool,
    hasessay bool,
    hasproject bool,
    hasattendance bool,
    hasreading bool,
    haspresentation bool,
    primary key (courseid,reviewid)
  );
