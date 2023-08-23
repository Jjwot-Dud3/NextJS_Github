"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Octokit } from 'octokit';

export default function RepositoryDetails({params}) {
  const  owner  = params.owner
  const repoName = params.reponame
  const [repoData, setRepoData] = useState(null);
  console.log(owner)
  console.log(repoName)

  useEffect(() => {
    const octokit = new Octokit({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET, 
        
    });
   
    octokit.request('GET /users/{owner}/repos',{
        owner: owner,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
    })
    .then(response => {
      setRepoData(response.data.find(repo => repo.name === repoName));
      console.log(response.data.find(repo => repo.name === repoName))
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
          <p className="text-black">Repository Id: {repoData.id}</p>
          <p className="text-black">Repository Url: {repoData.html_url}</p>
          <p className="text-black">Is Private?: {repoData.private== false ? "False": "True"}</p>
          <p className="text-black">Created: {repoData.created_at.split("T")[0]}</p>
          <p className="text-black">Last Updated: {repoData.updated_at.split("T")[0]}</p>
          <p className="text-black">Homepage: {repoData.homepage}</p>
        </div>
      )}
    </div>
  );
};
