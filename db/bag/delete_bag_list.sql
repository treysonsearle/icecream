DELETE 
FROM bag_list
WHERE flavor_id = $1;

select * from bag_list
where bag_id = $2;