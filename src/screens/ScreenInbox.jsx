/**
 * src/screens/ScreenInbox.jsx
 * 智慧收件匣主畫面
 */
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Filter, MoreHorizontal, Send, Paperclip, 
  Smile, AlertCircle, Eye, User, Zap, Clock, Tag, ShoppingBag 
} from 'lucide-react'; // 確保安裝了 lucide-react
import { BrandButton } from '../components/ui/BrandButton'; 

// --- 假資料 (Mock Data) ---
const MOCK_CONVERSATIONS = [
  {
    id: 'c1',
    userId: 'u_1001',
    userName: '林筱雯',
    lastMessage: '請問這款保濕精華還有貨嗎？',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 1,
    status: 'open',
    priority: 'high',
    tags: ['VIP', '高消費力', '喜愛保養品'],
    omaData: {
      lastSeen: '5 分鐘前',
      visitCount: 12,
      topInterest: '保濕修復組',
      conversionProb: 85,
    },
    viewers: [],
  },
  {
    id: 'c2',
    userId: 'u_1002',
    userName: '陳志豪',
    lastMessage: '價格有點超出預算...',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
    status: 'pending',
    priority: 'normal',
    tags: ['比價中', '休旅車意向'],
    omaData: {
      lastSeen: '2 小時前',
      visitCount: 5,
      topInterest: 'CX-5 休旅車',
      conversionProb: 45,
    },
    viewers: ['Admin B'],
  },
  {
    id: 'c3',
    userId: 'u_1003',
    userName: '王大明',
    lastMessage: '[內部備註] 此客戶情緒激動，請主管協助',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 0,
    status: 'open',
    priority: 'urgent',
    tags: ['客訴', '急件'],
    omaData: {
      lastSeen: '30 分鐘前',
      visitCount: 2,
      topInterest: '售後服務',
      conversionProb: 10,
    },
    viewers: [],
  }
];

const MOCK_MESSAGES = {
  'c1': [
    { id: 'm1', sender: 'user', type: 'text', content: '你好，我在官網看到你們的介紹', timestamp: new Date(Date.now() - 3600000) },
    { id: 'm2', sender: 'agent', type: 'text', content: '您好！請問對哪一款產品感興趣呢？', timestamp: new Date(Date.now() - 3500000), agentName: 'You' },
    { id: 'm3', sender: 'user', type: 'text', content: '請問這款保濕精華還有貨嗎？', timestamp: new Date(Date.now() - 300000) },
  ],
  'c2': [
    { id: 'm4', sender: 'user', type: 'text', content: '請問這台車辦到好多少錢？', timestamp: new Date(Date.now() - 86400000) },
    { id: 'm5', sender: 'agent', type: 'whisper', content: '注意：此客戶之前詢問過競品價格，報價需謹慎。', timestamp: new Date(Date.now() - 86300000), agentName: 'Admin B' },
    { id: 'm6', sender: 'user', type: 'text', content: '價格有點超出預算...', timestamp: new Date(Date.now() - 7200000) },
  ],
  'c3': [
    { id: 'm7', sender: 'user', type: 'text', content: '你們的服務太差了吧！', timestamp: new Date(Date.now() - 1800000) },
    { id: 'm8', sender: 'agent', type: 'whisper', content: '此客戶情緒激動，請主管協助處理。', timestamp: new Date(Date.now() - 1700000), agentName: '客服小美' },
  ]
};

// --- 子元件 ---
const ConversationItem = ({ convo, isActive, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-oak-soul/5 group
      ${isActive ? 'bg-oak-soul/5 border-l-4 border-l-oak-soul' : 'border-l-4 border-l-transparent'}
    `}
  >
    <div className="flex justify-between items-start mb-1">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center font-bold text-sm transition-transform ${isActive ? 'bg-oak-soul text-white shadow-soul' : 'bg-white text-oak-soul'}`}>
            {convo.userName[0]}
          </div>
          {convo.priority === 'urgent' && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </div>
        <div>
          <h4 className={`text-sm font-bold ${isActive ? 'text-oak-soul' : 'text-gray-800'}`}>{convo.userName}</h4>
          <span className="text-[10px] text-gray-400">
            {new Date(convo.lastMessageTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>
      </div>
      {convo.unreadCount > 0 && (
        <span className="bg-oak-warmth text-oak-soul text-[10px] font-bold px-2 py-0.5 rounded-full shadow-warmth animate-bounce">
          {convo.unreadCount}
        </span>
      )}
    </div>
    
    <div className="flex justify-between items-end mt-1">
      <p className={`text-xs line-clamp-1 pl-12 flex-1 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
        {convo.lastMessage.includes('[內部備註]') ? <span className="text-oak-warmth font-bold flex items-center gap-1"><AlertCircle size={10}/> 內部備註</span> : convo.lastMessage}
      </p>
      
      {convo.viewers && convo.viewers.length > 0 && (
        <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-500" title={`${convo.viewers.join(', ')} 正在查看`}>
          <Eye size={10} />
          {convo.viewers.length}
        </div>
      )}
    </div>

    <div className="flex gap-1 mt-2 pl-12 overflow-hidden h-5">
      {convo.tags.slice(0, 3).map(tag => (
        <span key={tag} className="text-[10px] bg-oak-canvas border border-gray-200 text-gray-500 px-1.5 py-0 rounded-md whitespace-nowrap">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const MessageBubble = ({ msg }) => {
  const isMe = msg.sender === 'agent';
  const isWhisper = msg.type === 'whisper';

  if (isWhisper) {
    return (
      <div className="flex justify-center my-4 animate-in fade-in slide-in-from-bottom-2">
        <div className="bg-oak-warmth/10 border border-oak-warmth/50 text-oak-soul px-4 py-2 rounded-xl text-xs flex flex-col items-center gap-1 max-w-[85%] shadow-sm">
          <div className="flex items-center gap-2 font-bold w-full justify-center border-b border-oak-warmth/20 pb-1 mb-1">
            <AlertCircle size={14} className="text-oak-warmth" />
            <span>內部備註 ({msg.agentName})</span>
          </div>
          <span className="text-gray-700 leading-relaxed">{msg.content}</span>
          <span className="text-[10px] text-gray-400 self-end mt-1">
            {new Date(msg.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4 group`}>
      {!isMe && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mr-2 flex items-center justify-center text-xs text-gray-500 self-end mb-1">User</div>
      )}
      <div className={`flex flex-col max-w-[70%]`}>
        {isMe && msg.agentName && msg.agentName !== 'You' && (
           <span className="text-[10px] text-gray-400 text-right mb-1 mr-1">{msg.agentName}</span>
        )}
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm relative
          ${isMe ? 'bg-oak-soul text-white rounded-br-none' : 'bg-white text-oak-text border border-gray-100 rounded-bl-none'}
        `}>
          {msg.content}
        </div>
        <span className={`text-[10px] text-gray-300 mt-1 ${isMe ? 'text-right mr-1' : 'ml-1'}`}>
          {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </span>
      </div>
    </div>
  );
};

// --- 主畫面 ---
export const ScreenInbox = () => {
  const [activeConvoId, setActiveConvoId] = useState('c1');
  const [filterStatus, setFilterStatus] = useState('all');
  const [inputText, setInputText] = useState('');
  const [isWhisperMode, setIsWhisperMode] = useState(false);
  const messagesEndRef = useRef(null);

  const activeConvo = MOCK_CONVERSATIONS.find(c => c.id === activeConvoId) || MOCK_CONVERSATIONS[0];
  const messages = MOCK_MESSAGES[activeConvoId] || [];

  const filteredConvos = MOCK_CONVERSATIONS.filter(c => 
    filterStatus === 'all' ? true : c.status === filterStatus
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConvoId, messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    console.log(`Sending ${isWhisperMode ? 'WHISPER' : 'MESSAGE'}: ${inputText}`);
    setInputText('');
  };

  return (
    <div className="flex h-full md:bg-transparent overflow-hidden rounded-card md:rounded-none">
      
      {/* 左欄：列表 */}
      <div className="w-full md:w-80 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col z-20">
        <div className="p-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-brand font-bold text-xl text-oak-soul">Inbox</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><Filter size={18} /></button>
            </div>
          </div>
          <div className="flex p-1 bg-oak-canvas rounded-xl mb-3">
            {['all', 'open', 'pending'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all capitalize ${filterStatus === status ? 'bg-white text-oak-soul shadow-sm font-bold' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="relative group">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-oak-soul transition-colors" />
            <input 
              type="text" 
              placeholder="搜尋姓名..." 
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-oak-soul/20 focus:ring-4 focus:ring-oak-soul/5 outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {filteredConvos.map(convo => (
            <ConversationItem 
              key={convo.id} 
              convo={convo} 
              isActive={activeConvoId === convo.id}
              onClick={() => setActiveConvoId(convo.id)}
            />
          ))}
        </div>
      </div>

      {/* 中欄：對話 */}
      <div className="hidden md:flex flex-1 flex-col bg-oak-canvas relative">
        <div className="h-16 border-b border-gray-200/60 bg-white/80 backdrop-blur-md px-6 flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-oak-text text-lg">{activeConvo.userName}</h3>
            <div className="flex gap-1">
              {activeConvo.tags.map(tag => (
                <span key={tag} className="bg-oak-soul/5 text-oak-soul border border-oak-soul/10 text-[10px] px-2 py-0.5 rounded-full font-medium">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 text-gray-400 items-center">
             {activeConvo.viewers && activeConvo.viewers.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-oak-warmth font-bold bg-oak-warmth/10 px-2 py-1 rounded-full animate-pulse">
                  <Eye size={12} />
                  {activeConvo.viewers.length} 人正在看
                </div>
             )}
            <MoreHorizontal size={20} className="hover:text-oak-soul cursor-pointer" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="flex justify-center mb-6">
            <span className="bg-gray-100 text-gray-400 text-[10px] px-3 py-1 rounded-full">今天 10:23 AM</span>
          </div>
          {messages.map(msg => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {activeConvoId === 'c2' && (
          <div className="absolute bottom-20 left-6 text-xs text-gray-400 flex items-center gap-2 animate-pulse">
            <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-[10px]">B</div>
            Admin B 正在輸入...
          </div>
        )}

        <div className={`p-4 border-t transition-all duration-500 relative ${isWhisperMode ? 'bg-oak-warmth/10 border-oak-warmth/30' : 'bg-white border-gray-200'}`}>
          {isWhisperMode && (
            <div className="absolute -top-8 left-0 right-0 h-8 bg-oak-warmth/10 flex items-center justify-center text-oak-soul text-xs font-bold border-t border-oak-warmth/20 backdrop-blur-sm animate-in slide-in-from-bottom-2">
              <AlertCircle size={12} className="mr-2" />
              WHISPER MODE ON: 訊息僅供內部查看，客戶不會收到。
            </div>
          )}
          
          <div className="flex gap-3 items-end">
            <button 
              onClick={() => setIsWhisperMode(!isWhisperMode)}
              className={`p-3 rounded-xl transition-all duration-300 flex-shrink-0 group relative ${isWhisperMode ? 'bg-oak-warmth text-oak-soul shadow-warmth scale-105' : 'bg-gray-100 text-gray-400 hover:bg-oak-soul/10 hover:text-oak-soul'}`}
              title="切換內部備註模式"
            >
              <Zap size={20} className={isWhisperMode ? 'fill-current' : ''} />
            </button>

            <div className={`flex-1 rounded-2xl flex items-center px-4 py-2 border transition-all ${isWhisperMode ? 'bg-white border-oak-warmth/50 ring-2 ring-oak-warmth/20' : 'bg-gray-50 border-transparent focus-within:bg-white focus-within:border-oak-soul/20 focus-within:ring-2 focus-within:ring-oak-soul/5'}`}>
              <input 
                type="text" 
                placeholder={isWhisperMode ? "輸入內部備註 (例如：客戶情緒激動...)" : "輸入訊息..."}
                className="flex-1 bg-transparent border-none outline-none text-sm min-h-[24px]"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <div className="flex gap-2 text-gray-400 ml-2">
                <Paperclip size={18} className="hover:text-oak-soul cursor-pointer transition-colors" />
                <Smile size={18} className="hover:text-oak-soul cursor-pointer transition-colors" />
              </div>
            </div>
            
            <BrandButton onClick={handleSend} variant={isWhisperMode ? 'action' : 'primary'} className="px-4 py-3 rounded-xl">
              <Send size={18} />
            </BrandButton>
          </div>
        </div>
      </div>

      {/* 右欄：會員 360 */}
      <div className="hidden lg:flex w-80 bg-white border-l border-gray-100 flex-col overflow-y-auto">
        <div className="p-8 text-center border-b border-gray-50 bg-oak-canvas/30">
          <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-soul mx-auto mb-4 flex items-center justify-center text-3xl text-oak-soul font-bold relative group cursor-pointer">
            {activeConvo.userName[0]}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-oak-warmth rounded-full border-2 border-white flex items-center justify-center shadow-sm">
               <User size={12} className="text-oak-soul" />
            </div>
          </div>
          <h3 className="font-brand font-bold text-xl text-gray-800">{activeConvo.userName}</h3>
          <p className="text-xs text-gray-400 font-mono mt-1">UID: {activeConvo.userId}</p>
          
          <div className="flex justify-center gap-2 mt-4">
             <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">LTV</p>
                <p className="font-bold text-oak-soul text-lg">$12,400</p>
             </div>
             <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Level</p>
                <p className="font-bold text-oak-warmth text-lg">Gold</p>
             </div>
          </div>
        </div>

        {activeConvo.omaData && (
          <div className="p-6 border-b border-gray-50">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShoppingBag size={14} /> OMA Insights
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <Clock size={14} /> 最近活躍
                </span>
                <span className="font-medium text-gray-900">
                  {activeConvo.omaData.lastSeen}
                </span>
              </div>
              <div className="bg-oak-canvas p-4 rounded-xl mt-2 border border-oak-soul/5">
                <div className="flex justify-between items-end mb-2">
                   <p className="text-xs text-gray-500">購買意圖 (Intent)</p>
                   <p className={`font-bold text-sm ${activeConvo.omaData.conversionProb > 70 ? 'text-oak-soul' : 'text-gray-400'}`}>
                     {activeConvo.omaData.conversionProb}%
                   </p>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-gradient-to-r from-oak-soul to-oak-warmth rounded-full transition-all duration-1000" 
                     style={{ width: `${activeConvo.omaData.conversionProb}%` }}
                   />
                </div>
                <p className="text-xs font-medium text-gray-700 mt-3 flex items-center gap-2">
                  <Zap size={12} className="text-oak-warmth fill-current" />
                  關注：{activeConvo.omaData.topInterest}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 flex-1">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Tag size={14} /> 標籤管理
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {activeConvo.tags.map(tag => (
              <span key={tag} className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:border-oak-soul hover:text-oak-soul hover:bg-oak-soul/5 cursor-pointer transition-colors group">
                {tag}
                <button className="opacity-0 group-hover:opacity-100 hover:text-red-500">×</button>
              </span>
            ))}
            <button className="text-xs border border-dashed border-gray-300 text-gray-400 px-3 py-1.5 rounded-lg hover:border-oak-soul hover:text-oak-soul transition-colors">
              + Add
            </button>
          </div>
        </div>

        <div className="p-6 mt-auto bg-gray-50 border-t border-gray-100">
          <BrandButton className="w-full mb-3 shadow-sm" variant="primary">
             建立工單
          </BrandButton>
          <BrandButton className="w-full" variant="secondary">
             發送優惠券
          </BrandButton>
        </div>
      </div>
    </div>
  );
};