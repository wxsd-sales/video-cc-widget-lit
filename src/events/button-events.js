import { enableDrag } from "../utils/self-view-drag";
export function bindButtonEvents(
  meeting,
  Desktop,
  interactionId,
  hangup,
  videoMuteOff,
  videoMuteOn,
  audioMuteOff,
  audioMuteOn,
  hideSelfView,
  showSelfView,
  self,
  dropdownButton,
  dropdown,
  remoteView
) {
  hangup.addEventListener("click", async () => {
    meeting.leave();
    await Desktop.agentContact.end({
      interactionId: interactionId,
    });
  });

  videoMuteOff.addEventListener("click", () => {
    meeting.muteVideo();
    videoMuteOff.style.display = "none";
    videoMuteOn.style.display = "";
  });

  videoMuteOn.addEventListener("click", () => {
    meeting.unmuteVideo();
    videoMuteOff.style.display = "";
    videoMuteOn.style.display = "none";
  });

  audioMuteOff.addEventListener("click", () => {
    meeting.muteAudio();
    audioMuteOff.style.display = "none";
    audioMuteOn.style.display = "";
  });

  audioMuteOn.addEventListener("click", () => {
    meeting.unmuteAudio();
    audioMuteOff.style.display = "";
    audioMuteOn.style.display = "none";
  });

  hideSelfView.addEventListener("click", () => {
    self.style.display = "none";
    hideSelfView.style.display = "none";
    showSelfView.style.display = "";
  });

  showSelfView.addEventListener("click", () => {
    self.style.display = "";
    hideSelfView.style.display = "";
    showSelfView.style.display = "none";
  });

  dropdownButton.addEventListener("click", () => {
    dropdown.classList.toggle("is-active");
  });

  if (self) {
    enableDrag(self, remoteView);
  }
}
