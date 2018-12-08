const axios = require('axios');
const Subscription = require('../models/subscription');
const asyncCatch = require('../errorHandler');

const SongkickKey = process.env.SONGKICK_KEY;

const venues = {
    subscribeVenue(req, res, next) {
        try {
            const { id } = req.currentUser;
            const { venueId, name } = req.body;
            Subscription.addSubscription(id, 'venue', venueId, name);
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
                return axios.get(`https://api.songkick.com/api/3.0/venues/${ sub.targetId }/calendar.json?apikey=${ SongkickKey }`);
            }));
            const events = rawEvents.reduce((arr, elem) => {
                elem.data.resultsPage.results.event.map(c => arr.push(c));
                return arr;
            }, []);
            events.sort((a, b) => new Date(a.start.date) - new Date(b.start.date));
            res.json(events);
        } catch (err) {
            next(err);
        }
    },
    async remove(req, res) {
        const { targetId } = req.body;
        const userId = req.currentUser.id;
        Subscription.remove(userId, targetId);
        res.status(204).send();
    },
};

asyncCatch(venues);

module.exports = venues;
