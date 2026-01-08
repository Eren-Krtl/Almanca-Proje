export type Article = 'der' | 'die' | 'das';

export interface Word {
  art: Article;
  name: string;
  translated_name: string;
  description: string;
}

    