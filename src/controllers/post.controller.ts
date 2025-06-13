import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import PostService from '@services/post.service';
import { postValidations } from '@validations/post.validation';
import ApiError from '@utils/api-error';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const posts = await new PostService().getAllPosts({ page, limit });
  res.status(StatusCodes.OK).json(posts);
});

router.get('/author/:authorId', async (req: Request, res: Response) => {
  const authorId = parseInt(req.params.authorId);
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const posts = await new PostService().getPostsByAuthor(authorId, { page, limit });
  res.status(StatusCodes.OK).json(posts);
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const post = await new PostService().getPostById(id);
  res.status(StatusCodes.OK).json(post);
});

router.post('/', postValidations, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Validation error', errors.array());
  }

  const post = await new PostService().createPost(req.body);
  res.status(StatusCodes.CREATED).json(post);
});

router.put('/:id', postValidations, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Validation error', errors.array());
  }

  const id = parseInt(req.params.id);
  const post = await new PostService().updatePost(id, req.body);
  res.status(StatusCodes.OK).json(post);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const post = await new PostService().deletePost(id);
  res.status(StatusCodes.OK).json(post);
});

export default router;