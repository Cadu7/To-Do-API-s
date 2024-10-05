alter table "item"
    drop constraint if exists item_to_do_list_fkey,
    add constraint item_to_do_list_fkey foreign key (to_do_list) references list(id) on delete cascade;

alter table "list"
    drop constraint if exists list_customer_fkey,
    add constraint list_customer_fkey foreign key (customer) references customer(id) on delete cascade;

alter table "customer"
    drop constraint if exists customer_user_fkey,
    add constraint customer_user_fkey foreign key ("user") references "user"(id) on delete cascade;
