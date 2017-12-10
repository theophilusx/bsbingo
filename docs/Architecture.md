# Architecture

At a minimum, an electron app typically has a *main.js* file and an *index.html* file. The main.js file is responsible for loading the app, creating the main window, defining menus and keyboard commands etc. The index.html file is basiclly the layout of the application - the page which is presented as the main interface.

A common pattern is to also create a *renderer.js* file which contains any Javascript which deals with rendering content in the window (i.e. the view part).

The game ahs been setup along these lines. We have

- index.html. The basic HTML page loaded into the main window.
- main.js. The main process which starts the app and does things like reading    in the file of bingo words and generating new game *cards*.
- renderer.js. Contains the Javascript which requests a new game from the main   process (via an IPC call) and then displays the data in the main window.
- util.js. A place to put some general utility functions.

The basic process is

1. Start the app. The main.js file is executed to setup the main window, read     in the list of bingo words and listens for a request via IPC from the          renderer process for a new bingo game. When it recieves this request, it       generates an array of words for a new bingo game which it sends back via       IPC.
1. The renderer.js file sets up an event listener on the *New Game* button.       When this button is clicked, it sends a new game request to the main           process. The main process responds with a list of words for a new game. The    renderer process then clears out the old game and writes the new words to      the main window.

The solution is currently using a `Promise` wrapoped around `createReadStream`, which isn't strictly necessary and could be seen as overkill. However, this call will likely be replaced by some sort of Ajax call in the future, so I decided to use the promise wrapped around a readStream.

The page layout is very simple, relying on `<div>` containers and manually crafted CSS rules. CSS is probably my weakest area and not something I find particularly enjoyable. Will likely add in a CSS framework to improve the look. In fact, may use this project as an opportunity to try out some different CSS frameworks.

A lot more to come e.g.

- Event listeners to record when the user clicks on a word.
- Game clock etc
