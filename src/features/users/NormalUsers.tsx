import type { User } from '../../services/userService';

type UsersProps = {
  users: User[];
};

export default function NormalUsers({ users }: UsersProps) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
