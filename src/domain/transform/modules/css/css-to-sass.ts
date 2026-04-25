import { parseCssToTree, treeToSass } from './css-parser';

export async function cssToSass(input: string): Promise<string> {
  const tree = parseCssToTree(input);
  return treeToSass(tree);
}