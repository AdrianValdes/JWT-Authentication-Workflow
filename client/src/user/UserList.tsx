import React, { useEffect, useState } from 'react';

import { getUsers, User } from '../axios';
import { UserItem } from './UserItem';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response?.error) {
          setError(response.error);
        } else {
          setUsers(response!);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <ul>
        {users &&
          users.map(({ username, _id }: User) => (
            <UserItem key={_id} username={username} _id={_id} />
          ))}
      </ul>
      {error && <p>{error}</p>}
    </div>
  );
};
