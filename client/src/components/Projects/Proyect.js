import React from 'react';

import Header from './Header';
import FormTask from '../Tasks/FormTask';
import ListTask from '../Tasks/ListTask';


const Project = () => {

    return(
        <div>
            <div>
                <Header />
            </div>
            <div>
                <FormTask />
            </div>
            <div>
                <ListTask />
            </div>
        </div>
    )
}

export default Project;