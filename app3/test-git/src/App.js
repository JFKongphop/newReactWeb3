import React, { useEffect, useState } from "react";
import Transaction from "./components/Transaction";
import './App.css'
import FormComponent from "./components/FormComponent";
import DataContext from "./data/dataContext";
import ReportComponent from "./components/ReportComponent";
import { BrowserRouter as Router, Routes, Route, Link, useParams,  } from "react-router-dom";

function App() {
  const design = {color:"red", textAlign:'center', fontFamily:'mono'}

  const [items, setItems] = useState([]);

  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onAddNewItem = (newItem) =>{
    setItems((prevItem)=>{
      return [newItem, ...prevItem] 
    })
  }

  useEffect(()=>{
    const amounts = items.map(items=>items.amount); 
    const allIncome = amounts.filter(element=> element > 0).reduce((total,value)=>total += value,0);
    const allExpense = (amounts.filter(element=>element < 0).reduce((totla,value)=>totla += value,0)) * -1; 

    setReportIncome(allIncome);
    setReportExpense(allExpense); 
  },[items,reportIncome,reportExpense]) 

  return (
      <DataContext.Provider value={{income : reportIncome, expense : reportExpense}}>
        <div className="conatiner">
          <h1 style={design}>income and expense</h1>

          {/* this is error zone */}
          {/* <Router>
            <div>
              <ul>
                <li>
                  <Link to="/">Account</Link>
                </li>
                <li>
                  <Link to="/">Account</Link>
                </li>
              </ul>
              <Routes>
                <Route path='/' element={<ReportComponent/>}></Route>
                <Route path='/insert' element={<>
                  <FormComponent onAddItem={onAddNewItem}/> 
                  <Transaction items={items}/></>}>
                </Route>
              </Routes>
            </div>
          </Router> */}

          
          <ReportComponent/>

          <FormComponent onAddItem={onAddNewItem}/>

          <Transaction items = {items}/>

        </div>
      </DataContext.Provider>
  );
}

// for export to other app
export default App;
 