insert into flavor 
(  author_id, flavor_name, flavor1, flavor2, flavor3, addin1, addin2, addin3, price, date_created)
values 
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

returning *