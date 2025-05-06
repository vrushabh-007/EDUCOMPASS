'use client';

// src/components/ChatAI.jsx
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function ChatAI() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const commonQuestions = [
    "What are the admission requirements?",
    "How do I apply for scholarships?",
    "What programs are available?",
    "What is the tuition fee?"
  ];

  const getAnswer = async (q) => {
    setIsLoading(true);
    setError(null);
    try {
      // Initialize the Gemini API
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
      
      // Get the generative model
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      });

      // Generate content
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: q }] }],
      });
      
      const response = await result.response;
      const text = response.text();

      setAnswers(prev => [...prev, { question: q, answer: text }]);
    } catch (err) {
      console.error('Error getting response:', err);
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    getAnswer(question);
    setQuestion('');
  };

  return (
    <div className="bg-[#fff8e6] py-8">
      <div className="w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Ask AI for Help</h2>
          <p className="text-lg text-gray-600">Get instant answers to your questions about universities and admissions</p>
        </div>
        <div className="flex gap-4">
          {/* Left Side - Questions and Input */}
          <div className="w-1/3 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] p-3 rounded-t-xl">
              <h3 className="text-lg font-semibold text-white">Ask Your Question</h3>
            </div>
            
            <div className="h-[350px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Suggested questions:</p>
                  <div className="flex flex-col gap-2">
                    {commonQuestions.map((q, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuestion(q);
                          getAnswer(q);
                        }}
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-3 py-2 text-left transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    className="w-full p-2.5 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white px-4 py-2.5 text-sm font-medium rounded-lg hover:from-[#7C3AED] hover:to-[#5B21B6] disabled:bg-gray-400 transition-colors"
                  >
                    {isLoading ? 'Thinking...' : 'Ask'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side - Answers */}
          <div className="w-2/3 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] p-3 rounded-t-xl">
              <h3 className="text-lg font-semibold text-white">AI Response</h3>
            </div>
            
            <div className="h-[350px] overflow-y-auto p-4">
              {answers.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg mb-2">
                    <p className="text-gray-800 font-medium">{item.question}</p>
                  </div>
                  <div className="bg-[#8B5CF6] bg-opacity-10 p-3 rounded-lg">
                    <p className="text-gray-800 whitespace-pre-line">{item.answer}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5CF6]"></div>
                </div>
              )}
              {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatAI;