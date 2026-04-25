import { describe, it, expect } from 'vitest';
import { parseCssToTree, treeToSass, treeToScss } from './css-parser';

describe('css-parser', () => {
  describe('parseCssToTree', () => {
    it('should parse simple CSS to tree', () => {
      const input = `
.foo {
  color: red;
}
      `.trim();
      const tree = parseCssToTree(input);
      expect(tree.root.children).toHaveLength(1);
      expect(tree.root.children[0].selector).toBe('.foo');
      expect(tree.root.children[0].children).toHaveLength(1);
      expect(tree.root.children[0].children[0].property).toBe('color');
      expect(tree.root.children[0].children[0].value).toBe('red');
    });

    it('should parse nested SCSS', () => {
      const input = `
.parent {
  .child {
    color: blue;
  }
}
      `.trim();
      const tree = parseCssToTree(input);
      expect(tree.root.children[0].selector).toBe('.parent');
      expect(tree.root.children[0].children[0].selector).toBe('.child');
      expect(tree.root.children[0].children[0].children[0].property).toBe('color');
    });

    it('should handle multiple properties', () => {
      const input = `
.box {
  width: 100px;
  height: 200px;
  background: blue;
}
      `.trim();
      const tree = parseCssToTree(input);
      const props = tree.root.children[0].children;
      expect(props).toHaveLength(3);
      expect(props[0].property).toBe('width');
      expect(props[1].property).toBe('height');
      expect(props[2].property).toBe('background');
    });
  });

  describe('treeToSass', () => {
    it('should convert tree to SASS format', () => {
      const input = `
.foo {
  color: red;
}
      `.trim();
      const tree = parseCssToTree(input);
      const sass = treeToSass(tree);
      expect(sass).toContain('.foo');
      expect(sass).toContain('color: red');
    });

    it('should handle nested rules', () => {
      const input = `
.parent {
  .child {
    color: blue;
  }
}
      `.trim();
      const tree = parseCssToTree(input);
      const sass = treeToSass(tree);
      expect(sass).toContain('.parent');
      expect(sass).toContain('.child');
    });
  });

  describe('treeToScss', () => {
    it('should convert tree to SCSS format with braces', () => {
      const input = `
.foo {
  color: red;
}
      `.trim();
      const tree = parseCssToTree(input);
      const scss = treeToScss(tree);
      expect(scss).toContain('.foo {');
      expect(scss).toContain('color: red;');
      expect(scss).toContain('}');
    });
  });
});