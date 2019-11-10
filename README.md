# AICS

AI to keep Children Safe

## Motivation

In India, it is estimated that there are around 135,000 children trafficked each year.
The problem just gets worse when you look at the global picture.
For a  family, nothing comes above the safety of your children.
In such a scenario, how do you reinstate tourist trust in travelling to a foreign land, especially one with a demonstrated history child kidnapping and trafficking?

## Our Solution

Whenever a tourist gone missing is reported, our solution will search for him/her in nearby locations using face extraction and recognition on input feeds from CCTVs. Upon finding the lost person, we will notify nearby police authorities of his/her location along with the details of his/her family members. To avail this service, tourists will have to submit images of their face and also details like phone number, country of origin, details of family members, etc. Apart from the police, the family member/companion who has reported the missing person can also view the location of the missing person, once found. If a lost tourist is found by the security/police, this software can also be used to extract details of relatives of a missing tourist, contact them and ensure that the lost person meets his/her relatives/companions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

Things you need to run the app.

```
NodeJS
Python3
MongoDB (optional, add cloud url to mongoDBURI variable in app.js)
```

### Installing

A step by step series to get a development env running. Note: It will not work on windows.

1. Install NPM packages

```sh
npm install
```

2. Run the init script to create necessary folders.

```sh
bash init.sh
```

3. Add email username and password in `config.js` for a gmail account and enable "Less secure app access" for this gmail account. It is used by nodemailer for sending emails. [Link](https://myaccount.google.com/security)

```
Username: myGmailAccount@gmail.com
Password: myGmailAccountPassword
```

4. Follow the instructions on [face_recognition github page](https://github.com/ageitgey/face_recognition#installation) to install face_recognition api for python. 

## Usage

Run the following command to run the server locally. Ensure a local mongodb server is running.
It can be configured accordingly in `app.js mongoDBURI` variable.
```sh
npm run start
```

or, if nodemon is installed

```sh
npm run dev
```

## Running on Docker
These instructions will help in running an instance of project on a docker container.


1. Clone the Repo and run the init script to create necessary folders.

```sh
bash init.sh
```

2. Add email username and password in `config.js` for a gmail account and enable "Less secure app access" for this gmail account. It is used by nodemailer for sending emails. [Link](https://myaccount.google.com/security)

```
Username: myGmailAccount@gmail.com
Password: myGmailAccountPassword
```

3. Run the following command to run the App on PORT 3000. Make sure the following ports are available:
 - 3000 (For Web Server)
 - 27017 (For MongoDB Instance)

```sh
sudo docker-compose up --build
```

## Built With

* [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/) - Maps and location
* [Face Recognition](https://github.com/ageitgey/face_recognition) - Facial recognition api for Python
* [MongoDB](https://docs.mongodb.com/manual/geospatial-queries/) - Used for Backend and Geospatial Queries

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
