const Subscription = require('../models/subscription');

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
    venueEvents(req, res) {
        // do stuff
    },
};
