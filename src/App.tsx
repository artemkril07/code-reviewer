import { CodeInput } from "./components/CodeInput";
import { ContactsComponent } from "./components/ContactsComponent";
import { FeedbackComponent } from "./components/FeedbackComponent";
import { HeaderInput } from "./components/HeaderInput";
import { ToolsComponent } from "./components/ToolsComponent";

function App() {
  return (
    <>
      <div className="min-h-0 h-full flex flex-col flex-1 w-full">
        <header className="mt-10 px-8 shrink-0">
            <HeaderInput />
        </header>
        <main className="flex flex-col px-8 h-full mt-10 min-h-0">
          <ToolsComponent />
          <CodeInput />
          <FeedbackComponent />
        </main>
        <ContactsComponent />
      </div>
    </>
  );
}

export default App;
