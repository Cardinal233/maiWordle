// 比对谱师字段
function compareCharter(guessCharter, answerCharter, charterAliasMap) {
    if (guessCharter === answerCharter) return 'correct'

    // 取出编号数组（若无则认为是空）
    const guessIds = charterAliasMap[guessCharter];
    const answerIds = charterAliasMap[answerCharter];

    if (!Array.isArray(guessIds) || !Array.isArray(answerIds)) {
        return 'wrong';
    }

    // 检查是否有交集（部分匹配）
    for (let i = 0; i < guessIds.length; i++) {
        if (answerIds.includes(guessIds[i])) {
            return 'close';
        }
    }
    return 'wrong';
}

const seriesOrder = [
    'maimai',
    'maimai PLUS',
    'maimai GreeN',
    'maimai GreeN PLUS',
    'maimai ORANGE',
    'maimai ORANGE PLUS',
    'maimai PiNK',
    'maimai PiNK PLUS',
    'maimai MURASAKi',
    'maimai MURASAKi PLUS',
    'maimai MiLK',
    'maimai MiLK PLUS',
    'maimai FiNALE',
    'maimai DX',
    'maimai DX PLUS',
    'maimai DX Splash',
    'maimai DX Splash PLUS',
    'maimai DX UNiVERSE',
    'maimai DX UNiVERSE PLUS',
    'maimai DX FESTiVAL',
    'maimai DX FESTiVAL PLUS',
    'maimai DX BUDDiES'
  ]

  function getDirection(diff) {
    if (diff === 0) {
        return 'none';
    } else if (diff > 0) {
        return 'up';
    } else {
        return 'down';
    }
}

export function judgeGuess(guess, answer, charterAliasMap) {
    const result = {};

    // 定数判断
    const dsDiff = answer.ds - guess.ds;
    if (Math.abs(dsDiff) === 0) {
        result.ds = 'correct';
    } else if (Math.abs(dsDiff) <= 0.3) {
        result.ds = 'close';
    } else {
        result.ds = 'wrong';
    }
    result.dsDirection = getDirection(dsDiff);

    // BPM判断
    const bpmDiff = answer.bpm - guess.bpm;
    if (Math.abs(bpmDiff) === 0) {
        result.bpm = 'correct';
    } else if (Math.abs(bpmDiff) <= 10) {
        result.bpm = 'close';
    } else {
        result.bpm = 'wrong';
    }
    result.bpmDirection = getDirection(bpmDiff);

    const guessFromIndex = seriesOrder.indexOf(guess.from)
    const answerFromIndex = seriesOrder.indexOf(answer.from)
    const fromDiff = answerFromIndex - guessFromIndex
    if (Math.abs(fromDiff) === 0) {
        result.from = 'correct';
    } else if (Math.abs(fromDiff) <= 2) {
        result.from = 'close';
    } else {
        result.from = 'wrong';
    }
    result.fromDirection = getDirection(fromDiff);

    //谱师判断
    result.charter = compareCharter(guess.charter, answer.charter, charterAliasMap)

    //其他类目判断
    const fields = ['genre', 'level', 'title'];
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (guess[field] === answer[field]) {
            result[field] = 'correct';
        } else {
            result[field] = 'wrong';
        }
    }

    return result;
}