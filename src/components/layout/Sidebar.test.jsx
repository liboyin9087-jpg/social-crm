import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  const mockNavItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { id: 'inbox', label: 'Inbox', path: '/inbox', icon: '📥' },
    { id: 'oma', label: 'OMA', path: '/oma', icon: '🔍' },
  ];

  it('renders brand logo by default', () => {
    render(<Sidebar navItems={mockNavItems} onNavigate={() => {}} />);
    expect(screen.getByText('OakMega')).toBeInTheDocument();
    expect(screen.getByText('Social CRM')).toBeInTheDocument();
  });

  it('renders custom logo when provided', () => {
    const customLogo = <div>Custom Logo</div>;
    render(
      <Sidebar 
        navItems={mockNavItems} 
        logo={customLogo} 
        onNavigate={() => {}} 
      />
    );
    expect(screen.getByText('Custom Logo')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<Sidebar navItems={mockNavItems} onNavigate={() => {}} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Inbox')).toBeInTheDocument();
    expect(screen.getByText('OMA')).toBeInTheDocument();
  });

  it('highlights active navigation item', () => {
    render(
      <Sidebar 
        navItems={mockNavItems} 
        activePath="/dashboard"
        onNavigate={() => {}} 
      />
    );
    const dashboardButton = screen.getByText('Dashboard').closest('button');
    expect(dashboardButton).toHaveClass('bg-oak-soul/5', 'text-oak-soul');
  });

  it('calls onNavigate when navigation item is clicked', async () => {
    const handleNavigate = vi.fn();
    const user = userEvent.setup();
    render(<Sidebar navItems={mockNavItems} onNavigate={handleNavigate} />);
    
    const dashboardButton = screen.getByText('Dashboard');
    await user.click(dashboardButton);
    
    expect(handleNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('shows active indicator for active item', () => {
    const { container } = render(
      <Sidebar 
        navItems={mockNavItems} 
        activePath="/dashboard"
        onNavigate={() => {}} 
      />
    );
    const activeIndicators = container.querySelectorAll('.bg-oak-warmth');
    expect(activeIndicators.length).toBeGreaterThan(0);
  });

  it('renders copyright footer', () => {
    render(<Sidebar navItems={mockNavItems} onNavigate={() => {}} />);
    expect(screen.getByText('© 2024 OakMega')).toBeInTheDocument();
  });
});
