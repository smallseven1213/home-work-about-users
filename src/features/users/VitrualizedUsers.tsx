import { useCallback } from 'react';
import { AutoSizer, List, WindowScroller, type ListRowProps } from 'react-virtualized';
import type { User } from '../../services/userService';

type UsersProps = {
  users: User[];
};

export default function VitrualizedUsers({ users }: UsersProps) {
  const rowRenderer = useCallback(({ key, index, style }: ListRowProps) => {
    const user = users[index];
    return (
      <div key={key} style={style}>
        {user.name}
      </div>
    );
  }, [users]);

  return (
    <div className='w-full'>
      <WindowScroller scrollElement={window}>
      {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
        <div ref={registerChild}>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                autoHeight
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                overscanRowCount={2}
                rowCount={users.length}
                rowHeight={30}
                rowRenderer={rowRenderer}
                scrollToIndex={0}
                scrollTop={scrollTop}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </WindowScroller>
    </div>
  );
}
