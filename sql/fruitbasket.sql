create table fruit_basket ( 
  id serial not null primary key,
  fruit_name text, 
  quantity integer, 
  price decimal (10,2)
);

insert into fruit_basket (fruit_name, quantity, price) values ('Kiwi', 1, '5.00');
insert into fruit_basket (fruit_name, quantity, price) values ('Orange', 1, '2.00');
insert into fruit_basket (fruit_name, quantity, price) values ('Pineapple', 1, '12.00');