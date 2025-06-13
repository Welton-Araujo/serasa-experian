import { request, prisma } from './setup';

describe('Posts API', () => {
  let postId: number;
  let authorId: number;

  beforeAll(async () => {
    // Criar autor para os testes de post
    const author = await prisma.author.create({
      data: {
        name: 'Autor para Posts',
        email: 'autor.posts@test.com',
        password: 'senha123'
      }
    });
    authorId = author.id;
  });

  test('POST /api/posts - Criar novo post', async () => {
    const response = await request
      .post('/api/posts')
      .send({
        title: 'Post Teste',
        content: 'Conteúdo do post',
        authorId: authorId
      })
      .expect(201);

    postId = response.body.id;
    expect(response.body.title).toBe('Post Teste');
  });

  test('GET /api/posts - Listar posts', async () => {
    const response = await request
      .get('/api/posts?page=1&limit=10')
      .expect(200);

    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/posts/author/:authorId - Listar posts por autor', async () => {
    const response = await request
      .get(`/api/posts/author/${authorId}`)
      .expect(200);

    expect(response.body.data[0].authorId).toBe(authorId);
  });
});