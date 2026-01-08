import { promises as fs } from 'fs';
import path from 'path';
import type { Word } from '@/types/dictionary';
import DictionaryList from '@/components/dictionary/dictionary-list';

async function getWords(): Promise<Word[]> {
  try {
    const filePath = path.join(process.cwd(), 'dictionary', 'words.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const words = JSON.parse(fileContents);
    return words;
  } catch (error) {
    console.error('Error reading or parsing dictionary file:', error);
    // In a real app, you might want to show a proper error page.
    return []; // Return empty array on error to prevent crashing.
  }
}

export default async function Home() {
  const words = await getWords();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary tracking-tight">MebOTAK</h1>
          <p className="text-muted-foreground mt-2 text-lg">Meb Odaklı Türkçe Almanca Kütüphanesi</p>
        </header>
        <DictionaryList words={words} />
      </div>
    </main>
  );
}
