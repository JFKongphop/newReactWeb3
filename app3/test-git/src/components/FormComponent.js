import { useState } from 'react';
import { useEffect } from 'react';
import './FormComponent.css';
import { v4 as uuidv4 } from 'uuid';

const FormComponent = (props) =>{
    
    console.log("render again in formComponent");
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [formValid, setFormValid] = useState(false);
 
    const inputTitle = (event) =>{
        setTitle(event.target.value)
    }

    const inputAmount = (event) =>{
        setAmount(event.target.value)
    }

    const saveItem = (event) =>{
        event.preventDefault()
        const itemData = {
            id : uuidv4(),
            title : title,
            amount : Number(amount)
        }
        props.onAddItem(itemData); 
        setTitle('');
        setAmount(0);
    }


    useEffect(() =>{
        const checkData = title.trim().length > 0 && amount !== 0;
        if(checkData){
            setFormValid(true)
        }
    },[title, amount])

    return (
        <div>
            <form onSubmit={saveItem}>
                <div className="form-control">
                    <label>Name List</label>
                    <input type="text" placeholder="Transaction" onChange={inputTitle} value={title} />
                </div>
                <div className="form-control">
                    <label>Amount</label>
                    <input type="number" placeholder="- expense, + income" onChange={inputAmount} value={amount}/>
                </div>
                <div>
                    <button type="submit" className='btn' disabled={!formValid}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent