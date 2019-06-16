var React = require('react');

class Home extends React.Component{
   render(){
      return (
         <div className="jumbotron" >
            <h1> React APP</h1>
            <img src="../images/React.png" />
            <p> React, React router, and Flux for ultra - responsive web apps. </p>
         </div>
      );
   }
}

module.exports = Home;
