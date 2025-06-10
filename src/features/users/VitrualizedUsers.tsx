import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import type { User } from '../../services/userService';

type UsersProps = {
  users: User[];
};

export default function VitrualizedUsers({ users }: UsersProps) {
  const listRef = useRef<HTMLUListElement | null>(null);

  const virtualizer = useWindowVirtualizer({
    count: users.length,
    estimateSize: () => 30,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  return (
    <ul
      ref={listRef}
      className="relative"
      style={{
        height: `${virtualizer.getTotalSize()}px`,
      }}
    >
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const user = users[virtualItem.index];
        return (
          <li
            key={user.id}
            className="absolute top-0 left-0 w-full"
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${
                virtualItem.start - virtualizer.options.scrollMargin
              }px)`,
            }}
          >
            {user.name}
          </li>
        );
      })}
    </ul>
  );
}
