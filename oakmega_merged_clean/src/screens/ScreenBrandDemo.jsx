import React, { useState } from 'react';
import { BrandButton } from '../components/ui/BrandButton';
import { Sidebar } from '../components/layout/Sidebar';
import { IconHome, IconModules, IconAnalytics, IconCoupon } from '../components/icons';

/**
 * ScreenBrandDemo - Demonstration screen for OakMega Canopy Brand Identity System
 * This screen showcases the BrandButton and Sidebar components with brand styling
 */
export const ScreenBrandDemo = () => {
  const [activePath, setActivePath] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: '首頁', icon: (props) => <IconHome size={20} {...props} />, path: 'dashboard' },
    { id: 'modules', label: '模組中心', icon: (props) => <IconModules size={20} {...props} />, path: 'modules' },
    { id: 'analytics', label: '數據分析', icon: (props) => <IconAnalytics size={20} {...props} />, path: 'analytics' },
    { id: 'rewards', label: '優惠管理', icon: (props) => <IconCoupon size={20} {...props} />, path: 'rewards' },
  ];

  return (
    <div className="flex h-screen bg-paper-canvas">
      {/* Sidebar Component Demo */}
      <Sidebar 
        activePath={activePath}
        navItems={navItems}
        onNavigate={setActivePath}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-brand font-bold text-oakmega-purple-700 mb-2">
              OakMega Canopy Brand Identity
            </h1>
            <p className="text-lg text-gray-600 font-sans">
              A showcase of the brand components and design system
            </p>
          </div>

          {/* Color Palette Section */}
          <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-2xl font-brand font-semibold text-gray-900">Brand Colors</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="h-24 bg-oakmega-purple-700 rounded-lg shadow-growth"></div>
                <p className="text-sm font-sans">
                  <span className="font-semibold">OakMega Purple</span>
                  <br />
                  <span className="text-gray-600">#5D38BF</span>
                </p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-oakmega-orange-400 rounded-lg shadow-sm"></div>
                <p className="text-sm font-sans">
                  <span className="font-semibold">OakMega Orange</span>
                  <br />
                  <span className="text-gray-600">#FFC044</span>
                </p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-paper-canvas border border-gray-200 rounded-lg"></div>
                <p className="text-sm font-sans">
                  <span className="font-semibold">Paper Canvas</span>
                  <br />
                  <span className="text-gray-600">#F9F9F7</span>
                </p>
              </div>
            </div>
          </section>

          {/* BrandButton Section */}
          <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-2xl font-brand font-semibold text-gray-900">Brand Buttons</h2>
            <p className="text-sm text-gray-600 font-sans mb-4">
              Interactive buttons with hover lift effect (translateY -2px) and brand styling
            </p>
            
            {/* Button Variants */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Primary Variant</h3>
                <div className="flex gap-4 flex-wrap">
                  <BrandButton variant="primary">Primary Button</BrandButton>
                  <BrandButton variant="primary" disabled>Disabled Primary</BrandButton>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">CTA Variant</h3>
                <div className="flex gap-4 flex-wrap">
                  <BrandButton variant="cta">Call to Action</BrandButton>
                  <BrandButton variant="cta" disabled>Disabled CTA</BrandButton>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Outline Variant</h3>
                <div className="flex gap-4 flex-wrap">
                  <BrandButton variant="outline">Outline Button</BrandButton>
                  <BrandButton variant="outline" disabled>Disabled Outline</BrandButton>
                </div>
              </div>
            </div>
          </section>

          {/* Typography Section */}
          <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-2xl font-brand font-semibold text-gray-900">Typography</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Body Text (Noto Sans CJK TC)</p>
                <p className="font-sans text-base">
                  這是使用 Noto Sans CJK TC 字體的內文範例。The quick brown fox jumps over the lazy dog.
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Brand Font (Ubuntu/Inter)</p>
                <p className="font-brand text-base font-semibold">
                  Brand Heading with Ubuntu/Inter: 1234567890
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Numbers (Ubuntu/Inter)</p>
                <p className="font-numbers text-2xl font-bold">
                  123,456,789.00
                </p>
              </div>
            </div>
          </section>

          {/* Shadow Demo */}
          <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-2xl font-brand font-semibold text-gray-900">Custom Shadows</h2>
            <div className="flex gap-6">
              <div className="p-6 bg-oakmega-purple-700 text-white rounded-lg shadow-growth">
                <p className="font-brand">Growth Shadow</p>
                <p className="text-sm opacity-80 font-sans">shadow-growth</p>
              </div>
            </div>
          </section>

          {/* Implementation Notes */}
          <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-2xl font-brand font-semibold text-gray-900">Implementation Notes</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 font-sans">
              <li>Sidebar component features sticky positioning and active state indicators</li>
              <li>Active navigation items show an orange (#FFC044) vertical bar</li>
              <li>BrandButton components include hover lift effect with -2px translateY</li>
              <li>All components use the Canopy brand color palette</li>
              <li>Typography follows the brand guidelines with Noto Sans CJK TC and Ubuntu/Inter</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ScreenBrandDemo;
