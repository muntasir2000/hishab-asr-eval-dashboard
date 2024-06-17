import {Meteor} from "meteor/meteor";
import { Transcripts } from "..";

Meteor
.publish("transcripts.all", function() {
    const cursor = Transcripts.find({});
    return cursor;
});


Meteor.publish("transcripts.one", function(id) {
    if(!id) this.ready();
    return Transcripts.find({_id: id});
})
