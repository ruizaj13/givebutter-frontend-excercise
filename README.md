# Givebutter Frontend Take-home

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of Pokemon featured in the Pokemon video game, anime and manga series.
 
[Source](https://pokemon.fandom.com/wiki/Pokedex)
 
Our version of the Pokedex is able to list and search through Pokemon. However, our search is a bit buggy. Additionally, we want to add a feature that shows a selected Pokemon's details like its **type**, **moves**, and **evolution chain**.

Your time is valuable, and we are extremely appreciative of you participating in this assessment. We're looking to gauge your ability to read and edit code, understand instructions, and deliver features, just as you would during your typical day-to-day work. We expect this test to take no more than one to two hours and ask to complete this work within the next two days. Upon submit, we will review and provide feedback to you regardless of our decision to continue the process.

Please update and add code in `App.js` and `index.css` based on the requirements found below. Additionally, we ask you to edit the `readme.md` with answers to a few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and invite `@gperl27` to view it. **Do not open a PR please.**

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires a stable version of `node` to get up and running.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.
- Please reach out to the Givebutter team if you have any issues with the initial setup or have any problems when running the initial app.

## Requirements

### Search
- Typing in the search input should filter the existing Pokemon list and render only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card
     
- Clicking "Get Details" for any given Pokemon should render a card that has the Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go directly in this `readme`.

- Given more time, what would you suggest for improving the performance of this app?

    I'd suggest implementing some sort of virtualization library or lazy loading library to more effectively render the large list of items. It's not too bad when limited to 151 items but the larger that list gets the more the performance will degrade. Infinite scroll while using the API's offset parameter could do the job aswell so we don't pull everything all at once. If it were an option, I would look at restructuring the backend aswell in order to reduce the workload on the client to have to pull from multiple endpoints for data that could be provided in one go from a single endpoint.

- Is there anything you would consider doing if we were to go live with this app?

    Everything mentioned above to improve performance along with taking the time to ensure the page is responsive for multiple screen sizes. Using a CSS pre-processor would be good too. Not only for performance but for code readability and maintainability aswell. On that note, I would also go through and break up the App.js file into seperate component files too. Production code should always be as readable and as maintainable as possible. Can't forget the smaller things aswell like SEO and giving it a proper tab name and favicon.

- What was the most challenging aspect of this work for you (if at all)?

    Working with the API itself was a bit of a challenge. The deeply nested evolution chain and finding where to get the proper species id to then pull the correct evolution chains caught me off gaurd. It was a fun problem to solve though. Just had to look into the documentation a bit.
