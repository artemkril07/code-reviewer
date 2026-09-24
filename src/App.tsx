import { CodeInput } from "./components/CodeInput";
import { ContactsComponent } from "./components/ContactsComponent";
import { FeedbackComponent } from "./components/FeedbackComponent";
import { HeaderInput } from "./components/HeaderInput";
import { ToolsComponent } from "./components/ToolsComponent";

function App() {
  return (
    <>
      <HeaderInput />
      <ToolsComponent/>
      <CodeInput />
      <FeedbackComponent/>
      <ContactsComponent/>
    </>
  );
}

export default App;
