import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrandButton } from './BrandButton';

describe('BrandButton', () => {
  it('renders with children text', () => {
    render(<BrandButton>Click me</BrandButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with primary variant by default', () => {
    render(<BrandButton>Primary Button</BrandButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-oak-soul');
  });

  it('renders with action variant', () => {
    render(<BrandButton variant="action">Action Button</BrandButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-oak-warmth');
  });

  it('renders with secondary variant', () => {
    render(<BrandButton variant="secondary">Secondary Button</BrandButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-oak-canvas');
  });

  it('renders with ghost variant', () => {
    render(<BrandButton variant="ghost">Ghost Button</BrandButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<BrandButton onClick={handleClick}>Click me</BrandButton>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<BrandButton disabled>Disabled Button</BrandButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<BrandButton onClick={handleClick} disabled>Disabled Button</BrandButton>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<BrandButton className="custom-class">Custom Button</BrandButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
