export type Message = {
  from: 'user' | 'country';
  content: React.ReactNode;
};

export interface Question {
  id: string;
  text: string;
}
