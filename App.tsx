
import React, { useState, useRef, useEffect } from 'react';
import { Message, Conversation } from './types';
import { AGENTS } from './analysisTools';
import { chatWithAgent } from './services/geminiService';
import { 
  Send, 
  Plus, 
  MessageSquare, 
  Bot, 
  User, 
  Menu,
  X,
  Search,
  ChevronRight,
  ChevronDown,
  ArrowRightLeft
} from 'lucide-react';

const App: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, activeConvId, isStreaming]);

  const createConversation = (agentId: string) => {
    const agent = AGENTS.find(a => a.id === agentId);
    if (!agent) return;

    const newConv: Conversation = {
      id: `conv_${Date.now()}`,
      agentId: agent.id,
      title: `Consultation: ${agent.name}`,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConvId(newConv.id);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const switchAgent = (newAgentId: string) => {
    if (!activeConvId) return;
    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return { ...c, agentId: newAgentId };
      }
      return c;
    }));
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !activeConvId || isStreaming) return;

    const currentInput = input;
    setInput('');
    setIsStreaming(true);

    // 1. Add User Message
    const userMsg: Message = {
      id: `m_${Date.now()}`,
      role: 'user',
      content: currentInput,
      timestamp: Date.now()
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          messages: [...c.messages, userMsg],
          updatedAt: Date.now()
        };
      }
      return c;
    }));

    // 2. Create Placeholder for Model Message
    const modelMsgId = `m_${Date.now() + 1}`;
    const modelMsg: Message = {
      id: modelMsgId,
      role: 'model',
      content: '', // starts empty
      timestamp: Date.now()
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return { ...c, messages: [...c.messages, modelMsg] };
      }
      return c;
    }));

    try {
      const activeConv = conversations.find(c => c.id === activeConvId);
      const agent = AGENTS.find(a => a.id === activeConv?.agentId);
      
      if (!activeConv || !agent) throw new Error("Context lost");

      // Stream response
      await chatWithAgent(
        agent, 
        activeConv.messages, 
        currentInput,
        (chunk) => {
          setConversations(prev => prev.map(c => {
            if (c.id === activeConvId) {
              const newMessages = [...c.messages];
              // Update the last message (the placeholder)
              const lastMsg = newMessages[newMessages.length - 1];
              if (lastMsg.role === 'model') {
                 lastMsg.content = chunk;
              }
              return { ...c, messages: newMessages };
            }
            return c;
          }));
        }
      );
    } catch (error) {
      console.error(error);
      // Add error notification in UI if needed
    } finally {
      setIsStreaming(false);
    }
  };

  const activeConversation = conversations.find(c => c.id === activeConvId);
  const activeAgent = activeConversation ? AGENTS.find(a => a.id === activeConversation.agentId) : null;
  
  const filteredAgents = AGENTS.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 text-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 border-r border-slate-800`}>
        
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2 font-bold text-white tracking-wide">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span>Orchestrator</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1 hover:bg-slate-800 rounded">
            <X size={20} />
          </button>
        </div>

        {/* New Chat Action */}
        <div className="p-4">
          <button 
            onClick={() => setActiveConvId(null)} 
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-900/20"
          >
            <Plus size={18} />
            <span>New Consultation</span>
          </button>
        </div>

        {/* Recent Conversations List */}
        <div className="flex-1 overflow-y-auto px-2">
          <div className="px-2 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Sessions</div>
          {conversations.length === 0 && (
            <div className="text-sm text-slate-600 px-4 py-4 italic text-center">No active consultations.</div>
          )}
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => { setActiveConvId(conv.id); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
              className={`w-full text-left p-3 rounded-lg mb-1 flex items-center gap-3 transition-colors group
                ${activeConvId === conv.id ? 'bg-slate-800 text-white shadow-sm' : 'hover:bg-slate-800/50 text-slate-400'}`}
            >
              <MessageSquare size={16} className={`shrink-0 ${activeConvId === conv.id ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
              <div className="truncate text-sm font-medium">{conv.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-white relative">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between shrink-0 z-10">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-600">
            <Menu size={24} />
          </button>
          <span className="font-semibold text-slate-800 truncate">
            {activeAgent ? activeAgent.name : 'Select Specialist'}
          </span>
          <div className="w-8" />
        </div>

        {activeConversation ? (
          /* Active Chat Interface */
          <>
            {/* Desktop Chat Header with Agent Switcher */}
            <div className="hidden md:flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm`}>
                  <Bot size={24} />
                </div>
                <div className="relative">
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                      <span className="flex items-center gap-1">
                        <ArrowRightLeft size={10} />
                        Active Specialist
                      </span>
                   </div>
                   <div className="relative group">
                        <select
                            value={activeAgent?.id}
                            onChange={(e) => switchAgent(e.target.value)}
                            className="appearance-none bg-transparent font-bold text-slate-900 text-xl leading-tight focus:outline-none cursor-pointer pr-8 hover:text-indigo-600 transition-colors"
                        >
                            {AGENTS.map(a => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="w-5 h-5 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-indigo-500" />
                   </div>
                   <p className="text-sm text-slate-500 max-w-md truncate">{activeAgent?.expertise}</p>
                </div>
              </div>
              {activeAgent?.allowedFiles && activeAgent.allowedFiles.length > 0 && (
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   Knowledge Base Connected
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-slate-50/50">
              {activeConversation.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Bot size={16} className="text-indigo-600" />
                    </div>
                  )}
                  
                  <div className={`max-w-[90%] md:max-w-[75%] rounded-2xl px-6 py-4 text-sm leading-relaxed shadow-sm
                    ${msg.role === 'user' 
                      ? 'bg-slate-900 text-slate-50 rounded-br-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    {msg.role === 'model' && msg.content === '' ? (
                       <div className="flex space-x-1.5 h-5 items-center px-1">
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                       </div>
                    ) : (
                       <div className="whitespace-pre-wrap">{msg.content}</div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-1">
                      <User size={16} className="text-slate-500" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-white border-t border-slate-100 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="max-w-4xl mx-auto relative">
                <form onSubmit={handleSendMessage} className="relative flex items-center shadow-sm rounded-xl bg-slate-50 border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isStreaming}
                    placeholder={`Ask the ${activeAgent?.name}...`}
                    className="w-full pl-4 pr-12 py-4 bg-transparent border-none focus:ring-0 focus:outline-none text-slate-800 placeholder-slate-400"
                  />
                  <button 
                    type="submit" 
                    disabled={!input.trim() || isStreaming}
                    className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </form>
                <div className="mt-3 text-center flex justify-center items-center gap-3">
                   {activeAgent?.allowedFiles && activeAgent.allowedFiles.length > 0 && (
                      <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        Context: AI Monetization.pdf
                      </p>
                   )}
                   <p className="text-[10px] text-slate-400 flex items-center gap-1">
                       <ArrowRightLeft size={10} />
                       Tip: Switch agents in the header to get a different perspective on the same topic.
                   </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Agent Selector Grid (Empty State) */
          <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-10">
             <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10 md:mb-16 pt-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                      Select Your <span className="text-indigo-600">Lead Expert</span>
                    </h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Start a consultation with a specialized agent. You can bring in other experts dynamically as the conversation evolves.
                    </p>
                </div>

                <div className="relative max-w-md mx-auto mb-12">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Find an expert (e.g. 'Economist', 'General')..." 
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none shadow-sm text-slate-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    {filteredAgents.map(agent => (
                        <button 
                            key={agent.id}
                            onClick={() => createConversation(agent.id)}
                            className="group text-left bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                                <ChevronRight className="text-indigo-500" />
                            </div>
                            
                            <div className="mb-4 flex items-start justify-between">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Bot size={20} />
                                </div>
                                {agent.allowedFiles && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                                        Knowledge Base
                                    </span>
                                )}
                            </div>

                            <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">{agent.name}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{agent.expertise}</p>
                        </button>
                    ))}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
