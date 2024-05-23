import { handleError } from "../utils/handle-error";

export function waitForEndTask(Desktop, meeting) {
  try {
    Desktop.agentContact.addEventListener("eAgentContactEnded", () => {
      if (meeting) {
        meeting.leave();
        console.log("mylogging: Meeting ended");
      }
    });
  } catch (error) {
    handleError(error, "End Meeting Error");
  }
}
