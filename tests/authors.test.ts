import { request, prisma } from './setup';

describe('Authors API', () => {
  let authorId: number;

  test('POST /api/authors - Criar novo autor', async () => {
    const response = await request
      .post('/api/authors')
      .send({
        name: 'Autor Teste',
        email: 'autor@test.com',
        password: 'senha123'
      })
      .expect(201);

    authorId = response.body.id;
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('autor@test.com');
  });

  test('GET /api/authors - Listar autores', async () => {
    const response = await request
      .get('/api/authors?page=1&limit=10')
      .expect(200);

    expect(Array.isArray(response.body.data)).toBeTruthy();
    expect(response.body).toHaveProperty('total');
  });

  test('GET /api/authors/:id - Obter autor específico', async () => {
    const response = await request
      .get(`/api/authors/${authorId}`)
      .expect(200);

    expect(response.body.id).toBe(authorId);
  });

  test('PUT /api/authors/:id - Atualizar autor', async () => {
    const response = await request
      .put(`/api/authors/${authorId}`)
      .send({ bio: 'Bio atualizada' })
      .expect(200);

    expect(response.body.bio).toBe('Bio atualizada');
  });

  test('DELETE /api/authors/:id - Remover autor', async () => {
    await request
      .delete(`/api/authors/${authorId}`)
      .expect(200);

    const deletedAuthor = await prisma.author.findUnique({
      where: { id: authorId }
    });
    expect(deletedAuthor).toBeNull();
  });
});