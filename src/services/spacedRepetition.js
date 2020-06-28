const millisecondsPerDay = 1000 * 60 * 60 * 24;
const powerIndexGood = 1.4;
const powerIndexEasy = 1.6;

export const getMemoInfo = (quality, prevRepetitions) => {
    const currentDateSTamp = Date.now();
    const result = {
        repetitions: prevRepetitions ? prevRepetitions + 1 : 1,
        prevRepetitionDate: currentDateSTamp,
        nextRepetitionDate: currentDateSTamp,
    };

    switch (quality) {
    case 1: {
        result.nextRepetitionDate = currentDateSTamp + millisecondsPerDay;
        break;
    }
    case 2: {
        result.nextRepetitionDate = currentDateSTamp
            + millisecondsPerDay * Math.ceil(result.repetitions ** powerIndexGood);
        break;
    }
    case 3: {
        result.nextRepetitionDate = currentDateSTamp
            + millisecondsPerDay * Math.ceil(
                result.repetitions ** powerIndexEasy + result.repetitions,
            );
        break;
    }
    default: result.nextRepetitionDate = currentDateSTamp;
    }

    return result;
};
