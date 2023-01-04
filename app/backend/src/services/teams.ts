import IResponse from '../interfaces/IResponse';
import Teams from '../database/models/Teams';

export default class TeamsService {
  private teams = Teams;

  public async findAllTeams(): Promise<IResponse> {
    const teams = await this.teams.findAll();

    return { status: null, message: teams };
  }

  public async findTeamById(id: number): Promise<IResponse> {
    const teams = await this.teams.findByPk(id);

    return { status: null, message: teams };
  }
}
