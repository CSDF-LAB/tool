#!/usr/bin/env node  
const fs = require('fs');
let blockNumber = 0;

async function check_status() {
  blockNumber = await web3.eth.getBlockNumber();
}

async function timeTostartblock() {
  await check_status();
  var now = new Date();
  
  var year = now.getFullYear();     // 연도
  var month = now.getMonth()+1;     // 월(+1해줘야됨)                             
  var day = now.getDate();          // 일
  var hours = now.getHours();       // 현재 시간
  var minutes = now.getMinutes();   // 현재 분

  var startYear = document.getElementById("startYear").value;
  var startMonth = document.getElementById("startMonth").value;
  var startDay = document.getElementById("startDay").value;
  var startHours = document.getElementById("startHour").value;
  var startMinutes = document.getElementById("startMinute").value;

  var present = new Date(year, month, day, hours, minutes);
  var startDay = new Date(startYear, startMonth, startDay, startHours, startMinutes);

  var elapsedMSec = present.getTime() - startDay.getTime(); 
  var elapsedMin = elapsedMSec / 1000 / 60; 

  startBlock = blockNumber - parseInt(elapsedMin) * 4;
  document.getElementById("startblock").innerHTML = `${startBlock}`;
  return startBlock;
}

async function timeToendblock() {
  await check_status();
  var now = new Date();
    
  var year = now.getFullYear();     // 연도
  var month = now.getMonth()+1;     // 월(+1해줘야됨)                             
  var day = now.getDate();          // 일
  var hours = now.getHours();       // 현재 시간
  var minutes = now.getMinutes();   // 현재 분
  
  var endYear = document.getElementById("endYear").value;
  var endMonth = document.getElementById("endMonth").value;
  var endDay = document.getElementById("endDay").value;
  var endHours = document.getElementById("endHour").value;
  var endMinutes = document.getElementById("endMinute").value;

  var present = new Date(year, month, day, hours, minutes);
  var endDay = new Date(endYear, endMonth, endDay, endHours, endMinutes);
  
  var elapsedMSec = present.getTime() - endDay.getTime(); 
  var elapsedMin = elapsedMSec / 1000 / 60; 
  
  endBlock = blockNumber - parseInt(elapsedMin) * 4;
  document.getElementById("endblock").innerHTML = `${endBlock}`
  return endBlock;
}

function inputAccount() {
  account = document.getElementById("account").value;

  return account;
}

function inputSolidity(event) {
  event.preventDefault(); //submit 할때 새로고침 되는것을 방지
  fileObject = document.getElementById("solidityFile");
  let fileName = fileObject.files[0];
  let fr = new FileReader();
  fr.readAsText(fileName, "utf-8");

  fr.onload = () => {
      parseText(fr.result);
  }
};

function parseText(text) {
  const shell = require('shelljs');
  code = text;
  shell.cd('~');
  if(shell.exec('solc test.sol --abi').code !==0) {
    shell.echo('Error: command failed')
    shell.exit(1)
  }

};

function solidityCompile(){
  var solc = require('solc');
  compiledCode = solc.compile(code);
  console.log(compiledCode.contracts[':Contract_file_name'].interface);
  
};

async function getTransactionByAccount (){
  const res = [];
  await timeTostartblock();
  await timeToendblock();
  document.getElementById("startblock").innerHTML = `${startBlock}`
  document.getElementById("endblock").innerHTML = `${endBlock}`
  inputAccount();
  inputSolidity();
  for (let i = startBlock; i < endBlock; i++){
    const blockinfo = await web3.eth.getBlock(i);
    const transactionsList = blockinfo.transactions;
    transactionsList.forEach(async (item) => {
      txInfo = await web3.eth.getTransaction(item);
      methodId = web3.eth.abi.encodeFunctionSignature(func);
      if (txInfo.to == account || txInfo.from == account){
        if (txInfo.input.includes(methodID)){
          res.push(txInfo.hash);
        };
      };
      console.log(txInfo.input);
    });
  }

  document.getElementById("output").innerHTML = `${res}`;  

  return res;
        
}
