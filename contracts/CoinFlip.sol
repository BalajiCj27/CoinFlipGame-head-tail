// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    event FlipOutcome(address indexed player, uint256 betAmount, bool outcome);

    constructor() {
        owner = msg.sender;
    }

    function flip(bool _guess) public payable returns (bool) {
        require(msg.value > 0, "Bet amount must be greater than 0");

        bool outcome = (block.timestamp % 2 == 0); // Simple randomization using block timestamp

        if (_guess == outcome) {
            // User guessed correctly, send them double their bet
            payable(msg.sender).transfer(msg.value * 2);
            emit FlipOutcome(msg.sender, msg.value, true);
            return true;
        } else {
            // User guessed incorrectly, house keeps the bet
            emit FlipOutcome(msg.sender, msg.value, false);
            return false;
        }
    }

    // Fallback function to accept deposits
    receive() external payable {}
}
