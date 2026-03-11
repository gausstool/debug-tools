import { editor } from "monaco-editor/esm/vs/editor/editor.api";

export class EditorManager {
  private static editorList: editor.IStandaloneCodeEditor[] = [];
  public static addEditor(editor: editor.IStandaloneCodeEditor) {
    this.editorList.push(editor);
  }
  public static dispose() {
    this.editorList.forEach(editor => {
      try {
        editor.dispose();
      } catch (error) {
        console.error('Error disposing editor:', error);
      }
    });
    this.editorList = [];
  }
}
