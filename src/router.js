import React from 'react';
import {
    HashRouter  as Router,
    Switch,
    Route
} from "react-router-dom";
import config from './config/config'

const { routes } = config;

function BasicRouter() {
    const renderRoute = (routesConfig) => {
        return <Switch>
            {
                routesConfig.map((item, index) => {
                    return <Route key={index} path={item.path}>
                        <item.component>
                            {
                                item.routes && renderRoute(item.routes)
                            }
                        </item.component>
                    </Route>
                })
            }
        </Switch>
    }

    return <Router>
        {
            renderRoute(routes)
        }
    </Router>
}

export default BasicRouter;