# Prova Técnica Araujo Fontes


## Apresentação
Grafico de linha feito com bootstrap, jquery, laravel e mysql.

## Requisitos

A aplicação foi desenvolvida sob o framework Laravel na linguagem PHP; informações no link abaixo:

https://laravel.com/

http://php.net/

## Executar aplicação

Para executar essa aplicação em seu computador, siga os passos abaixo:

1 - Após clonar o reposítorio em um diretório de sua preferencia.

```shell
$ git clone https://github.com/weullerk/Araujo-Fontes.git
```

2 - Execute o comando "composer install" e "npm install" para baixar as dependências, caso não possua o composer você pode baixa lo para fazer a instalação no link abaixo:

```shell
composer install
```

```shell
npm install
```

https://getcomposer.org/

3 - Crie uma database e configure no arquivo .env os dados da conexão e o nome da database e execute o comando para migrar a database.

```shell
php artisan migrate
```

4 - Rode a seed para popular a database

```shell
php artisan db:seed
```

5 - Execute o comando php artisan serve para iniciar a applicação.

```shell
php artisan serve
```

6 - Acesse a url padrão para carregar o gráfico.

```shell
http://127.0.0.1:8000/
```


## Plugins
JWT Auth - Autenticação com JWT

https://github.com/tymondesigns/jwt-auth
