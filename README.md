## Public Art London

An interactive map app where users can find public artworks, and use or create London public walking art tours.

![](public-art-london-gif.gif)

## User stories: 

A user can:

* Login/sign up (using JSON Web Tokens and localStorage to store encrypted user information client-side).
* Edit or delete their account.
* Browse public art works in London plotted on an interactive map impletedted with Google Maps API.
* Search the artworks using a DebouncedInput React component.
* Select public art tours to go on, generating directions via the Google Directions API.
* Create their own public art tour by selecting artworks and then obtaining directions via the Google Directions API.
* User created tours are added to the Postgres database and therefore added to the list of available tours on the app.

## Prerequisites

Make sure you have installed:

* Ruby, version 2.6.1 or newer
* Postgres
* Rails, version 5.2.3 or newer

You can check in the terminal:

```bash
ruby -v
rails -v
postgres -v
```

This should output some information on the installed versions. If not, you can refer to the [Ruby](https://www.ruby-lang.org/en/documentation/installation/ "Ruby"), [Postgres](https://www.postgresql.org/ "Postgres") and [Rails](https://guides.rubyonrails.org/v5.0/getting_started.html "Rails") documentation.

You will also need a Google API key for this project. You can get one on the [Google API website](https://cloud.google.com/maps-platform/ "Google API website"). Your project needs to enable the Maps Javascript API,Places API and Geocoding API.

For the backend repository of this app see https://github.com/louisenorris/London_Public_Art_Tours_backend

## Getting started

Fork and clone this repository and the [backend repository](https://github.com/louisenorris/London_Public_Art_Tours_backend "backend repository"). Start Postgres.

## Installation

### Backend

On a terminal window, move into the backend directory of this project. Use the gem manager [bundler](https://bundler.io/ "bundler") to install all dependencies. Create, migrate and seed the database. Start the Rails server. To do all this, run these commands, one at a time.

```bash
bundle install
rails db:create
rails db:migrate
rails db:seed
rails start
```

### Frontend

On a new terminal tab, navigate to the frontend directory inside the root directory of the project. Use the package manager [npm](https://www.npmjs.com/ "npm") to install all dependencies.

`npm install`

#### Google API

Once you have a key it needs to be added to an **.env** file as below where it says 'INSERT_YOUR_API_KEY':

`REACT_APP_GOOGLE_API_KEY=INSERT_YOUR_API_KEY_HERE`

Make sure you then add the **.env** file to your **.gitignore** file. Then reference your API key inside the MapWrapped component of the **Map.js** file as follows, then save:

```bash
googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
```

Start the server on port 3001.

`npm start`

Visit localhost:3001.

**You're all set!**

## Notes

This app is optimised for mobile use, please change your browser's device settings accordingly.


