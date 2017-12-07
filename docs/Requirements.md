# Requirements

The overall requirement is to create an application using Electron that implements 
a basic /Bullshit Bingo/ game. The application should run on multiple desktop 
platforms including Windows, Linux and OSx/MacOS.

## Game Description

Bullshit Bingo is a bingo like game. Players are presented with a /card/ 
containing a set of unique words or short phrases. The card should be modelled
after a typical bingo game card. To play the game, a player will listen for words
and pharases spoken during a meeting or presentaiton which appear on their game 
card. When they hear one of the words or phrases listed on their game card, they
should be able to mark that word or phrase as /completed/. Once all words or pharses 
on the card have been completed, the game has finished. Once a player has completed
their game, to be technically compliant with the game, they should jump to their 
feet and shout "Bullshit". However, as this can tend to be a career limiting action,
players should feel free to say nothing, smile to themselves and be confident the 
speaker or presenter is talking bullshit.

## Functional Requirements

- The game must provide a button which the user can click on to generate a new
game card.

- Game cards should present the words and phrases in a similar layout to a 
traditional bingo card with /blank/ spots and with words or phrases displayed
in a random order.

- The game card should have no fewer than 8 distinct words or phrases.

- The game should include a /start/ button. When clicked, the start button should
initiate a timer. The timer should run until either all items on the card have 
been completed or the game is cancelled/stopped (possibly via a cancel or stop button).

- The game interface must provide a fast and easy to use mechanism for players to 
mark a word as being completed. This indicator should make completed items 
visually distinctive from uncompleted items.

- The game interface should support both keyboard and mouse interface controls.
It should be possible to operate the game just using keyboard commands.

- The game should provide a /boss key/ which will hide the game when key is pressed.

## Non-Functional Requirements

- The game should be easy to play and provide game mechanics which are /subtle/
and allow players to play the game without being too obvious to others.

- The game should integrate into the platform environment in a manner similar
to other applications on the platform.

- The game should not be resource intensive or adversly impact the performance 
of other applications.
