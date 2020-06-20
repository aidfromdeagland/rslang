import React, { Component } from 'react';
import './auth.scss';
import { wordServiceTest } from '../../../services/wordServicesTest';

export class Auth extends Component {
    // static async test() {
    //     try {
    //         const words = await WordService.getWords(0, 0);
    //         const pageSize = 133;
    //         const wordsPageCount = await WordService.getWordsPageCount(1, 30, pageSize);
    //         const wordsExt = await WordService.getWordsExt(1, wordsPageCount, 30, pageSize);
    //         const wordsMinTextExample = await WordService.getWordsExt(1, wordsPageCount, 5, 30);
    //         const userWords = await WordService.getUserWords();
    //         const userWord = await WordService.getUserWord(userWords[0].wordId);
    //         try {
    //             const userWord2 = await WordService.getUserWord(words[0].id);
    //         } catch (error) {
    //             if (error.status === 401) {
    //                 // требуется заново авторизоваться. Время действия токена истекло
    //             } else if (error.status === 404) {
    //                 // данное слово не найдено в словаре пользователя
    //             }
    //         }
    //         const newUserWord = words[6];
    //         const userWordDel2 = await WordService.deleteWord(newUserWord.id);
    //         const userWordPost = await WordService.postWord(newUserWord.id, WordService.createWordPost('weak', false, false));
    //         const userWordPut = await WordService.putWord(userWordPost.wordId, WordService.createWordPost('hard', userWordPost.optional.isDel, true));
    //         const userWordsNew = await WordService.getUserWords();
    //         const userAggWords = await WordService.getUserAggWords(0);
    //         try {
    //             const userAggWords2 = await WordService.getUserAggWords(0, { difficulty: 'weak' });
    //             const userAggWords3 = await WordService.getUserAggWords(0, { difficulty: 'weak', 'optional.row': 2 });
    //         } catch (error) {
    //             // Не смог заставить работать с фильтрами. 500 ошибка
    //         }
    //         const userAggWord = await WordService.getUserAggWord(userWordPut.wordId);
    //         const userWordDel = await WordService.deleteWord(userWordPut.wordId);
    //         debugger;
    //     } catch (error) {
    //         const { message, status } = error;
    //         debugger;
    //     }
    // }

    constructor() {
        super();
        wordServiceTest();
    }

    render() {
        return (
            <div className="auth">
                <h1>Authentication</h1>
            </div>
        );
    }
}
