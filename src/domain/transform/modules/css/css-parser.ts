export interface CssNode {
  type: 'rule' | 'property';
  selector?: string;
  property?: string;
  children: CssNode[];
  parent?: CssNode;
}

export interface CssTree {
  root: CssNode;
}

function createNode(type: 'rule' | 'property', selector?: string, property?: string): CssNode {
  return {
    type,
    selector,
    property,
    children: [],
  };
}

function splitSelector(selector: string): string[] {
  return selector.split(/\s+/).filter(part => part.trim() !== '');
}

function findRuleBySelector(root: CssNode, selector: string): CssNode | null {
  function search(node: CssNode): CssNode | null {
    if (node.type === 'rule' && node.selector === selector) {
      return node;
    }
    for (const child of node.children) {
      const found = search(child);
      if (found) return found;
    }
    return null;
  }
  return search(root);
}

function getParentSelector(selector: string): string | null {
  const parts = splitSelector(selector);
  if (parts.length <= 1) return null;
  return parts.slice(0, -1).join(' ');
}

export function parseCssToTree(input: string): CssTree {
  const root = createNode('rule', '');
  const lines = input.split('\n');

  let lastRule: CssNode | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.includes('{')) {
      const selector = trimmed.split('{')[0].trim();
      const parentSelector = getParentSelector(selector);

      if (parentSelector) {
        const parentRule = findRuleBySelector(root, parentSelector);
        if (parentRule) {
          const existingChild = findRuleBySelector(parentRule, selector);
          if (existingChild) {
            lastRule = existingChild;
          } else {
            const newNode = createNode('rule', selector);
            newNode.parent = parentRule;
            parentRule.children.push(newNode);
            lastRule = newNode;
          }
          continue;
        }
      }

      const existingNode = findRuleBySelector(root, selector);
      if (existingNode) {
        lastRule = existingNode;
      } else {
        const newNode = createNode('rule', selector);
        newNode.parent = root;
        root.children.push(newNode);
        lastRule = newNode;
      }
    } else if (trimmed.includes('}')) {
      lastRule = lastRule?.parent || null;
    } else {
      const property = trimmed.replace(/;$/, '').trim();
      if (property) {
        const parent = lastRule || root;
        const propNode = createNode('property', undefined, property);
        propNode.parent = parent;
        parent.children.push(propNode);
      }
    }
  }

  return { root };
}

export function treeToSass(tree: CssTree): string {
  const lines: string[] = [];

  function traverse(node: CssNode, depth: number) {
    for (const child of node.children) {
      if (child.type === 'rule') {
        lines.push('  '.repeat(depth) + (child.selector || ''));
        traverse(child, depth + 1);
      } else if (child.type === 'property') {
        lines.push('  '.repeat(depth) + (child.property || ''));
      }
    }
  }

  traverse(tree.root, 0);
  return lines.join('\n');
}

export function treeToScss(tree: CssTree): string {
  const lines: string[] = [];

  function traverse(node: CssNode, depth: number) {
    for (const child of node.children) {
      if (child.type === 'rule') {
        lines.push('  '.repeat(depth) + (child.selector || '') + ' {');
        traverse(child, depth + 1);
        lines.push('  '.repeat(depth) + '}');
      } else if (child.type === 'property') {
        lines.push('  '.repeat(depth) + (child.property || '') + ';');
      }
    }
  }

  traverse(tree.root, 0);
  return lines.join('\n');
}