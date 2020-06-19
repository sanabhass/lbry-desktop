import * as ACTIONS from 'constants/action_types';
import { getAuthToken } from 'util/saved-passwords';

// /notification/delete

let socket = null;
export const doSocketConnect = () => dispatch => {
  const authToken = getAuthToken();
  if (!authToken) {
    console.error('Unable to connect to web socket because auth token is missing');
    return;
  }

  if (socket !== null) {
    socket.close();
  }

  // connect to the remote host
  socket = new WebSocket(`wss://api.lbry.com/subscribe?auth_token=${authToken}`);

  // websocket handlers
  socket.onmessage = e => {
    //   {"type":"pending_notification"}
    console.log('e', e);
    debugger;
  };

  socket.onerror = e => {
    console.log('e', e);
    debugger;
  };

  socket.onclose = e => {
    console.log('e', e);
    debugger;
  };

  socket.onopen = e => {
    console.log('\nConnected to WS \n\n');
  };
};

export const doSocketDisconnect = () => ({
  type: ACTIONS.WS_DISCONNECT,
});
