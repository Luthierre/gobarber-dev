import {Op} from 'sequelize';
import { startOfDay, parseISO, endOfDay } from 'date-fns'
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class ScheduleController {
    async index(req, res) {
        const {date} = req.query;
        const checkeIsProvider = await User.findOne({
            where: {
              id: req.userId,
              provider: true,
            }
          });
          if (!checkeIsProvider) {
            return res.status(401).json({ error: 'User is not a providers.' });
          }
          const parsedDate = parseISO(date);
        const appointments = await Appointment.findAll({
          where: {
            provider_id: req.userId,
             canceled_at: null,
             date: {
                 [Op.between] : [
                     startOfDay(parsedDate), endOfDay(parsedDate)
                 ]
             } ,
          },
          order: ['date'],
          
        });
        return res.json(appointments);
      }
    }

export default new ScheduleController();