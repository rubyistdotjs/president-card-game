import uuid from 'uuid/v4';

export function withId<T extends object>(obj: T): T & { id: string } {
  return { id: uuid(), ...obj };
}

export function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
