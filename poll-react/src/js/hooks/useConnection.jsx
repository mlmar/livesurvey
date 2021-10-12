import { useState, useEffect } from "react";
import surveyService from "../service/SurveyService";

// determine if server is live (needed because heroku instance goes to sleep)
// returns status where 2 = connected, 1 = connecting, null = no connection
const useConnection = () => {
  const [status, setStatus] = useState(1);

  useEffect(() => {
    let mounted = false;
    const fetch = async() => {
      mounted = true;
      const response = await surveyService.ping();
      if(mounted) {
        if(response) {
          setStatus(2);
        } else {
          setStatus(null);
        }
      }
    }
    fetch();
    return () => { mounted = false };
  }, [])
  
  return status;
}

export default useConnection;