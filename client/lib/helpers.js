Template.registerHelper('getFirstName', function (fullName) {
    return fullName.split(' ')[0]
})

Template.registerHelper('getFirstNameFromId', function (userId) {
    let user = Meteor.users.findOne(userId)
    return user ? user.profile.name.split(' ')[0] : undefined
})


Template.registerHelper('getFirstNameFromIdUnlessYourself', function (userId) {
    if (Meteor.userId() === userId) return 'I'
    let user = Meteor.users.findOne(userId)
    return user ? user.profile.name.split(' ')[0] : undefined
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

Template.registerHelper('getAvatar', function (userId) {
    let user = Meteor.users.findOne(userId)
    return user ? user.profile.avatar : undefined
})

Template.registerHelper('log', function (obj) {
    console.log(obj)
})

Template.registerHelper('equals', function (a, b) {
    return a === b
})

Template.registerHelper('isMale', function (id) {
    return Meteor.users.findOne(id).services.facebook.gender === 'male'
})