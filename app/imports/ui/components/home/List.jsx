import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faDownload,faFileAudio, faPhone } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
const FormatDate = (date) => {
    const momentDate = moment(date);
    return momentDate.isValid() ? momentDate.format("DD-MM-YYYY HH:mm:ss"): date;
}

const DownloadAudio = async (filename, url) => {
    try {
        url = '/somefilenae.wav';
        const tokens = url.split(".");
        let extension = "mp3";
        if(tokens.length === 2) {
            extension = tokens[tokens.length-1];
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${filename}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(`Audio downloaded successfully as ${filename}`);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert("Could not get audio stream");
      }
}
const DownloadData = (filename,data) => {
  const str = JSON.stringify(data, null,2);
  const blob = new Blob([str], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


const ListItem = ({ item,onSelect,selected }) => {
  const {caller_phone_number, called_phone_number} = item;
  const handleDataDownload = () => {
    const filename = `${caller_phone_number}-${called_phone_number}.json`;
    DownloadData(filename, item);
  }
  const handleAudioDownload = () => {
    const filename = `${caller_phone_number}-${called_phone_number}`;
    DownloadAudio(filename, item.audio_url);
  }
  
  return (
    <div className={`flex items-center bg-white mb-1 ${selected && selected._id == item._id ? 'bg-third': ''}`} >
      
      <div className="cursor-pointer ml-4 flex overflow-auto flex-col p-4" onClick={()=> onSelect(item)}>
        <div className="flex gap-2">
            <div className='flex items-center'>
                {caller_phone_number}
            </div>
            <div className='flex items-center gap-2'><FontAwesomeIcon size='xs' icon={faArrowRight} /> {called_phone_number}</div>
        </div>
        <div className='text-sm'>
            <FontAwesomeIcon size='xs' icon={faClock} /> {FormatDate(item.call_start_time)}
        </div>
      </div>
      <div className="flex-shrink-0 text-blue-500 ml-2">
        <FontAwesomeIcon onClick={handleDataDownload} title='Download Data' icon={faDownload} className="mr-2 cursor-pointer hover:text-black text-gray-300" />
        <FontAwesomeIcon onClick={handleAudioDownload} title='Download Audio' icon={faFileAudio} className="mr-2 cursor-pointer hover:text-black text-gray-300" />
      </div>
    </div>
  );
};

export default ListItem;
