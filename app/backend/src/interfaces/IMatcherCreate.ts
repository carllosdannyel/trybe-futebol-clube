export interface IMatcherCreate {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default interface IMatcherCreateId extends IMatcherCreate {
  id: number;
  inProgress: boolean;
}
