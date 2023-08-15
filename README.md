# Stone Customer API

## Descrição
Esta API REST tem como objetivo fornecer um serviço de cadastro de clientes, assim como atualização dos dados cadastrais e respectiva consulta dos dados cadastrais. O acesso à API requer autenticação prévia obtida através da própia API. A autenticação é feita através de um Bearer Token, que é um token de acesso que deve ser enviado no cabeçalho HTTP de cada requisição. O Bearer Token é obtido através de um endpoint específico da API, que recebe como parâmetros o `email` do usuário. O Bearer Token tem um tempo de vida limitado de 300 segundos (5 min), e após expirar, o usuário deve solicitar um novo Bearer Token.

## Documentação
A documentação da API está disponível em:

[http://orionsoft.site/api/v1/reference](http://orionsoft.site/api/v1/reference)

## Implementação
A API foi implementada utilizando a seguinte Stack de tecnologias:

- NodeJS
- NestJS
- Typescript
- Redis
- Axios
- Ioredis
- Docker
- AWS EC2

## Instalação
A instalação da API pode ser facilmente realizada seguindo os passos descritos abaixo. É assumido que seu ambiente local é Linux, BSD, MacOS ou alguma outra variante do Unix. Se você estiver utilizando Windows, pode ser necessário realizar algumas adaptações. Abra um terminal de comando e siga os passos abaixo.

Obs: Será necessário ter os seguintes softwares instalados em seu ambiente local: `git` e `nodejs`.

1> Baixar o codigo fonte do repositório:

	cd ~ && git clone https://github.com/miguelamello/stone-customer-api.git

2> Instalar as dependências do projeto:

	cd stone-customer-api && npm install

3> Configurar as variáveis de ambiente:

A aplicação precisa de algumas poucas variáveis de ambiente para funcionar corretamente. Para isso, basta criar um arquivo chamado `.env` na raiz do projeto:

	echo "API_PORT=3030\nREDIS_HOST=localhost\nREDIS_PORT=6379\nREDIS_TTL=300\nSECRET_KEY='3596bece-3609-4292-9ed8-b2881fae4cda'" > .env


Abra o arquivo `.env` em um editor de texto e preencha as variáveis de acordo com o exemplo abaixo:

	API_PORT=3030
	REDIS_HOST=localhost
	REDIS_PORT=6379
	REDIS_TTL=300
	SECRET_KEY='3596bece-3609-4292-9ed8-b2881fae4cda'	

É necessário configurar essas variáveis de ambiente por alguns motivos:

- Não é uma boa prática deixar as configurações de banco de dados, chaves de segurança no código fonte, e outras informações sensíveis, diretamente no código fonte ou em arquivos de configuração que são versionados no repositório.
- A aplicação pode ser executada em diferentes ambientes, como desenvolvimento, homologação e produção, e cada ambiente pode ter suas próprias configurações. Isso ocorre em nosso caso porque a aplicação vai ser executada em um container Docker, mas também pode ser executada diretamente no host, ou em um servidor de aplicação como o AWS ECS, por exemplo.

O propósito das variáveis já é bem auto-explicativo, mas segue uma breve descrição de cada uma:

- `API_PORT`: Porta em que a API vai ser executada. O valor padrão é 3030.
- `REDIS_HOST`: Endereço do servidor Redis. O valor padrão é `localhost` para execução local.
- `REDIS_PORT`: Porta do servidor Redis. O valor padrão é 6379.
- `REDIS_TTL`: Tempo de vida dos dados temporários em cache no Redis, em segundos. O valor padrão é 300 segundos (5 minutos).
- `SECRET_KEY`: Chave de segurança utilizada para criar um `hash` do Bearer Token. Você pode usar uma string de qualquer tamanho que desejar. 

Observações: 
1) Certifique-se de que não tenha uma instância do Redis já executando em sua máquina local, pois isso pode causar conflitos, visto ser provável que essa instância esteja utilizando a porta padrão 6379. Caso esse seja o caso, você pode alterar a porta padrão do Redis para uma porta diferente, e alterar a variável `REDIS_PORT` de acordo. Poderá também parar a instância do Redis que já está executando em sua máquina local, enquanto estiver testando a API.

2) Pode ocorrer também de você ter alguma outra aplicação executando na porta padrão 3030. Nesse caso, você pode alterar a porta padrão da API para uma porta diferente, e alterar a variável `API_PORT` de acordo.

## Execução
A aplicação da API será executada no `Docker`, e para isso, é necessário ter o `Docker` instalado em seu ambiente local. Se você não tiver o `Docker` instalado, siga as instruções de instalação disponíveis em: [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/). 

Para executar a aplicação, é necessário configurá-la no `Docker`. Para isso, preparei alguns comandos customizados para facilitar a configuração e execução da aplicação no `Dcoker``. Assumindo que você esteja com o termina de commando aberto e na raiz do projeto, siga os passos abaixo:

	./docker-build && ./docker-run && ./docker-logs
	



## Uso

## Testes

## Conclusão


