import React from 'react';
import UserRepositories from '../components/userrepositories';

export default function HomePage ()  {
  return (
    <div>
      <h1 className="text-2xl font-semibold my-4">GitHub Repositories Search</h1>
      <UserRepositories />
    </div>
  )
}

