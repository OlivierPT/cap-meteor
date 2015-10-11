Channels = new Mongo.Collection("channels");

Schemas.Channel = new SimpleSchema({
    label: {
        type: String,
        label: "Label",
        min: 1
    },
    user: {
        type: String,
        label: "Author"
    },
    timestamp: {
        type: Number,
        label: "Creation timestamp",
        min: 0
    }
});

Channels.attachSchema(Schemas.Channel);
