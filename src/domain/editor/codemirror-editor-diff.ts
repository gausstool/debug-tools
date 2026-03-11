import {
  EditorView,
  crosshairCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { bracketMatching, foldKeymap } from '@codemirror/language';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { autocompletion, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { MergeView } from '@codemirror/merge';
import { getLanguageExtension } from './codemirror-lang';

export async function createDiffEditorState(
  originalValue: string,
  modifiedValue: string,
  language: string,
  { onchange } = {
    onchange: () => {},
  }
) {
  const languageExtension = await getLanguageExtension(language);
  const baseExtensions = [
    lineNumbers(),
    history(),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    crosshairCursor(),
    highlightActiveLine(),
    highlightActiveLineGutter(),
    highlightSelectionMatches(),
    languageExtension(),
    vscodeDark,
    keymap.of([
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...foldKeymap,
    ]),
    EditorView.lineWrapping,
    EditorView.updateListener.of(update => {
      if (update.docChanged) {
        onchange();
      }
    }),
  ];

  return {
    original: {
      doc: originalValue,
      extensions: baseExtensions,
    },
    modified: {
      doc: modifiedValue,
      extensions: baseExtensions,
    },
  };
}

export function createDiffEditorInstance(
  $container: HTMLElement,
  originalConfig: any,
  modifiedConfig: any
) {
  console.log(originalConfig, modifiedConfig);
  const mergeView = new MergeView({
    parent: $container,
    a: originalConfig,
    b: modifiedConfig,
    revertControls: "a-to-b"
  });
  return mergeView;
}

export function addCommandSaveDiff(mergeView: MergeView, callback: () => void) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      callback();
    }
  };
  mergeView.dom.addEventListener('keydown', handleKeyDown);
  return () => mergeView.dom.removeEventListener('keydown', handleKeyDown);
}
