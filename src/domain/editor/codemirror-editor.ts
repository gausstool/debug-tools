import { EditorState } from '@codemirror/state';
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
import { getLanguageExtension } from './codemirror-lang';

export async function createEditorState(
  value: string,
  language: string,
  { onchange } = {
    onchange: () => {},
  }
) {
  const languageExtension = await getLanguageExtension(language);
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

