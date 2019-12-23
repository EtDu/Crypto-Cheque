const Web3 = require('web3')
const web3 = new Web3('ws://localhost:8545')
const fs = require('fs');

const rawCheque = fs.readFileSync('./build/contracts/Cheque.json')
const parsedCheque = JSON.parse(rawCheque)
const contractAddress = parsedCheque.networks['5777'].address

let signPayment = async (recipient, amount) => {
    const accounts = await web3.eth.getAccounts()
    const payer = accounts[0]
    const txCount = await web3.eth.getTransactionCount(payer)
    const hash = web3.utils.soliditySha3(recipient, amount, txCount, contractAddress)

    try {
        const sigObject = await web3.eth.accounts.sign(hash, '0x6efc5ffc3ec6028410a2299a4a80e8f4377039c881c310ffa6f9ddf7a1fd5282')
        console.log(amount, txCount, sigObject)
    } catch (error) {
        console.log(error)
    }
} 

signPayment('0xd09D4cF222ef0B4D5623815aE9a01682a1d17E88', 1e18)


