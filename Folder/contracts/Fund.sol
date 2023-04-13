// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract Funding{
    uint public numoffunders;
    mapping(uint256=> address) private funders;

    receive() external payable{}
    
    function transfer() external payable{
        funders[numoffunders]= msg.sender;
        
    }
    function withdraw(uint amount) external{
        require(amount<= 2000000000000000000, "cannot withdraw more than 2 ether:( ");
        payable(msg.sender).transfer(amount);
        
    }
}