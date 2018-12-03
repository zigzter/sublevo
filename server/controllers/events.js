const Attendee = require('../models/attendee');

module.exports = {
    attending(req, res) {
        const { eventId } = req.params;
        const { id: userId } = req.currentUser;
        const { status } = req.body;
        Attendee.attend(status, eventId, userId);
    },
    async fetchAttendees(req, res) {
        const { eventId } = req.params;
        const attendees = await Attendee.fetchAll(eventId);
        res.json(attendees);
    },
};
