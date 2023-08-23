"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Octokit } from 'octokit';
import {FaPlus} from 'react-icons/fa'

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

  const handleAddToFavorites = function () {
        console.log("handleAddToFavorites");
  };

  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      {repoData && (
        <div className="bg-white p-4 rounded shadow-md ">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-2 text-black">Repository Details</h3>
                <button className="flex bg-blue-500 text-white py-2 px-4 rounded items-center gap-2" onClick={handleAddToFavorites}>
                    <FaPlus/>Add to Favorites
                </button>
            </div>
            <p className="text-black">Owner: {owner}</p>
            <p className="text-black">Repository Name: {repoData.name}</p>
            <p className="text-black">Repository Id: {repoData.id}</p>
            <p className="text-black">Repository Url: {repoData.html_url}</p>
            <p className="text-black">Is Private?: {repoData.private== false ? "False": "True"}</p>
            <p className="text-black">Created: {repoData.created_at.split("T")[0]}</p>
            <p className="text-black">Last Updated: {repoData.updated_at.split("T")[0]}</p>
            <p className="text-black">Homepage: {repoData.homepage?? "N/A"}</p>
        </div>
      )}
    </div>
  );
};
