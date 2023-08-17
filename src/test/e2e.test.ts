require('dotenv').config();
const axios = require('axios');

const apiPort = process.env.API_PORT || 3030;
let bearerToken = '';
let customerId = '';
const docnum = Math.floor(Math.random() * 1000);

// Testa se a documentação da API está disponível.
test('Get the API Reference', async () => {
	const response = await axios.get(`http://localhost:${apiPort}/reference`);
	expect(response.status).toBe(200);
	expect(response.headers['content-type']).toContain('text/html');
	const wordFound = new RegExp('Stone Customer API', 'i').test(response.data);
	expect(wordFound).toBe(true);
});

// Testa se um token válido é obtido do SSO
// e salva no cache por 5 minutos.
test('Cadastra uma chave de API', async () => {
	const headers = { 'Content-Type': 'application/json' };
	const postData = { email: 'mailbox@example.com' };
	const response = await axios.post(
		`http://localhost:${apiPort}/auth`,
		postData,
		{ headers },
	);
	expect(response.status).toBe(201);
	expect(response.headers['content-type']).toContain('application/json');
	expect(response.data).toHaveProperty('bearer_token');
});

// Testa se o token está disponivel no cache.
// O teste anterior já adiciona o token no cache
// mas o token expira após 5 minutos.
test('Busca uma chave de API pelo email', async () => {
	const response = await axios.get(
		`http://localhost:${apiPort}/auth/mailbox@example.com`,
	);
	expect(response.status).toBe(200);
	expect(response.headers['content-type']).toContain('application/json');
	expect(response.data).toHaveProperty('bearer_token');
	bearerToken = response.data.bearer_token;
});

// Testa se o cliente foi cadastrado no sistema.
test('Cadastra um novo cliente', async () => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${bearerToken}`,
	};
	const postData = {
		document: docnum,
		name: 'John Doe',
	};
	const response = await axios.post(
		`http://localhost:${apiPort}/customer/`,
		postData,
		{ headers },
	);
	expect(response.status).toBe(201);
	expect(response.headers['content-type']).toContain('application/json');
	expect(response.data).toHaveProperty('id');
	customerId = response.data.id;
});

// Testa se o cliente foi encontrado pelo ID.
test('Busca um cliente pelo ID', async () => {
	const headers = {
		Authorization: `Bearer ${bearerToken}`,
	};
	const response = await axios.get(
		`http://localhost:${apiPort}/customer/${customerId}`,
		{ headers },
	);
	expect(response.status).toBe(200);
	expect(response.headers['content-type']).toContain('application/json');
	expect(response.data).toHaveProperty('id');
	expect(response.data.id).toBe(customerId);
});

// Testa se o cliente foi atualizado no sistema.
test('Atualiza um cliente', async () => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${bearerToken}`,
	};
	const postData = {
		document: docnum,
		name: 'John Doe Hero',
	};
	const response = await axios.put(
		`http://localhost:${apiPort}/customer/${customerId}`,
		postData,
		{ headers },
	);
	expect(response.status).toBe(200);
	expect(response.headers['content-type']).toContain('application/json');
	expect(response.data).toHaveProperty('id');
	expect(response.data.id).toBe(customerId);
});
