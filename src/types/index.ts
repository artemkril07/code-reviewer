export interface CodeInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: () => void;
  className?: string; 
}
