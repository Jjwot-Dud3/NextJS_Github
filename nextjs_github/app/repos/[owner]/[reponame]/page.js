import React from 'react';
import RepositoryDetails from '../../../components/RepositoryDetails';

export default function RepositoryDetailsPage ({params}) {
    return(
        <div>
            <h1 className="text-2xl font-semibold my-4 text-center">Repository Details Page</h1>
            <RepositoryDetails params={params}/>
        </div>
    )
}