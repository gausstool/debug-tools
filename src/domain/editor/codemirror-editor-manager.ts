import { EditorView } from '@codemirror/view';
import { MergeView } from '@codemirror/merge';

type EditorInstance = EditorView | MergeView;

export class EditorManager {
  private static editorList: EditorInstance[] = [];
  public static addEditor(editor: EditorInstance) {
    this.editorList.push(editor);
  }
  public static dispose() {
    this.editorList.forEach(editor => {
      editor.destroy();
    });
    this.editorList = [];
  }
}
