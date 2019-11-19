import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const Meetup = lazy(() => import('./routes/Meetup'));

class App extends Component<{}, {}> {
    public render() {
        return (
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/meetup" component={Meetup} />
                    </Switch>
                </Suspense>
            </BrowserRouter>
        );
    }
}

export default App;
