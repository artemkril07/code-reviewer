import { useEffect, useRef, type FC } from "react";
import { EditorView, basicSetup } from "codemirror";
import {javascript} from "@codemirror/lang-javascript"

export interface EditorProps {
  className?: string,
  onChange: (value: string)=> void,
  value: string
}

export const CodeEditor: FC<EditorProps>= ({className, onChange, value}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Щоб мати доступ окремо до редактора
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if(!editorRef.current) return
    const myEditor = new EditorView({
      doc: value,
      extensions: [basicSetup, javascript(),
        EditorView.updateListener.of((update)=>{
          if(update.docChanged){
            onChange(update.state.doc.toString())
          }
        }),
      ],
      parent: editorRef.current,
    });
    viewRef.current = myEditor;
    return () => { myEditor.destroy() }
  }, []);

  useEffect(()=>{
    if (!viewRef.current) return
    const currentValue = viewRef.current.state.doc.toString();
    if(value === "" && currentValue !== ""){
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: currentValue.length,
          insert: ""
        }
      })
    }
  },[value])
  return (
    <div className={className}>
      <div  ref={editorRef} ></div>
    </div>
  );
};
