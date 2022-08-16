import { useState, useEffect } from "react"
import { ethers } from "ethers";

const List = ({name, signer}) =>{

    // will change and deploy new contract
    const contract = "0x6079460CC55909fBbd538aB97D54a03390a405f5";

    // deposit state
    const [showDeposit, setShowDeposit] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);

    // withdraw state
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState(0);

    // transfer state
    const [showTransfer, setShowTransfer] = useState(false);
    const [sendAddress, setSendAddress] = useState('');
    const [transferAmount, setTransferAmount] = useState(0)

    const [total, setTotal] = useState([0]);

    // deposit console
    const toggleDeposit = (e) =>{
        e.preventDefault()
        setShowDeposit(!showDeposit)
        if(showWithdraw){
            setShowWithdraw(false);
        }
        if(showTransfer){
            setShowTransfer(false)
        }
    }

    const getValueDeposit = (e) =>{
        e.preventDefault()
        setDepositAmount(e.target.value)
        
    }

    const deposit = async (e) =>{
        e.preventDefault();
        const rawTx = {
            to : contract,
            value : ethers.utils.parseEther(depositAmount)
        }
        const tx = await signer.sendTransaction(rawTx);
        console.log(tx.hash);
        await tx.wait();

        console.log("trasfer");
    }

    // withdraw console
    const toggleWithdraw = (e) =>{
        e.preventDefault()
        setShowWithdraw(!showWithdraw)
        if(showDeposit){
            setShowDeposit(false);
        }
        if(showTransfer){
            setShowTransfer(false)
        }
    }

    const getValueWithdraw = (e) =>{
        e.preventDefault();
        setWithdrawAmount(e.target.value);
        eachBalance();
    }

    const withdraw = async (e) =>{
        e.preventDefault()
        const ABI = ["function withdraw(uint _amount)"];
        const iface = new ethers.utils.Interface(ABI);
        const encodeData = iface.encodeFunctionData("withdraw", [ethers.utils.parseEther(withdrawAmount)]);

        const tx = await signer.sendTransaction({
            to : contract,
            data : encodeData
        })

        console.log(tx.hash);
        await tx.wait()
    }

    // transfer console
    const toggleTransfer = (e) =>{
        e.preventDefault();
        setShowTransfer(!showTransfer);

        if(showDeposit){
            setShowDeposit(false);
        }
        if(showWithdraw){
            setShowWithdraw(false)
        }
    }

    const getAddress = (e) =>{
        e.preventDefault();
        setSendAddress(e.target.value);
    }

    const getValueTransfer = (e) =>{
        e.preventDefault();
        setTransferAmount(e.target.value);
        eachBalance()
    }

    const trasfer = async (e) =>{
        e.preventDefault();
        const ABI = ["function sendToReceive(address payable _receive, uint _amount)"];
        const iface = new ethers.utils.Interface(ABI);
        const encodeData = iface.encodeFunctionData("sendToReceive", [sendAddress, ethers.utils.parseEther(transferAmount)]);

        const tx = await signer.sendTransaction({
            to : contract,
            data : encodeData
        })

        console.log(tx.hash);
        await tx.wait()
    }    

    const eachBalance = () =>{
        total += depositAmount - withdrawAmount - transferAmount
        return total
    }

    return (
        // get data from list to show in this component
        <div className="all-list">
            <div className="list-account">
                <p className="name">{name}</p>
                <div className="console">
                    <p className="each-balance">Balance : {eachBalance} ETH</p>
                    <div className="console-btn">
                        <button className="btn" onClick={toggleDeposit}>Deposit</button>
                        <button className="btn" onClick={toggleWithdraw}>Withdraw</button>
                        <button className="btn" onClick={toggleTransfer}>Transfer</button>
                    </div>
                </div>
            </div>
            <div>
                <form className={showDeposit ? "show-deposit" : "deposit"} onSubmit={deposit}> 
                    <p className="name-option">Deposit</p>
                    <input className="input-console" placeholder="Amount" onChange={getValueDeposit}/>
                    <button className="btn-use" type="submit">Deposit</button>
                    <p className="close" onClick={toggleDeposit}>Close</p>
                </form>
                <form className={showWithdraw ? "show-withdraw" : "withdraw"} onSubmit={withdraw}> 
                    <p className="name-option">Withdraw</p>
                    <input className="input-console" placeholder="Amount" onChange={getValueWithdraw}/>
                    <button className="btn-use" type="submit">Withdraw</button>
                    <p className="close" onClick={toggleWithdraw}>Close</p>
                </form>
                <form className={showTransfer ? "show-transfer" : "transfer"} onSubmit={trasfer}> 
                    <p className="name-option">Transfer</p>
                    <input className="input-console" placeholder="Address" onChange={getAddress}/>
                    <input className="input-console" placeholder="Amount" onChange={getValueTransfer}/>
                    <button className="btn-use" type="submit">Transfer</button>
                    <p className="close" onClick={toggleTransfer}>Close</p>
                </form>
            </div>
        </div>

    )
}

export default List