# Título do Projeto

API criada para o tech challenge da Pós Tech FIAP do curso de Arquitetura de Software turma 4SOAT - G60

## Iniciando projeto

Para iniciar esse projeto, após clonar rode no terminal:

```bash
  cd k8s
```

dentro da pasta /k8s rode no terminal:

```bash
  kubectl apply -f .
```

Acompanhar o status da criação dos PODS

```bash
kubectl get pods
```
Após todos os pods estarem com o status "Running" pegar qualquer pod da api e executar o seguinte comando para gerar as tabelas da aplicação:

```bash
  kubectl exec -it POD_API --  sh /var/bin/migration.sh
```

Após finalizar a criação das tabelas podemos fazer o carregamento inicial da base de dados.
#### OBS: Este passo é opcional

Pegar o pod do postgres

```bash
kubectl get pods
```
Copiar arquivo de seed para o pod

```bash
kubectl cp seeder.sql POD_POSTGRES:/tmp
```
Executar o seed
```bash
kubectl exec -it POD_POSTGRES --  psql -U totem -d totem -f /tmp/seeder.sql
```

## Funcionalidades

#### Cliente

- Cadastrar cliente
- Buscar clientes por CPF
- Listar todos os clientes
- Cadastrar pedido

#### Pedido

- Buscar pedido por id
- Atualizar status pedido
- Link pedido

#### Fila de pedidos

- Listar pedidos em preparo
- Listar pedidos prontos
- Listar pedidos aguardando preparo

#### Produtos

- Cadastrar produtos
- Buscar produto por categoria
- Listar todos os produtos
- Atualizar produtos
- Apagar produtos
- Processar pagamento

## Postman

[Postman](https://documenter.getpostman.com/view/18248829/2s9YXcdkDW)

## Miro

[Miro](https://miro.com/app/board/uXjVNe6pUU4=/)

## Storytelling

[Storytelling](https://docs.google.com/document/d/1UKt6QM1xacBQHZGV9gy3_L3Li5LpHbLUMzv4UTCF_Nc/edit)