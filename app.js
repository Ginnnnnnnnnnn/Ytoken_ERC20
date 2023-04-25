var web3;
var chainId;
var accountAddress
var erc20Abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_feeReceiver",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burnFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "burnPercent",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeBeneficiary",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "feePercent",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isBurn",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "isFee",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_feePercent",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_newReceiver",
          "type": "address"
        }
      ],
      "name": "setFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_burnPercent",
          "type": "uint256"
        }
      ],
      "name": "setBurn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

async function connect() {
    if(window.ethereum) {
        try {
            await window.ethereum.enable();
        } catch(error){
            console.error("User denied account access");
        }
        web3 = new Web3(window.ethereum);
    } else if(window.web3) {
        web3 = new Web3(window.ethereum);
    } else {
        alert("Please install wallet");
    }

    chainId = await web3.eth.getChainId();
    var blockNumber = await web3.eth.getBlockNumber();
    var block = await web3.eth.getBlock(blockNumber);
    var blockTimestamp = block.timestamp;

    var account = await web3.eth.getAccounts();
    accountAddress = account[0];

    var balance = await web3.eth.getBalance(accountAddress);

    document.getElementById("chain_id").innerText = chainId;
    document.getElementById("block_number").innerText = blockNumber;
    document.getElementById("block_timestamp").innerText = blockTimestamp;
    document.getElementById("account_address").innerText = accountAddress;
    document.getElementById("account_balance").innerText = web3.utils.fromWei(balance);
}

async function read() {
    var contractAddress = document.getElementById("contract_address").value;
    var instance = new web3.eth.Contract(erc20Abi, contractAddress,);

    var tokenSymbol = await instance.methods.symbol().call();
    var tokenTotalSupply = await instance.methods.totalSupply().call();

    var balance = await instance.methods.balanceOf(accountAddress).call();

    document.getElementById("token_symbol").innerText = tokenSymbol;
    document.getElementById("token_totalSupply").innerText = web3.utils.fromWei(tokenTotalSupply);
    document.getElementById("token_balance").innerText = web3.utils.fromWei(balance);
}

async function transfer(){
    var contractAddress = document.getElementById("contract_address").value;
    var instance = new web3.eth.Contract(erc20Abi, contractAddress);

    var toAddress = document.getElementById("to_address").value;
    var amount = document.getElementById("transfer_amount").value;

    var transferData = instance.methods.transfer(toAddress, web3.utils.toWei(amount)).encodeABI();

    var estimateGasRes = await web3.eth.estimateGas({
        to: contractAddress,
        data: transferData,
        from: accountAddress,
        value: '0x0'
    });

    var gasPrice = await web3.eth.getGasPrice();

    let nonce = await web3.eth.getTransactionCount(accountAddress);

    let rawTransaction = {
        from: accountAddress,
        to: contractAddress,
        nonce: web3.utils.toHex(nonce),
        gasPrice: gasPrice,
        gas: estimateGasRes * 2,
        value: '0x0',
        data: transferData,
        chainId: chainId
    }

    web3.eth.sendTransaction(rawTransaction).on("transactionHash", function(hash){
        console.log("txHash", hash);
        document.getElementById("tx_hash").innerText = hash;
    })

    document.getElementById("estimate_gas").innerText = estimateGasRes;
    document.getElementById("gas_price").innerText = web3.utils.fromWei(
        gasPrice,
        "gwei"
    );


}

async function mint(){
    var contractAddress = document.getElementById("contract_address").value;
    var instance = new web3.eth.Contract(erc20Abi, contractAddress);

    var mintAddress = document.getElementById("mint_address").value;
    var mintAmount = document.getElementById("mint_amount").value;

    var mintData = instance.methods.mint(mintAddress, web3.utils.toWei(mintAmount)).encodeABI();

    var estimateGasRes = await web3.eth.estimateGas({
        to: contractAddress,
        data: mintData,
        from: accountAddress,
        value: '0x0'
    });

    var gasPrice = await web3.eth.getGasPrice();

    let nonce = await web3.eth.getTransactionCount(accountAddress);

    let rawTransaction = {
        from: accountAddress,
        to: contractAddress,
        nonce: web3.utils.toHex(nonce),
        gasPrice: gasPrice,
        gas: estimateGasRes * 2,
        value: '0x0',
        data: mintData,
        chainId: chainId
    }

    web3.eth.sendTransaction(rawTransaction).on("transactionHash", function(hash){
        console.log("txHash", hash);
        document.getElementById("mint_tx_hash").innerText = hash;
    })

    document.getElementById("mint_estimate_gas").innerText = estimateGasRes;
    document.getElementById("mint_gas_price").innerText = web3.utils.fromWei(
        gasPrice,
        "gwei"
    );


}

async function burn(){
    var contractAddress = document.getElementById("contract_address").value;
    var instance = new web3.eth.Contract(erc20Abi, contractAddress);

    var burnAmount = document.getElementById("burn_amount").value;

    var burnData = instance.methods.burn(web3.utils.toWei(burnAmount)).encodeABI();

    var estimateGasRes = await web3.eth.estimateGas({
        to: contractAddress,
        data: burnData,
        from: accountAddress,
        value: '0x0'
    });

    var gasPrice = await web3.eth.getGasPrice();

    let nonce = await web3.eth.getTransactionCount(accountAddress);

    let rawTransaction = {
        from: accountAddress,
        to: contractAddress,
        nonce: web3.utils.toHex(nonce),
        gasPrice: gasPrice,
        gas: estimateGasRes * 2,
        value: '0x0',
        data: burnData,
        chainId: chainId
    }

    web3.eth.sendTransaction(rawTransaction).on("transactionHash", function(hash){
        console.log("txHash", hash);
        document.getElementById("burn_tx_hash").innerText = hash;
    })

    document.getElementById("burn_estimate_gas").innerText = estimateGasRes;
    document.getElementById("burn_gas_price").innerText = web3.utils.fromWei(
        gasPrice,
        "gwei"
    );


}
