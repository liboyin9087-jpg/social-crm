import React, { useState } from 'react';
import { BrandButton } from '../components/ui/BrandButton';
import { Loading, PageLoading } from '../components/ui/Loading';
import { OptimisticChat } from '../components/ui/OptimisticChat';
import { Sidebar } from '../components/layout/Sidebar';
import { LineMessageNode } from '../components/automation/LineMessageNode';

/**
 * ComponentShowcase - Demo page showcasing all the new UI components
 */
export const ComponentShowcase = () => {
  const [showPageLoading, setShowPageLoading] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  // Mock send message function for OptimisticChat
  const handleSendMessage = async (message) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { id: 'inbox', label: 'Inbox', path: '/inbox', icon: '📥' },
    { id: 'oma', label: 'OMA', path: '/oma', icon: '🔍' },
    { id: 'modules', label: 'Modules', path: '/modules', icon: '🧩' },
    { id: 'playground', label: 'Playground', path: '/playground', icon: '🎯' },
    { id: 'rewards', label: 'Rewards', path: '/rewards', icon: '🎁' },
  ];

  return (
    <div className="flex min-h-screen bg-oak-canvas">
      {/* Sidebar */}
      <Sidebar
        activePath={activeNav}
        navItems={navItems}
        onNavigate={setActiveNav}
      />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-brand font-bold text-oak-text mb-4 animate-float">
              OakMega Social CRM
            </h1>
            <p className="text-oak-subtext font-sans text-lg">
              Component Showcase - Demonstrating all new UI components
            </p>
          </div>

          {/* BrandButton Section */}
          <section className="bg-white rounded-card p-6 shadow-soul border border-gray-100">
            <h2 className="text-2xl font-brand font-bold text-oak-text mb-4">
              BrandButton Component
            </h2>
            <div className="flex flex-wrap gap-4">
              <BrandButton variant="primary">Primary Button</BrandButton>
              <BrandButton variant="action">Action Button</BrandButton>
              <BrandButton variant="secondary">Secondary Button</BrandButton>
              <BrandButton variant="ghost">Ghost Button</BrandButton>
              <BrandButton variant="primary" disabled>Disabled Button</BrandButton>
            </div>
          </section>

          {/* Loading Section */}
          <section className="bg-white rounded-card p-6 shadow-soul border border-gray-100">
            <h2 className="text-2xl font-brand font-bold text-oak-text mb-4">
              Loading Component
            </h2>
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Loading size="sm" color="soul" />
                <span className="text-oak-subtext text-sm">Small</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Loading size="md" color="warmth" />
                <span className="text-oak-subtext text-sm">Medium</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Loading size="lg" color="soul" />
                <span className="text-oak-subtext text-sm">Large</span>
              </div>
              <BrandButton
                variant="action"
                onClick={() => setShowPageLoading(true)}
              >
                Show PageLoading
              </BrandButton>
            </div>
          </section>

          {/* LineMessageNode Section */}
          <section className="bg-white rounded-card p-6 shadow-soul border border-gray-100">
            <h2 className="text-2xl font-brand font-bold text-oak-text mb-4">
              LineMessageNode Component
            </h2>
            <p className="text-oak-subtext mb-4">
              A custom React Flow node with Glassmorphism styling for LINE messages
            </p>
            <div className="flex flex-wrap gap-6">
              <LineMessageNode
                data={{
                  message: 'Hello! 👋 Welcome to OakMega Social CRM!',
                  sender: 'OakMega Bot',
                  timestamp: new Date().toLocaleTimeString(),
                }}
                selected={false}
              />
              <LineMessageNode
                data={{
                  message: 'This node is selected!\n\nNotice the purple border and shadow effect.',
                  sender: 'System',
                  timestamp: new Date().toLocaleTimeString(),
                }}
                selected={true}
              />
            </div>
          </section>

          {/* OptimisticChat Section */}
          <section className="bg-white rounded-card p-6 shadow-soul border border-gray-100">
            <h2 className="text-2xl font-brand font-bold text-oak-text mb-4">
              OptimisticChat Component
            </h2>
            <p className="text-oak-subtext mb-4">
              Chat interface simulating React 19's useOptimistic hook for instant feedback
            </p>
            <div className="h-[500px]">
              <OptimisticChat
                initialMessages={[
                  {
                    id: '1',
                    text: 'Welcome to OakMega Chat! 👋',
                    sender: 'Bot',
                    timestamp: new Date().toISOString(),
                    isOptimistic: false,
                    status: 'sent',
                  },
                  {
                    id: '2',
                    text: 'Try sending a message - you\'ll see instant optimistic updates!',
                    sender: 'Bot',
                    timestamp: new Date().toISOString(),
                    isOptimistic: false,
                    status: 'sent',
                  },
                ]}
                onSendMessage={handleSendMessage}
                userName="You"
              />
            </div>
          </section>

          {/* Brand Colors Reference */}
          <section className="bg-white rounded-card p-6 shadow-soul border border-gray-100">
            <h2 className="text-2xl font-brand font-bold text-oak-text mb-4">
              Brand Color Palette
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-soft bg-oak-soul shadow-soul mb-2"></div>
                <span className="text-sm font-sans text-oak-text font-semibold">oak-soul</span>
                <span className="text-xs text-oak-subtext">#5D38BF</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-soft bg-oak-warmth shadow-warmth mb-2"></div>
                <span className="text-sm font-sans text-oak-text font-semibold">oak-warmth</span>
                <span className="text-xs text-oak-subtext">#FFC044</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-soft bg-oak-canvas border border-gray-200 mb-2"></div>
                <span className="text-sm font-sans text-oak-text font-semibold">oak-canvas</span>
                <span className="text-xs text-oak-subtext">#F9F9F7</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-soft bg-oak-text mb-2"></div>
                <span className="text-sm font-sans text-oak-text font-semibold">oak-text</span>
                <span className="text-xs text-oak-subtext">#2C2C2C</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-soft bg-oak-subtext mb-2"></div>
                <span className="text-sm font-sans text-oak-text font-semibold">oak-subtext</span>
                <span className="text-xs text-oak-subtext">#6B7280</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* PageLoading Overlay */}
      {showPageLoading && (
        <div onClick={() => setShowPageLoading(false)}>
          <PageLoading message="Loading your content..." />
        </div>
      )}
    </div>
  );
};

export default ComponentShowcase;
