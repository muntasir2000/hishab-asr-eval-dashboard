import {Meteor} from "meteor/meteor";
import { Transcripts } from "..";

Meteor
.publish("transcripts.all", function() {
    const cursor = Transcripts.find({});
    return cursor;
});
