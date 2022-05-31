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

interface Tag {
  text: string;
}

interface AppMessage {
  message: string;
  type: 'error' | 'success' | 'notification';
  timeout?: number; // miliseconds
}

interface AuthToken {
  email: string;
  token: string;
  expiredIn: Date;
}

type StringDigitOnly = `${number}`;
