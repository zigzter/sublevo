const axios = require('axios');
const Subscription = require('../models/subscription');

const SongkickKey = process.env.SONGKICK_KEY;

module.exports = {
    subscribeVenue(req, res, next) {
        try {
            const { id } = req.currentUser;
            const { venueId } = req.body;
            Subscription.addSubscription(id, 'venue', venueId);
            res.json({});
        } catch (err) {
            next(err);
        }
    },
    async venueEvents(req, res, next) {
        try {
            const userId = req.currentUser.id;
            const subs = await Subscription.get(userId, 'venue');
            const rawEvents = await Promise.all(subs.map((sub) => {
                return axios.get(`https://api.songkick.com/api/3.0/venues/${sub.targetId}/calendar.json?apikey=${SongkickKey}`);
            }));
            const events = rawEvents.map(obj => obj.data.resultsPage.results.event);
            console.log(events.length);
            res.json(events);
        } catch (err) {
            next(err);
        }
    },
};
