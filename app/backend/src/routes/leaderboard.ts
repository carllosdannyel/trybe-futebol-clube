import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard';

const leaderboardRouter = Router();
const leaderboard = new LeaderboardController();

leaderboardRouter.get(
  '/home',
  (req, res) => leaderboard.leaderBoardHome(req, res),
);
leaderboardRouter.get(
  '/away',
  (req, res) => leaderboard.leaderBoardAway(req, res),
);

export default leaderboardRouter;
