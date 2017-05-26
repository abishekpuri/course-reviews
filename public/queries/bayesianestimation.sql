
-- This is the bayesian estimation of averages for each category

select (4.015*8.4 + sum(ratingcontent))/(8.4 + count(reviewid)) as content,
       (3.895*8.4 + sum(ratingteaching))/(8.4 + count(reviewid)) as teaching,
       (3.888*8.4 + sum(ratingcontent))/(8.4 + count(reviewid)) as workload,
       (4.015*8.4 + sum(ratingcontent))/(8.4 + count(reviewid)) as grading,
instructorid from review group by instructorid;
