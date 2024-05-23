// events.js
import { bindButtonEvents } from "./button-events.js";
import { bindMeetingEvents } from "./meeting-events.js";
import { joinMeeting } from "../meeting/join-meeting.js";

export async function handleMeetingEvents(meeting, root) {
  bindMeetingEvents(
    meeting,
    root.querySelector("#self-view"),
    root.querySelector("#remote-view-video"),
    root.querySelector("#remote-view-audio"),
    root.querySelector("#buttons-container"),
    root.querySelector("#loading-container")
  );
  bindButtonEvents(
    meeting,
    root.querySelector("#hangup"),
    root.querySelector("#video-mute-off"),
    root.querySelector("#video-mute-on"),
    root.querySelector("#audio-mute-off"),
    root.querySelector("#audio-mute-on"),
    root.querySelector("#hide-self-view"),
    root.querySelector("#show-self-view"),
    root.querySelector("#self"),
    root.querySelector("#dropdown-button"),
    root.querySelector(".dropdown"),
    root.querySelector("#remote-view")
  );
  await joinMeeting(meeting);
}
