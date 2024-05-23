import { handleError } from "../utils/handle-error";
export async function joinMeeting(meeting) {
  try {
    const { sendAudio, sendVideo } = await meeting.getSupportedDevices({
      sendAudio: true,
      sendVideo: true,
    });
    await meeting.join().then(async () => {
      const mediaSettings = {
        receiveVideo: true,
        receiveAudio: true,
        receiveShare: false,
        sendShare: false,
        sendVideo,
        sendAudio,
      };

      // Get our local media stream and add it to the meeting
      await meeting.getMediaStreams(mediaSettings).then((mediaStreams) => {
        const [localStream, localShare] = mediaStreams;

        meeting.addMedia({
          localShare,
          localStream,
          mediaSettings,
        });
      });
    });
  } catch (error) {
    handleError(error, "Join Meeting Error");
    throw error;
  }
}
