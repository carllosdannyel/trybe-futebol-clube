import { Router } from 'express';

import MatchesController from '../controllers/matches';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', (req, res) => matchesController.findMatches(req, res));

export default matchesRouter;
