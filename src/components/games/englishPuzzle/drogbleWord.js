/* eslint-disable max-len */
import React, { Component } from 'react';
import './startPage.scss';
import './game-puzzle.scss';

export class DraggableWord extends Component {
    constructor(props) {
        super(props);
        this.dropIndex = 0;
    }

    componentDidMount() {
        const { isClickedDontKnow } = this.props;
        if (isClickedDontKnow) {
            return;
        }
        this.handleDrag();
    }

    handleDrag = () => {
        document.querySelectorAll('.drag-word').forEach((puzzle) => {
            puzzle.onmousedown = (event) => {
                const itemWidth = puzzle.getBoundingClientRect().width;
                const itemHeight = puzzle.getBoundingClientRect().height;

                const dragBlock = puzzle;

                const containerForPuzzles = document.querySelector('.puzzle-container-sentence');

                const shiftX = event.clientX - puzzle.getBoundingClientRect().left;
                const shiftY = event.clientY - puzzle.getBoundingClientRect().top;

                const startX = event.clientX + window.pageXOffset;
                const startY = event.clientY + window.pageYOffset;

                const clone = puzzle.cloneNode();
                clone.style.background = '';

                clone.className = 'clone';
                clone.style.width = `${itemWidth}px`;
                clone.style.height = `${itemHeight}px`;
                puzzle.replaceWith(clone);

                dragBlock.style.position = 'absolute';
                dragBlock.style.left = `${event.pageX - shiftX}px`;
                dragBlock.style.top = `${event.pageY - shiftY}px`;
                dragBlock.style.zIndex = 1000;
                dragBlock.style.boxShadow = '0 3px 0.5rem #d9d9d9';
                document.body.append(puzzle);

                function moveAt(pageX, pageY) {
                    dragBlock.style.left = `${pageX - shiftX}px`;
                    dragBlock.style.top = `${pageY - shiftY}px`;
                }

                let currentWord = null;

                function onMouseMove(event) {
                    moveAt(event.pageX, event.pageY);

                    dragBlock.hidden = true;
                    const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                    dragBlock.hidden = false;

                    if (!elemBelow) { return; }

                    const droppablePazzle = elemBelow.closest('.drag-word');
                    const droppableClone = elemBelow.closest('.clone');

                    if (currentWord !== droppablePazzle || currentWord !== droppableClone) {
                        if (droppableClone) {
                            return;
                        }

                        if (droppablePazzle && currentWord === droppablePazzle && droppablePazzle.nextElementSibling && droppablePazzle.nextElementSibling.classList.contains('clone')) {
                            if (event.pageX >= droppablePazzle.getBoundingClientRect().left && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width / 2) {
                                clone.remove();
                                droppablePazzle.before(clone);
                            }
                            return;
                        }

                        if (droppablePazzle && currentWord === droppablePazzle && droppablePazzle.previousElementSibling && droppablePazzle.previousElementSibling.classList.contains('clone')) {
                            if (event.pageX >= droppablePazzle.getBoundingClientRect().left + (droppablePazzle.getBoundingClientRect().width / 2) && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width) {
                                clone.remove();
                                droppablePazzle.after(clone);
                            }
                            return;
                        }

                        if (currentWord) {
                            if (droppableClone) {
                                return;
                            }
                            clone.remove();
                            currentWord = null;
                            return;
                        }

                        currentWord = droppablePazzle;

                        if (currentWord) {
                            if (event.pageX >= droppablePazzle.getBoundingClientRect().left && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width / 2) {
                                droppablePazzle.before(clone);
                            }

                            if (event.pageX >= droppablePazzle.getBoundingClientRect().left + (droppablePazzle.getBoundingClientRect().width / 2) && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width) {
                                droppablePazzle.after(clone);
                            }
                        }
                    }
                }

                document.addEventListener('mousemove', onMouseMove);

                dragBlock.onmouseup = (event) => {
                    document.querySelectorAll('.completed').forEach((word) => {
                        word.classList.remove('correct-word');
                        word.classList.remove('un-correct-word');
                    });
                    if (event.pageX === startX && event.pageY === startY) {
                        containerForPuzzles.append(puzzle);
                        puzzle.classList.add('completed');
                        document.querySelector('.clone').outerHTML = '';
                        dragBlock.style.position = 'static';
                        dragBlock.style.boxShadow = '';
                    } else if (document.querySelector('.clone') && event.pageX >= document.querySelector('.clone').getBoundingClientRect().left && event.pageX <= document.querySelector('.clone').getBoundingClientRect().left + document.querySelector('.clone').getBoundingClientRect().width && event.pageY >= document.querySelector('.clone').getBoundingClientRect().top + window.pageYOffset && event.pageY <= document.querySelector('.clone').getBoundingClientRect().top + window.pageYOffset + document.querySelector('.clone').getBoundingClientRect().height) {
                        dragBlock.style.position = 'static';
                        clone.replaceWith(puzzle);
                        puzzle.classList.add('completed');
                        dragBlock.style.boxShadow = '';
                    } else if (event.pageX >= containerForPuzzles.getBoundingClientRect().left && event.pageX <= containerForPuzzles.getBoundingClientRect().left + containerForPuzzles.getBoundingClientRect().width && event.pageY >= containerForPuzzles.getBoundingClientRect().top && event.pageY <= containerForPuzzles.getBoundingClientRect().top + window.pageYOffset + containerForPuzzles.getBoundingClientRect().height) {
                        dragBlock.style.position = 'static';
                        dragBlock.style.boxShadow = '';
                        if (Array.from(containerForPuzzles.children).includes(clone)) {
                            clone.replaceWith(puzzle);
                        } else {
                            containerForPuzzles.append(puzzle);
                            if (clone) {
                                clone.remove();
                            }
                        }
                        puzzle.classList.add('completed');
                    } else if (event.pageX >= document.querySelector('.puzzle-pieces').getBoundingClientRect().left && event.pageX <= document.querySelector('.puzzle-pieces').getBoundingClientRect().left + document.querySelector('.puzzle-pieces').getBoundingClientRect().width && event.pageY >= document.querySelector('.puzzle-pieces').getBoundingClientRect().top && event.pageY <= document.querySelector('.puzzle-pieces').getBoundingClientRect().top + window.pageYOffset + document.querySelector('.puzzle-pieces').getBoundingClientRect().height) {
                        dragBlock.style.position = 'static';
                        dragBlock.style.boxShadow = '';
                        if (Array.from(document.querySelector('.puzzle-pieces').children).includes(clone)) {
                            clone.replaceWith(puzzle);
                        } else {
                            document.querySelector('.puzzle-pieces').append(puzzle);
                            if (clone) {
                                clone.remove();
                            }
                        }
                        puzzle.classList.add('completed');
                    } else {
                        if (document.querySelector('.clone')) {
                            clone.replaceWith(puzzle);
                        } else {
                            document.querySelector('.puzzle-pieces').append(puzzle);
                        }
                        dragBlock.style.position = 'static';
                        dragBlock.style.boxShadow = '';
                    }
                    document.removeEventListener('mousemove', onMouseMove);
                    dragBlock.onmouseup = null;
                    this.checkSentence();
                };
            };
        });
    }

    checkSentence = () => {
        const { showButton } = this.props;
        const puzzleField = document.querySelector('.puzzle-pieces');
        if (!puzzleField.innerHTML) {
            showButton('isCheckBtn', true);
            showButton('isDontKnowBtn', false);
        } else {
            showButton('isCheckBtn', false);
        }
    }

    render() {
        const { word } = this.props;
        return (
            <div className="drag-word"><span className="word-text">{word}</span></div>
        );
    }
}
