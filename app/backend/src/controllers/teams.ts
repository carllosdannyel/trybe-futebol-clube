import { Request, Response } from 'express';
import TeamsService from '../services/teams';

export default class TeamsController {
  private teamsService = new TeamsService();

  public async findAllTeams(_req: Request, res: Response) {
    const { status, message } = await this.teamsService.findAllTeams();
    if (status) return res.status(status as number).json({ message });
    res.status(200).json(message);
  }

  public async findTeamById(req: Request, res: Response) {
    const { status, message } = await this.teamsService.findTeamById(+req.params.id);
    if (status) return res.status(status as number).json({ message });
    res.status(200).json(message);
  }
}
