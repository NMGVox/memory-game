# Memory Card Game

A browser-based game, devloped in React.JS, that tests the player's memory. 


To win the game, the player must click every card one time. Clicking on a card twice is an automatic loss.
The game keeps track of the user's score, and time taken to complete a level. There are 3 difficulties. The higher the difficulty, the more cards the user has to click. After each click, the cards are shuffled, adding to the challenge.

As an extra development challenge, the application receives its data (titles and album covers) from the Deezer Music API. This fetch is done once per game/round. The albums to fetch are randomly drawn from a file named data.js.

In its current form, the game is fully playable and scores and time for each difficulty are stored locally using the localStorage API.

![mem1](https://github.com/NMGVox/memory-game/assets/87345234/aadeaa69-c001-4ad1-a45d-48a98f74a3e4)
![mem2](https://github.com/NMGVox/memory-game/assets/87345234/f7fe4c99-bb14-4cd1-9108-9ef2afebc512)

[DEMO](https://main--spectacular-sable-9b9b0b.netlify.app/ "Memory Card Demo")

-Tech Stack: React.js, CSS, HTML, npm, Deezer Music API
