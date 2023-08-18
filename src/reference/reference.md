# Stone Customer API
Versão 1

Esta API REST tem como objetivo fornecer um serviço de cadastro de clientes, assim como atualização dos dados cadastrais e respectiva consulta dos dados cadastrais.

#### Índice rápido
- [URL Base](#1-url-base-a-href-stone-customer-api-a)
- [Autenticação](#2-autenticacao-a-href-stone-customer-api-a)
- [Rotas](#3-rotas-a-href-stone-customer-api-a)
	- [Cadastra um novo cliente](#3-1-cadastra-um-novo-cliente-a-href-3-rotas-a-href-stone-customer-api-a-a)
	- [Atualiza um cliente](#3-2-atualiza-um-cliente-a-href-3-rotas-a-href-stone-customer-api-a-a)
	- [Busca um cliente pelo ID](#3-3-busca-um-cliente-pelo-id-a-href-3-rotas-a-href-stone-customer-api-a-a)
	- [Cadastra uma chave de API](#3-4-cadastra-uma-chave-de-api-a-href-3-rotas-a-href-stone-customer-api-a-a)
	- [Busca uma chave de API pelo email](#3-5-busca-uma-chave-de-api-pelo-email-a-href-3-rotas-a-href-stone-customer-api-a-a)
- [Mensagens de erro](#4-mensagens-de-erro-a-href-stone-customer-api-a)
- [Limitação das requicições](#5-limitacao-de-requisicoes-a-href-stone-customer-api-a)
- [Registro de alterações](#6-registro-de-alteracoes-a-href-stone-customer-api-a)
- [Exemplos](#7-exemplos-a-href-stone-customer-api-a)
	- [Cadastra um novo cliente](#7-1-cadastra-um-cliente-a-href-7-exemplos-a-href-stone-customer-api-a-a)
	- [Atualiza um cliente](#7-2-atualiza-um-cliente-a-href-7-exemplos-a-href-stone-customer-api-a-a)
	- [Busca um cliente pelo ID](#7-3-busca-um-cliente-a-href-7-exemplos-a-href-stone-customer-api-a-a)
	- [Cadastra uma chave de API](#7-4-cadastra-uma-chave-de-api-a-href-7-exemplos-a-href-stone-customer-api-a-a)
	- [Busca uma chave de API pelo email](#7-5-busca-uma-chave-de-api-pelo-email-a-href-7-exemplos-a-href-stone-customer-api-a-a)
- [Suporte e contato](#8-suporte-e-contato-a-href-stone-customer-api-a)


## 1) URL Base [&uarr;](#stone-customer-api)

A URL base para acesso a API é: 

```
http://customerapi.orionsoft.site/
```


## 2) Autenticação [&uarr;](#stone-customer-api)

Esse serviço usa autenticação por chave de API. Para autenticar as requisições, inclua sua chave de API no cabeçalho `Authorization` da seguinte forma:

```
Authorization: Bearer <token>
```

Obs: A chave de API pode ser obtida através da rota `POST /auth`.


## 3) Rotas [&uarr;](#stone-customer-api)

1. [POST /customer](#3-1-cadastra-um-novo-cliente-a-href-3-rotas-a-href-stone-customer-api-a-a)
2. [PUT /customer/:id](#3-2-atualiza-um-cliente-a-href-3-rotas-a-href-stone-customer-api-a-a)
3. [GET /customer/:id](#3-2-atualiza-um-cliente-a-href-3-rotas-a-href-stone-customer-api-a-a)
4. [POST /auth](#3-4-cadastra-uma-chave-de-api-a-href-3-rotas-a-href-stone-customer-api-a-a)
5. [GET /auth/:email](#3-5-busca-uma-chave-de-api-pelo-email-a-href-3-rotas-a-href-stone-customer-api-a-a)


### 3.1) Cadastra um novo cliente. [&uarr;](#3-rotas-a-href-stone-customer-api-a)

Essa rota cadastra informações de um cliente.

| Syntax      								| Description 												|
| :---        								| :---			  												|
|	**Método:**									|	POST																|
|	**Rota:**										|	/customer														|
|	**Parâmetros:**							|	nenhum															|
| **Cabeçalho:** 							|	Authorization: Bearer <token> 	|
|															|	Content-Type: application/json			|
|	**Corpo da requisição:**		|	{ "document": <number>, "name": <string> }	|
|	**Resposta de sucesso:**		|	{ "id": <string>, "document": <number>, "name": <string> }	|
|	**Resposta de erro:**				|	{ "statusCode": <number>, "error": <string> }	|
|	**Exemplo de requisição:** 	|	curl --location --request POST 'http://orionsoft.site/stone-customer-api/api/v1/customer/' --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIi' --header 'Content-Type: application/json' --data '{ "document": 1, "name": "Paulo dos Santos" }' |

### 3.2) Atualiza um cliente. [&uarr;](#3-rotas-a-href-stone-customer-api-a)

Essa rota atualiza as informações de um cliente.

| Syntax      								| Description 												|
| :---        								| :---			  												|
|	**Método:**									|	PUT																	|
|	**Rota:**										|	/customer/:id													|
|	**Parâmetros:**							|	nenhum															|
| **Cabeçalho:** 							|	Authorization: Bearer <token> 	|
|															|	Content-Type: application/json			|
|	**Corpo da requisição:**		|	{ "document": <number>, "name": <string> }	|
|	**Resposta de sucesso:**		|	{ "id": <string>, "document": <number>, "name": <string> }	|
|	**Resposta de erro:**				|	{ "statusCode": <number>, "error": <string> }	|
|	**Exemplo de requisição:** 	|	curl --location --request PUT 'http://orionsoft.site/stone-customer-api/api/v1/customer/e57a5d8f-92cc-426b-b9a9-de5523d5f75b' --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIi' --header 'Content-Type: application/json' --data '{ "document": 1, "name": "Paulo dos Santos" }' |

### 3.3) Busca um cliente pelo ID [&uarr;](#3-rotas-a-href-stone-customer-api-a)

Essa rota busca um cliente pelo ID atribuído no momento criação do cadastro.

| Syntax      								| Description 												|
| :---        								| :---			  												|
|	**Método:**									|	GET																	|
|	**Rota:**										|	/customer/:id												|
|	**Parâmetros:**							|	nenhum															|
| **Cabeçalho:** 							|	Authorization: Bearer <token> 			|
|															|	Content-Type: application/json			|
|	**Corpo da requisição:**		|	vazio																|
|	**Resposta de sucesso:**		|	{ "id": <string>, "document": <number>, "name": <string> }	|
|	**Resposta de erro:**				|	{ "statusCode": <number>, "error": <string> }	|
|	**Exemplo de requisição:** 	|	curl --location --request GET 'http://orionsoft.site/stone-customer-api/api/v1/customer/e57a5d8f-92cc-426b-b9a9-de5523d5f75b' --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIi' --header 'Content-Type: application/json' |

### 3.4) Cadastra uma chave de API. [&uarr;](#3-rotas-a-href-stone-customer-api-a)

Essa rota cria uma Chave de API <token> para ser usada nas requisições.

| Syntax      								| Description 												|
| :---        								| :---			  												|
|	**Método:**									|	POST																|
|	**Rota:**										|	/auth														|
|	**Parâmetros:**							|	nenhum															|
| **Cabeçalho:** 							|	Content-Type: application/json 	|
|	**Corpo da requisição:**		|	{ "email": <string> }	|
|	**Resposta de sucesso:**		|	{ "bearer_token": <string> }	|
|	**Resposta de erro:**				|	{ "statusCode": <number>, "error": <string> }	|
|	**Exemplo de requisição:** 	|	curl --location --request POST 'http://orionsoft.site/stone-customer-api/api/v1/auth/' --header 'Content-Type: application/json' --data-raw '{ "email": "someuser@example.com" } |

### 3.5) Busca uma chave de API pelo email. [&uarr;](#3-rotas-a-href-stone-customer-api-a)

Essa rota busca uma Chave de API <token> pelo email.

| Syntax      								| Description 												|
| :---        								| :---			  												|
|	**Método:**									|	GET																	|
|	**Rota:**										|	/auth/:email												|
|	**Parâmetros:**							|	nenhum															|
| **Cabeçalho:** 							|	Content-Type: application/json			|
|	**Corpo da requisição:**		|	vazio																|
|	**Resposta de sucesso:**		|	{ "bearer_token": <string> }	|
|	**Resposta de erro:**				|	{ "statusCode": <number>, "error": <string> }	|
|	**Exemplo de requisição:** 	|	curl --location --request GET 'http://orionsoft.site/stone-customer-api/api/v1/auth/someuser@example.com'' --header 'Content-Type: application/json' |


## 4) Mensagens de erro [&uarr;](#stone-customer-api)

Todas as mensagens de erro retornam o seguinte formato:

```json
{
	"statusCode": 400,
	"error": "cliente não encontrado"
}
```
As principais mensagens de erro são:

| Código  | Descrição 									|	Significado 										|
| :---    | :---			  								|	:---			  									|	
|	**400**	|	requisição inválida					|	As informações enviadas na requisição estão incorretas	|
|	**401**	|	não autorizado							|	<token> inválido ou não informado		|
|	**404**	|	cliente inexistente					|	Cliente não encontrado					|
|	**405**	|	token inexistente						|	Token não encontrado					|
|	**500**	|	erro interno do servidor		|	Alguma condição não esperada ocorreu					|
| **502**	|	cache indisponivel					|	Acesso momentâneamente indisponível ao cache		|
| **503**	|	sso indisponivel						|	Acesso momentâneamente indisponível ao serviço de autenticação		|


## 5) Limitação de requisições [&uarr;](#stone-customer-api)

A API está limitada a 100 requisições por minuto por usuário. Caso esse limite seja atingido, a API retornará o seguinte erro:

```json
{
	"statusCode": 429,
	"error": "Excedido o limite de requisições"
}
```


## 6) Registro de alterações [&uarr;](#stone-customer-api)

- 14/08/2023:		Ajustes na documentação.
- 10/08/2023:		Início da operação da API.
...


## 7) Exemplos [&uarr;](#stone-customer-api)

1. [Cadastra um novo cliente](#7-1-cadastra-um-cliente-a-href-7-exemplos-a-href-stone-customer-api-a-a)
2. [Atualiza um cliente](#7-2-atualiza-um-cliente-a-href-7-exemplos-a-href-stone-customer-api-a-a)
3. [Busca um cliente pelo ID](#7-3-busca-um-cliente-a-href-7-exemplos-a-href-stone-customer-api-a-a)
4. [Cadastra uma chave de API](#7-4-cadastra-uma-chave-de-api-a-href-7-exemplos-a-href-stone-customer-api-a-a)
5. [Busca uma chave de API pelo email](#7-5-busca-uma-chave-de-api-pelo-email-a-href-7-exemplos-a-href-stone-customer-api-a-a)

Alguns exemplos de requisições nas linguagens mais populares:

Obs: O <token> foi encurtado para fins de demonstração. O <token> completo possui 1080 caracteres alphanuméricos.

### 7.1) Cadastra um cliente [&uarr;](#7-exemplos-a-href-stone-customer-api-a)

```
/// Node.js

const axios = require('axios');

let data = JSON.stringify({
	"document": "1",
	"name": "Paulo dos Santos"
});

let config = {
	method: 'post',
	url: 'http://orionsoft.site/stone-customer-api/api/v1/customer/',
	headers: { 
		'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIy', 
		'Content-Type': 'application/json'
	},
	data : data
};

axios.request(config)
	.then((response) => {
		console.log(JSON.stringify(response.data));
	})
	.catch((error) => {
		console.log(error);
});

```

```
/// Python

import requests
import json

url = "http://orionsoft.site/stone-customer-api/api/v1/customer/"

payload = json.dumps({
	"document": "1",
	"name": "Paulo dos Santos"
})
headers = {
	'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIy',
	'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

```
```
/// Javascript

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIy");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
	"document": "1",
	"name": "Paulo dos Santos"
});

var requestOptions = {
	method: 'POST',
	headers: myHeaders,
	body: raw,
	redirect: 'follow'
};

fetch("http://orionsoft.site/stone-customer-api/api/v1/customer/", requestOptions)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));
```

### 7.2) Atualiza um cliente [&uarr;](#7-exemplos-a-href-stone-customer-api-a)

```
/// Node.js

const axios = require('axios');
let data = JSON.stringify({
  "document": 4,
  "name": "Frank Sinatra da Silveira"
});

let config = {
	method: 'put',
	maxBodyLength: Infinity,
	url: 'http://orionsoft.site/stone-customer-api/api/v1/customer/e57a5d8f-92cc-426b-b9a9-de5523d5f75b',
	headers: { 
		'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIy', 
		'Content-Type': 'application/json'
	},
	data : data
};

axios.request(config)
	.then((response) => {
		console.log(JSON.stringify(response.data));
	})
	.catch((error) => {
		console.log(error);
});

```

```
/// Python

import requests
import json

url = "http://orionsoft.site/stone-customer-api/api/v1/customer/e57a5d8f-92cc-426b-b9a9-de5523d5f75b"

payload = json.dumps({
	"document": 4,
	"name": "Frank Sinatra da Silveira"
})
headers = {
	'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIy',
	'Content-Type': 'application/json'
}

response = requests.request("PUT", url, headers=headers, data=payload)

print(response.text)

```

```
/// Javascript

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIy");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
	"document": 4,
	"name": "Frank Sinatra da Silveira"
});

var requestOptions = {
	method: 'PUT',
	headers: myHeaders,
	body: raw,
	redirect: 'follow'
};

fetch("http://orionsoft.site/stone-customer-api/api/v1/customer/e57a5d8f-92cc-426b-b9a9-de5523d5f75b", requestOptions)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));
```

### 7.3) Busca um cliente [&uarr;](#7-exemplos-a-href-stone-customer-api-a)

```
/// Node.js

const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://orionsoft.site/stone-customer-api/api/v1/customer/37096c8a-231d-4b9d-a5d6-62baedc939be',
  headers: { 
		'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIy'
  }
};

axios.request(config)
	.then((response) => {
		console.log(JSON.stringify(response.data));
	})
	.catch((error) => {
		console.log(error);
});
```

```
/// Python

import requests

url = "http://orionsoft.site/stone-customer-api/api/v1/customer/37096c8a-231d-4b9d-a5d6-62baedc939be"

payload = {}
headers = {
	'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIy'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

```
/// Javascript

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIy");

var requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow'
};

fetch("http://orionsoft.site/stone-customer-api/api/v1/customer/37096c8a-231d-4b9d-a5d6-62baedc939be", requestOptions)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));
```

### 7.4) Cadastra uma chave de API [&uarr;](#7-exemplos-a-href-stone-customer-api-a)

```
const axios = require('axios');
let data = JSON.stringify({
  "email": "someuser@example.com"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:3030/auth',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

```
/// Python

import requests
import json

url = "http://localhost:3030/auth"

payload = json.dumps({
  "email": "someuser@example.com"
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

```
```
/// Javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "email": "someuser@example.com"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3030/auth", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### 7.5) Busca uma chave de API pelo email [&uarr;](#7-exemplos-a-href-stone-customer-api-a)

```
/// Node.js

const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:3030/auth/someuser@example.com',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

```
/// Python

import requests

url = "http://localhost:3030/auth/someuser@example.com"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

```
/// Javascript

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:3030/auth/someuser@example.com", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

## 8) Suporte e contato [&uarr;](#stone-customer-api)

Para suporte e contato, envie um email para `suporte@orionsoft.site`