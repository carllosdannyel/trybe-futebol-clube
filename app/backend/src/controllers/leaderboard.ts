import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard';
import Exception from '../utils/httpException';

export default class LeaderboardController {
  private leaderboard = new LeaderboardService();

  public async leaderBoardHome(req: Request, res: Response) {
    const { status, message } = await this.leaderboard.leaderBoardHome() as unknown as Exception;
    if (status) return res.status(status).json({ message });
    res.status(200).json(message);
  }

  public async leaderBoardAway(req: Request, res: Response) {
    const { status, message } = await this.leaderboard.leaderBoardAway() as unknown as Exception;
    if (status) return res.status(status).json({ message });
    res.status(200).json(message);
  }

  public async leaderBoard(req: Request, res: Response) {
    const { status, message } = await this.leaderboard.leaderBoard() as unknown as Exception;
    if (status) return res.status(status).json({ message });
    res.status(200).json(message);
  }
}
