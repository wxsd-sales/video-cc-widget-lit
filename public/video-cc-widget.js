/*! For license information please see video-cc-widget.js.LICENSE.txt */
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
              ${B`
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
        <img src=${ye()} class="mr-1" />Stop Video
      </button>
      <button
        id="video-mute-on"
        class="button is-rounded is-dark is-small"
        alt="Mute video"
        type="button"
        aria-label="mute video"
        style="display:none"
      >
        <img src=${Ee()} class="mr-1" />Start Video
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
        <img src=${pe()} />Mute
      </button>
      <button
        id="audio-mute-on"
        class="button is-rounded is-dark is-small"
        alt="Mute audio"
        type="button"
        aria-label="mute audio"
        style="display:none"
      >
        <img src=${ve()} />Unmute
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
          <img src=${Se()} />
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
              src=${Ie()}
              style="vertical-align: middle; margin-right: 0.5rem;"
            />Hide self view
          </a>
          <a
            id="show-self-view"
            class="dropdown-item"
            style="display:none; align-items:center;"
          >
            <img
              src=${Ae()}
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
        <img src=${fe()} />
      </button>
    </div>
  </div>
`}
            </div>
          </div>
        </div>
      </main>
    `}})})()})();