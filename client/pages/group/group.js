Template.group.onCreated(function() {
    Session.set('header', 'Gift Suggestions')
})

Template.group.onRendered(function() {
    const template = this
})

Template.group.helpers({
    group() {
        return Groups.findOne(FlowRouter.getParam('id'))
    },
    receiver() {
        let group = Groups.findOne(FlowRouter.getParam('id'))
        return Meteor.users.findOne(group.receiver)
    },
    giftIdeas() {
        let group = Groups.findOne(FlowRouter.getParam('id'))
        return _.map(group.giftIdeas, function (idea) {
            let product = Products.findOne(idea.productId)
            return {
                product: product,
                idea: idea
            }
        })
    },
    hasVoted(votes) {
        return !!_.find(votes, function (vote) {
            return Meteor.userId() === vote
        })
    },
    showSettings() {
        return Session.get('showSettings');
    },
    votingClosed() {
        let groupId = FlowRouter.getParam('id')
        let group = Groups.findOne(groupId)
        return group.votingClosed
    }
})

Template.group.events({
    'click #suggest-btn'() {
        Session.set('giftSelection', {
            group: Groups.findOne(FlowRouter.getParam('id')),
            selection: []
        })
        FlowRouter.go('store')
    },
    'click .comment-btn, click .image'() {
        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.current().path)
        Session.set('pageStack', pageStack)
        FlowRouter.go('chat', {groupId: FlowRouter.getParam('id'), productId: this.product._id})
    },
    'click .vote-btn'() {
        let pid = this.product._id
        let groupId = FlowRouter.getParam('id')
        Meteor.call('vote', pid, groupId, Meteor.userId())
    },
    'click .settings-btn'() {
        Session.set('showSettings', true)
    }
})

Template.group.onDestroyed(function() {
    Session.set('header', null)
})

