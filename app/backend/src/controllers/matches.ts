import { Request, Response } from 'express';
import MatchesService from '../services/matches';

export default class MatchesController {
  private matchesService = new MatchesService();

  public async findMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { status, message } = await this.matchesService
      .findMatches(inProgress as string);
    if (status) return res.status(status as number).json({ message });
    res.status(200).json(message);
  }

  public async createMatches(req: Request, res: Response) {
    const { status, message } = await this.matchesService.createMatches(req.body);
    if (status) return res.status(status as number).json({ message });
    res.status(201).json(message);
  }

  public async finishMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { status, message } = await this.matchesService.finishMatches(id);
    if (status) return res.status(status as number).json({ message });
    res.status(200).json(message);
  }
}
