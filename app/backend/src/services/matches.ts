import { Op } from 'sequelize';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  private matches = Matches;

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
}
