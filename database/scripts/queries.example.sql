-- select customer by user email
select customer_table.name, user_table.email from "customer" as customer_table , "user" as user_table
where user_table.email = 'cadumdecarvalho@gmail.com' and user_table.id = customer_table.user;

select list_table.name as list_name, user_table.email as customer_email ,customer_table.name as customer_name from "list" as list_table, "user" as user_table, "customer" as customer_table
-- where user_table.email = 'cadumdecarvalho@gmail.com' and user_table.id = customer_table.user and list_table.customer = customer_table.id;
where list_table.customer = customer_table.id and customer_table.user = user_table.id order by user_table.email;