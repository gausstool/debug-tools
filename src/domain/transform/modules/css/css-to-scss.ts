import { parseCssToTree, treeToScss } from './css-parser';

export async function cssToScss(input: string): Promise<string> {
  const tree = parseCssToTree(input);
  return treeToScss(tree);
}