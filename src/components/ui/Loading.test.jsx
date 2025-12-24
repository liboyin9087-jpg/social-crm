import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading, PageLoading } from './Loading';

describe('Loading', () => {
  it('renders with default props', () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with small size', () => {
    const { container } = render(<Loading size="sm" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveClass('w-4', 'h-4');
  });

  it('renders with medium size', () => {
    const { container } = render(<Loading size="md" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveClass('w-8', 'h-8');
  });

  it('renders with large size', () => {
    const { container } = render(<Loading size="lg" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  it('renders with soul color', () => {
    const { container } = render(<Loading color="soul" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveClass('border-oak-soul');
  });

  it('renders with warmth color', () => {
    const { container } = render(<Loading color="warmth" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveClass('border-oak-warmth');
  });

  it('applies custom className', () => {
    const { container } = render(<Loading className="custom-class" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveClass('custom-class');
  });
});

describe('PageLoading', () => {
  it('renders with default message', () => {
    render(<PageLoading />);
    // Use getAllByText since "Loading..." appears twice (sr-only and visible)
    const loadingTexts = screen.getAllByText('Loading...');
    expect(loadingTexts.length).toBeGreaterThan(0);
  });

  it('renders with custom message', () => {
    render(<PageLoading message="Loading your content..." />);
    expect(screen.getByText('Loading your content...')).toBeInTheDocument();
  });

  it('renders brand logo', () => {
    const { container } = render(<PageLoading />);
    const logo = container.querySelector('.animate-float');
    expect(logo).toBeInTheDocument();
  });

  it('has fixed positioning for full-page overlay', () => {
    const { container } = render(<PageLoading />);
    const overlay = container.firstChild;
    expect(overlay).toHaveClass('fixed', 'inset-0');
  });
});
