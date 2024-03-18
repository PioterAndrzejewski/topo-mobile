e


  <div align="center">
    <br />
    <img src="https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/a223db65-131e-4460-941b-68c91d7315d7" alt="project image" />

  </div>
</div>


## Getting started


Once you've cloned the repository and installed dependencies, you can run the app using the `npm start` command.

  ```sh
  $ git clone https://github.com/PioterAndrzejewski/wspinapp-mobile.git
  $ cd wspinapp-mobile
  $ yarn
  $ yarn start
  ```

To run the app, you'll need to have the Expo Go app installed on your device, which you can find in the Play or App Store. For Android, scan the QR code in your terminal using the "scan QR code" feature in the "Expo Go" app. For iOS, simply scan the code in your default camera app.

<p align="center">
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/blob/master/readme-files/expo-go.gif" width="200" />
</p>

## Built With:

Mobile app:

- JavaScript
- TypeScript
- React
- React Native
- Expo
- react-native-skia
- Stripe
- jotai
- axios
- dayjs
- react-query
- ts-toolbelt
- yup
- qs
- and many other packages

  
3D Viewer - (repo [here](https://github.com/PioterAndrzejewski/topo-viewer)) was built with:


- JavaScript
- TypeScript
- React
- Three.js
- react-three/fiber
- react-three/drei
- axios
- react-query

  
Backend app was built with:

- JavaScript
- Node.js
- Strapi
- Stripe
- dayjs
- React for CMS management
- PostgreSQL database
- Min.io server for storing images
- Everything deployed on Render


Website (available [here](http://wspinapp.pl/)) was built with:

- JavaScript
- TypeScript
- React
- Radix-ui
- axios
- Gatsby
- axios
- Tailwind
- react-query


## About The Project
Mobile App that is a climbing guide. It allows users to search and filter rocks, purchase products and subscriptions, display rock data, and show images of rocks with drawn paths of climbing routes. It's integrated with a created web 3D model viewer built with React and Three.js. The Strapi/Node.js backend has custom controllers and overwritten auth logic to implement refresh tokens.

## UI
The appearance of the application was based on Figma mockups prepared by Paweł Pacak.

<p align="center">
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/13dfb59a-2b6d-4293-8a23-c54ae32fef69" width="600" />
</p>

## Features
The mobile app consists of several modules:

### Rock Screen
<p float="left" align="center">
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/blob/master/readme-files/rock.gif" width="200" />
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/blob/master/readme-files/3d.gif" width="200" />
</p>
The Rock screen allows users to view maps and routes. The routes list lets users view details, highlight selected routes on 2D/3D viewer, save, comment, and rate routes. The 2D rock view is rendered with Skia on a fully scalable view, allowing users to zoom in and view details in the photo. The 3D rock view is rendered via web-view - you can see it separately [here](https://3d.wspinapp.pl/95fad41d-e6be-4aa4-81c2-686b084ca8a8) (just give the backend a minute to wake up to serve you the model file). The model view communicates with the RN App via message events.

### Auth module
<p float="left" align="center">
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/16dd71ed-1c44-4941-aeba-2c6cc23d4a7d" width="200" />
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/0f7532ab-882c-4c0c-a31c-b04057536d9d" width="200" />
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/72bb33b0-10fc-431f-952a-3d4e4d37ea7a" width="200" />
</p>
The Auth module includes a login screen that allows users to authenticate using email and password or via external providers like Google (using web browser and deep linking to the app). Users can also move to the app without logging in if they've previously fetched data (which is persisted in device storage), reset their password, or register a new account. Everything is handled in cooperation with the Strapi backend and React web app. Confirming account and resetting passwords requires using your email inbox, and emails are sent by Strapi using Sendgrid - emails are custom-styled as well.

<p float="left" align="center">
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/7ad04ab4-b9ae-476b-bb1c-66e15f99d289" width="500" />
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/9fe7cbbc-159b-4b71-b38e-0747b94db395" width="500" />
</p>

### Map Screen
<p float="left" align="center">
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/blob/master/readme-files/mapscreen.gif" width="200" />
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/d0f60700-26b3-4e73-808c-7ccbed3e4ea3" width="200" />
</p>
The Map Screen allows users to search through regions and sectors on the map and objects list. Selecting a rock triggers a bottom sheet modal to present information about the rock, from where you are able to open rock details. Filters allow users to filter for rocks when they have specific requirements for the rock they want to climb on.
 
### Transaction handling
<p float="left" align="center">
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/blob/master/readme-files/transaction.gif" width="200" />
</p>
Transaction handling allows users to buy 1-year access to the app or single products which contain several rocks. Transactions are handled by the Strapi backend and Stripe.

### Search, Favorites, and UserScreen
<p float="left" align="center">
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/f17f4cf3-b545-42bd-a3d9-2fb31f944199" width="200" />
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/13ab4f02-d90e-4110-bae4-2956d382e9b1" width="200" />
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/df5dec91-5b0c-451e-9228-5cd09d744b12" width="200" />
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/0021add6-bf82-43d2-88fc-c4e0db258aa9" width="200" />
</p>
This module allows users to search through all rocks and routes, and saved assets. The User screen allows users to browse through bought products, save assets, and access important parts of the app like the Privacy Policy.

### Room for improvement
The main development opportunities are:

- Adding tests
- Implementing i18n to support different languages
- Creating a logbook
- Creating an in-app model viewer which will allow users to use assets saved in memory (currently, the model viewer works online only)
