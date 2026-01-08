"use client";

import { useState, useMemo } from 'react';
import type { Word } from '@/types/dictionary';
import { Input } from '@/components/ui/input';
import { DictionaryCard } from './dictionary-card';
import { Search } from 'lucide-react';

interface DictionaryListProps {
  words: Word[];
}

export default function DictionaryList({ words }: DictionaryListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWords = useMemo(() => {
    if (!searchTerm) {
      return words;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return words.filter(word =>
      word.name.toLowerCase().includes(lowercasedTerm) ||
      word.translated_name.toLowerCase().includes(lowercasedTerm) ||
      word.description.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, words]);

  return (
    <div>
      <div className="relative mb-8 max-w-lg mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Kelime ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 h-14 text-lg rounded-full border-2 bg-background focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          aria-label="Sözlükte ara"
        />
      </div>

      {words.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">Sözlük boş veya yüklenemedi.</p>
        </div>
      )}

      {words.length > 0 && filteredWords.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">"{searchTerm}" için eşleşen kelime bulunamadı.</p>
        </div>
      )}
      
      {filteredWords.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map((word, index) => (
            <DictionaryCard key={`${word.name}-${index}`} word={word} />
          ))}
        </div>
      )}
    </div>
  );
}
