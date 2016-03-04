Messages = new Mongo.Collection('messages')

Messages.attachSchema(new SimpleSchema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    date: {
        type: Date
    },
    type: {
        type: String
    },
    data: {
        type: Object,
        blackbox: true
    },
    read: {
        type: Boolean,
        defaultValue: false
    }
}))