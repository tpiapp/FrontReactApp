
$ = jQuery = require('jquery'); // Declare jquery global in the scripts

var React = require('react');
var Router = require('react-router-dom').HashRouter;
var Routes = require('../routes');

class App extends React.Component {
   render() {
      return (
         <div>
            <Router>
               <div className="container-fluid">
                  <Routes />
               </div>
            </Router>
         </div> 
      );
   }
}

module.exports = App;