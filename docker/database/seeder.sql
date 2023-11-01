INSERT INTO "Client"(name, email, cpf)
VALUES ('Maria', 'maria@email.com', '000.000.00-00'),
       ('José', 'jose@email.com', '111.111.111-11');

INSERT INTO "products" ("name", description, category, price, active)
VALUES ('Hamburguer', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus elit orci, sed lacinia justo lacinia vel. Aenean suscipit, lectus id interdum pellentesque, felis erat blandit', 'Lanche', 10.00, true),
('Batata Frita', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus elit orci, sed lacinia justo lacinia vel. Aenean suscipit, lectus id interdum pellentesque, felis erat blandit', 'Acompanhamento', 5.50, true),
('Coca Cola', 'Teste', 'Bebida', 8.22, true),
('Fanta', 'Teste', 'Bebida', 7.50, false),
('Sorvete', 'Teste', 'Sobremesa', 2.00, true),
('Sundae', 'teste', 'Sobremesa', 6.00, true);
