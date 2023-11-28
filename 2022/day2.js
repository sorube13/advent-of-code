"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_ts_1 = require("../tools-ts");
let input = (0, tools_ts_1.readFileInput)('./inputs/day2.txt');
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
    constructor(oponent, player, result) {
        this.oponent = oponent;
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
        }
        else {
            this.playWithResult();
        }
        this.score = this.calculateScore();
    }
    playWithPlayers() {
        if (this.checkDraw()) {
            this.result = RESULT.DRAW.score;
            return;
        }
        switch (this.oponent) {
            case OPONENT.ROCK.value:
                if (this.player == PLAYER.PAPER.value) {
                    this.result = RESULT.WIN.score;
                }
                else if (this.player == PLAYER.SCISSORS.value) {
                    this.result = RESULT.LOOSE.score;
                }
                break;
            case OPONENT.PAPER.value:
                if (this.player == PLAYER.ROCK.value) {
                    this.result = RESULT.LOOSE.score;
                }
                else if (this.player == PLAYER.SCISSORS.value) {
                    this.result = RESULT.WIN.score;
                }
                break;
            case OPONENT.SCISSORS.value:
                if (this.player == PLAYER.ROCK.value) {
                    this.result = RESULT.WIN.score;
                }
                else if (this.player == PLAYER.PAPER.value) {
                    this.result = RESULT.LOOSE.score;
                }
                break;
            default:
                break;
        }
    }
    playWithResult() {
        switch (this.oponent) {
            case OPONENT.ROCK.value:
                if (this.result == RESULT.WIN.score) {
                    this.player = PLAYER.PAPER.value;
                }
                else if (this.result == RESULT.DRAW.score) {
                    this.player = PLAYER.ROCK.value;
                }
                else if (this.result == RESULT.LOOSE.score) {
                    this.player = PLAYER.SCISSORS.value;
                }
                break;
            case OPONENT.PAPER.value:
                if (this.result == RESULT.WIN.score) {
                    this.player = PLAYER.SCISSORS.value;
                }
                else if (this.result == RESULT.DRAW.score) {
                    this.player = PLAYER.PAPER.value;
                }
                else if (this.result == RESULT.LOOSE.score) {
                    this.player = PLAYER.ROCK.value;
                }
                break;
            case OPONENT.SCISSORS.value:
                if (this.result == RESULT.WIN.score) {
                    this.player = PLAYER.ROCK.value;
                }
                else if (this.result == RESULT.DRAW.score) {
                    this.player = PLAYER.SCISSORS.value;
                }
                else if (this.result == RESULT.LOOSE.score) {
                    this.player = PLAYER.PAPER.value;
                }
                break;
            default:
                break;
        }
    }
    calculateScore() {
        // @ts-ignore
        return Object.values(PLAYER).find((v) => v.value == this.player).score + this.result;
    }
    checkDraw() {
        // @ts-ignore
        const player1 = Object.keys(OPONENT).find((key) => OPONENT[key].value === this.oponent);
        // @ts-ignore
        const player2 = Object.keys(PLAYER).find((key) => PLAYER[key].value === this.player);
        return player1 == player2;
    }
    checkValidOptions() {
        return this.checkValidOponent() && this.checkValidPlayer();
    }
    checkValidOponent() {
        if (this.oponent && Object.values(OPONENT).find((p) => p.value == this.oponent) == null) {
            console.error('OPONENT VALUE INVALID');
            return false;
        }
        return true;
    }
    checkValidPlayer() {
        if (this.player && Object.values(PLAYER).find((p) => p.value == this.player) == null) {
            console.error('PLAYER VALUE INVALID');
            return false;
        }
        return true;
    }
}
/*let totalScorePart1 = 0;
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
console.log('Total Score part 2 : ' + totalScorePart2);*/
