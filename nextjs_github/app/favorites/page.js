"use client"
import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import PocketBase from 'pocketbase';

export default function FavoritesRepositories() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const [repositoryData, setRepositoryData] = useState(null);

  useEffect(() => {
    async function fetchRepositoryData() {
      try {
        const repositories = await pb.collection('Repositories').getFullList();
        console.log(repositories)
        setRepositoryData(repositories);
      } catch (error) {
        console.error('Error fetching repository data:', error);
      }
    }

    fetchRepositoryData();
  }, []);

  return (
    <div className="p-6">
      {repositoryData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repositoryData.map((repoData) => (
            <div key={repoData.id} className="bg-white p-4 rounded shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-2 text-black">Repository Details</h3>
              </div>
              <p className="text-black">Owner: {repoData.owner}</p>
              <p className="text-black">Repository Name: {repoData.name}</p>
              <p className="text-black">Repository Id: {repoData.id}</p>
              <p className="text-black">Repository Url: {repoData.html_url}</p>
              <p className="text-black">Is Private?: {repoData.private ? 'True' : 'False'}</p>
              <p className="text-black">Created: {repoData.created_at.split('T')[0]}</p>
              <p className="text-black">Last Updated: {repoData.updated_at.split('T')[0]}</p>
              <p className="text-black">Homepage: {repoData.homepage ?? 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
