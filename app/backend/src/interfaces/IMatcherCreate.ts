export interface IGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatcherCreate extends IGoals {
  homeTeam: number;
  awayTeam: number;
}

export default interface IMatcherCreateId extends IMatcherCreate {
  id?: number;
  inProgress: boolean;
}
