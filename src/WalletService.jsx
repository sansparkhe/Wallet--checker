import algosdk from 'algosdk';


const algodClient = new algosdk.Algodv2('', 'https://testnet.algoexplorerapi.io', '');
const indexerClient = new algosdk.Indexer('', 'https://testnet.algoexplorerapi.io/idx2', '');

export const fetchBalance = async (accountAddress, setBalance) => {
    if (!accountAddress) return;

        try {
            const accountInfo = await algodClient.accountInformation(accountAddress).do();
            setBalance(accountInfo.amount / 1e6);
        } catch (error) {
            console.error('Failed to fetch account balance:', error);
            setBalance(0);
        }

};

export const fetchNfts = async (accountAddress, setNfts) => {
    try {
        const accountInfo = await algodClient.accountInformation(accountAddress).do();
        const ownedAssets = accountInfo.assets.filter(asset => asset.amount > 0);
        setNfts(ownedAssets);
    } catch (error) {
        console.error('Failed to fetch NFTs:', error);
        setNfts([]);
    }
};

export const fetchTransactionHistory = async (accountAddress, setTransactions) => {
    try {
        const response = await indexerClient.lookupAccountTransactions(accountAddress).do();
        console.log("Transaction response:", response); // Log to see the response
        if (response && response.transactions) {
            setTransactions(response.transactions);
        } else {
            console.error("No transactions found for this account");
            setTransactions([]);
        }
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        setTransactions([]);
    }
};


// src/services/WalletService.js

