interface ComponentBaseProps {
  children?: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

interface BaseIconProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties | undefined;
}

interface Item {
  text: string;
}

interface Transaction {
  id: number;
  amount: number;
  date: Date;
  note?: string | null | undefined;
  updatedAt: Date;
  reason: Reason;
}

interface Reason {
  id: number;
  text: string;
  updatedAt: Date;
}

interface AppMessage {
  message: string;
  type: 'error' | 'success' | 'notification';
  timeout?: number; // miliseconds
}
