


  <div align="center">
    <h2>
      WspinApp
    </h2>
    <br />
    <img src="https://github.com/PioterAndrzejewski/mobile_chat/assets/109315248/a223db65-131e-4460-941b-68c91d7315d7" alt="project image" />

  </div>
</div>


## Getting started


After cloning the repository and installing dependencies run the app using npm start command. 

  ```sh
  $ git clone https://github.com/PioterAndrzejewski/wspinapp-mobile.git
  $ cd wspinapp-mobile
  $ yarn
  $ yarn start
  ```

To run the app you need to have Expo Go app installed in your device - you will find it in Play or App Store.
In case of android - scan the QR code in your terminal via "scan qr code" in your "Expo Go" app. In case of IOS just scan the code in your default camera app.
<p align="center">
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/blob/master/readme-files/expo-go.gif" width="200" />
</p>


### Built With

Mobile app:
- javascript,
- typescript
- React
- React native
- expo,
- react-native-skia
- stripe
- jotai
- axios
- dayjs
- react-query
- ts-toolbelt
- yup
- qs
and tons of other packages

3d Viewer - [repo here](https://github.com/PioterAndrzejewski/topo-viewer) was built with:
- javascript
- typescript
- React
- Three.js
- react-three/fiber
- react-three/drei
- axios
- - react-query

Backend app was built with:
- javascript
- node.js
- strapi
- stripe
- dayjs
- react for cms management
- postgres database
- min.io server for storing images
- Everything deployed on Render

Website available [here](https://wspinapp.pl/) was built with:
- javascript
- typescript
- React
- Radix-ui
- axios
- gatsby
- axios
- tailwind
- react-query


## About The Project


Mobile App that is a climbing guide
Allows to search and filter rocks, purchase products and subscription, displaying rock data and displaying images of rocks with drawn paths of climbing routes
Integrated with created web 3d model viewer built with React and Three.js
Strapi/Node.js back-end with custom controllers and overwritten auth logic to implement refresh tokens


## UI


The appearance of the application was based on prepared Firma mockups.
<p align="center">
  <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/13dfb59a-2b6d-4293-8a23-c54ae32fef69" width="600" />
</p>


 ## Features

 
The mobile app consists of several modules:


  ### Rock Screen - The most important :)


<p float="left" align="center">
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/blob/master/readme-files/rock.gif" width="200" />
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/blob/master/readme-files/3d.gif" width="200" />
</p>

Rock screen allows to view map and routes.

Routes list allows to view details, highlight selected route on 2d/3d viewer, save, comment and rate routes. 

2d rock view is rendered with Skia on fully scallable view, which allows to zoom and view details in the photo. 

3d rock view is rendered via web-view - you can see it separated [here](https://3d.wspinapp.pl/95fad41d-e6be-4aa4-81c2-686b084ca8a8). The model view is communicating with RN App via messages events. 


 ### Auth module - login, register etc


<p float="left" align="center">
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/16dd71ed-1c44-4941-aeba-2c6cc23d4a7d" width="200" />
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/0f7532ab-882c-4c0c-a31c-b04057536d9d" width="200" />
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/72bb33b0-10fc-431f-952a-3d4e4d37ea7a" width="200" />
</p>

Login screen that allows to:
- authenticate using email and password,
- authenticate via external provider - google (using web browser and deep linking to the app),
- moving to app without logging in, which makes sense if you've previously fetched data (which is persisted in device storage),
- reset your password,
- register new account

Everything is handled in cooperation with strapi backend and React web app. 
Confirming account and resseting password requires using your email box, and email are send by strapi using Sendgrid - emails are custom styled as well.

<p float="left" align="center">
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/7ad04ab4-b9ae-476b-bb1c-66e15f99d289" width="500" />
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/9fe7cbbc-159b-4b71-b38e-0747b94db395" width="500" />
</p>


  ### Map Screen


<p float="left" align="center">
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/blob/master/readme-files/mapscreen.gif" width="200" />
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/15b74be4-40ce-4827-8ddd-98ddb791587c" width="200" />
</p>



Allows to search through regions and sectors on map and objects list. 
Selecting a rock triggers bottom sheet modal to present informations about the rock, from where you are able to open rock details.
Filters allow to filter for rocks when user has specific requirements for the rock he or she wants to climb on.


  ### Transaction handling


<p float="left" align="center">
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/blob/master/readme-files/transaction.gif" width="200" />
</p>

Allows users to buy 1-year access to app or single products which contains several rocks.
Transactions are handled by strapi backend and stripe. 

  ### Search, Favorites and UserScreen


<p float="left" align="center">
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/f17f4cf3-b545-42bd-a3d9-2fb31f944199" width="200" />
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/13ab4f02-d90e-4110-bae4-2956d382e9b1" width="200" />
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/df5dec91-5b0c-451e-9228-5cd09d744b12" width="200" />
    <img src="https://github.com/PioterAndrzejewski/wspinapp-mobile/assets/109315248/0021add6-bf82-43d2-88fc-c4e0db258aa9" width="200" />
</p>


Allows to search through all rocks and routes, and saved assets.
User screen allows to browse through bought product, save assets and get access to important parts of app like Privacy Policy


## Room for improvement

The main development opportunities are:

- tests,
- creating logbook,
- creating in-app model viewer which will allow to use assets saved in memory (now the model viewer works online only),
