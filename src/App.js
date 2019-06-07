import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

function App() {
  return (
    <div className="App mdl-layout mdl-js-layout mdl-layout--fixed-header">
         <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <h2 className="mdl-layout-title">Bloc Jams</h2>
            <div className="mdl-layout-spacer"></div>
              <nav className="mdl-navigation">
                  <Link className="mdl-navigation__link" to='/'>Landing </Link>
                  <Link className="mdl-navigation__link"  to='/library'>Library</Link>
                </nav>
            </div>
         </header >
         <main>
            <Route exact path="/" component={Landing} />
            <Route path="/library" component={Library} />
            <Route path="/album/:slug" component={Album} />
         </main>
    </div>
  );
}

export default App;
