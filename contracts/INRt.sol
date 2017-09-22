pragma solidity ^0.4.16;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract INRt is Ownable, StandardToken {

    // Ethereum token standaard
    string public standard = "Token 0.1";

    // Full name
    string public name = "INR Tether";        
    
    // Symbol
    string public symbol = "INRT";

    // No of decimal points
    uint8 public decimals = 18;


    /**
    * Starts with a total supply of zero and the creator starts with 
    * zero tokens (just like everyone else)
    */
    function INRt() {
      // constructor
      balances[msg.sender] = 0;
      totalSupply = 0;    
    }

    /**
     * Issues `_value` new tokens to `_recipient` (_value < 0 guarantees that tokens are never removed)
     *
     * @param _recipient The address to which the tokens will be issued
     * @param _value The amount of new tokens to issue
     * @return Whether the approval was successful or not
     */
    function issue(address _recipient, uint256 _value) onlyOwner returns (bool success) {

        // Guarantee positive 
        if (_value < 0) {
            throw;
        }

        // Create tokens
        balances[_recipient] += _value;
        totalSupply += _value;

        // Notify listners
        Transfer(0, owner, _value);
        Transfer(owner, _recipient, _value);

        return true;
    }


    /**
     * Prevents accidental sending of ether
     */
    function () {
        throw;
    }  
}

