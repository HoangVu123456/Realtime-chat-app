import React from 'react';
import { useChatstore } from '../store/useChatstore.js';
import NoChatSelected from '../components/NoChatSelected.jsx';
import Chat from '../components/Chat.jsx';
import Sidebar from '../components/Sidebar.jsx';

const HomePage = () => {

    const { selecteduser } = useChatstore();
  return (
    <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
            <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                <div className="flex h-full rounded-lg overflow-hidden">
                    <Sidebar/>

                    {!selecteduser? <NoChatSelected/>:<Chat/>}
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;