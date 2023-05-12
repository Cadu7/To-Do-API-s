-- select customer by user email
select customer_table.id, user_table.email from customer as customer_table , "user" as user_table
where user_table.email = 'cadu.carvalho@best2bee.com.br' and user_table.id = customer_table.user_id;