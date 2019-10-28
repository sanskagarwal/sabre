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
          coordinates: [85.43429853280423, 23.420697282701866]
        },
        camNum: 1
      },
      {
        name: 'Hostel 10',
        location: {
          type: 'Point',
          coordinates: [85.43489419991681, 23.419098495077662]
        },
        camNum: 2
      },
      {
        name: 'Hostel 13',
        location: {
          type: 'Point',
          coordinates: [85.434626149716, 23.417731994613632]
        },
        camNum: 3
      },
      {
        name: 'Hostel 6',
        location: {
          type: 'Point',
          coordinates: [85.43316205954909, 23.42273370247129]
        },
        camNum: 4
      },
      {
        name: 'GP Birla',
        location: {
          type: 'Point',
          coordinates: [85.43897126003407, 23.422579937820842]
        },
        camNum: 5
      },
      {
        name: 'Sharma Dhaba',
        location: {
          type: 'Point',
          coordinates: [85.43316205954909, 23.42273370247129]
        },
        camNum: 6
      },
      {
        name: 'Hostel 12',
        location: {
          type: 'Point',
          coordinates: [85.4340419, 23.4180238]
        },
        camNum: 7
      }
    ], (err, docs) => {
      if (err) {
        return console.log(err);
      }
      console.log("Inserted");
    });
  });
}

work(); // Inserts points around BIT Mesra to DB
