import React from 'react';
import {useRouter} from 'next/router'
import { Octokit } from 'octokit';

export default function Repositorydetails (){
    const router = useRouter();
    const {owner, repoName} = router.query;

    return(
        <div className="p-6">
            <div className="bg-white p-4 rounded shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-black">Repository Details</h3>
                <p className="text-black">Owner: {owner}</p>
                <p className="text-black">Repository Name: {repoName}</p>
            </div>
    </div>
    );
};