import { useContext } from "react"
import "./Item.css"
import DataContext from "../data/dataContext"
import './ReportComponent.css';

const ReportComponent = () =>{
    const {income, expense} = useContext(DataContext)
    return (
        <div>
            <h4>Total  (Bath)</h4>
            <h1>฿{income - expense}</h1>

            <div className="report-container">
                <div>
                    <h4>Income</h4>
                    <p className="report plus">฿{income}</p>
                </div>
                <div>
                    <h4>Expense</h4>
                    <p className="report minus">฿{expense}</p>
                </div>
            </div>

        </div>
    )
}

export default ReportComponent