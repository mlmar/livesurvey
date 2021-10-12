import HTTPService from "./HTTPService";
import { SERVER_URL } from '../util/SystemUtil';

class SurveyService extends HTTPService {
  async createSurvey(survey) {
    const response = await post(SERVER_URL + '/create', { survey });
    if(!response) {
      throw new Error("Error connecting to server");
    } else {
      return response;
    }
  }
}

const surveyService = new SurveyService();
export default surveyService;