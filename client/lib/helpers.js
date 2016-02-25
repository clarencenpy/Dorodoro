Template.registerHelper('getFirstName', function (fullName) {
    return fullName.split(' ')[0]
})


Template.registerHelper('moCalendarDetailed', function (time) {
    if (time !== undefined) {
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