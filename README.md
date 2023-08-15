# Stone Customer API

## Descrição
Esta API REST tem como objetivo fornecer um serviço de cadastro de clientes, assim como atualização dos dados cadastrais e respectiva consulta dos dados cadastrais. 

## Documentação
A documentação da API está disponível em:

[http://orionsoft.site/api/v1/reference](http://orionsoft.site/api/v1/reference)

## Implementação
A API foi implementada utilizando a seguinte Stack de tecnologias:

- NodeJS
- NestJS
- Axios
- Typescript
- Redis
- Ioredis
- Docker
- AWS EC2

## Instalação
A instalação e execução da API pode ser facilmente realizada seguindo os passos descritos abaixo. É assumido que seu ambiente local é Linux, BSD, MacOS ou alguma outra variante do Unix. Se você estiver utilizando Windows, pode ser necessário realizar algumas adaptações. Abra um terminal de comando e siga os passos abaixo.

1> Baixar o codigo fonte do repositório:

	$ git clone https://github.com/miguelamello/stone-customer-api.git

2> Instalar as dependências do projeto:

	$ cd stone-customer-api
	$ npm install

3> Configurar as variáveis de ambiente:

A aplicação precisa de algumas poucas variáveis de ambiente para funcionar corretamente. Para isso, basta criar um arquivo chamado `.env` na raiz do projeto e preencher as variáveis de acordo com o exemplo abaixo:

	API_PORT=3030
	REDIS_HOST=localhost
	REDIS_PORT=6379
	REDIS_TTL=300
	SECRET_KEY='3596bece-3609-4292-9ed8-b2881fae4cda'	

É necessário configurar essas variáveis de ambiente por alguns motivos:

- Não é uma boa prática deixar as configurações de banco de dados, chaves de segurança no código fonte, e outras informações sensíveis, diretamente no código fonte ou em arquivos de configuração que são versionados no repositório.
- A aplicação pode ser executada em diferentes ambientes, como desenvolvimento, homologação e produção, e cada ambiente pode ter suas próprias configurações. Isso ocorre em nosso caso porque a aplicação vai ser executada em um container Docker, mas também pode ser executada diretamente no host, ou em um servidor de aplicação como o Heroku, por exemplo.

O propósito das variáveis já são bem auto-explicativos, mas segue uma breve descrição de cada uma:

- `API_PORT`: Porta em que a API vai ser executada. O valor padrão é 3030.
- `REDIS_HOST`: Endereço do servidor Redis. O valor padrão é `localhost` para execução local.
- `REDIS_PORT`: Porta do servidor Redis. O valor padrão é 6379.
- `REDIS_TTL`: Tempo de vida dos dados em cache no Redis, em segundos. O valor padrão é 300 segundos (5 minutos).
- `SECRET_KEY`: Chave de segurança utilizada para criar um `hash` do Bearer Token. Você pode usar uma string de qualquer tamanho que desejar. 

4> Executando em ambiente de desenvolvimento:

Criado e configurado o arquivo `.env`, basta executar o comando abaixo para iniciar a aplicação em ambiente de desenvolvimento:

	$ ./app-run

Qualquer conflito de porta ou erro de execução será exibido no console. A porta 3030 sugerida não é muito comum de ser utilizada, logo deve difícil vocẽ já ter algum processo executando nessa porta. Mas se for o caso, basta alterar a variável `API_PORT` no arquivo `.env` para uma porta disponível. 

Conflitos de porta também podem ocorrer caso você já tenha um servidor Redis executando na porta 6379. Nesse caso, basta alterar a variável `REDIS_PORT` no arquivo `.env` para uma porta disponível. O endereço do servidor Redis dificilmente vai precisar ser alterado, pois o Redis normalmente escuta na interface de loopback (localhost). Contudo, se necessário, ajuste a variável `REDIS_HOST` no arquivo `.env` para o endereço do servidor Redis deverá ser executado.

5> Accessando a API:

Mantendo-se as variáveis de ambiente sugeridas, a API estará disponível no endereço `http://localhost:3030`. Nesse momento você pode acessar a documentação da API em `http://localhost:3030/reference` através do seu navegador web. Leia a documentação para entender como utilizar a API.

Para efeticamente interagir e utilizar a API, você pode utilizar qualquer ferramenta que permita realizar requisições HTTP, como o `curl` ou o `Postman`, por exemplo. Recomendo o uso do `Postman` por ser uma ferramenta mais amigável e intuitiva. Contudo, a ferramenta que você escolher é uma questão de gosto pessoal.

## Execução em ambiente de produção

## Testes

## Conclusão


