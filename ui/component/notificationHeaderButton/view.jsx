// @flow
import * as PAGES from 'constants/pages';
import * as ICONS from 'constants/icons';
import React from 'react';
import Icon from 'component/common/icon';
import Notification from 'component/notification';
import { useHistory } from 'react-router';
import { Menu, MenuList, MenuButton, MenuPopover, MenuItems, MenuItem } from '@reach/menu-button';

type Props = {
  unreadCount: number,
  notifications: ?Array<{}>,
};

export default function NotificationHeaderButton(props: Props) {
  const { unreadCount, notifications, fetching } = props;
  const { push } = useHistory();

  return (
    <Menu>
      <MenuButton
        disabled={fetching}
        aria-label={__('Your notifications')}
        title={__('Your notifications')}
        className="header__navigation-item menu__title header__navigation-item--icon"
      >
        <Icon size={18} icon={ICONS.NOTIFICATION} aria-hidden />
        {unreadCount > 0 && <span className="notification__bubble">{unreadCount}</span>}
      </MenuButton>

      {notifications && notifications.length > 0 ? (
        <MenuList className="menu__list--header">
          {notifications.map((notification, index) => (
            <Notification id={notification.id} notification={notification} />
          ))}

          <MenuItem className="menu__link" onSelect={() => push(`/$/${PAGES.NOTIFICATIONS}`)}>
            <Icon aria-hidden icon={ICONS.NOTIFICATION} />
            {__('View All')}
          </MenuItem>
        </MenuList>
      ) : (
        <MenuPopover>
          <div className="menu__list--header notifications__empty">No notifications yet.</div>
          <MenuItems>
            <MenuItem disabled onSelect={() => {}}></MenuItem>
          </MenuItems>
        </MenuPopover>
      )}
    </Menu>
  );
}
