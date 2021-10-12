import HTTPService from "./HTTPService";
import { SERVER_URL } from '../util/SystemUtil';

class SurveyService extends HTTPService {
  async ping() {
    const response = await this.get(SERVER_URL + '/ping');
    return response;
  }
}

const surveyService = new SurveyService();
export default surveyService;