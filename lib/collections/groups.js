Groups = new Mongo.Collection('groups')

Groups.attachSchema(new SimpleSchema({
    receiver: {
        type: String
    },
    createdBy: {
        type: String,
        autoValue: function () {
            if (this.isInsert) {
                //check if this is a server initated action
                if (this.userId) {
                    return this.userId;
                }
            } else {
                this.unset();
            }
        }

    },
    members: {
        type: [String],
        defaultValue: []
    },
    giftIdeas: {
        type: [Object],
        defaultValue: []
    },
    'giftIdeas.$._id': {
        type: String,
        defaultValue: Random.id()
    },
    'giftIdeas.$.contributor': {
        type: String
    },
    'giftIdeas.$.productId': {
        type: String
    },
    'giftIdeas.$.comments': {
        type: [Object]
    },
    'giftIdeas.$.comments.$.userId': {
        type: String
    },
    'giftIdeas.$.comments.$.comment': {
        type: String
    },
    'giftIdeas.$.comments.$.date': {
        type: Date
    },
    'giftIdeas.$.votes': {
        type: Number,
        defaultValue: 0
    }
}))