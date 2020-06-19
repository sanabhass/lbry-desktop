// @flow
import * as ACTIONS from 'constants/action_types';
import { Lbryio } from 'lbryinc';
import uuid from 'uuid/v4';

export function doToast(params: ToastParams) {
  if (!params) {
    throw Error("'params' object is required to create a toast notification");
  }

  return {
    type: ACTIONS.CREATE_TOAST,
    data: {
      id: uuid(),
      params,
    },
  };
}

export function doDismissToast() {
  return {
    type: ACTIONS.DISMISS_TOAST,
  };
}

export function doError(error: string | {}) {
  return {
    type: ACTIONS.CREATE_ERROR,
    data: {
      error,
    },
  };
}

export function doDismissError() {
  return {
    type: ACTIONS.DISMISS_ERROR,
  };
}

export function doNotificationList() {
  return dispatch => {
    dispatch({ type: ACTIONS.NOTIFICATION_LIST_STARTED });
    return Lbryio.call('notification', 'list')
      .then(response => {
        const notifications = response || [];
        dispatch({ type: ACTIONS.NOTIFICATION_LIST_COMPLETED, data: { notifications } });
      })
      .catch(error => {
        dispatch({ type: ACTIONS.NOTIFICATION_LIST_FAILED, data: { error } });
      });
  };
}
