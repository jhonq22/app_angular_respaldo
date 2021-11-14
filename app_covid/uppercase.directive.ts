class Case {
    upper: string;
    lower: string;
  
    constructor(upper, lower) {
      this.upper = upper;
      this.lower = lower;
    }
  }
  
  export class Transform {
    static exceptions = [
      new Case('ß', 'ß')
    ];
  
    static uppercase = (value: string): string => {
      const letters = value.split('');
      
      letters.forEach((letter, index) => {
        letters[index] = Transform.upperLetter(letter);
      });
        
      return letters.join('');
    }
  
    static lowercase = (value: string): string => {
      const letters = value.split('');
      
      letters.forEach((letter, index) => {
        letters[index] = Transform.lowerLetter(letter);
      });
  
      return letters.join('');
    }
  
    static capitalize = (value: string): string => {
      const words = value.split(' ');
  
      words.forEach((word, index) => {
        const lower = Transform.lowercase(word);
        words[index] = Transform.upperLetter(lower.substr(0, 1)) + lower.substr(1);
      });
  
      return words.join(' ');
    }
  
    static upperLetter = (lower: string): string => {
      const _case = Transform.exceptions.find(c => c.lower === lower);
      return _case ? _case.upper : lower.toUpperCase();
    }
    static lowerLetter = (upper: string): string => {
      const _case = Transform.exceptions.find(c => c.upper === upper);
      return _case ? _case.lower : upper.toLowerCase();
    }
  }