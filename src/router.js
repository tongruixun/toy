import React from 'react';
import {
    HashRouter  as Router,
    Switch,
    Route
} from "react-router-dom";
import routeConfig from './config/config'

const { routes } = routeConfig;

function BasicRouter() {
    const renderRoute = (routesConfig) => {
        return <Switch>
            {
                routesConfig.map((item, index) => {
                    return <Route exact={item.exact} key={index} path={item.path}>
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