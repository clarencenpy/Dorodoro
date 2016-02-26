Meteor.methods({
    vote(pid, groupId, userId) {

        //check if user has already voted
        let group = Groups.findOne(groupId)
        let idea = _.find(group.giftIdeas, function (idea) {
            return idea.productId === pid
        })
        if (_.find(idea.votes, function (vote) {
                return vote === userId
            })) {
            //has voted
            Groups.update({
                _id: groupId,
                'giftIdeas.productId': pid
            }, {
                $pull: {'giftIdeas.$.votes': userId}
            })
        } else {
            //has not voted
            Groups.update({
                _id: groupId,
                'giftIdeas.productId': pid
            }, {
                $push: {'giftIdeas.$.votes': userId}
            })
        }

    }
})