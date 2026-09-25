import { useEffect, useRef, type FC } from "react";
import { EditorView, basicSetup } from "codemirror";
import { Compartment } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";

export interface EditorProps {
  className?: string;
  onChange: (value: string) => void;
  value: string;
  language: string;
}
// Створення компартментну для динамічного налаштування обєкту CodeEditor
const langCompartment = new Compartment();
// Створення масиву функцій
const languagesArray = {
  javascript: javascript,
  python: python,
  css: css,
  html: html,
};

export const CodeEditor: FC<EditorProps> = ({
  className,
  onChange,
  value,
  language,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  // Щоб мати доступ окремо до редактора
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    // Якщо HTML не загрузився то нічого не роби, оскльіки хук може раніше спрацювати і тоді div буде пустим, що зламає додаток
    if (!editorRef.current) return;
    // Ініціалізація обирання мови для редактора, в хуці при першому монтуванні, щоб при загрузці була перша мова, яка прописана в іншому компоненті.
    const getLangExtFn =
      languagesArray[language as keyof typeof languagesArray];
    // Цей рядок довзоляє зберегти у змінну готове розширення для CodeMirror
    const initLangExt =
      typeof getLangExtFn === "function" ? getLangExtFn() : javascript();
    const myEditor = new EditorView({
      doc: value,
      extensions: [
        basicSetup,
        langCompartment.of(initLangExt),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
      ],
      parent: editorRef.current,
    });

    viewRef.current = myEditor;
    return () => {
      myEditor.destroy();
    };
  }, []);

  useEffect(() => {
    if (!viewRef.current) return;
    const currentValue = viewRef.current.state.doc.toString();
    if (value === "" && currentValue !== "") {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: currentValue.length,
          insert: "",
        },
      });
    }
  }, [value]);

  useEffect(() => {
    if (!viewRef.current) return;
    // Дістає посилання на функцію-будівельник мови з об’єкта languagesArray за назвою мови language.
    const getLangExtFn =
      languagesArray[language as keyof typeof languagesArray];
    if (typeof getLangExtFn === "function") {
      const newLangExt = getLangExtFn();
      viewRef.current.dispatch({
        effects: [langCompartment.reconfigure(newLangExt)],
      });
    }
  }, [language]);

  return (
    <div className={className}>
      <div ref={editorRef}></div>
    </div>
  );
};
