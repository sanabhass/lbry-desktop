// @flow
import * as ICONS from 'constants/icons';
import React from 'react';
import Icon from 'component/common/icon';
import DateTime from 'component/dateTime';
import { Menu, MenuList, MenuButton, MenuPopover, MenuItems, MenuItem } from '@reach/menu-button';
import { formatLbryUrlForWeb } from 'util/url';
import { useHistory } from 'react-router';

type Props = {};

export default function Notification(props: Props) {
  const { notification, onClick } = props;
  const notificationTarget = notification && notification.notification_parameters.device.target;
  const notificationLink = formatLbryUrlForWeb(notificationTarget);
  const { push } = useHistory();
  console.log('notification', notification);

  let icon;
  switch (notification.notification_rule) {
    case 'creator_subscriber':
      icon = ICONS.SUBSCRIBE;
      break;
    default:
      icon = ICONS.NOTIFICATION;
  }

  const Wrapper = onClick
    ? props => (
        <a className="menu__link--notification" onClick={() => push(notificationLink)}>
          {props.children}
        </a>
      )
    : props => (
        <MenuItem className="menu__link--notification" onSelect={() => push(notificationLink)}>
          {props.children}
        </MenuItem>
      );

  return (
    <Wrapper>
      <Icon icon={icon} sectionIcon className="notification__icon" />
      <div className="notification__content">
        <div className="notification__text">{notification.notification_parameters.device.text}</div>
        <div className="notification__time">
          <DateTime timeAgo date={notification.created_at} />
        </div>
      </div>
    </Wrapper>
  );
}
