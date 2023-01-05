import { Op } from 'sequelize';
import { IGoals, IMatcherCreate } from '../interfaces/IMatcherCreate';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  private matches = Matches;
  private teams = Teams;

  public async findMatchesInProgress(query: string) {
    const inProgress = query !== undefined && query === 'true';

    return this.matches.findAll({
      where: { [Op.or]: [{ inProgress }] },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
  }

  public async findAllMatches() {
    return this.matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
  }

  public async findMatches(query: string) {
    const matches = await this.findAllMatches();
    if (!query || !query.length) return { status: null, message: matches };
    const matchesInProgress = await this.findMatchesInProgress(query);
    return { status: null, message: matchesInProgress };
  }

  private async findTeams(homeTeam: number, awayTeam: number) {
    const teamHome = await this.teams.findByPk(homeTeam);
    const teamAway = await this.teams.findByPk(awayTeam);
    if (!teamHome || !teamAway) return true;
    return false;
  }

  public async createMatches(body: IMatcherCreate) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    if (homeTeam === awayTeam) {
      return {
        status: 422,
        message: 'It is not possible to create a match with two equal teams',
      };
    }
    if (await this.findTeams(homeTeam, awayTeam)) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    const match = await this.matches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return { status: null, message: match };
  }

  public async finishMatches(id: string) {
    await this.matches.update({ inProgress: false }, { where: { id } });
    return { status: null, message: { message: 'Finished' } };
  }

  public async updateMatches(id: string, body: IGoals) {
    const { awayTeamGoals, homeTeamGoals } = body;
    const newMatcher = await this.matches.update(
      { awayTeamGoals, homeTeamGoals },
      { where: { id } },
    );
    return { status: null, message: newMatcher };
  }
}
