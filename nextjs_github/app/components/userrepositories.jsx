"use client"
import React, { useState, useEffect } from 'react';
import { Octokit } from 'octokit';
import SearchIcon from '../components/searchicon';
import { useSession } from 'next-auth/react';
import {redirect} from 'next/navigation';
import Link from 'next/link';

export default function UserRepositories  () {
  const [allRepositories, setAllRepositories] = useState([]);
  const [repositoryName, setRepositoryName] = useState('');
  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const data = useSession();

  useEffect(() => {
    const octokit = new Octokit();
    
    // Busca todo los usuarios del API de github
    octokit
    .request('/users')
    .then(async (response) => {
      const users = response.data;
      const repositoriesPromises = users.map(async (user) => {
        //Luego busca todos los repositorios de cada usuario encontrado y se lo asigna al subarreglo
        const userRepos = await octokit.request(`/users/${user.login}/repos`);
        return {
          user: user.login,
          repositories: userRepos.data,
        };
      });
      //Ejecuta todas las llamdas y espera que todas den respuesta
      const repositories = await Promise.all(repositoriesPromises);
      setAllRepositories(repositories);
    })
    .catch((error) => {
      console.error('Error fetching users and repositories:', error.message);
    });
}, []);

  // Filtra los repositorios mostrado en base al campo de busquedad
  useEffect(() => {
    if (repositoryName === '') {
      setFilteredRepositories(allRepositories);
    } else {
      const filtered = allRepositories.filter((repoEntry) =>
        repoEntry.repositories.some((repo) => repo.name.includes(repositoryName))
      );
      setFilteredRepositories(filtered);
    }
  }, [repositoryName, allRepositories]);

  //Revisa si la session esta autenticada sino lo redireciona al home
  if(data.status !== "authenticated"){
    return(
      redirect('/')
    );
  }

  return (
    <div className="p-6 flex flex-col items-center mt-0">
      <div className="justify-center text-center mb-4">
        <div className="rounded-xl bg-gray-400 p-4 flex w-full">
          <input
            type="text"
            placeholder="Search GitHub username..."
            className="w-full py-2 px-3 outline-none bg-transparent text-gray-800 placeholder-gray-600 rounded"
            value={repositoryName}
            onChange={(e) => setRepositoryName(e.target.value)}
          />
          <button
            className="ml-4 focus:outline-none"
            onClick={() => setRepositoryName('')}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredRepositories.map((repoEntry) => (
          <div key={repoEntry.user} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-black">User: {repoEntry.user}</h3>
            <ul>
              {repoEntry.repositories.map((repo) => (
                <li key={repo.id} className="text-black">
                  <Link
                    href={`/repos/[owner]/[repoName]`}
                    as={`/repos/${repo.owner.login}/${repo.name}`}
                  >
                    <li key={repo.id} className="text-black hover:text-purple-300 transition">{repo.name}</li>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};


