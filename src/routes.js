var React = require('react');
var Route = require('react-router-dom').Route;
var Switch = require('react-router-dom').Switch;
var Redirect = require('react-router-dom').Redirect;

var Home = require('./components/homePage/homePage');
var NotFound = require('./components/pageNotFound/notFound');

class Routes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

module.exports = Routes;