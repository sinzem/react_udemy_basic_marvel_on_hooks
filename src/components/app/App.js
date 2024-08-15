import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {MainPage, ComicsPage} from "../pages";
import AppHeader from "../appHeader/AppHeader";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/comics">
                            <ComicsPage />
                        </Route>
                        <Route exact path="/"> {/* (главную страницу помещаем последней в списке роутов - ее путь входит в пути всех остальных, это может давать проблему при загрузке страниц(switch и exact делают строгое сравнение)) */}
                            <MainPage />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;