// templates.js
import { html } from "lit";
import cancelSvg from "./assets/cancel-bold.svg";
import unmuteSvg from "./assets/microphone-on-bold.svg";
import muteSvg from "./assets/microphone-muted-bold.svg";
import videoSvg from "./assets/camera-bold.svg";
import videoMuteSvg from "./assets/camera-muted-bold.svg";
import moreSvg from "./assets/more-bold.svg";
import showSvg from "./assets/show-bold.svg";
import hideSvg from "./assets/hide-bold.svg";

export const videoControlsTemplate = () => html`
  <div
    id="buttons-container"
    class="buttons-container pt-4 pb-4"
    style="display:none"
  >
    <div id="video-mute-div" class="mr-2">
      <button
        id="video-mute-off"
        class="button is-rounded is-dark is-small"
        alt="Mute video"
        type="button"
        aria-label="mute video"
      >
        <img src=${videoSvg} class="mr-1" />Stop Video
      </button>
      <button
        id="video-mute-on"
        class="button is-rounded is-dark is-small"
        alt="Mute video"
        type="button"
        aria-label="mute video"
        style="display:none"
      >
        <img src=${videoMuteSvg} class="mr-1" />Start Video
      </button>
    </div>

    <div id="audio-mute-div" class="mr-2">
      <button
        id="audio-mute-off"
        class="button is-rounded is-dark is-small"
        alt="Mute audio"
        type="button"
        aria-label="mute audio"
      >
        <img src=${unmuteSvg} />Mute
      </button>
      <button
        id="audio-mute-on"
        class="button is-rounded is-dark is-small"
        alt="Mute audio"
        type="button"
        aria-label="mute audio"
        style="display:none"
      >
        <img src=${muteSvg} />Unmute
      </button>
    </div>

    <div class="dropdown is-up mr-2">
      <div class="dropdown-trigger">
        <button
          id="dropdown-button"
          title="option"
          type="button"
          class="button is-rounded is-dark is-small"
        >
          <img src=${moreSvg} />
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a
            id="hide-self-view"
            class="dropdown-item"
            style="display:flex; align-items:center;"
          >
            <img
              src=${hideSvg}
              style="vertical-align: middle; margin-right: 0.5rem;"
            />Hide self view
          </a>
          <a
            id="show-self-view"
            class="dropdown-item"
            style="display:none; align-items:center;"
          >
            <img
              src=${showSvg}
              style="vertical-align: middle; margin-right: 0.5rem;"
            />Show self view
          </a>
        </div>
      </div>
    </div>

    <div id="cancel">
      <button
        id="hangup"
        title="hangup"
        type="button"
        class="button is-rounded button-red is-small"
      >
        <img src=${cancelSvg} />
      </button>
    </div>
  </div>
`;
