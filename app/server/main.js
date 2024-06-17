import {Meteor} from "meteor/meteor";
import "../imports/startup/server"
import transcripts from "./call_records.json";
import { Transcripts } from "../imports/api/transcripts";

Meteor.startup(function() {
  if(process.env.NODE_ENV !== 'production') {
    Transcripts.remove({});
    if(Transcripts.find().count() === 0) {
      transcripts.forEach(({_id, ...item})=> {
        Transcripts.insert(item);
      });
    }
  }
  if(Meteor.users.find({}).count() === 0) {
    Accounts.createUser({
      email: 'kddi@hishab.co',
      password: 'hishab2024',
      profile: {
        name: 'KDDI Evaluation User'
      }
    });
  }
});
