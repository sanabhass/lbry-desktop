// @flow
import * as ICONS from 'constants/icons';
import React from 'react';
import Icon from 'component/common/icon';
import DateTime from 'component/dateTime';
import { Menu, MenuList, MenuButton, MenuPopover, MenuItems, MenuItem } from '@reach/menu-button';

type Props = {};

export default function Notification(props: Props) {
  const { notification, onClick } = props;
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
    ? props => <div className="menu__link--notification">{props.children}</div>
    : props => <MenuItem className="menu__link--notification">{props.children}</MenuItem>;

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
