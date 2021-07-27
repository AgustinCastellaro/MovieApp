import './App.css';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import MainPage from './pages/mainPage/MainPage';
import Genre from './pages/genre/genre'
import MovieDetails from './pages/movies/MovieDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/genre/:genreId' component={Genre} />
          <Route exact path='/movies/:movieId' component={MovieDetails} />
          <Route exact path='/PageNotFound' component={PageNotFound} />
          <Redirect to="/PageNotFound" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
