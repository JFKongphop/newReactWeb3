// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Bank{

    event Deposit(address from, address to, uint amount);
    event Withdraw(address from, address to, uint amount);
    event TransferTo(address from, address to, uint amount);
    event ReceiveEther(address from, address to, uint amount);

    receive() external payable{
        emit ReceiveEther(msg.sender, address(this), msg.value);
    }

    function deposit() public payable{

    }

    function withdraw(uint _amount) public{
        require(_amount <= address(this).balance, "This balance is not enough");
        payable(msg.sender).transfer(_amount);
        emit Withdraw(address(this), msg.sender, _amount);
    }

    function transferTo(address payable _receiver, uint _amount) public{
        require(_amount <= address(this).balance, "This balance is not enough");
        _receiver.transfer(_amount);
        emit TransferTo(address(this), _receiver, _amount);
    }

    function totalBalance() public view returns(uint){
        return address(this).balance;
    }
}
