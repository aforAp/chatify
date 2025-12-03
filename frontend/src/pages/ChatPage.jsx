import { useChatStore } from '../store/useChatStore.js';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder.jsx';
import ActiveTabSwitch from '../components/ActiveTabSwitch.jsx';
import ProfileHeader from '../components/ProfileHeader.jsx';
import ChatsList from '../components/ChatsList.jsx';
import ContactList from '../components/ContactList.jsx';

const ChatPage = () => {
  const {activeTab, selectedUser} = useChatStore();
  return (
    <div className='relative w-full max-w-6xl h-[800px]'>
      <BorderAnimatedContainer>
        {/*Left Side*/}
        <div className="w-80 h-[800px] -mt-4 -ml-4 bg-slate-800/50 backdrop-blur-sm flex flex-col">
         <ProfileHeader />
          <ActiveTabSwitch />
          <div className='flex-1 overflow-y-auto h-full space-y-2'>
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>
        {/*Right Side */}
        <div className='flex-1 -mt-[769px] ml-86 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
         {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
      
    </div>
  )
}

export default ChatPage;
