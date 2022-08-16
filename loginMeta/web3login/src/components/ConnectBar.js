import { ethers } from "ethers";
import { useState, useEffect, createContext, useContext } from "react"
import Console from "./Console";
import Bank from "./Bank";

const ConnectBar = () =>{

    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [provider, setProvider] = useState(null);
    const [shortAccount, setShortAccount] = useState(null);
    const [network, setNetwork] = useState(null);
    const [signer, setSigner] = useState(null);

	const connectWalletHandler = async () => {
		if (window.ethereum && defaultAccount == null) {
            try{
                // set ethers provider
                setProvider(new ethers.providers.Web3Provider(window.ethereum));
                
                // connect to metamask
                const result = await window.ethereum.request({ method: 'eth_requestAccounts'})
                //set account that connect
                setDefaultAccount(await result[0]);

                // set to use only op testnet and when change chain that are reload window
                updateChain()  
                
            }
            catch(error){
                setErrorMessage(error.message)
            }
		} 

        // if dont have metamask on browser
        else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

    const updateChain = async () =>{
        // set local provider
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let network = await provider.getNetwork();

        console.log(signer);
        setNetwork(network)
        setSigner(signer)
        
        // when change chain that reload browser
        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });

        // can use only op testnet
        console.log(network.chainId);
        if(network.chainId !== 69){
            window.location.reload()
        }
    }

    // check balance
    const checkBalance = async () =>{
        if(defaultAccount){
            const balance = await provider.getBalance(defaultAccount);
            setUserBalance(ethers.utils.formatEther(balance))
            console.log(ethers.utils.formatEther(balance))
        };
    }
    
    useEffect(() => {
        // show less address when connected
        if(defaultAccount !== null){
            setShortAccount(`${defaultAccount.slice(0,5)}...${defaultAccount.slice(38,42)}`);
        }

        checkBalance()
    }, [defaultAccount]);
	
	return (
		<div className='walletCard'>
            {/* use only of the bar to connect */}
			<div className='connectBtn'>
				<h3 className="showAccount">Balance : {userBalance}</h3>
                <button className="connectMeta" onClick={connectWalletHandler} >{shortAccount ?  shortAccount : "connect"}</button>
			</div>

			{errorMessage}
            <div className="allConsole">
                <div className={provider ? "balanceDisplay" : "hide" }>
                    <h3 >{ provider && <Console name={defaultAccount} provider={provider} signer={signer}/>}  </h3> 
                    {/* <h3>{ provider && <Bank name={defaultAccount} provider={provider}/>} </h3> */}
                </div>
            </div>
            
		</div>
	);
}

export default ConnectBar

