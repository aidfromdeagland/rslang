const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const POWER_INDEX_GOOD = 1.4;
const POWER_INDEX_EASY = 1.6;

export const getMemoInfo = (difficulty, prevRepetitions) => {
    const currentDateStamp = Date.now();
    const result = {
        repetitions: prevRepetitions ? prevRepetitions + 1 : 1,
        prevRepetitionDate: currentDateStamp,
        nextRepetitionDate: currentDateStamp,
    };

    switch (difficulty) {
    case 2: {
        result.nextRepetitionDate = currentDateStamp + MILLISECONDS_PER_DAY;
        break;
    }
    case 1: {
        result.nextRepetitionDate = currentDateStamp
            + MILLISECONDS_PER_DAY * Math.ceil(result.repetitions ** POWER_INDEX_GOOD);
        break;
    }
    case 0: {
        result.nextRepetitionDate = currentDateStamp
            + MILLISECONDS_PER_DAY * Math.ceil(
                result.repetitions ** POWER_INDEX_EASY + result.repetitions,
            );
        break;
    }
    default: result.nextRepetitionDate = currentDateStamp;
    }

    return result;
};
