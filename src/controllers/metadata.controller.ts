import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import MetadataService from '@services/metadata.service';
import { metadataValidations } from '@validations/metadata.validation';
import ApiError from '@utils/api-error';

const router = Router();

router.get('/post/:postId', async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const metadata = await new MetadataService().getPostMetadata(postId);
  res.status(StatusCodes.OK).json(metadata);
});

router.get('/author/:authorId', async (req: Request, res: Response) => {
  const authorId = parseInt(req.params.authorId);
  const metadata = await new MetadataService().getAuthorMetadata(authorId);
  res.status(StatusCodes.OK).json(metadata);
});

router.post('/', metadataValidations, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Validation error', errors.array());
  }

  const metadata = await new MetadataService().createMetadata(req.body);
  res.status(StatusCodes.CREATED).json(metadata);
});

router.put('/:id', metadataValidations, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Validation error', errors.array());
  }

  const id = parseInt(req.params.id);
  const metadata = await new MetadataService().updateMetadata(id, req.body);
  res.status(StatusCodes.OK).json(metadata);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const metadata = await new MetadataService().deleteMetadata(id);
  res.status(StatusCodes.OK).json(metadata);
});

export default router;
