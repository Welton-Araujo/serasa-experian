import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import AuthorService from '@services/author.service';
import { authorValidations } from '@validations/author.validation';
import ApiError from '@utils/api-error';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const authors = await new AuthorService().getAllAuthors({ page, limit });
  res.status(StatusCodes.OK).json(authors);
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const author = await new AuthorService().getAuthorById(id);
  res.status(StatusCodes.OK).json(author);
});

router.post('/', authorValidations, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Validation error', errors.array());
  }

  const author = await new AuthorService().createAuthor(req.body);
  res.status(StatusCodes.CREATED).json(author);
});

router.put('/:id', authorValidations, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Validation error', errors.array());
  }

  const id = parseInt(req.params.id);
  const author = await new AuthorService().updateAuthor(id, req.body);
  res.status(StatusCodes.OK).json(author);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const author = await new AuthorService().deleteAuthor(id);
  res.status(StatusCodes.OK).json(author);
});

export default router;