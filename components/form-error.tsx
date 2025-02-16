import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 flex text-destructive item-center gap-x-2 text-sm rounded-md">
      <AlertCircle className="h-4 w-4" />
      {message}
    </div>
  );
};
