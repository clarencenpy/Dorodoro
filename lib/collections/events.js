Events = new Mongo.Collection('events')
 
Events.attachSchema(new SimpleSchema({
    date: {
        type: Date
    },
    name: {
        type: String
    },
    userId: {
        type: String
    },
    metadata: {
        type: Object,
        optional: true,
        blackbox: true
    }
}))