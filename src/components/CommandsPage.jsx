import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommandsPage = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('https://docs.google.com/document/d/1BEGbooLoPLrd4Ko6DQBtrUO1Q_QaHEB99369KcbCOp4/pub?embedded=true');
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching the document:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Commands</h1>
        <div
          className="prose lg:prose-xl mx-auto"
          style={{ maxWidth: '100%', overflowX: 'auto' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default CommandsPage;
