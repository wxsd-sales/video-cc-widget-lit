import { handleError } from "../utils/handle-error";
export function bindMeetingEvents(
  meeting,
  selfView,
  remoteViewVideo,
  remoteViewAudio,
  buttonsContainer,
  loadingContainer
) {
  meeting.on("error", (error) => handleError(error, "Meeting Error"));

  meeting.on("media:ready", (media) => {
    if (!media) return;

    const element =
      media.type === "local"
        ? selfView
        : media.type === "remoteVideo"
        ? remoteViewVideo
        : media.type === "remoteAudio"
        ? remoteViewAudio
        : null;

    if (element) {
      element.srcObject = media.stream;
      buttonsContainer.style.display = "flex";
      loadingContainer.style.display = "none";
    }
  });

  meeting.on("media:stopped", (media) => {
    const element =
      media.type === "local"
        ? selfView
        : media.type === "remoteVideo"
        ? remoteViewVideo
        : media.type === "remoteAudio"
        ? remoteViewAudio
        : null;

    if (element) {
      element.srcObject = null;
      buttonsContainer.style.display = "none";
    }
  });
}
