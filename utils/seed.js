const cameraLocation = require('./../models/location');
const mongoose = require('mongoose');

const mongoDBURI = "mongodb://localhost:27017/sabre";
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongoDBURI, () => {
  console.log("connected to DB");
});

function work() {
  cameraLocation.deleteMany({}, (err) => {
    if (err) {
      return console.log(err);
    }
    cameraLocation.insertMany([
      {
        name: 'Hostel 5',
        location: {
          type: 'Point',
          coordinates: [85.43416598840417, 23.42062800510034]
        },
        camNum: 1
      },
      {
        name: 'Hostel 10',
        location: {
          type: 'Point',
          coordinates: [85.43483289629467, 23.41908418184066]
        },
        camNum: 2
      },
      {
        name: 'Hostel 13',
        location: {
          type: 'Point',
          coordinates: [85.43458848714886, 23.417783912316878]
        },
        camNum: 3
      },
      {
        name: 'Hostel 6',
        location: {
          type: 'Point',
          coordinates: [85.43314857246986, 23.422780575212244]
        },
        camNum: 4
      },
      {
        name: 'GP Birla',
        location: {
          type: 'Point',
          coordinates: [85.43898381485133, 23.422664551695092]
        },
        camNum: 5
      },
      {
        name: 'Sharma Dhaba',
        location: {
          type: 'Point',
          coordinates: [85.4384836339334, 23.423359950983155]
        },
        camNum: 6
      },
      {
        name: 'Hostel 12',
        location: {
          type: 'Point',
          coordinates: [85.43429468062538, 23.418894454396025]
        },
        camNum: 7
      },
      {
        name: 'International Guest House',
        location: {
          type: 'Point',
          coordinates: [85.43622232344035, 23.41671528553657]
        },
        camNum: 8
      },
      {
        name: 'Inner Circle',
        location: {
          type: 'Point',
          coordinates: [85.4390568452041, 23.41490331382151]
        },
        camNum: 9
      },
      {
        name: 'PMC',
        location: {
          type: 'Point',
          coordinates: [85.4404081824357, 23.415714818782078]
        },
        camNum: 10
      }
    ], (err, docs) => {
      if (err) {
        return console.log(err);
      }
      console.log("Inserted");
      process.exit(0);
    });
  });
}

work(); // Inserts points around BIT Mesra to DB
