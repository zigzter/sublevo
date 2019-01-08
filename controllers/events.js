const Attendee = require('../models/attendee');
const asyncCatch = require('../errorHandler');

const events = {
    async attending(req, res) {
        const { eventId } = req.params;
        const { id: userId } = req.currentUser;
        const { status } = req.body;
        await Attendee.attend(status, eventId, userId);
        res.status(204).send();
    },
    async fetchAttendees(req, res) {
        const { eventId } = req.params;
        const attendees = await Attendee.fetchAll(eventId);
        res.json(attendees);
    },
};

asyncCatch(events);

module.exports = events;
