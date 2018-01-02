# Bullshit Bingo - Electron Edition

This is a very simple implementation of the game "Bullshit Bingo" or as it may be called by those who are offended by words "Buzzword Bingo". It is just like normal Bingo, but instead of numbers, the *card* consists of words which are often heard when listening to fast speaking, slick sales types or pointy haired bosses who are out of their depth, but want to sound knowledgeable.

Watch the below video to get a better idea about Bullshit Bingo!

[![Bullshit Bingo Video](http://img.youtube.com/vi/Dnkow4y1cyw/0.jpg)](http://www.youtube.com/watch?v=Dnkow4y1cyw)

At the end of the day, it is all just a bit of fun. Can't deal or find it offensive, move on. Life is too short to take this crap seriously.

## Purpose

The real purpose for this repo is to have something to experiment with. When evaluating new technology, languages, frameworks, etc, you need something to base your evaluation on. It seems the current practice is to use a *todo list* or some form of *shoping list* application to do this. Unfortunately, that crosses my bordum threshold. Bullshit Bingo to the rescue!

### Approach

In this repo, I plan to implement a basic, but functional, version of the game Bullshit Bingo using Electron to create a desktop version which will run on Windows, Mac and Linux.

The basic aproach will be to first implement the game using nothing but the bare necessities. As far as possible, vanilla Javascript, HTML and CSS. No frameworks (apart from Electron of course), template systems or any other add-ons.

Once the basic application is working, I will then create branches for different versions of the application which use different frameworks and libraries to either address *pain points* in the original development - those things which were harder to do than they should be or which could become cleaner or clearer through the use of a library/framework or add new features which are difficult to do with just vanilla Javascript and CSS.

Some of the technologies I hope to experiment with as part of this example include

- React. I have done some react based solutions using Clojure and Reagent.
  It will be interesting to use React directly in Javascript.

- Angular. Never used it, so here is a good excuse to give it a go.

- CSS Frameworks. Have used Bootsrap, but would like to try some of the other CSS
  frameworks - especially ones which may be a little more *light-weight*.

- JQuery. I guess it should just be done as a comparison with others.

- More to come as I find an interest!

I also plan to implement this game using a more traditional web application with client and server. It would be interesting to develop a version using Express and use it to experiment with async techniques and libraries like graphQL etc. As I still prefer Clojure and ClojureScript, I also plan to implement equivalent versions using ClojureScript.

## Screenshots

People like to see screenshots....

State as of 2nd January, 2018. Basic functionality in place. You can generate a new *game card* and can toggle the *seen* status of words by clicking on them with the mouse. 

![Screenshot 2018-01-02](./Screenshot-2018-01-02.png)


## Installation

At this stage, you can clone the repo and then run the following commands to run the applicaiton. 

```
npm instrall
npm start
```

### Documentation

Very unlikely there will be much /real/ documentation. However, I will keep notes
and other information which documents the process and my experiences in the +docs+
directory.
