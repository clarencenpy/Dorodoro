Template.collectMoney.onCreated(function() {
    Session.set('header', 'Collect Money')
})

Template.collectMoney.onRendered(function() {

})

Template.collectMoney.helpers({
    group() {
        return Groups.findOne(FlowRouter.getParam('id'))
    },
    receiver() {
        let group = Groups.findOne(FlowRouter.getParam('id'))
        return Meteor.users.findOne(group.receiver)
    },
    members() {
        let groupId = FlowRouter.getParam('id')
        let group = Groups.findOne(groupId)
        let members = group.members
        members.unshift(group.createdBy)
        return _.map(members, function (m) {
            let hasPaid = group.hasPaid.indexOf(m) >= 0
            let user = Meteor.users.findOne(m)
            user.hasPaid = hasPaid || Meteor.userId() === m
            return user
        })
    },
    winner() {
        let groupId = FlowRouter.getParam('id')
        let ideas = Groups.findOne(groupId).giftIdeas
        //find the idea with the most votes
        let winner = ideas[0]
        let maxVotes = 0
        _.each(ideas, function (idea) {
            if (idea.votes.length > maxVotes) {
                maxVotes = idea.votes.length
                winner = idea
            }
        })
        return Products.findOne(winner.productId)
    },
    divide(price) {
        let groupId = FlowRouter.getParam('id')
        let group = Groups.findOne(groupId)
        price = price / (group.members.length + 1)
        return price.toFixed(1)
    },
    paidPercent() {
        let result = ''
        let groupId = FlowRouter.getParam('id')
        let group = Groups.findOne(groupId)
        result += group.hasPaid ? group.hasPaid.length + 1 : 1
        result += '/'
        result += group.members.length + 1
        return result
    }

})

Template.collectMoney.events({
    'click .list-item'() {
        let user = this._id
        console.log(user)
        let groupId = FlowRouter.getParam('id')
        let hasPaid = Groups.findOne(groupId).hasPaid
        if (hasPaid.indexOf(user) >= 0) {
            Groups.update(groupId, {$pull: {hasPaid: user}})
        } else {
            Groups.update(groupId, {$push: {hasPaid: user}})
        }
    }
})

Template.collectMoney.onDestroyed(function() {
    Session.set('header', null)
})
