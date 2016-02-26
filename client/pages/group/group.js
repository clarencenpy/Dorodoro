Template.group.onCreated(function() {
    Session.set('header', 'Brainstorm Gifts')
})

Template.group.onRendered(function() {
    const template = this

    //template.$('.ch-item').on('doubleTap')
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
                image: product.image,
                _id: product._id,
                idea: _.find(group.giftIdeas, function (idea) {
                    return idea.productId === product._id
                })
            }
        })
    },
    hasVoted(votes) {
        return !!_.find(votes, function (vote) {
            return Meteor.userId() === vote
        })
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
    'singletap .ch-item'() {
        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.current().path)
        Session.set('pageStack', pageStack)
        FlowRouter.go('chat', {groupId: FlowRouter.getParam('id'), productId: this._id})
    },
    'doubletap .ch-item'() {
        let pid = this._id
        let groupId = FlowRouter.getParam('id')
        Meteor.call('vote', pid, groupId, Meteor.userId())

    }
})

Template.group.onDestroyed(function() {
    Session.set('header', null)
})

