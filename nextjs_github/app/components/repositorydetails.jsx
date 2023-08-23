import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Octokit } from '@octokit/rest';

export default function RepositoryDetails() {
  const router = useRouter();
  const { owner, repoName } = router.query;
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    const octokit = new Octokit({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    });

    octokit.repos.get({
      owner,
      repo: repoName,
    })
    .then(response => {
      setRepoData(response.data);
    })
    .catch(error => {
      console.error('Error fetching repository data:', error);
    });
  }, [owner, repoName]);

  return (
    <div className="p-6">
      {repoData && (
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-black">Repository Details</h3>
          <p className="text-black">Owner: {owner}</p>
          <p className="text-black">Repository Name: {repoData.name}</p>
          {/* Include more details from repoData as needed */}
        </div>
      )}
    </div>
  );
};
