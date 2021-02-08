insert into bag
(  author_id,  date_created)
values 
($1, $2)

returning *