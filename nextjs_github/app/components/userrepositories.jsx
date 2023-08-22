"use client";
import React, { useState } from 'react';
import { Octokit } from '@octokit/core';
import SearchIcon from '../components/searchicon';

const UserRepositories = () => {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState([]);

  const handleSearch = async () => {
    try {
      const octokit = new Octokit();
      const response = await octokit.request(`/users/${username}/repos`);
      setRepositories(response.data);
    } catch (error) {
      console.error('Error fetching repositories:', error.message);
    }
  };

  return (
    <div className="p-6 ">
      <div className=" justify-center text-center mb-4">
        <div className="rounded-xl bg-gray-400 p-4 flex w-full">
          <input
            type="text"
            placeholder="Enter GitHub username..."
            className="w-full bg-transparent outline-none text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="ml-4 focus:outline-none"
            onClick={handleSearch}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {repositories.map((repo) => (
          <div key={repo.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-black">Owner: {repo.owner.login}</h3>
            <p className="text-black">{repo.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRepositories;
