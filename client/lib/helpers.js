Template.registerHelper('getFirstName', function (fullName) {
    return fullName.split(' ')[0]
})


Template.registerHelper('moCalendarDetailed', function (time) {
    if (time !== undefined) {
        let now = moment()
        let diff = moment(time).diff(now, 'days')
        if (diff <= 7) {
            return diff + ' Days Left!'
        }
        return moment(time).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD MMM YYYY'
        });
    }
});