CREATE TABLE clientes
(
    id    SERIAL CONSTRAINT pk_id_cliente PRIMARY KEY,
    nome  varchar(150) NOT NULL
);


INSERT INTO clientes(nome)
VALUES ('Maria'),
       ('José');