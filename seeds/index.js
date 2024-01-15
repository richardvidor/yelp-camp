const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6592c19a37f2dd381327c4e9',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel excepturi necessitatibus mollitia deleniti, omnis voluptatibus porro asperiores iusto, reprehenderit ratione aperiam obcaecati? Quisquam, ipsum placeat molestiae fugiat unde vitae maxime!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/ds81wpt3k/image/upload/v1704730620/YelpCamp/hde7y7y70xg2bmv7kfy5.jpg',
                    filename: 'YelpCamp/vtlmgbor2xztezti11ct',
                },
                {
                    url: 'https://res.cloudinary.com/ds81wpt3k/image/upload/v1704730619/YelpCamp/tvs8ldslyggqnycttcmh.jpg',
                    filename: 'YelpCamp/t8bioiil05ojva8cpwmj',
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});