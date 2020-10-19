import React from 'react'
import {BrowserRouter, Switch, Route  } from 'react-router-dom'

import Landing from './pages/landing'
import OrphanagesMap from './pages/OrphanagesMap'
import createOrphanage from './pages/CreateOrphanage'
import orphanage from './pages/Orphanage'


function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" component={createOrphanage} />
                <Route path="/orphanages/:id" component={orphanage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes