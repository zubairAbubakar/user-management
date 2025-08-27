import { CheckCircle } from 'lucide-react';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 flex text-emerald-500 item-center gap-x-2 text-sm rounded-md">
      <CheckCircle className="h-4 w-4" />
      {message}
    </div>
  );
};
