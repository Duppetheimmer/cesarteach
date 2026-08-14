import React, { useState, useEffect } from 'react';
import { VocabWord } from '../types';
import { Sparkles, RefreshCw, Trophy, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { playSpeech } from '../utils/speech';

interface WordMatchingGameProps {
  words: VocabWord[];
  onCompleteGame: (xpEarned: number) => void;
  courseLanguage?: 'en' | 'es';
}

interface CardItem {
  id: string; // unique card id
  wordId: string;
  text: string;
  type: 'en' | 'es';
  isMatched: boolean;
}

export function WordMatchingGame({ words, onCompleteGame, courseLanguage }: WordMatchingGameProps) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const initGame = () => {
    // Pick 6 random words
    const shuffledWords = [...words].sort(() => 0.5 - Math.random()).slice(0, 6);
    
    const cardPairs: CardItem[] = [];
    shuffledWords.forEach((w, idx) => {
      cardPairs.push({
        id: `w1-${idx}-${w.id}`,
        wordId: w.id,
        text: w.word,
        type: 'en',
        isMatched: false,
      });
      cardPairs.push({
        id: `w2-${idx}-${w.id}`,
        wordId: w.id,
        text: w.translation,
        type: 'es',
        isMatched: false,
      });
    });

    // Shuffle cards
    setCards(cardPairs.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
    setMatchedCount(0);
    setMoves(0);
    setIsGameFinished(false);
  };

  useEffect(() => {
    initGame();
  }, [words]);

  const speakText = (text: string) => {
    playSpeech(text, { courseLanguage, rate: 0.9 });
  };

  const handleCardClick = (card: CardItem) => {
    if (card.isMatched || selectedCards.find(c => c.id === card.id) || selectedCards.length >= 2) {
      return;
    }

    speakText(card.text);

    const updatedSelected = [...selectedCards, card];
    setSelectedCards(updatedSelected);

    if (updatedSelected.length === 2) {
      setMoves(m => m + 1);

      const [first, second] = updatedSelected;
      if (first.wordId === second.wordId) {
        // Match found!
        setTimeout(() => {
          setCards(prev => prev.map(c => c.wordId === first.wordId ? { ...c, isMatched: true } : c));
          setSelectedCards([]);
          setMatchedCount(prev => {
            const newCount = prev + 1;
            if (newCount === 6) {
              setIsGameFinished(true);
              onCompleteGame(50);
            }
            return newCount;
          });
        }, 400);
      } else {
        // No match
        setTimeout(() => {
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black uppercase mb-1">
            <Zap className="w-3.5 h-3.5 fill-amber-500" /> Juego de Memoria Léxica
          </span>
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">Empareja Inglés - Español</h3>
        </div>
        <button
          onClick={initGame}
          className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-50 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-amber-600 transition-colors flex items-center gap-1 text-xs font-bold"
        >
          <RefreshCw className="w-4 h-4" /> Reiniciar
        </button>
      </div>

      <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <span>Parejas encontradas: {matchedCount} / 6</span>
        <span>Movimientos: {moves}</span>
      </div>

      {isGameFinished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 text-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/20 rounded-2xl border-2 border-amber-300 dark:border-amber-800 space-y-4"
        >
          <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-amber-950 dark:text-amber-200">¡Felicitaciones! Juego Completado</h4>
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 max-w-sm mx-auto">
            Resolviste el tablero en {moves} movimientos. Has ganado <strong className="text-amber-600">+50 XP</strong>.
          </p>
          <button
            onClick={initGame}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition-transform hover:scale-105"
          >
            Jugar de nuevo
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {cards.map(card => {
            const isSelected = selectedCards.some(c => c.id === card.id);
            const isMatched = card.isMatched;

            return (
              <motion.button
                key={card.id}
                whileTap={!isMatched ? { scale: 0.95 } : {}}
                onClick={() => handleCardClick(card)}
                disabled={isMatched}
                className={`p-4 rounded-2xl border-2 text-center font-bold text-sm min-h-[80px] flex items-center justify-center transition-all ${
                  isMatched
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 opacity-60 cursor-default'
                    : isSelected
                    ? 'border-amber-500 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 shadow-md ring-2 ring-amber-400'
                    : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 hover:border-amber-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200 shadow-sm'
                }`}
              >
                {card.type === 'en' ? (
                  <span className="font-black text-base">{card.text}</span>
                ) : (
                  <span className="font-semibold text-sm">{card.text}</span>
                )}
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}
