import IMatcherCreateId from '../interfaces/IMatcherCreate';
import { ILeaderboard } from '../interfaces/ILeaderboard';
import ITeams from '../interfaces/ITeams';
import MatchesService from './matches';
import TeamsService from './teams';

export default class LeaderboardService {
  private matches = new MatchesService();
  private teams = new TeamsService();
  private board: ILeaderboard = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };

  private rulesValidationsHome = async (team: ITeams, matches: IMatcherCreateId[]) => {
    const board = { ...this.board };
    matches.forEach((match) => {
      if (match.homeTeam === team.id) {
        board.name = team.teamName;
        board.totalGames += 1;
        board.goalsFavor += match.homeTeamGoals;
        board.goalsOwn += match.awayTeamGoals;
        if (match.homeTeamGoals > match.awayTeamGoals) board.totalVictories += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) board.totalDraws += 1;
        if (match.homeTeamGoals < match.awayTeamGoals) board.totalLosses += 1;
        board.goalsBalance = board.goalsFavor - board.goalsOwn;
        board.totalPoints = (board.totalVictories * 3) + board.totalDraws;
        board.efficiency = ((board.totalPoints / (board.totalGames * 3)) * 100).toFixed(2);
      }
    });
    return board;
  };

  private rulesValidationsAway = async (team: ITeams, matches: IMatcherCreateId[]) => {
    const board = { ...this.board };
    matches.forEach((match) => {
      if (match.awayTeam === team.id) {
        board.name = team.teamName;
        board.totalGames += 1;
        board.goalsFavor += match.awayTeamGoals;
        board.goalsOwn += match.homeTeamGoals;
        if (match.homeTeamGoals < match.awayTeamGoals) board.totalVictories += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) board.totalDraws += 1;
        if (match.homeTeamGoals > match.awayTeamGoals) board.totalLosses += 1;
        board.goalsBalance = board.goalsFavor - board.goalsOwn;
        board.totalPoints = (board.totalVictories * 3) + board.totalDraws;
        board.efficiency = ((board.totalPoints / (board.totalGames * 3)) * 100).toFixed(2);
      }
    });
    return board;
  };

  private static sortLeaderboard = (board: ILeaderboard[]): ILeaderboard[] => (
    board.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return a.goalsOwn - b.goalsOwn;
      return 1;
    }));

  public async leaderBoardHome() {
    const teams = await this.teams.allTeams();
    const matches = await this.matches.findMatchesInProgress('false');
    if (teams && matches) {
      const teamsFiltered = await Promise.all(teams.map((team: ITeams) =>
        this.rulesValidationsHome(team, matches)));
      return {
        status: null,
        message: LeaderboardService.sortLeaderboard(teamsFiltered),
      };
    }
  }

  public async leaderBoardAway() {
    const teams = await this.teams.allTeams();
    const matches = await this.matches.findMatchesInProgress('false');
    if (teams && matches) {
      const teamsFiltered = await Promise.all(teams.map((team: ITeams) =>
        this.rulesValidationsAway(team, matches)));
      return {
        status: null,
        message: LeaderboardService.sortLeaderboard(teamsFiltered),
      };
    }
  }
}
