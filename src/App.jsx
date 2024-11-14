// import React, { useState, useEffect } from 'react';
// import './App.css';
// import algosdk from 'algosdk';
// import axios from 'axios';
// import { PeraWalletConnect } from '@perawallet/connect';

// const peraWallet = new PeraWalletConnect({ network: 'testnet' });

// const endpoints = [
//     'https://testnet-api.algonode.cloud',
//     'https://testnet.algoexplorerapi.io',
//     'https://testnet-api.4160.nodely.dev'
// ];

// const App = () => {
//     const [address, setAddress] = useState('');
//     const [balance, setBalance] = useState(0);
//     const [accountDetails, setAccountDetails] = useState(null);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         checkConnection();
//         peraWallet.connector?.on('disconnect', handleDisconnect);
//         return () => {
//             peraWallet.connector?.off('disconnect', handleDisconnect);
//         };
//     }, []);

//     const checkConnection = async () => {
//         const accounts = await peraWallet.reconnectSession();
//         if (accounts && accounts.length > 0) {
//             const connectedAddress = accounts[0];
//             setAddress(connectedAddress);
//             fetchBalance(connectedAddress);
//         }
//     };

//     const handleDisconnect = () => {
//         setAddress('');
//         setBalance(0);
//         setAccountDetails(null);
//         setError('');
//     };

//     const connectWallet = async () => {
//         try {
//             const newAccounts = await peraWallet.connect();
//             if (newAccounts && newAccounts.length > 0) {
//                 const connectedAddress = newAccounts[0];
//                 setAddress(connectedAddress);
//                 fetchBalance(connectedAddress);
//             }
//         } catch (error) {
//             console.error('Failed to connect wallet:', error);
//             setError('Failed to connect wallet. Please try again.');
//         }
//     };

//     const disconnectWallet = () => {
//         peraWallet.disconnect();
//         handleDisconnect();
//     };

//     const fetchBalance = async (accountAddress) => {
//         if (!accountAddress) return;
//         const algodClient = new algosdk.Algodv2('', endpoints[0], '');
//         try {
//             const accountInfo = await algodClient.accountInformation(accountAddress).do();
//             setBalance(accountInfo.amount / 1e6);
//         } catch (error) {
//             console.error('Failed to fetch balance:', error);
//             setError('Failed to fetch balance.');
//         }
//     };

//     const fetchAccountDetails = async () => {
//         if (!address) return;
//         setLoading(true);
//         setError('');
//         try {
//             const response = await axios.get(`${endpoints[0]}/v2/accounts/${address}`);
            
//             // Verify that we have the response data before setting it
//             if (response.data) {
//                 const formattedDetails = {
//                     address: response.data.address || address,
//                     amount: response.data.amount || 0,
//                     status: response.data.status || 'Unknown',
//                     'pending-rewards': response.data['pending-rewards'] || 0,
//                     'total-assets-opted-in': response.data['total-assets-opted-in'] || 0,
//                     'total-apps-opted-in': response.data['total-apps-opted-in'] || 0,
//                     'min-balance': response.data['min-balance'] || 0
//                 };
//                 setAccountDetails(formattedDetails);
//             } else {
//                 throw new Error('No data received from the API');
//             }
//         } catch (error) {
//             console.error('Failed to fetch account details:', error);
//             setError('Failed to fetch account details. Please try again later.');
//             setAccountDetails(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="app-container">
//             <div className="p-8 bg-white rounded-lg shadow-md">
//                 <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
//                     Algorand Wallet and Account Info
//                 </h1>

//                 {!address ? (
//                     <button 
//                         onClick={connectWallet} 
//                         className="centered-button"
//                         disabled={loading}
//                     >
//                         Connect Wallet
//                     </button>
//                 ) : (
//                     <div className="text-center">
//                         <p className="mb-2 text-gray-600">
//                             <span className="font-semibold">Connected Address:</span>
//                             <br />
//                             <span className="break-all">{address}</span>
//                         </p>
//                         <p className="text-2xl font-bold text-green-600">
//                             Balance: {balance.toFixed(6)} ALGO
//                         </p>
//                         <div className="flex flex-col gap-2 items-center mt-4">
//                             <button 
//                                 onClick={disconnectWallet} 
//                                 className="centered-button"
//                                 disabled={loading}
//                             >
//                                 Disconnect Wallet
//                             </button>
//                             <button 
//                                 onClick={fetchAccountDetails} 
//                                 className="centered-button"
//                                 disabled={loading}
//                             >
//                                 {loading ? 'Loading...' : 'View Account Info'}
//                             </button>
//                         </div>
                        
//                         {accountDetails && (
//                             <div className="account-details mt-4">
//                                 <h2 className="text-lg font-semibold">Account Details</h2>
//                                 <div className="grid gap-2 mt-3">
//                                     <p><strong>Address:</strong> {accountDetails.address}</p>
//                                     <p><strong>Balance:</strong> {accountDetails.amount / 1e6} ALGO</p>
//                                     <p><strong>Status:</strong> {accountDetails.status}</p>
//                                     <p><strong>Pending Rewards:</strong> {accountDetails['pending-rewards']} ALGO</p>
//                                     <p><strong>Total Assets Opted In:</strong> {accountDetails['total-assets-opted-in']}</p>
//                                     <p><strong>Total Apps Opted In:</strong> {accountDetails['total-apps-opted-in']}</p>
//                                     <p><strong>Min Balance Required:</strong> {accountDetails['min-balance'] / 1e6} ALGO</p>
//                                 </div>
//                             </div>
//                         )}
                        
//                         {error && (
//                             <div className="mt-4 p-3 bg-red-100 rounded-lg">
//                                 <p className="text-red-600">{error}</p>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default App;

// 





// import React, { useState, useEffect } from 'react';
// import './App.css';
// import algosdk from 'algosdk';
// import axios from 'axios';
// import { PeraWalletConnect } from '@perawallet/connect';

// const peraWallet = new PeraWalletConnect({ network: 'testnet' });

// const endpoints = [
//     'https://testnet-api.algonode.cloud',
//     'https://testnet.algoexplorerapi.io',
//     'https://testnet-api.4160.nodely.dev'
// ];

// const App = () => {
//     const [address, setAddress] = useState('');
//     const [balance, setBalance] = useState(0);
//     const [accountDetails, setAccountDetails] = useState(null);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         checkConnection();
//         peraWallet.connector?.on('disconnect', handleDisconnect);
//         return () => {
//             peraWallet.connector?.off('disconnect', handleDisconnect);
//         };
//     }, []);

//     const checkConnection = async () => {
//         const accounts = await peraWallet.reconnectSession();
//         if (accounts && accounts.length > 0) {
//             const connectedAddress = accounts[0];
//             setAddress(connectedAddress);
//             fetchBalance(connectedAddress);
//         }
//     };

//     const handleDisconnect = () => {
//         setAddress('');
//         setBalance(0);
//         setAccountDetails(null);
//         setError('');
//     };

//     const connectWallet = async () => {
//         try {
//             const newAccounts = await peraWallet.connect();
//             if (newAccounts && newAccounts.length > 0) {
//                 const connectedAddress = newAccounts[0];
//                 setAddress(connectedAddress);
//                 fetchBalance(connectedAddress);
//             }
//         } catch (error) {
//             console.error('Failed to connect wallet:', error);
//             setError('Connection failed. Please try again.');
//         }
//     };

//     const disconnectWallet = () => {
//         peraWallet.disconnect();
//         handleDisconnect();
//     };

//     const fetchBalance = async (accountAddress) => {
//         if (!accountAddress) return;
//         const algodClient = new algosdk.Algodv2('', endpoints[0], '');
//         try {
//             const accountInfo = await algodClient.accountInformation(accountAddress).do();
//             setBalance(accountInfo.amount / 1e6);
//         } catch (error) {
//             console.error('Failed to fetch balance:', error);
//             setError('Failed to fetch balance.');
//         }
//     };

//     const fetchAccountDetails = async () => {
//         if (!address) return;
//         try {
//             const response = await axios.get(`${endpoints[0]}/v2/accounts/${address}`);
//             setAccountDetails(response.data);
//             fetchBalance(address); // Fetch balance after getting account details
//         } catch (error) {
//             console.error('Failed to fetch account details:', error);
//             setError('Failed to fetch account details. Please try again later.');
//         }
//     };

//     return (
//         <div className="app-container">
//             <div className="p-8 bg-white rounded-lg shadow-md">
//                 <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
//                     Algorand Wallet and Account Info
//                 </h1>

//                 {!address ? (
//                     <button onClick={connectWallet} className="centered-button">
//                         Connect Wallet
//                     </button>
//                 ) : (
//                     <div className="text-center">
//                         <p className="mb-2 text-gray-600">
//                             <span className="font-semibold">Connected Address:</span>
//                             <br />
//                             <span className="break-all">{address}</span>
//                         </p>
//                         <p className="text-2xl font-bold text-green-600">
//                             Balance: {balance.toFixed(6)} ALGO
//                         </p>
//                         <button onClick={disconnectWallet} className="centered-button">
//                             Disconnect Wallet
//                         </button>
//                         <button onClick={fetchAccountDetails} className="centered-button">
//                             View Account Info
//                         </button>
//                         {accountDetails && (
//                             <div className="account-details mt-4">
//                                 <h2 className="text-lg font-semibold">Account Details</h2>
//                                 <p><strong>Address:</strong> {accountDetails.address}</p>
//                                 <p><strong>Balance:</strong> {(accountDetails.amount / 1e6).toFixed(6)} ALGO</p>
//                                 <p><strong>Status:</strong> {accountDetails.status}</p>
//                                 <p><strong>Pending Rewards:</strong> {(accountDetails['pending-rewards'] / 1e6).toFixed(6)} ALGO</p>
//                                 <p><strong>Total Assets Opted In:</strong> {accountDetails['total-assets-opted-in']}</p>
//                                 <p><strong>Total Apps Opted In:</strong> {accountDetails['total-apps-opted-in']}</p>
//                                 <p><strong>Min Balance Required:</strong> {(accountDetails['min-balance'] / 1e6).toFixed(6)} ALGO</p>
//                             </div>
//                         )}
//                         {error && <p className="error-message text-red-500 mt-4">{error}</p>}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default App;




// import React, { useState, useEffect } from 'react';
// import './App.css';
// import algosdk from 'algosdk';
// import axios from 'axios';
// import { PeraWalletConnect } from '@perawallet/connect';

// const peraWallet = new PeraWalletConnect({ network: 'testnet' });

// const endpoints = [
//     'https://testnet-api.algonode.cloud',
//     'https://testnet.algoexplorerapi.io',
//     'https://testnet-api.4160.nodely.dev'
// ];

// const App = () => {
//     const [address, setAddress] = useState('');
//     const [balance, setBalance] = useState(0);
//     const [accountDetails, setAccountDetails] = useState(null);
//     const [error, setError] = useState('');
//     const [showAccountDetails, setShowAccountDetails] = useState(false);
//     const [isDarkTheme, setIsDarkTheme] = useState(false);

//     useEffect(() => {
//         checkConnection();
//         peraWallet.connector?.on('disconnect', handleDisconnect);
//         return () => {
//             peraWallet.connector?.off('disconnect', handleDisconnect);
//         };
//     }, []);

//     const checkConnection = async () => {
//         const accounts = await peraWallet.reconnectSession();
//         if (accounts && accounts.length > 0) {
//             const connectedAddress = accounts[0];
//             setAddress(connectedAddress);
//             fetchBalance(connectedAddress);
//         }
//     };

//     const handleDisconnect = () => {
//         setAddress('');
//         setBalance(0);
//         setAccountDetails(null);
//         setError('');
//     };

//     const connectWallet = async () => {
//         try {
//             const newAccounts = await peraWallet.connect();
//             if (newAccounts && newAccounts.length > 0) {
//                 const connectedAddress = newAccounts[0];
//                 setAddress(connectedAddress);
//                 fetchBalance(connectedAddress);
//             }
//         } catch (error) {
//             console.error('Failed to connect wallet:', error);
//             setError('Connection failed. Please try again.');
//         }
//     };

//     const disconnectWallet = () => {
//         peraWallet.disconnect();
//         handleDisconnect();
//     };

//     const fetchBalance = async (accountAddress) => {
//         if (!accountAddress) return;
//         const algodClient = new algosdk.Algodv2('', endpoints[0], '');
//         try {
//             const accountInfo = await algodClient.accountInformation(accountAddress).do();
//             setBalance(accountInfo.amount / 1e6);
//         } catch (error) {
//             console.error('Failed to fetch balance:', error);
//             setError('Failed to fetch balance.');
//         }
//     };

//     const fetchAccountDetails = async () => {
//         if (!address) return;
//         try {
//             const response = await axios.get(`${endpoints[0]}/v2/accounts/${address}`);
//             setAccountDetails(response.data);
//             fetchBalance(address);
//         } catch (error) {
//             console.error('Failed to fetch account details:', error);
//             setError('Failed to fetch account details. Please try again later.');
//         }
//     };

//     const toggleAccountDetails = () => {
//         setShowAccountDetails(!showAccountDetails);
//         fetchAccountDetails(); // Automatically fetch account details when showing
//     };

//     const toggleTheme = () => {
//         setIsDarkTheme(!isDarkTheme);
//     };

//     return (
//         <div className={`app-container ${isDarkTheme ? 'dark' : 'light'}`}>
//             <div className="p-8 bg-white rounded-lg shadow-md">
//                 <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
//                     Algorand Wallet and Account Info
//                 </h1>

//                 <button onClick={toggleTheme} className="theme-toggle-button">
//                     {isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//                 </button>

//                 {!address ? (
//                     <button onClick={connectWallet} className="centered-button">
//                         Connect Wallet
//                     </button>
//                 ) : (
//                     <div className="text-center">
//                         <p className="mb-2 text-gray-600">
//                             <span className="font-semibold">Connected Address:</span>
//                             <br />
//                             <span className="break-all">{address}</span>
//                         </p>
//                         <p className="text-2xl font-bold text-green-600">
//                             Balance: {balance.toFixed(6)} ALGO
//                         </p>
//                         <button onClick={disconnectWallet} className="centered-button">
//                             Disconnect Wallet
//                         </button>
//                         <button onClick={toggleAccountDetails} className="centered-button">
//                             {showAccountDetails ? 'Hide Account Info' : 'Show Account Info'}
//                         </button>
//                         {showAccountDetails && accountDetails && (
//                             <div className={`account-details mt-4 ${showAccountDetails ? 'fade-in' : 'fade-out'}`}>
//                                 <h2 className="text-lg font-semibold">Account Details</h2>
//                                 <p><strong>Address:</strong> {accountDetails.address}</p>
//                                 <p><strong>Balance:</strong> {(accountDetails.amount / 1e6).toFixed(6)} ALGO</p>
//                                 <p><strong>Status:</strong> {accountDetails.status}</p>
//                                 <p><strong>Pending Rewards:</strong> {(accountDetails['pending-rewards'] / 1e6).toFixed(6)} ALGO</p>
//                                 <p><strong>Total Assets Opted In:</strong> {accountDetails['total-assets-opted-in']}</p>
//                                 <p><strong>Total Apps Opted In:</strong> {accountDetails['total-apps-opted-in']}</p>
//                                 <p><strong>Min Balance Required:</strong> {(accountDetails['min-balance'] / 1e6).toFixed(6)} ALGO</p>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {error && <p className="text-red-600">{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import { PeraWalletConnect } from '@perawallet/connect';
// import algosdk from 'algosdk';
// import axios from 'axios';
// import { Wallet, Sun, Moon, ChevronDown, ChevronUp, Power } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const peraWallet = new PeraWalletConnect({ network: 'testnet' });

// const endpoints = [
//     'https://testnet-api.algonode.cloud',
//     'https://testnet.algoexplorerapi.io',
//     'https://testnet-api.4160.nodely.dev'
// ];

// const App = () => {
//     const [address, setAddress] = useState('');
//     const [balance, setBalance] = useState(0);
//     const [accountDetails, setAccountDetails] = useState(null);
//     const [error, setError] = useState('');
//     const [showAccountDetails, setShowAccountDetails] = useState(false);
//     const [isDarkTheme, setIsDarkTheme] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         checkConnection();
//         peraWallet.connector?.on('disconnect', handleDisconnect);
//         return () => {
//             peraWallet.connector?.off('disconnect', handleDisconnect);
//         };
//     }, []);

//     const checkConnection = async () => {
//         const accounts = await peraWallet.reconnectSession();
//         if (accounts?.length > 0) {
//             setAddress(accounts[0]);
//             fetchBalance(accounts[0]);
//         }
//     };

//     const handleDisconnect = () => {
//         setAddress('');
//         setBalance(0);
//         setAccountDetails(null);
//         setError('');
//     };

//     const connectWallet = async () => {
//         setIsLoading(true);
//         try {
//             const newAccounts = await peraWallet.connect();
//             if (newAccounts?.length > 0) {
//                 setAddress(newAccounts[0]);
//                 fetchBalance(newAccounts[0]);
//             }
//         } catch (error) {
//             console.error('Failed to connect wallet:', error);
//             setError('Connection failed. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const disconnectWallet = () => {
//         peraWallet.disconnect();
//         handleDisconnect();
//     };

//     const fetchBalance = async (accountAddress) => {
//         if (!accountAddress) return;
//         const algodClient = new algosdk.Algodv2('', endpoints[0], '');
//         try {
//             const accountInfo = await algodClient.accountInformation(accountAddress).do();
//             setBalance(accountInfo.amount / 1e6);
//         } catch (error) {
//             console.error('Failed to fetch balance:', error);
//             setError('Failed to fetch balance.');
//         }
//     };

//     const fetchAccountDetails = async () => {
//         if (!address) return;
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`${endpoints[0]}/v2/accounts/${address}`);
//             setAccountDetails(response.data);
//             fetchBalance(address);
//         } catch (error) {
//             console.error('Failed to fetch account details:', error);
//             setError('Failed to fetch account details. Please try again later.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const toggleAccountDetails = () => {
//         setShowAccountDetails(!showAccountDetails);
//         if (!showAccountDetails) {
//             fetchAccountDetails();
//         }
//     };

//     return (
//         <div className={`min-h-screen transition-colors duration-300 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//             <div className="container mx-auto px-4 py-8">
//                 <div className="flex justify-end mb-4">
//                     <button
//                         onClick={() => setIsDarkTheme(!isDarkTheme)}
//                         className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                     >
//                         {isDarkTheme ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
//                     </button>
//                 </div>

//                 <Card className={`w-full max-w-2xl mx-auto ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
//                     <CardHeader>
//                         <CardTitle className="flex items-center justify-center gap-2">
//                             <Wallet className="w-8 h-8" />
//                             <span className="text-2xl">Algorand Wallet</span>
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         {/* The rest of your JSX remains the same */}
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import algosdk from 'algosdk';
import axios from 'axios';
import { PeraWalletConnect } from '@perawallet/connect';

const peraWallet = new PeraWalletConnect({ network: 'testnet' });

const endpoints = [
    'https://testnet-api.algonode.cloud',
    'https://testnet.algoexplorerapi.io',
    'https://testnet-api.4160.nodely.dev'
];

const App = () => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [accountDetails, setAccountDetails] = useState(null);
    const [error, setError] = useState('');
    const [showAccountDetails, setShowAccountDetails] = useState(false);

    useEffect(() => {
        checkConnection();
        peraWallet.connector?.on('disconnect', handleDisconnect);
        return () => {
            peraWallet.connector?.off('disconnect', handleDisconnect);
        };
    }, []);

    const checkConnection = async () => {
        const accounts = await peraWallet.reconnectSession();
        if (accounts && accounts.length > 0) {
            const connectedAddress = accounts[0];
            setAddress(connectedAddress);
            fetchBalance(connectedAddress);
        }
    };

    const handleDisconnect = () => {
        setAddress('');
        setBalance(0);
        setAccountDetails(null);
        setError('');
    };

    const connectWallet = async () => {
        try {
            const newAccounts = await peraWallet.connect();
            if (newAccounts && newAccounts.length > 0) {
                const connectedAddress = newAccounts[0];
                setAddress(connectedAddress);
                fetchBalance(connectedAddress);
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            setError('Connection failed. Please try again.');
        }
    };

    const disconnectWallet = () => {
        peraWallet.disconnect();
        handleDisconnect();
    };

    const fetchBalance = async (accountAddress) => {
        if (!accountAddress) return;
        const algodClient = new algosdk.Algodv2('', endpoints[0], '');
        try {
            const accountInfo = await algodClient.accountInformation(accountAddress).do();
            setBalance(accountInfo.amount / 1e6);
        } catch (error) {
            console.error('Failed to fetch balance:', error);
            setError('Failed to fetch balance.');
        }
    };

    const fetchAccountDetails = async () => {
        if (!address) return;
        try {
            const response = await axios.get(`${endpoints[0]}/v2/accounts/${address}`);
            setAccountDetails(response.data);
            fetchBalance(address);
        } catch (error) {
            console.error('Failed to fetch account details:', error);
            setError('Failed to fetch account details. Please try again later.');
        }
    };
    

    const toggleAccountDetails = () => {
        setShowAccountDetails(!showAccountDetails);
        fetchAccountDetails();
    };

    return (
        <div className="app-container bg-white min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
                    Algorand Wallet & Account Info
                </h1>

                {!address ? (
                    <button
                        onClick={connectWallet}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
                    >
                        Connect Wallet
                    </button>
                ) : (
                    <div>
                        <div className="p-6 mb-4 bg-gray-100 rounded-lg">
                            <p className="text-sm font-medium text-gray-500">Connected Address</p>
                            <p className="text-sm font-mono text-ellipsis overflow-hidden text-gray-900">
                                {address}
                            </p>
                            <p className="text-lg font-semibold text-green-600 mt-4">
                                Balance: {balance.toFixed(6)} ALGO
                            </p>
                        </div>

                        <button
                            onClick={disconnectWallet}
                            className="w-full py-3 mb-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
                        >
                            Disconnect Wallet
                        </button>

                        <button
                            onClick={toggleAccountDetails}
                            className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition-all"
                        >
                            {showAccountDetails ? 'Hide Account Info' : 'Show Account Info'}
                        </button>

                        {showAccountDetails && accountDetails && (
                            <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-inner">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h2>
                                <div className="text-sm text-gray-700">
                                    <p><strong>Address:</strong> {accountDetails.address}</p>
                                    <p><strong>Balance:</strong> {(accountDetails.amount / 1e6).toFixed(6)} ALGO</p>
                                    <p><strong>Status:</strong> {accountDetails.status}</p>
                                    <p><strong>Pending Rewards:</strong> {(accountDetails['pending-rewards'] / 1e6).toFixed(6)} ALGO</p>
                                    <p><strong>Total Assets Opted In:</strong> {accountDetails['total-assets-opted-in']}</p>
                                    <p><strong>Total Apps Opted In:</strong> {accountDetails['total-apps-opted-in']}</p>
                                    <p><strong>Min Balance Required:</strong> {(accountDetails['min-balance'] / 1e6).toFixed(6)} ALGO</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default App;


