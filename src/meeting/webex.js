// webex.js
import Webex from "webex";
import { handleError } from "../utils/handle-error.js";

export async function initWebex(accessTokenSDK) {
  try {
    const webex = Webex.init({
      config: {
        meetings: {
          reconnection: { enabled: true },
        },
      },
      credentials: {
        access_token: accessTokenSDK,
      },
    });

    if (!webex.meetings.registered) {
      await webex.meetings.register();
      await webex.meetings.syncMeetings();
    }

    return webex;
  } catch (error) {
    handleError(error, "Connection Error");
    throw error;
  }
}

export async function createMeeting(webex, videoDestination, root) {
  try {
    const meeting = await webex.meetings.create(videoDestination);
    return meeting;
  } catch (error) {
    handleError(error, "Create Meeting Error");
    throw error;
  }
}
