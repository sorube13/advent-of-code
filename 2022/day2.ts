import { readFileInput } from '../tools-ts';

const inputFile:string = require('path').resolve(__dirname, './inputs/day2.txt');
let input: string[] = readFileInput(inputFile);

const OPPONENT = {
  ROCK: { value: 'A', score: 1 },
  PAPER: { value: 'B', score: 2 },
  SCISSORS: { value: 'C', score: 3 },
};
const PLAYER = {
  ROCK: { value: 'X', score: 1 },
  PAPER: { value: 'Y', score: 2 },
  SCISSORS: { value: 'Z', score: 3 },
};

const RESULT = {
  WIN: { value: 'Z', score: 6 },
  LOOSE: { value: 'X', score: 0 },
  DRAW: { value: 'Y', score: 3 },
};

class Match {
  opponent: string;
  player: string | null;
  score: number | undefined;
  result: number | undefined;

  constructor(opponent: string, player: string|null, result: string|null) {
    this.opponent = opponent;
    this.player = player;
    if (result) {
      // @ts-ignore
      this.result = Object.values(RESULT).find((r) => r.value == result).score;
    }
  }

  play() {
    if (!this.checkValidOptions()) {
      return;
    }
    if (this.player && !this.result) {
      this.playWithPlayers();
    } else {
      this.playWithResult();
    }
    this.score = this.calculateScore();
  }

  playWithPlayers(): void {
    if (this.checkDraw()) {
      this.result = RESULT.DRAW.score;
      return;
    }
    switch (this.opponent) {
      case OPPONENT.ROCK.value:
        if (this.player == PLAYER.PAPER.value) {
          this.result = RESULT.WIN.score;
        } else if (this.player == PLAYER.SCISSORS.value) {
          this.result = RESULT.LOOSE.score;
        }
        break;
      case OPPONENT.PAPER.value:
        if (this.player == PLAYER.ROCK.value) {
          this.result = RESULT.LOOSE.score;
        } else if (this.player == PLAYER.SCISSORS.value) {
          this.result = RESULT.WIN.score;
        }
        break;
      case OPPONENT.SCISSORS.value:
        if (this.player == PLAYER.ROCK.value) {
          this.result = RESULT.WIN.score;
        } else if (this.player == PLAYER.PAPER.value) {
          this.result = RESULT.LOOSE.score;
        }
        break;
      default:
        break;
    }
  }

  playWithResult(): void {
    switch (this.opponent) {
      case OPPONENT.ROCK.value:
        if (this.result == RESULT.WIN.score) {
          this.player = PLAYER.PAPER.value;
        } else if (this.result == RESULT.DRAW.score) {
          this.player = PLAYER.ROCK.value;
        } else if (this.result == RESULT.LOOSE.score) {
          this.player = PLAYER.SCISSORS.value;
        }
        break;
      case OPPONENT.PAPER.value:
        if (this.result == RESULT.WIN.score) {
          this.player = PLAYER.SCISSORS.value;
        } else if (this.result == RESULT.DRAW.score) {
          this.player = PLAYER.PAPER.value;
        } else if (this.result == RESULT.LOOSE.score) {
          this.player = PLAYER.ROCK.value;
        }
        break;
      case OPPONENT.SCISSORS.value:
        if (this.result == RESULT.WIN.score) {
          this.player = PLAYER.ROCK.value;
        } else if (this.result == RESULT.DRAW.score) {
          this.player = PLAYER.SCISSORS.value;
        } else if (this.result == RESULT.LOOSE.score) {
          this.player = PLAYER.PAPER.value;
        }
        break;
      default:
        break;
    }
  }

  calculateScore(): number {
    // @ts-ignore
    return Object.values(PLAYER).find((v) => v.value == this.player).score + this.result;
  }

  checkDraw(): boolean {
    // @ts-ignore
    const player1 = Object.keys(OPPONENT).find((key) => OPPONENT[key].value === this.opponent);
    // @ts-ignore
    const player2 = Object.keys(PLAYER).find((key) => PLAYER[key].value === this.player);
    return player1 == player2;
  }

  checkValidOptions(): boolean {
    return this.checkValidOpponent() && this.checkValidPlayer();
  }

  checkValidOpponent(): boolean {
    if (this.opponent && Object.values(OPPONENT).find((p) => p.value == this.opponent) == null) {
      console.error('OPPONENT VALUE INVALID');
      return false;
    }
    return true;
  }
  checkValidPlayer(): boolean {
    if (this.player && Object.values(PLAYER).find((p) => p.value == this.player) == null) {
      console.error('PLAYER VALUE INVALID');
      return false;
    }
    return true;
  }
}

let totalScorePart1 = 0;
let totalScorePart2 = 0;
for (let i of input) {
  let m = i.split(' ');
  // Part 1
  let matchPart1 = new Match(m[0], m[1], null);
  matchPart1.play();
  // @ts-ignore
  totalScorePart1 += matchPart1.score;
  // Part 2
  let matchPart2 = new Match(m[0], null, m[1]);
  matchPart2.play();
  // @ts-ignore
  totalScorePart2 += matchPart2.score;
}
console.log('Total Score part 1 : ' + totalScorePart1);
console.log('Total Score part 2 : ' + totalScorePart2);
