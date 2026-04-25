export interface CssNode {
  type: 'rule' | 'property';
  selector?: string;
  property?: string;
  value?: string;
  children: CssNode[];
  parent?: CssNode;
}

export interface CssTree {
  root: CssNode;
}

function createNode(type: 'rule' | 'property', selector?: string, property?: string, value?: string): CssNode {
  return {
    type,
    selector,
    property,
    value,
    children: [],
  };
}

/**
 * 按空格分割选择器，保留复合选择器（如 .c.is-active）不被拆分
 */
function splitSelector(selector: string): string[] {
  return selector.split(/\s+/).filter(p => p.trim() !== '');
}

/**
 * 解析 CSS / SCSS 文本为嵌套树结构
 * 自动兼容扁平 CSS 和嵌套 SCSS
 */
export function parseCssToTree(input: string): CssTree {
  const root = createNode('rule', 'root');
  const lines = input.split('\n');
  // 栈顶始终是当前所在的规则节点（从 root 开始）
  const ruleStack: CssNode[] = [root];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // 遇到规则开始（可能包含 '{'）
    if (trimmed.includes('{')) {
      const fullSelector = trimmed.replace('{', '').trim();
      if (!fullSelector) continue;

      const parts = splitSelector(fullSelector);
      // 关键改动：从当前栈顶开始，而不是 root
      let currentNode = ruleStack[ruleStack.length - 1];

      // 逐级下降，在 currentNode 的子树中找或创建每个选择器片段
      for (const part of parts) {
        let child = currentNode.children.find(
          c => c.type === 'rule' && c.selector === part
        );
        if (!child) {
          child = createNode('rule', part);
          child.parent = currentNode;
          currentNode.children.push(child);
        }
        currentNode = child;
      }

      // 最终节点入栈，成为当前作用域
      ruleStack.push(currentNode);
    }
    // 遇到规则结束
    else if (trimmed === '}' || trimmed.endsWith('}')) {
      if (ruleStack.length > 1) {
        ruleStack.pop();
      }
    }
    // 属性定义
    else if (trimmed.includes(':') && !trimmed.endsWith('}')) {
      const colonIndex = trimmed.indexOf(':');
      const property = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim();
      if (value.endsWith(';')) {
        value = value.slice(0, -1).trim();
      }

      if (property && value && ruleStack.length > 0) {
        const parent = ruleStack[ruleStack.length - 1];
        const propNode = createNode('property', undefined, property, value);
        propNode.parent = parent;
        parent.children.push(propNode);
      }
    }
  }

  return { root };
}

/* ========== 输出函数（不变） ========== */

export function treeToSass(tree: CssTree): string {
  const lines: string[] = [];

  function traverse(node: CssNode, depth: number) {
    if (node.type === 'rule' && node.selector && node.selector !== 'root') {
      lines.push('  '.repeat(depth - 1) + node.selector);
    }
    for (const child of node.children) {
      if (child.type === 'rule') {
        traverse(child, depth + 1);
      } else if (child.type === 'property') {
        lines.push('  '.repeat(depth) + child.property + ': ' + child.value);
      }
    }
  }

  traverse(tree.root, 0);
  return lines.join('\n');
}

export function treeToScss(tree: CssTree): string {
  const lines: string[] = [];

  function traverse(node: CssNode, depth: number) {
    if (node.type === 'rule' && node.selector && node.selector !== 'root') {
      lines.push('  '.repeat(depth - 1) + node.selector + ' {');
    }
    for (const child of node.children) {
      if (child.type === 'rule') {
        traverse(child, depth + 1);
      } else if (child.type === 'property') {
        lines.push('  '.repeat(depth) + child.property + ': ' + child.value + ';');
      }
    }
    if (node.type === 'rule' && node.selector && node.selector !== 'root') {
      lines.push('  '.repeat(depth - 1) + '}');
    }
  }

  traverse(tree.root, 0);
  return lines.join('\n');
}