<!-- __________________________________________________ Basic Repo Steps ___________________________________________________________________________ -->

<!-- # Repo-Template
This is an Internal WXSD Template to be used for GitHub Repos moving forward. Follow the steps below: For extended details, visit https://cisco.sharepoint.com/:w:/r/sites/WXSD-WebexSolutionsDevelopment/Shared%20Documents/Onboarding%20Instructions%20%26%20Guides/Github%20%26%20Security/Github%20Readme%20Detailed%20Standards.docx?d=wba3225a5102341cf874d319d3f334b9b&csf=1&web=1&e=yggr2S



<!--   Step 1) Name your repository: Repo Name must ALWAYS end with "bot", "embeddedapp: or "macro"
      Examples: "<insert repo name>-bot", "<insert repo name>-embeddedapp", "<insert repo name>macro"



~3 words, kebab case, use words to indicate what it does. Visit https://github.com/wxsd-sales/readme-template/blob/master/README.md for more details
-->

<!--  Step 2) Add One sentence description to your repository: Copy/Paste from Webex Labs Card sentence.
       Example: "Redirect an Auto Attendant caller to an SMS conversation to alleviate Call Queue Agent responsibilities."
-->

<!--  Step 3) Add at least 1 tag to the repo: Indicating if it’s a “bot”, “macro” or “embeddedapp”.
                 *Additional tags are allowed: should be lowercase and hyphenated for spaces.
                Repo does not use “macros” as a tag (use “macro” instead)
-->

<!--  Step 4) MAKE SURE an MIT license is included in your Repository. If another license is needed, verify with management. This is for legal reasons.
-->

<!--  Step 4) Use following Template to copy/paste your details below in place of the directions
Make sure you include the "Keep this here" portions (it is for legal, and security infosec reasons).
-->

<!-- _________________________________________________________ Actual Template Starts Below ___________________________________________________________ -->

# Contact Center Video Widget

This widget embeds Webex meetings within the Webex Contact Center. Upon receiving a request, it automatically opens a chat task and initiates a Webex meeting between the agent and the customer.

## Overview

Contact Center Video Widget is a powerful LitElement-based web component designed to streamline video interactions within the Webex Contact Center environment. This component leverages the Webex Browser SDK to integrate video capabilities into your Contact Center workflows.
This component also provides standard video controls (mute, camera on/off, etc.) for both local and remote participants. Running this project creates a web component widget that gets deployed in the workspace section of the WxCC agent desktop. The widget is only rendered when the agent has an active (selected) chat task.

## Usage

- Upload the desktop-layout.json file onto your administration portal [WebexCC Portal - US](https://portal-v2.wxcc-us1.cisco.com/portal/home)
  - link above is referencing the US portal link please change if you are in different geo (us1, eu1, eu2, anz1)
  - If you want to use your bundled code, change the URL on line 55 of desktop-layout.json
  - Note that Layouts are configured per Agent Team.
- Log in to your agent desktop and select the right team.
- Once the customer triggers the request, a chat task will be initiated on the agent's desktop. To trigger the request from customer side:
  ```
  curl --location 'https://hooks.us.webexconnect.io/events/3ZYSI927Q3' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "customerName":<NAME>,
      "customerEmail":<EMAIL>,
      "videoCallDestination": <VIDEO_CALL_DESTINATION>,
      "inappmessaging.appId":"VI24093513",
      "inappmessaging.userId":"6806ea7s-a04e-4fdb-9d86-0b33626f3577"
  }'
  ```

## Setup

### Prerequisites & Dependencies:

1.  Have a contact center team and desktop layout setup. Please watch the video and supplemental detailed documentation @ [Desktop Layout - Administration Guide](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#topic_8230815F4023699032326F948C3F1495)
2.  Node >18.15.0 (recommended) and npm (or your preferred package manager). To check your versions, run:
    ```
    node -v
    npm -v
    ```
3.  Cloud storage or CDN to deploy your bundled JS file.

<!-- GETTING STARTED -->

### Installation Steps:

1.  Download this project or clone this repo:
    ```
    git clone https://github.com/wxsd-sales/video-cc-widget-lit.git
    ```

2.  From the project directory run:
    ```
    npm install
    ```

### Run Locally:

> **Note:** We can just run the meetings part of the widget locally

1.  Open src/index.js and replace it with this line:
    ```
    import "./video-meetings-widget.js";
    ```

2.  Run `npm serve` to run the dev server
    - Open http://localhost:8082/ in a browser

### Build the Widget:

1.  Run `npm run build` to build the widget
2.  Copy the file public/video-cc-widget.js to your preferred cloud storage
3.  Make sure the cloud storage URL is replaced in line 55 of desktop-layout.json file
4.  Upload the desktop-layout.json file to your Webex contact center tenant and follow steps in Usage section.

> **Note** - Bundled file for this project is hosted [here](https://wxsd-sales.github.io/video-cc-widget-lit/public/video-cc-widget.js)

## License

<!-- MAKE SURE an MIT license is included in your Repository. If another license is needed, verify with management. This is for legal reasons.-->

<!-- Keep the following statement -->

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.

## Disclaimer

<!-- Keep the following here -->

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex usecases, but are not Official Cisco Webex Branded demos.

## Questions

Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=RepoName) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team.
