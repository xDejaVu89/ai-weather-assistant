import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface QueryInputProps {
  query: string;
  setQuery: (query: string) => void;
}

const QueryInput: React.FC<QueryInputProps> = ({ query, setQuery }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement natural language query
    console.log('Query:', query);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <MessageCircle className="w-6 h-6 text-white" />
        <h2 className="text-2xl font-semibold text-white">Ask Me Anything</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          placeholder="e.g., When's the best time to run this week?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
        >
          <Send className="w-5 h-5" />
          Ask
        </button>
      </form>
    </div>
  );
};

export default QueryInput;
