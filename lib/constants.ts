export const BASIC_NFT_CONTRACT_ADDRESS = "0x4D48DBe92a44bEDc942EeCff3967c9EadaE20019"
export const APP_NAME = "CartooNFT"
export const IPFS_BASE_URL = 'https://ipfs.io/ipfs'

export const categories = ['Pokemon', 'Tom & Jerry', 'Mickey Mouse', 'Bugs Bunny', 'Pink Panther', 'Dragon Ball Z', 'Naruto', 'Others']

export const abi = [
    {
        "type": "function",
        "name": "buyCDS",
        "inputs": [
            {
                "name": "_seller",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "buyerContracts",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "buyer",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "premiumAmount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "monthlyPremiumDueDate",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "missedPayments",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "isActive",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "isDefaulted",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "buyers",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "cdsSellerDetails",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "sellerName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "contractName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "sellerAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "coverageAmount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "premiumPercentage",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "tenureMonths",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllSellerAddresses",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address[]",
                "internalType": "address[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getSellerDetailsFromAddress",
        "inputs": [
            {
                "name": "sellerAddress",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct CreditDefaultSwap.CDSSeller",
                "components": [
                    {
                        "name": "sellerName",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "contractName",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "sellerAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "coverageAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "premiumPercentage",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "tenureMonths",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "gracePeriodDays",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "maxMissedPayments",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "payPremium",
        "inputs": [
            {
                "name": "_seller",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "registerSellerOnPlatform",
        "inputs": [
            {
                "name": "_sellerName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_contractName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_coverageAmount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_premiumPercentage",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_tenureMonths",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "sellCDS",
        "inputs": [],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "sellerBuyers",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "sellers",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "terminateContract",
        "inputs": [
            {
                "name": "_seller",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "ContractDefaulted",
        "inputs": [
            {
                "name": "buyer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "seller",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ContractRegistered",
        "inputs": [
            {
                "name": "seller",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "coverageAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "premiumPercentage",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ContractSold",
        "inputs": [
            {
                "name": "seller",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "coverageAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ContractTerminated",
        "inputs": [
            {
                "name": "buyer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "seller",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PremiumPaid",
        "inputs": [
            {
                "name": "buyer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "seller",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
] as const