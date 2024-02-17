import { LitElement, html } from "lit";
import style from "./style.scss";

export class VoiceTriggerWorkflows extends LitElement {
  static get styles() {
    return [style];
  }

  static properties = {
    darkmode: {},
    configJSON: {},
    showButton: { type: Boolean },
    taskMap: {},
    taskSelected: {},
    _mainIsOpen: { state: true },
    _menuIsOpen: { state: true },
    _showBtn: { state: true },
    _config: { state: true },
    _selected: { sate: true },
    data: { type: Array },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String },
    ticketID: { type: String },
    timeSlot: { type: String },
  };

  constructor() {
    super();
    this.darkmode = null;
    this.configJSON = null;
    this.taskMap = null;
    this.taskSelected = null;
    this._theme = "";
    this._mainIsOpen = false;
    this._menuIsOpen = false;
    this._showBtn = false;
    this._config = null;
    this._selected = null;
    this.showButton = false;
    this.data = [];
    this.firstName = null;
    this.lastName = null;
    this.phone = null;
    this.email = null;
    this.ticketID = null;
    this.timeSlot = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    this._theme = this.setTheme();

    // Convert JSON proxy obj back into a JS Object
    this._config = JSON.parse(JSON.stringify(this.configJSON));
    this.getData();
  }

  async getData() {
    try {
      const response = await fetch(
        "https://bosch-server.wbx.ninja/requestedCallbacks",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const tempData = await response.json();

      let daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let today = new Date();
      let todayDay = daysOfWeek[today.getDay()];
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      let AMOrPM = null;
      if (currentHour >= 0 && currentHour < 12) {
        AMOrPM = "AM";
      } else {
        AMOrPM = "PM";
      }
      const callbackTime = `callback-capacity-${todayDay}-${AMOrPM}`;
      console.log("Call back time", callbackTime);
      const itemIndex = tempData.findIndex(
        (item) => item.Timeslot === callbackTime
      );
      if (itemIndex !== -1) {
        this.firstName = tempData[itemIndex].First;
        this.lastName = tempData[itemIndex].Last;
        this.phone = tempData[itemIndex].E164;
        this.email = tempData[itemIndex].Email;
        this.ticketID = tempData[itemIndex].TicketID;
        this.timeSlot = tempData[itemIndex].Timeslot;
        console.log("get data", tempData[itemIndex]);
        this.data = tempData[itemIndex];
        this.showButton = true;
        this.requestUpdate();
      } else {
        this.firstName = null;
        this.lastName = null;
        this.phone = null;
        this.email = null;
        this.ticketID = null;
        this.timeSlot = null;
        this.data = null;
        this.showButton = false;
        this.requestUpdate();
      }
    } catch (error) {
      console.error(error);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has("darkmode")) {
      this._theme = this.setTheme();
      this.requestUpdate();
    }

    if (changedProperties.has("taskSelected")) {
      if (this.taskSelected == null) {
        this._showBtn = true;
      } else if (this.taskSelected.mediaType == "telephony") {
        this._showBtn = true;
      } else {
        this._showBtn = true;
      }
    }

    // This is only needed for the dev HTML sandbox
    // The ConfigJSON does not change once loaded in the agent desktop
    if (changedProperties.has("configJSON")) {
      this._config = JSON.parse(JSON.stringify(this.configJSON));
    }
  }

  setTheme() {
    return this.darkmode == "true" ? "dark" : "light";
  }

  btnClicked() {
    if (this._mainIsOpen == false) {
      this._mainIsOpen = true;
      this._menuIsOpen = true;
    } else {
      this._mainIsOpen = false;
      this._menuIsOpen = false;
      if (this._selected) {
        this.cancelClicked();
      }
    }
  }
  async callClicked() {
    // Define the URL of the API you want to send the POST request to
    this._mainIsOpen = false;
    this._menuIsOpen = false;
    if (this._selected) {
      this.cancelClicked();
    }
    // Define the request body as an object
    console.log("phone number", this.phone);
    const requestBody = {
      destination: this.phone,
      entryPointId: "37a2066c-dd58-4f7e-9419-c2e99fa8e1ab",
      attributes: { channel: "sales" },
      outboundType: "CALLBACK",
      mediaType: "telephony",
      callback: {
        callbackOrigin: "web",
        callbackType: "immediate",
      },
    };
    // Make the POST request
    await fetch("https://api.wxcc-us1.cisco.com/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiJ9.eyJjbHVzdGVyIjoiUEU5MyIsInByaXZhdGUiOiJleUpqZEhraU9pSktWMVFpTENKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVpHbHlJbjAuLjhHSnJ4akprQUtPZVBJQ21rNXU5M2cuakdSdTczOW81WHNvM2ZnWFpVV1VhZzRxd09NenFGVHN5cnhWM21Sb0NzQXJZclppdkVrWEloSWNDVXBpdmhnY2gtZTZPUGpUdzRvWG5taVM4YkFHZFZWaWctT3h0RUZCcHpPYzFhczg3YUR1VzB0WFRRb1hsdjlxZzRCbkROMmt1WWNoRV9BSmwwMklyd3MtMGdNN293MVpmWnZhcFRMRkJQRHhId3dQcjhyNzJlTThfSXpBZUpScDhrVDd1VzJFb0dadFVFV2poSHNJNkhKRjFuLXBuV0RkSGR2eVRPODdZWUYxQVo1YkdlQThJemR4bmRCSVBtN01SRkhhb0ZfWjc3ck9qaUktMEp4cEIwcXlvZ3QydlVDRm01U3NXTTJZdzFkQmNaVWVkbFNlQnFUcGhIeWZ6dUQxaVZhRlQ4YXZlTWQ0Y3JYYmUxcUdMTGJySlo5Z1M0dkUtVkc5SUw5eVVMQjZMeVNOUUJhX0dOMm84UFlmUVNfeDd1SHZqekFXMnpwM1JMbkNJcGQwOFlPa0ozRWIwT25ORERjRURVRDFmdzRSWDJ3OXJ4SHZhWlNrcENSTFpiQWd2WjNSYnp5cUhLNUIzUjYzaDRJMldlMW9BX285YWVYbFZ3RURSSFZNTXBGeFBTX1A1OG4zbzMtWkhMS2h4UXpqZUUtcUVycTBncWM1QjQ4bExBNVVyUmhONU5pNEVsRXdLMk14SjRxVW9JZm5uVVdmdi13d3R6WjJwZ0FpUG5ERlNIODlScXdibF83SDZ5QVU5blhlRTVZc1FMcDdWdGxONzZ5UGdEakVDNGFVMFJ2S2hsOFE3WFJxNVVOd0ZLZDNpUUQ3WG9ya244YUZhb2VZdnVoRmZFWjF4XzhKVWNCMHZRYjRfSXI2WE4xYmwwQi1HdTc1a1NKZ293WXBERWJ4Y29MVnpsa1BNbjUyMThaR3lDTkRxaHd0NFc0WVhnLjI0czBxR1RlcmZMQ2dZcWtGU2lSemciLCJ1c2VyX3R5cGUiOiJ1c2VyIiwidG9rZW5faWQiOiJBYVozcjBZVFk1TVRObU1XWXRORGd5TUMwME56UXdMV0k1TURrdE16TXlaV1ppTlRZMFpEQmxOalF6TW1Fd1lXRXRORGc0IiwicmVmZXJlbmNlX2lkIjoiNDdkNWU0MDUtYjY0Ni00MWEzLThiNTYtNWFjY2Y4NTQ5YzM5IiwiaXNzIjoiaHR0cHM6XC9cL2lkYnJva2VyLWV1LndlYmV4LmNvbVwvaWRiIiwidXNlcl9tb2RpZnlfdGltZXN0YW1wIjoiMjAyMzEyMDYxNDM5MTAuNDk2WiIsInJlYWxtIjoiMGNlNDY2NmQtZmYyZC00ZDI4LTk3NjEtNTU3ZTlhZGJjMWY5IiwiY2lzX3V1aWQiOiJhYjhlOWUyYi0xZTA5LTQxMjMtOTNkNC0yMjAzMjhhNDg5NjgiLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwiZXhwaXJ5X3RpbWUiOjE3MDYxODIxMzM0ODIsImNsaWVudF9pZCI6IkM1ODI1NGYzOGNlMDBlYzdhZmQxYjYwNjZmOTdlM2MyNjgwZjgxOWZhZWZlNjhhOTY1MjE5N2EzYTllMTg4N2M0In0.IffXV1el28tZV_b-z1BhZipRu0Fy04pPfY2zKevTfal_dZCZKklmrAi5F7U0uCKletAQbLXiIojxE0LOYGWS5KE9nEMFQeoOlbvJmWDyWuTbxQM954rKYPMMDhaXdsc-Iglk87dxAKyBNC6ASjtk-OHiIlSSJMKiYIW4699kd6uRd1nRlGYWSNANZSWn5cS_hp24xzDCDfiynAtr99nirzNKAMFRo2RGzVVXXOi8wSmlZ-hJCTVvlGZ-DwxkQLga1tTsBPcIfriukIz1gazVu0Mpjcf1UQS5nyB91EvKvcMIE-rZyxvvMaOoTwTR0TD5o14xRDSUaKfbPe04zZaacA",
      },
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        if (response.ok) {
          await fetch(
            `https://bosch-server.wbx.ninja/requestedCallbacks/${this.ticketID}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((r) => {
              this.getData();
              console.log("deleted successfully", r);
            })
            .catch((e) => console.log("error in deleting", e));
          return response.json(); // Parse the response as JSON
        } else {
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  menuClicked(event) {
    this._selected = event.target.getAttribute("data-id");
    this.shadowRoot
      .querySelector(`[data-modal-id="${this._selected}"]`)
      .setAttribute("opened", "");
    this.shadowRoot.querySelector("#menu").removeAttribute("opened");
  }

  cancelClicked() {
    const id = this._selected;
    this.shadowRoot
      .querySelector(`[data-modal-id="${id}"]`)
      .removeAttribute("opened");

    this._mainIsOpen = false;
    this._menuIsOpen = false;

    if (this._config[id].parameters) {
      this._config[id].parameters.forEach((param) => {
        if (param.type !== "hidden") {
          this.shadowRoot.querySelector(
            `[data-id-input="${id}"][name="${param.name}"]`
          ).value = "";
        }
      });
    }

    this._selected = null;
  }

  triggerClicked(event) {
    async function fetchWithTimeout(resource, options = {}) {
      const { timeout = 6000 } = options;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    }

    async function sendTrigger(url, body) {
      try {
        const response = await fetchWithTimeout(url, {
          timeout: 6000,
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log(
          "voice-trigger-workflow Post Result:",
          response.status,
          data
        );
      } catch (error) {
        console.log("voice-trigger-workflow Post Error:", error);
      }
    }

    const id = event.target.getAttribute("data-id");

    let body = {};
    if (this._config[id].parameters) {
      this._config[id].parameters.forEach((param) => {
        body[param.name] = this.shadowRoot.querySelector(
          `[data-id-input="${id}"][name="${param.name}"]`
        ).value;
      });
    }

    let key = this.taskSelected.interactionId;
    let task = JSON.parse(JSON.stringify(this.taskMap.get(key)));

    body = { ...body, ...task };

    sendTrigger(this._config[id].url, body);
    this.cancelClicked();
  }

  modalSectionTemplate(action, index) {
    if (action.parameters) {
      return html`
        ${action.parameters.map((param) => {
          if (param.type === "input") {
            return html` <label>${param.label}</label>
              <input
                data-id-input="${index}"
                name="${param.name}"
                type="text"
              />`;
          }

          if (param.type === "select") {
            return html`
              <label>${param.label}</label>
              <select data-id-input="${index}" name="${param.name}">
                ${param.values.map((value) => html`<option>${value}</option>`)}
              </select>
            `;
          }

          if (param.type === "datetime") {
            return html`
              <label>${param.label}</label>
              <input
                type="datetime-local"
                data-id-input="${index}"
                name="${param.name}"
              />
            `;
          }

          if (param.type === "hidden") {
            return html`
              <input
                type="hidden"
                data-id-input="${index}"
                name="${param.name}"
                value="${param.value}"
              />
            `;
          }
        })}
      `;
    }
  }

  renderData() {
    return html` <p>${this.data.First}</p> `;
  }

  render() {
    return html` ${this._showBtn
      ? html`
          <div id="voice-trigger-workflow" .className=${this._theme}>
            <div id="btn1" @click=${this.btnClicked} ?hidden="${!this
          .showButton}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 512 512"
              >
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75H192 160 64c-35.3 0-64 28.7-64 64v96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V352l8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V300.4c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4V32zm-64 76.7V240 371.3C357.2 317.8 280.5 288 200.7 288H192V192h8.7c79.8 0 156.5-29.8 215.3-83.3z"
                />
              </svg>
            </div>
            <div id="btn2" ?hidden="${this.showButton}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 512 512"
              >
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75H192 160 64c-35.3 0-64 28.7-64 64v96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V352l8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V300.4c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4V32zm-64 76.7V240 371.3C357.2 317.8 280.5 288 200.7 288H192V192h8.7c79.8 0 156.5-29.8 215.3-83.3z"
                />
              </svg>
            </div>
            <div id="main" ?opened=${this._mainIsOpen}>
              <div id="menu" ?opened=${this._menuIsOpen}>
              <header>
                <div class="row firstrow">
                    <h3>Campaign Contact</h3>
                  </div>
                  </header>
                  <section>
                  <div class="row">
                    <div class="column left">
                      <p>First Name</p>
                    </div>
                    <div class="column right">
                      <p>${this.firstName}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="column left">
                      <p>Last Name</p>
                    </div>
                    <div class="column right">
                      <p>${this.lastName}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="column left">
                      <p>Phone</p>
                    </div>
                    <div class="column right">
                      <p>${this.phone}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="column left">
                      <p>Email</p>
                    </div>
                    <div class="column right">
                      <p>${this.email}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="column left">
                      <p>Ticket ID</p>
                    </div>
                    <div class="column right">
                      <p>${this.ticketID}</p>
                    </div>
                  </div>
                  </section>
                  <footer>
                  <div class="container">
                    <div class="vertical-center">
                      <button class="button" @click=${this.callClicked}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                        >
                          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                          <path
                            d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        `
      : html``}`;
  }
}

customElements.define("voice-trigger-workflows", VoiceTriggerWorkflows);
