import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from '@/components/common/Icon';

describe('Icon Component', () => {
  it('正しくレンダリングされる', () => {
    const { container } = render(<Icon name="user" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // next-starterはインラインSVGを使用（SVGスプライトの<use>ではなく<path>）
    expect(svg?.querySelector('path')).toBeInTheDocument();
  });

  it('デフォルトのサイズが24pxで適用される', () => {
    const { container } = render(<Icon name="user" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ width: '24px', height: '24px' });
  });

  it('sizeプロップでサイズを変更できる', () => {
    const { container } = render(<Icon name="user" size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ width: '32px', height: '32px' });
  });

  it('colorプロップで色を変更できる', () => {
    const { container } = render(<Icon name="user" color="red" />);
    const svg = container.querySelector('svg');
    expect(svg?.style.color).toBe('red');
  });

  it('デフォルトの色がcurrentColorである', () => {
    const { container } = render(<Icon name="user" />);
    const svg = container.querySelector('svg');
    expect(svg?.style.color.toLowerCase()).toBe('currentcolor');
  });

  it('rotateプロップで回転が適用される', () => {
    const { container } = render(<Icon name="arrow" rotate={90} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ transform: 'rotate(90deg)' });
  });

  it('rotateが未指定の場合transformが設定されない', () => {
    const { container } = render(<Icon name="arrow" />);
    const svg = container.querySelector('svg');
    expect(svg?.style.transform).toBe('');
  });

  it('spinプロップでスピンクラスが追加される', () => {
    const { container } = render(<Icon name="loading" spin />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toContain('spin');
  });

  it('spin=falseの場合スピンクラスが追加されない', () => {
    const { container } = render(<Icon name="loading" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).not.toContain('spin');
  });

  it('aria-hidden="true"が設定されている', () => {
    const { container } = render(<Icon name="user" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('追加のclassNameが適用される', () => {
    const { container } = render(<Icon name="user" className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toContain('custom-class');
  });

  it('hoverColorが設定されるとCSS変数が追加される', () => {
    const { container } = render(<Icon name="user" hoverColor="blue" />);
    const svg = container.querySelector('svg');
    expect(svg?.style.getPropertyValue('--icon-hover-color')).toBe('blue');
  });

  it('既知のアイコン名で<path>要素がレンダリングされる', () => {
    const { container } = render(<Icon name="search" />);
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('fill', 'currentColor');
  });

  it('未知のアイコン名でフォールバックの<rect>がレンダリングされる', () => {
    const { container } = render(<Icon name="unknown-icon" />);
    expect(container.querySelector('rect')).toBeInTheDocument();
    expect(container.querySelector('path')).not.toBeInTheDocument();
  });
});
