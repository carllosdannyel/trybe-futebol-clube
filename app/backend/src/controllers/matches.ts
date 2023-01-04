import { Request, Response } from 'express';
import MatchesService from '../services/matches';

export default class MatchesController {
  private matchesService = new MatchesService();

  public async findMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    console.log('inProgress', inProgress);
    const { status, message } = await this.matchesService
      .findMatches(inProgress as string);
    if (status) return res.status(status as number).json({ message });
    res.status(200).json(message);
  }
}
