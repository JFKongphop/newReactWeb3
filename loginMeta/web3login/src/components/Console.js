import { useState, useEffect } from "react";
import { ethers } from "ethers";
import List from "./List";

const Console = ({ name, provider, signer }) =>{

    const [account, setAccount] = useState(null);
    const [nameAccount, setNameAccount] = useState('');
    const [userBalance, setUserBalance] = useState(null);
    const [list, setList] = useState([]);
    const [found, setFound] = useState(true);
    const [arrayName , setArrayName] = useState([]);

    // set name from ConnectBar that send of props to this component
    const setName = async () =>{
        if(await name){
            // set account to use
            setAccount(name)

            // set show for check account 
            if(account !== null){
                console.log(account);
            }
        }
    }

    // show of balance
    const checkBalance = async () =>{
        if(account){
            const balance = await provider.getBalance(account);
            setUserBalance(ethers.utils.formatEther(balance))
            console.log(ethers.utils.formatEther(balance))
        };
    }

    // submit of headaccount
    const submitName = (e) =>{
        e.preventDefault()
        // console.log(nameAccount);
        const newItem = {
            name : nameAccount
        }
        console.log(newItem);

        // not have null in list
        if((newItem.name).length !== 0 && found){
            setList([...list, newItem]) // set initial and newItem
            setNameAccount('') // when submit that clear value
        }
    }

    // set name of account
    const setHeadAccount = (e) => {
        e.preventDefault()
        setNameAccount(e.target.value)

        // filter of duplicate name
        setArrayName([...arrayName, nameAccount])
        const findAccount = arrayName.some((element) => element === nameAccount)
        setFound(!findAccount)
    }

    // set and show only one time
    useEffect(()=>{

        // set name of account
        setName()

        // check balance
        checkBalance()

    },[name, account])

    return (
        <div>
            <section className="container">
                {/* {userBalance ? `Balance: ${userBalance}` : ""}
                <p>{account}</p> */}
                <h1>Create Account</h1>
                <form className="form-group" onSubmit={submitName} > {/*onSubmit={submitData} */}
                    <div className="form-control">
                        <input type="text" className="text-input" 
                        onChange={setHeadAccount}
                        value={nameAccount}
                        />
                        <button type="submit" className="submit-btn">
                            Submit
                        {/* {checkEditItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"} */}
                        </button>
                    </div>
                </form>
                <section className="list-container">
                    {/* set data from list to List component */}
                    {list.map((data,index)=>{
                        return <List key={index} {...data} signer={signer}/>
                    })}
                </section>
            </section>
        </div>
    )
}

export default Console