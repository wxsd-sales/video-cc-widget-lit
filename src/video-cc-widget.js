// main-component.js
import { LitElement, html, css } from "lit";
import style from "./style.scss";
import { initWebex, createMeeting } from "./meeting/webex.js";
import { handleMeetingEvents } from "./events/event.js";
import { videoControlsTemplate } from "./video-controls-template.js";
import { Desktop } from "@wxcc-desktop/sdk";
import { waitForEndTask } from "./contactCenterTasks/end-task.js";

export class WXSDVideoCCWidget extends LitElement {
  static get styles() {
    return [style];
  }

  async connectedCallback() {
    super.connectedCallback();
    this.init();
    this.webex = null;
    this.meeting = null;
  }

  async init() {
    try {
      var videoDestinationSDK = null;
      var interactionId = null;
      Desktop.config.init({
        widgetName: "widgetName",
        widgetProvider: "widgetProvider",
      });
      const accessTokenSDK = await Desktop.actions.getToken();
      const currentTaskMap = await Desktop.actions.getTaskMap();
      for (const iterator of currentTaskMap) {
        console.log("iterator", iterator[1]);
        interactionId = iterator[1].interactionId;
        videoDestinationSDK =
          iterator[1].interaction.callAssociatedData.videoCallDestination.value;
        console.log("videoDestinationSDK", videoDestinationSDK);
      }
      this.webex = await initWebex(accessTokenSDK);
      this.meeting = await createMeeting(
        this.webex,
        videoDestinationSDK,
        this.renderRoot
      );
      await handleMeetingEvents(
        this.meeting,
        this.renderRoot,
        Desktop,
        interactionId
      );
      await waitForEndTask(Desktop, this.meeting);
    } catch (error) {
      console.error("Initialization Error", error);
    }
  }

  render() {
    return html`
      <style>
        @import url("https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css");
      </style>
      <main>
        <div id="videos" style="display: flex">
          <div class="columns is-multiline">
            <div class="column is-full" style="margin-bottom: -0.75rem">
              <div id="self">
                <video id="self-view" muted autoplay playsinline></video>
              </div>
              <div id="remote-view">
                <audio id="remote-view-audio" autoplay playsinline></audio>
                <video id="remote-view-video" autoplay playsinline></video>
                <div id="remote-view-stats">
                  <div id="remote-view-stats-resolution"></div>
                </div>
              </div>
            </div>
            <div class="column is-full" style="margin-top: -0.75rem">
              ${videoControlsTemplate()}
            </div>
          </div>
        </div>
        <div id="loading-container">
          <span>Loading...</span>
        </div>
      </main>
    `;
  }
}

window.customElements.define("video-cc-widget", WXSDVideoCCWidget);
