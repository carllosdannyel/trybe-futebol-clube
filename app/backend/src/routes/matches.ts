import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';

import MatchesController from '../controllers/matches';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get(
  '/',
  (req, res) => matchesController.findMatches(req, res),
);
matchesRouter.post(
  '/',
  authMiddleware,
  (req, res) => matchesController.createMatches(req, res),
);
matchesRouter.patch(
  '/:id/finish',
  authMiddleware,
  (req, res) => matchesController.finishMatches(req, res),
);

export default matchesRouter;
