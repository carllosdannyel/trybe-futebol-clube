import { Router } from 'express';
import TeamsController from '../controllers/teams';

const teamsRouter = Router();

const teamsController = new TeamsController();

teamsRouter.get('/', (req, res) => teamsController.findAllTeams(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.findTeamById(req, res));

export default teamsRouter;
