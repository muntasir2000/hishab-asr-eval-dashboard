import React, { useState,useEffect} from 'react';
import ListItem from '../components/home/List';
import { useTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import { Transcripts } from '../../api/transcripts';
import { Tracker } from 'meteor/tracker';

const Messages = ({selectedId}) => {
    const [message, setMessage ] = useState(null);
    useEffect(() => {
        const subscription = Meteor.subscribe('transcripts.one', selectedId);
        const computation = Tracker.autorun(() => {
          if (subscription.ready()) {
            setMessage(Transcripts.findOne(selectedId));
          }
        });
    
        return () => {
          computation.stop();
          subscription.stop();
        };
      }, [selectedId]);

    return message ? (<div className="w-full mr-3 flex gap-5">
        <ASR name="Hishab ASR" transcripts={message.hishab_asr_transcripts} />
        <ASR name="Kaggle ASR" transcripts={message.kaggle_asr_transcripts} />
    </div>): (<div></div>);
}

const Transcript = ({transcript}) => {
    return (
    <div className='p-3 border border-slate-700 flex-1 mb-2'>
        {transcript.transcript}
    </div>
    );
}

const ASR = ({name, transcripts}) => {
    return (
    <div className='w-full border-primary shadow-md border flex flex-col'>
        <h4 className='text-2xl text-center'>{name}</h4>
        <div className="flex p-4 flex-col">
            {transcripts.map((transcript,index)=> <Transcript key={index} transcript={transcript} />)}
        </div>
    </div>
    );
}

const ItemList = ({items,onSelect,selected}) => {

  return (
    <div className={`h-full overflow-auto`}>
      {items.map((item, index) => (
        <ListItem key={index} onSelect={onSelect} selected={selected} item={item} />
      ))}
    </div>
  );
};

const Home = () => {
    const [item, setItem] = useState();
    const {transcripts, isLoading} = useTracker(()=> {
        const noDataAvailable = { transcripts: [], isLoading: false};
        const handler = Meteor.subscribe('transcripts.all');
       
        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }
        const transcripts = Transcripts.find({}).fetch();
        return {transcripts, };
    })
    const handleSelection = (obj) => {
        setItem(obj)
    }
    // useEffect(()=> {
    //     const track =Tracker.autorun(function() {
    //         if(item) {
    //             setItem(Transcripts.findOne(item?._id));
    //         }
            
    //     });
    // }, [item]);
    return (
        <div className='flex gap-3'>
            <div className="w-100 min-w-80 min-h-screen border-r-2">
                {isLoading && (
                    <div className='text-center'>
                        <h4 className="text-2xl">Loading..</h4>
                    </div>)}
                <ItemList selected={item} items={transcripts} onSelect={handleSelection} />
            </div>
            <Messages selectedId={item?._id}/>
            {
                !item && (
                    <div className='flex flex-col m-auto justify-center text-center'><h4 className='text-2xl text-center'>Please select an item</h4></div>
                )
            }
        </div>
    );
}

export default Home;
