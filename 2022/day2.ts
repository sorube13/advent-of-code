import { readFileInput } from '../tools-ts';

let input: string[] = readFileInput('./inputs/day2.txt');

const OPONENT = {
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
  oponent: string;
  player: string;
  score: number;
  result: number;

  constructor(oponent: string, player: string, result: string) {
    this.oponent = oponent;
    this.player = player;
    if (result) {
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
    switch (this.oponent) {
      case OPONENT.ROCK.value:
        if (this.player == PLAYER.PAPER.value) {
          this.result = RESULT.WIN.score;
        } else if (this.player == PLAYER.SCISSORS.value) {
          this.result = RESULT.LOOSE.score;
        }
        break;
      case OPONENT.PAPER.value:
        if (this.player == PLAYER.ROCK.value) {
          this.result = RESULT.LOOSE.score;
        } else if (this.player == PLAYER.SCISSORS.value) {
          this.result = RESULT.WIN.score;
        }
        break;
      case OPONENT.SCISSORS.value:
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
    switch (this.oponent) {
      case OPONENT.ROCK.value:
        if (this.result == RESULT.WIN.score) {
          this.player = PLAYER.PAPER.value;
        } else if (this.result == RESULT.DRAW.score) {
          this.player = PLAYER.ROCK.value;
        } else if (this.result == RESULT.LOOSE.score) {
          this.player = PLAYER.SCISSORS.value;
        }
        break;
      case OPONENT.PAPER.value:
        if (this.result == RESULT.WIN.score) {
          this.player = PLAYER.SCISSORS.value;
        } else if (this.result == RESULT.DRAW.score) {
          this.player = PLAYER.PAPER.value;
        } else if (this.result == RESULT.LOOSE.score) {
          this.player = PLAYER.ROCK.value;
        }
        break;
      case OPONENT.SCISSORS.value:
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
    return Object.values(PLAYER).find((v) => v.value == this.player).score + this.result;
  }

  checkDraw(): boolean {
    const player1 = Object.keys(OPONENT).find((key) => OPONENT[key].value === this.oponent);
    const player2 = Object.keys(PLAYER).find((key) => PLAYER[key].value === this.player);
    return player1 == player2;
  }

  checkValidOptions(): boolean {
    return this.checkValidOponent() && this.checkValidPlayer();
  }

  checkValidOponent(): boolean {
    if (this.oponent && Object.values(OPONENT).find((p) => p.value == this.oponent) == null) {
      console.error('OPONENT VALUE INVALID');
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
  totalScorePart1 += matchPart1.score;
  // Part 2
  let matchPart2 = new Match(m[0], null, m[1]);
  matchPart2.play();
  totalScorePart2 += matchPart2.score;
}
console.log('Total Score part 1 : ' + totalScorePart1);
console.log('Total Score part 2 : ' + totalScorePart2);
