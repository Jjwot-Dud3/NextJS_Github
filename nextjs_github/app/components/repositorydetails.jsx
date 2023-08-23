"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Octokit } from 'octokit';
import {FaPlus} from 'react-icons/fa';
import PocketBase from 'pocketbase';


export default function RepositoryDetails({ params }) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const owner = params.owner;
    const repoName = params.reponame;
    const [repoData, setRepoData] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isRepoFavorite, setIsRepoFavorite] = useState(false);
  
    console.log(owner);
    console.log(repoName);
  
    useEffect(() => {
      async function fetchRepoData() {
        const octokit = new Octokit({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        });
  
        try {
            //Busca todos los repositorios de el usuario pasado (owner) en la vista anterior
          const response = await octokit.request('GET /users/{owner}/repos', {
            owner: owner,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
            },
          });
          //Luego busca el repositorio pasado en la vista anterior (repoName)
          const matchingRepo = response.data.find((repo) => repo.name === repoName);
          setRepoData(matchingRepo);
          setIsRepoFavorite(await isFavorite(matchingRepo.id));
        } catch (error) {
          console.error('Error fetching repository data:', error);
        }
      }
  
      fetchRepoData();
    }, [owner, repoName]);
  
    //Inserta en la base de datos el repositorio selecionado
    const handleAddToFavorites = async () => {
      const data = {
        repo_id: repoData.id,
        owner: owner,
        name: repoData.name,
        url: repoData.html_url,
        private: repoData.private,
        created_at: repoData.created_at,
        update_at: repoData.updated_at,
        homepage: repoData.homepage,
      };
  
      try {
        await pb.collection('Repositories').create(data);
        setSuccessMessage('Repository added to favorites.');
        setIsRepoFavorite(true);
      } catch (error) {
        console.error('Error adding repository to favorites:', error);
      }
    };
    
    //Busca si el repositorio se encuentra en la base de datos para deshabilitar el boton de agregar
    const isFavorite = async (repoId) => {
      const resultList = await pb.collection('Repositories').getList(1, 50, {
        filter: `repo_id = ${repoId}`,
      });
  
      return resultList.length > 0;
    };
  
    return (
      <div className="p-6 grid grid-cols-2 gap-4">
        {repoData && (
          <div className="bg-white p-4 rounded shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold mb-2 text-black">Repository Details</h3>
              <button
                className={`flex ${
                  isRepoFavorite ? 'bg-gray-400' : 'bg-blue-500'
                } text-white py-2 px-4 rounded items-center gap-2`}
                onClick={isRepoFavorite ? null : handleAddToFavorites}
                disabled={isRepoFavorite}
              >
                <FaPlus /> Add to Favorites
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
                {/*Campo owner:  nombre del repositorio */}
                {/*Campo name: nombre del repositorio */}
                {/*Campo id: id de github para el repositorio */}
                {/*Campo html_url: url de github del repositorio */}
                {/*Campo private: booleano que determina si el repositorio esta privado o publico. Tiene regla para mostrar el string en pantalla */}
                {/*Campo created_at: fecha de cuando se creo el repositorio en github. Se hace split para eliminar la hora */}
                {/*Campo updated_at: fecha de cuando se actualizo por ultima vez el repositorio en github. Se hace split para eliminar la hora  */}
                {/*Campo homepage: la url del homepage del repositorio o proyecto este puede venir vacio */}
          </div>
        )}
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
      </div>
    );
  }