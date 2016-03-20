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
        return Session.get('showSettings')
    },
    votingClosed() {
        let groupId = FlowRouter.getParam('id')
        let group = Groups.findOne(groupId)
        return group.votingClosed
    },
    showPhoto() {
        return Session.get('showPhoto')
    },
    buyer() {
        let groupId = FlowRouter.getParam('id')
        let group = Groups.findOne(groupId)
        return group.boughtBy
    },
    isBuyer() {
        let groupId = FlowRouter.getParam('id')
        let group = Groups.findOne(groupId)
        return group.boughtBy === Meteor.userId()
    },

    //onboarding prompts
    onboarded() {
        return Session.get('onboarded.group')
    }
})

Template.group.events({
    'click #suggest-btn'() {
        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.current().path)
        Session.set('pageStack', pageStack)
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
    'click .group-header'() {
        Session.set('showSettings', true)
    },
    'click #volunteer-btn'() {
        let groupId = FlowRouter.getParam('id')
        Groups.update(groupId, {$set: {boughtBy: Meteor.userId()}})

        //send message to everyone
        let group = Groups.findOne(groupId)
        let members = group.members
        members.push(group.createdBy)
        members = _.without(members, Meteor.userId())

        //find the idea with the most votes
        let winner = group.giftIdeas[0]
        let maxVotes = 0
        _.each(group.giftIdeas, function (idea) {
            if (idea.votes.length > maxVotes) {
                maxVotes = idea.votes.length
                winner = idea
            }
        })
        winner = Products.findOne(winner.productId)
        let price = winner.price / (group.members.length + 1)
        price = price.toFixed(1)

        _.each(members, function (userId) {
            if (!Meteor.users.findOne(userId).services.facebook) return //dont bother sending to fakes
            let message = {
                from: Meteor.userId(),
                to: userId,
                date: new Date(),
                type: 'PAY_NOTIFICATION',
                data: {
                    groupId: groupId,
                    receiverId: group.receiver,
                    eventName: group.eventName,
                    price: price
                }
            }
            Messages.insert(message)
        })

        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.current().path)
        Session.set('pageStack', pageStack)

        FlowRouter.go('collectMoney', {id: groupId})
    },

    'change #camera-input': function (event, template) {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function (err, fileObj) {
                if (err){
                    console.log('error saving image')
                } else {
                    Session.set('photo', '/cfs/files/images/' + fileObj._id)
                    Session.set('tempPhoto', URL.createObjectURL(event.target.files[0]))
                    Session.set('showPhoto', true)
                }
            });
        });
    },

    'click .dialog .btn-close'(event) {
        $(event.target).closest('.dialog').removeClass("dialog--open").addClass("dialog--close")
        Meteor.setTimeout(function() {
            Session.set('onboarded.group', true)
        }, 1000)
    }
})

Template.group.onDestroyed(function() {
    Session.set('header', null)
    Session.set('showSettings', null)
    Session.set('showPhoto', null)
})

