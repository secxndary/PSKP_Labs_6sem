delete from GENRES;
insert into GENRES(ID, NAME, DESCRIPTION) values 
(uuid_generate_v4(), N'Фэнтези', N'шота ненастоящее типа средневековое эльфы гномы фродо вся хуйня'),
(uuid_generate_v4(), N'Фантастика', N'че то нереалистичное но уже прям ваще ненастоящее не верится нихуя'),
(uuid_generate_v4(), N'Детектив', N'кого то хлопнули и ты думаешь ебать а кто это был а хуй знает угадай'),
(uuid_generate_v4(), N'Комедия', N'дохуя смешно что ли сука в украине детей убивают пока ты ржешь уебок'),
(uuid_generate_v4(), N'Трагедия', N'продаются детские ботиночки неношенные. это хемингуей написал'),
(uuid_generate_v4(), N'Драма', N'а в чем сука разница с трагедией я сам не ебу думайте сами'),
(uuid_generate_v4(), N'Басня', N'коротко ясно и по делу и со смыслом вот это ахуенно лучший жанр эвер'),
(uuid_generate_v4(), N'Былина', N'хуйня про богатырей а больше былин не было ибо нихуя не было на руси');


delete from AUTHORS;
insert into AUTHORS(ID, NAME, SURNAME, COUNTRY, DATE_OF_BIRTH) values 
(uuid_generate_v4(), N'Чак', N'Паланик', N'США', '1968-01-28'),
(uuid_generate_v4(), N'Джоан', N'Роулинг', N'Великобритания', '1983-11-24'),
(uuid_generate_v4(), N'Эрих Мария', N'Ремарк', N'Германия', '1946-02-15'),
(uuid_generate_v4(), N'Анджей', N'Сапковский', N'Польша', '1969-07-03'),
(uuid_generate_v4(), N'Васiль', N'Быкаў', N'Беларусь', '1935-12-03'),
(uuid_generate_v4(), N'Михаил', N'Булкагов', N'Россия', '1905-01-29'),
(uuid_generate_v4(), N'Фрэнк', N'Герберт', N'США', '1949-09-19');


delete from BOOKS;
insert into BOOKS(ID, TITLE, PAGES, AUTHOR_ID) values
(uuid_generate_v4(), N'Колыбельная', 315, '42facb2a-80a4-4aa3-ae87-0566a9ecc1a4'),
(uuid_generate_v4(), N'Бойцовский клуб', 401, '42facb2a-80a4-4aa3-ae87-0566a9ecc1a4'),
(uuid_generate_v4(), N'Удушье', 294, '42facb2a-80a4-4aa3-ae87-0566a9ecc1a4'),
(uuid_generate_v4(), N'Дюна', 405, '776eff4e-cf12-4c0b-a3f4-f9f0ed6ed9ad'),
(uuid_generate_v4(), N'Мессия Дюны', 510, '776eff4e-cf12-4c0b-a3f4-f9f0ed6ed9ad'),
(uuid_generate_v4(), N'Дети Дюны', 572, '776eff4e-cf12-4c0b-a3f4-f9f0ed6ed9ad'),
(uuid_generate_v4(), N'Гарри Поттер и Узник Азкабана', 340, '5ba4fa48-24a4-4acf-b420-2322db4bacb0'),
(uuid_generate_v4(), N'Гарри Поттер и Философский Камень', 385, '5ba4fa48-24a4-4acf-b420-2322db4bacb0'),
(uuid_generate_v4(), N'Три товарища', 652, 'cfbac171-8f96-4704-aa30-ab89a4ffeb59'),
(uuid_generate_v4(), N'Триумфальная Арка', 510, 'cfbac171-8f96-4704-aa30-ab89a4ffeb59'),
(uuid_generate_v4(), N'Мастер и Маргарита', 438, '371a796d-7684-44de-80cd-5bee2491fae9'),
(uuid_generate_v4(), N'Чёрный обелиск', 462, '77bcd439-4e94-47fb-98c9-9f6da266b502'),
(uuid_generate_v4(), N'Людзi на балоце', 274, '77bcd439-4e94-47fb-98c9-9f6da266b502'),
(uuid_generate_v4(), N'Альпiйская балада', 408, '77bcd439-4e94-47fb-98c9-9f6da266b502'),
(uuid_generate_v4(), N'Ведьмак. Последнее желание', 204, 'd172c65e-e426-45c9-9ee9-b445c44c886e'),
(uuid_generate_v4(), N'Ведьмак. Меч предназначения', 251, 'd172c65e-e426-45c9-9ee9-b445c44c886e'),
(uuid_generate_v4(), N'Ведьмак. Цири', 703, 'd172c65e-e426-45c9-9ee9-b445c44c886e');


delete from BOOKS_GENRES;
insert into BOOKS_GENRES(BOOK_ID, GENRE_ID) values
('062dfd1f-8378-473f-a5a4-b32f40bb2d84', '145cb33e-07db-4971-87fa-6609dae43196'),
('194f03ae-ef90-44e2-80cc-d064306bd1cc', 'b1368c9e-7e8d-46f3-bcd5-d7510dbe76bd'),
('4d9a1411-9665-4b70-b594-72bc0c721615', 'b1368c9e-7e8d-46f3-bcd5-d7510dbe76bd'),
('a42a694b-7e51-4eee-94cc-f0a2f60a14f3', 'b1368c9e-7e8d-46f3-bcd5-d7510dbe76bd'),
('c2e0fd2f-25c2-425a-91a9-806d1d5f7fc2', 'b1368c9e-7e8d-46f3-bcd5-d7510dbe76bd'),
('c2e0fd2f-25c2-425a-91a9-806d1d5f7fc2', '15bf73e4-9c11-4b69-bcba-f735657bbbba'),
('9a24bcd7-6410-4462-b79f-1422af860a52', '15bf73e4-9c11-4b69-bcba-f735657bbbba'),
('9e826734-9f3d-491e-b724-33e13ee02c84', '15bf73e4-9c11-4b69-bcba-f735657bbbba'),
('9e826734-9f3d-491e-b724-33e13ee02c84', 'f47d8e5d-d0e1-426b-8256-30c644852bf2'),
('7d092090-db8e-4771-8aa0-2e85c0d7392e', 'f47d8e5d-d0e1-426b-8256-30c644852bf2'),
('7d092090-db8e-4771-8aa0-2e85c0d7392e', '2def16c1-ea27-4404-8eea-cd13fb849c49'),
('7d092090-db8e-4771-8aa0-2e85c0d7392e', 'e03dc461-c78a-4d08-931a-8b6ac5299d45'),
('67c63449-89b4-4375-879a-03c59c747671', '55c3c3fa-bb0b-40cd-867d-c380e291ba99'),
('98d9ab1d-f086-4ada-a944-815395b517f6', '55c3c3fa-bb0b-40cd-867d-c380e291ba99'),
('7d092090-db8e-4771-8aa0-2e85c0d7392e', '55c3c3fa-bb0b-40cd-867d-c380e291ba99'),
('ebae0892-5ef2-4a83-94f7-9c9528398749', '55c3c3fa-bb0b-40cd-867d-c380e291ba99'),
('2b56f9b1-f5fc-4430-bf03-551dc2573edc', 'bd4ba6a1-909a-4795-a3a5-08156e75c30d'),
('062dfd1f-8378-473f-a5a4-b32f40bb2d84', 'bd4ba6a1-909a-4795-a3a5-08156e75c30d'),
('4e28fb3f-c463-4e68-a631-c618e0170862', 'bd4ba6a1-909a-4795-a3a5-08156e75c30d'),
('9b93f84d-9a0c-483e-b92c-d7d298d5c56a', 'bd4ba6a1-909a-4795-a3a5-08156e75c30d'),
('a318dee1-be1a-4b7f-98b6-b78dad796d10', 'bd4ba6a1-909a-4795-a3a5-08156e75c30d'),
('062dfd1f-8378-473f-a5a4-b32f40bb2d84', '145cb33e-07db-4971-87fa-6609dae43196'),
('a42a694b-7e51-4eee-94cc-f0a2f60a14f3', '145cb33e-07db-4971-87fa-6609dae43196'),
('ebae0892-5ef2-4a83-94f7-9c9528398749', '145cb33e-07db-4971-87fa-6609dae43196');


delete from CUSTOMERS;
insert into CUSTOMERS(ID, COMPANY_NAME, ADDRESS, PHONE) values
(uuid_generate_v4(), N'OZ', NULL, '+375291847734'),
(uuid_generate_v4(), N'Комикс Крама', N'г. Минск, ул. Немига, 3-105', '+375447295733'),
(uuid_generate_v4(), N'Superlama.by', NULL, '+375333874924'),
(uuid_generate_v4(), N'Книжный магазин на Пушкинской', N'г. Минск, ул. Пушкина, 105', NULL),
(uuid_generate_v4(), N'Белкинга', N'г. Минск, пр. Независимости, 65-104', '+375448773954'),
(uuid_generate_v4(), N'Букваешка', N'г. Минск, ул. Притыкого, 1', '+375257749385'),
(uuid_generate_v4(), N'Mybooks.by', N'г. Минск, ул. Октрябрьская, 54', NULL);


delete from ORDERS;
insert into ORDERS(ID, QTY, AMOUNT, BOOK_ID, CUSTOMER_ID, ORDER_DATE) values
(uuid_generate_v4(), 10, 280, '062dfd1f-8378-473f-a5a4-b32f40bb2d84', '3f7e7198-dfa9-4236-983f-1409c33aec68', '2023-01-11'),
(uuid_generate_v4(), 28, 360, '4e28fb3f-c463-4e68-a631-c618e0170862', '3f7e7198-dfa9-4236-983f-1409c33aec68', '2023-01-29'),
(uuid_generate_v4(), 5, 55, '7d092090-db8e-4771-8aa0-2e85c0d7392e', '3f7e7198-dfa9-4236-983f-1409c33aec68', '2023-02-25'),
(uuid_generate_v4(), 12, 350, 'a318dee1-be1a-4b7f-98b6-b78dad796d10', '829023a6-33c4-42a1-9556-acd2e915da0c', '2023-03-18'),
(uuid_generate_v4(), 11, 330, 'a42a694b-7e51-4eee-94cc-f0a2f60a14f3', '62549bbe-bdb6-456c-abf6-7ae83255b13d', '2023-04-01'),
(uuid_generate_v4(), 15, 300, '53b1fd5c-8105-489e-818b-cdbdd7f3a260', '84f619cf-da48-4ec3-bb46-d567a3c52db6', '2023-04-24'),
(uuid_generate_v4(), 4, 256, '9b93f84d-9a0c-483e-b92c-d7d298d5c56a', 'aebdea81-efee-418d-b26a-a5a1a7c90251', '2023-05-10'),
(uuid_generate_v4(), 15, 350, '9a24bcd7-6410-4462-b79f-1422af860a52', 'b18165f5-4075-4044-b742-2b90c1793442', '2023-06-27'),
(uuid_generate_v4(), 18, 405, '9e826734-9f3d-491e-b724-33e13ee02c84', 'e474d0c9-69f6-4a64-a28a-81e94cb55d2a', '2023-08-12'),
(uuid_generate_v4(), 10, 270, '6d7f27c8-6ae2-43e6-b659-89768e9b2e28', 'aebdea81-efee-418d-b26a-a5a1a7c90251', '2023-11-11');