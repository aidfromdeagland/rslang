import { WordService } from './wordServices';

export const wordServiceTest = async function wordServiceTest() {
    try {
        const userAggWords22 = await WordService.getUserAggWords(0, true, { difficulty: 'weak' });
        const userAggWords2 = await WordService.getUserAggWords(0, true, { 'userWord.difficulty': 'hard' });
        const userAggWords3 = await WordService.getUserAggWords(0, true, { difficulty: 'weak', 'optional.row': 2 });
        const userAggWords32 = await WordService.getUserAggWords(0, true, {
            $and: [
                {
                    $or: [
                        {
                            'userWord.difficulty': 'weak',
                        },
                        {
                            'userWord.difficulty': 'hard',
                        },
                    ],
                },
            ],
        });
        debugger;
    } catch (error) {
        const { message, status } = error;
        debugger;
    }

    try {
        const words = await WordService.getWords(0, 0);
        const pageSize = 133;
        const wordsPageCount = await WordService.getWordsPageCount(1, 30, pageSize);
        const wordsExt = await WordService.getWordsExt(1, wordsPageCount, 30, pageSize);
        const wordsMinTextExample = await WordService.getWordsExt(1, wordsPageCount, 5, 30);
        const userWords = await WordService.getUserWords();
        const userWord = await WordService.getUserWord(userWords[0].wordId);
        try {
            const userWord2 = await WordService.getUserWord(words[0].id);
        } catch (error) {
            if (error.status === 401) {
                // требуется заново авторизоваться. Время действия токена истекло
            } else if (error.status === 404) {
                // данное слово не найдено в словаре пользователя
            }
        }
        const newUserWord = words[6];
        const userWordDel2 = await WordService.deleteWord(newUserWord.id);
        const userWordPost = await WordService.postWord(newUserWord.id, WordService.createWordPost('weak', false, false));
        const userWordPut = await WordService.putWord(userWordPost.wordId, WordService.createWordPost('hard', userWordPost.optional.isDel, true));
        const userWordsNew = await WordService.getUserWords();
        const userAggWord = await WordService.getUserAggWord(userWordPut.wordId);
        debugger;
        const userWordDel = await WordService.deleteWord(userWordPut.wordId);
    } catch (error) {
        const { message, status } = error;
        debugger;
    }
};
