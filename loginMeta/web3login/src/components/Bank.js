import { ethers } from "ethers";
import { useState, useEffect } from "react";

const Bank = ({name, provider }) =>{
    const [account, setAccount] = useState(null);
    const [nameAccount, setNameAccount] = useState('');
    const [depositAmount, setDepositAmount] = useState(0);
    const [userBalance, setUserBalance] = useState(null);

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

    const checkBalance = async () =>{
        if(account){
            const balance = await provider.getBalance(account);
            setUserBalance(ethers.utils.formatEther(balance))
            console.log(ethers.utils.formatEther(balance))
        };
    }

    // set and show only one time
    useEffect(()=>{

        setName()
        checkBalance()


    },[name, account])

    return (
        <div>
            <section className="container">
                {userBalance ? `Balance: ${userBalance}` : ""}
                <p>{account}</p>
                <form className="form-group" > {/*onSubmit={submitData} */}
                    <div className="form-control">
                        <input type="text" className="text-input" 
                        onChange={(e)=>setName(e.target.value)}
                        // value={name}
                        />
                        <button type="submit" className="submit-btn">
                            submit
                        {/* {checkEditItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"} */}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Bank