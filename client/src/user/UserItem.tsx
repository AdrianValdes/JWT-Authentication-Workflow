import React from 'react';
import { User } from '../axios';

export const UserItem = ({ username, _id }: User) => {
  return (
    <li>
      The user: {username} with the id: {_id} is logged in
    </li>
  );
};
