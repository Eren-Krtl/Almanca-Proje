"use client"

import type { Word } from '@/types/dictionary';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DictionaryCardProps {
  word: Word;
}

const articleColors = {
  der: 'border-blue-500/50',
  die: 'border-red-500/50',
  das: 'border-green-500/50',
};

const articleTextColors = {
  der: 'text-blue-500',
  die: 'text-red-500',
  das: 'text-green-500',
};

export function DictionaryCard({ word }: DictionaryCardProps) {
  return (
    <Card className={cn(
      "bg-card text-card-foreground h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-xl border-2",
      articleColors[word.art]
    )}>
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div>
            <CardTitle className="text-2xl font-bold font-headline">{word.name}</CardTitle>
            <CardDescription className="text-lg text-primary font-semibold">
              <span className={cn("font-bold", articleTextColors[word.art])}>{word.art}</span> {word.translated_name}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-card-foreground/80">{word.description}</p>
      </CardContent>
    </Card>
  );
}

    