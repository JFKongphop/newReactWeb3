import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import HelloExternal from './components/HelloExternal';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

// // build functional component
// function HelloComponent(){
//   return <h1>Hello Component</h1>
// }

// // build class component
// class HelloCompo extends React.Component{
//   render(){
//     return <h1>Hello Kongphop</h1>
//   }
// }

// from external component
// ReactDOM.createRoot(document.getElementById('root')).render(<HelloExternal/>);

// from class component
// ReactDOM.createRoot(document.getElementById('root')).render(<HelloCompo/>);

// from functional component
// ReactDOM.createRoot(document.getElementById('root')).render(HelloComponent());

//const root = root.render(<App />);
// ReactDOM.render(<App />,document.getElementById('root'));

// when use <React.Fragment> or <> that is invisible when look in inspect
// use in this page when export 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
