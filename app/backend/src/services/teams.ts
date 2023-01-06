import IResponse from '../interfaces/IResponse';
import Teams from '../database/models/Teams';

export default class TeamsService {
  private teams = Teams;

  public async allTeams() {
    return this.teams.findAll();
  }

  public async findAllTeams(): Promise<IResponse> {
    const teams = await this.allTeams();

    return { status: null, message: teams };
  }

  public async findTeamById(id: number): Promise<IResponse> {
    const teams = await this.teams.findByPk(id);

    return { status: null, message: teams };
  }
}
