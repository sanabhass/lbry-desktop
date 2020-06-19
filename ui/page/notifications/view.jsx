// @flow
import * as ICONS from 'constants/icons';
import * as PAGES from 'constants/pages';
import React from 'react';
import Page from 'component/page';
import Card from 'component/common/card';
import Spinner from 'component/spinner';
import { useHistory } from 'react-router';
import Button from 'component/button';
import Notification from 'component/notification';
import { getAuthToken } from 'util/saved-passwords';

type Props = {};

// const notifications = [
//   {
//     active_at: '2020-06-16T17:20:09Z',
//     created_at: '2020-06-16T17:20:09Z',
//     id: 61878,
//     notification_parameters: {
//       device: {
//         text: 'Some notification',
//       },
//     },
//     notification_rule: 'creator_subscriber',
//     type: '',
//   },
//   {
//     active_at: '2020-06-16T17:20:09Z',
//     created_at: '2020-06-16T17:20:09Z',
//     id: 61878,
//     notification_parameters: {
//       device: {
//         text: 'Some notification',
//       },
//     },
//     notification_rule: 'creator_subscriber',
//     type: '',
//   },
//   {
//     active_at: '2020-06-16T17:20:09Z',
//     created_at: '2020-06-16T17:20:09Z',
//     id: 61878,
//     notification_parameters: {
//       device: {
//         text: 'Some notification',
//       },
//     },
//     notification_rule: 'creator_subscriber',
//     type: '',
//   },
// ];

export default function NotificationsPage(props: Props) {
  const { unreadCount, notifications, fetching } = props;
  const authToken = getAuthToken();

  return (
    <Page>
      {fetching && (
        <div className="main--empty">
          <Spinner delayed />
        </div>
      )}
      {notifications && notifications.length > 0 ? (
        <Card
          isBodyList
          title={__('Your Notifications')}
          titleActions={
            <div className="card__actions--inline">
              <Button
                button="secondary"
                icon={ICONS.SETTINGS}
                label={__('Update Preferences')}
                navigate={`/$/${PAGES.SETTINGS_NOTIFICATIONS}`}
              />
            </div>
          }
          body={
            <div className="notification_list">
              {notifications.map((notification, index) => {
                return <Notification id={notification.id + index} notification={notification} onClick={() => {}} />;
              })}
            </div>
          }
        />
      ) : (
        <div>No notifications</div>
      )}
    </Page>
  );
}
