import React, { Component } from 'react';
import './description.scss';

export class Description extends Component {
    render() {
        return (
            <section className="promo__description app-description">
                <div className="content-container">
                    <h2 className="app-description__heading">
                        Минутка русского языка на
                        {' '}
                        <span className="brand">iKnow</span>
                        {' '}
                    </h2>
                    <div className="app-description__text-container">
                        <p className="app-description__text">
                            Больше слов – больше пользы. С этим приложением вы прокачаете свой вокобуляр  для твиттер баталий с такими мастодонтами площадки, как Дональд Трамп и Илон Маск.
                        </p>
                        <p className="app-description__text">
                            Специально для
                            {' '}
                            <span className="brand">iKnow</span>
                            {' '}
                            мы изрядно потрудились, дабы предоставить вам совершенный алгоритм, который сделает процесс обучения суперэффективным.
                        </p>
                        <p className="app-description__text">
                            Из четырех недель разработки данного приложения три было потрачено на обучение нейронки для определения оптимального алгоритма повторений.
                            Понимая важность поставленной задачи, были привлечены мощнейшие суперкомпьютеры, начиная от Sierra, Summit и Sunway TaihuLight,
                            квантового суперкомпьютера SamyyUmniy из Демократической Республики Конго,
                            и заканчивая эксперементальным Eternal Sunshine of the Spotless Communism из Северной Кореи.
                            {' '}
                        </p>
                        <p className="app-description__text">
                            Курс биткоина с 15 июня по 5 потерял 400$ (-5%) - так рынок криптовалют отреагировал на новость о том, что 60% всех криптоферм Китая отдают свои вычислительные мощности под наш проект.
                            Совокупная вычислительная мощность, привлеченная в проект,  составила 947 петафлопс.
                            {' '}
                        </p>
                        <p className="app-description__text">
                            С помощью данного алгоритма за оставшуюся неделю наша команда выучила Javascript и основы React.
                            С 97% уверенностью мы можем сказать, что данный алгоритм – вершина человеческой (нейросетевой?) мысли.
                            {' '}
                        </p>
                    </div>
                    <div className="app-description__text-container">
                        <p className="app-description__text">
                            Логика такая:  дата следующего повторения рассчитывается исходя из индивидуальной сложности слова для пользователя и количества предыдущих повторений. В случае, если слово встречается впервые, следующий раз оно может встретиться уже через час.
                        </p>
                        <p className="app-description__text">
                            Если пользователь оценил слово как “hard”, следующий раз оно может встретиться уже через день.
                        </p>
                        <p className="app-description__text">
                            Если пользователь оценил слово как “normal”, дата следующего повторения рассчитывается по формуле:
                        </p>
                        <p className="app-description__text">
                            <span className="app-description__text_code app-description__text_centered">NEXT_DATE  = CURRENT_DATE + DAY_LENGTH * Math.ceil(REPEATS ** POWER_INDEX_GOOD)</span>
                        </p>
                        <p className="app-description__text">
                            <span className="app-description__text_code">NEXT_DATE</span>
                            {' '}
                            – дата следующего повторения;
                        </p>
                        <p className="app-description__text">
                            <span className="app-description__text_code">DAY_LENGTH</span>
                            {' '}
                            – продолжительность суток;
                        </p>
                        <p className="app-description__text">
                            <span className="app-description__text_code">REPEATS</span>
                            {' '}
                            – количество повторений слова, включая текущее повторение;
                        </p>
                        <p className="app-description__text">
                            <span className="app-description__text_code">POWER_INDEX_GOOD</span>
                            {' '}
                            = 1,4 – показатель степени для слов «нормальной» сложности.
                        </p>

                        <p className="app-description__text">Если пользователь оценил слово как “easy”,  дата следующего повторения рассчитывается по аналогичной формуле с заменой показателя степени на 1.6 и прибавлением количества повторений:</p>
                        <p className="app-description__text app-description__text_centered"><span className="app-description__text_code">NEXT_DATE  = CURRENT_DATE + DAY_LENGTH * Math.ceil(REPEATS ** POWER_INDEX_EASY + REPEATS)</span></p>
                        <p className="app-description__text">
                            <span className="app-description__text_code">POWER_INDEX_EASY</span>
                            {' '}
                            = 1,6 – показатель степени для слов «легкой» сложности.
                        </p>

                        <p className="app-description__text">
                            Так же на
                            {' '}
                            <span className="app-description__text_code">NEXT_DATE</span>
                            {' '}
                            установлен лимит – не далее, чем через 90 дней с текущей даты.
                        </p>

                        <p className="app-description__text">В режиме тренировки в качестве изученных могут встретиться слова с датой, входящей в интервал текущих суток, либо ранее.</p>

                        <p className="app-description__text">Так как в контексте мини-игр сценарий выигрыша не всегда коррелирует со знанием конкретного слова (например, English puzzle больше про грамматику, а Speak it не позволяет привязать неверную попытку к какому-то определенному слову), у пользователя нет возможности оценить, насколько ответ был слождным, и так как игры могут использовать пользовательские слова независимо от основного приложения (можно играть со словами, которые запланированы не только на сегодня и ранее), используется упрощенная версия алгоритма.</p>
                        <p className="app-description__text app-description__text_centered">
                            <span className="app-description__text_code">
                                NEXT_DATE = IS_CORRECT
                                {' '}
                                <br />
                                ? DATE_CHECKPOINT + DAY_LENGTH * Math.ceil(REPEATS ** POWER_INDEX_GOOD)
                                <br />
                                : CURRENT_DATE;
                            </span>
                        </p>
                        <p className="app-description__text">
                            <span className="app-description__text_code">IS_CORRECT</span>
                            {' '}
                            - флаг, правильный ли был дан ответ;
                        </p>
                        <p className="app-description__text">
                            <span className="app-description__text_code">DATE_CHECKPOINT</span>
                            {' '}
                            - дата (если до текущей попытки дата следующей тренировки была в будущем относительно текущей даты, то сохраняем дату будущей тренировки, если дата из прошлого - ставим текущую дату);
                        </p>
                        <p className="app-description__text">
                            <span className="app-description__text_code">CURRENT_DATE</span>
                            {' '}
                            - текущая дата.
                        </p>

                    </div>
                </div>
            </section>
        );
    }
}
