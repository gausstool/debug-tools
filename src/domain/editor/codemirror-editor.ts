import { EditorState } from '@codemirror/state';
import {
  crosshairCursor,
  EditorView,
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
// 语言映射
const languageMap: Record<string, () => Promise<any>> = {
  javascript: async () => (await import('@codemirror/lang-javascript')).javascript,
  json: async () => (await import('@codemirror/lang-json')).json,
  yaml: async () => (await import('@codemirror/lang-yaml')).yaml,
  sql: async () => (await import('@codemirror/lang-sql')).sql
};

export async function createEditorState(
  value: string,
  language: string,
  { onchange } = {
    onchange: () => {},
  }
) {
  const languageLoader = languageMap[language] || languageMap['javascript'];
  console.log('createEditorState', language, languageLoader);
  const languageExtension = await languageLoader();
  return EditorState.create({
    doc: value,
    extensions: [
      // A line number gutter
      lineNumbers(),
      // The undo history
      history(),
      // Highlight matching brackets near cursor
      bracketMatching(),
      // Automatically close brackets
      closeBrackets(),
      // Load the autocompletion system
      autocompletion(),
      // Change the cursor to a crosshair when holding alt
      crosshairCursor(),
      // Style the current line specially
      highlightActiveLine(),
      // Style the gutter for current line specially
      highlightActiveLineGutter(),
      // Highlight text that matches the selected text
      highlightSelectionMatches(),
      // language extension
      languageExtension(),
      vscodeDark,
      keymap.of([
        // Closed-brackets aware backspace
        ...closeBracketsKeymap,
        // A large set of basic bindings
        ...defaultKeymap,
        // Search-related keys
        ...searchKeymap,
        // Redo/undo keys
        ...historyKeymap,
        // Code folding bindings
        ...foldKeymap,
      ]),
      EditorView.lineWrapping,
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          onchange();
        }
      }),
    ],
  });
}

export function createEditorInstance(
  $container: HTMLElement,
  state: EditorState,
  options?: {
    readOnly?: boolean;
  }
) {
  const view = new EditorView({
    state,
    parent: $container,
    ...options,
  });
  return view;
}

export function addCommandSave(editor: EditorView, callback: () => void) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      callback();
    }
  };
  editor.dom.addEventListener('keydown', handleKeyDown);
  return () => editor.dom.removeEventListener('keydown', handleKeyDown);
}

export async function createDiffEditorState(
  originalValue: string,
  modifiedValue: string,
  language: string,
  { onchange } = {
    onchange: () => {},
  }
) {
  const languageLoader = languageMap[language] || languageMap['javascript'];
  const languageExtension = await languageLoader();
  
  const originalExtensions = [
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

  const modifiedExtensions = [
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
      extensions: originalExtensions,
    },
    modified: {
      doc: modifiedValue,
      extensions: modifiedExtensions,
    },
  };
}

export function createDiffEditorInstance(
  $container: HTMLElement,
  originalConfig: any,
  modifiedConfig: any
) {
  const mergeView = new MergeView({
    parent: $container,
    a: originalConfig,
    b: modifiedConfig,
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
