import React, { useEffect, useState, createContext, useContext } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();
import { NotificationContext } from "../notify/NotificationContext";
import { Color } from "../notify";

const { ethereum } = window;

const getEtherumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({ provider, signer, transactionContract });
    return transactionContract;
}

function callNotification(message, color) {
    console.log(message, color, 'message');
    const { createNotification } = useContext(NotificationContext);
    // const { addNotificationFunc } = useContext(APINotificationsContext);
    // useEffect(() => {
    //     console.log('useEffect');
    //     addNotificationFunc('getAllTransactions_ERROR');
    //   }, [addNotificationFunc]);
    createNotification({ message, color, id: notifications.length });
    console.log(useContext(NotificationContext), 'useContext(NotificationContext) callNotification');
    // createNotification(color);
    // addNotificationFunc(message);
}

const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactionsList, setTransactions] = useState([]);
    const { createNotification } = useContext(NotificationContext);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert('Please install metamask');
            const transactionContract = getEtherumContract();

            const availableTransactions = await transactionContract.getAllTransactions();
            console.log(availableTransactions, 'availableTransactions');

            const structuredTransactions = availableTransactions.map((item) => ({
                addressTo: item.receiver,
                addressFrom: item.sender,
                timestamp: new Date(item.timestamp.toNumber() * 1000).toLocaleString(),
                message: item.message,
                keyword: item.keyword,
                amount: parseInt(item.amount._hex) / (10 ** 18),
            }))
            console.log(structuredTransactions, 'structuredTransactions');
            setTransactions(structuredTransactions);
        } catch(err) {
            console.log(ethereum, 'ethereum');
            if (ethereum && ethereum.networkVersion === 1) {
                const transactionContract = getEtherumContract();
                console.log(transactionContract, 'transactionContract');
                createNotification('Your current chain is mainnet', Color.error);
                createNotification('Krypt support only Ropsten chain', Color.info);
            }
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
    
            console.log('checkIfWalletIsConnected');
            const accounts = await ethereum.request({ method: 'eth_accounts'});
            console.log(accounts, 'checkIfWalletIsConnected');
    
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
                createNotification('NO accounts found', Color.error);
                console.log('NO accounts found');
            }
    
            console.log(accounts, 'account');
        } catch(err) {
            createNotification('WALLET_ERROR', Color.error);
            console.log(err, 'checkIfWalletIsConnected ERROR')
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            console.log(accounts, 'accounts');

            setCurrentAccount(accounts[0]);
        } catch (err) {
            console.log(err, 'connectWallet ERROR');
        }
    }

    const checkIfTransactionsExist = async () => {
        try {

            const transactionContract = getEtherumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem('transactionCount', transactionCount);
        } catch (err) {
            createNotification('NO transactions found', Color.error);
           console.log(err, 'NO transactions found'); 
        }

    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const { addressTo, amount, keyword, message } = formData;
            const parsedAmount = ethers.utils.parseEther(amount);
            console.log(amount, 'amount');
            console.log(parsedAmount, 'parsedAmount');

            const transactionContract = getEtherumContract();

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            
            setIsLoading(true);
            console.log(`LOADING - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`SUCCESS - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());
        } catch(err) {
            console.log(err, 'err sendTransaction');
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, sendTransaction, handleChange, transactionsList, isLoading }}>
            {children}
        </TransactionContext.Provider>
    )
}

export default TransactionProvider;