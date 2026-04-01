import {
    TEST_MODE
} from "../constants";


export const EXERCISE_HANDLERS = {
    multiple_choice: handleMultipleChoice,
    // matching_pairs: handleMatchingPairs,
    // pronunciation: handlePronunciation,
    arrangement: handleArrangement,
    fill_in_the_blank: handleFillBlank,
};

export const CURRENT_TEST_MODE = TEST_MODE.CORRECT;


export function handleExercise(exercise, index, mode = CURRENT_TEST_MODE) {
    const handler = EXERCISE_HANDLERS[exercise.exerciseType];

    if (!handler) {
        cy.log(`Unsupported exercise type: ${exercise.exerciseType}`);
        return;
    }

    handler(exercise, index, mode);
}


function handleMultipleChoice(exercise, index, mode) {
    cy.log(`Handle multiple_choice (${mode}): ${exercise.id}`);

    openPreviewByIndex(index, exercise);

    cy.get('body', { timeout: 15000 }).should('be.visible');

    if (mode === 'correct' && exercise.answer) {
        cy.contains('span', exercise.answer, { timeout: 10000 })
            .closest('div.cursor-pointer')
            .click();
    } else {
        const wrong = exercise.options[0] == exercise.answer ? exercise.options[1] : exercise.options[0]
        cy.contains('span', wrong, { timeout: 10000 })
            .closest('div.cursor-pointer')
            .click();
    }

    submitAndVerify(mode);
    closePreview();
}


function handleMatchingPairs(exercise, index) {
    cy.log(`Handle matching_pairs: ${exercise.id}`);

    openPreviewByIndex(index);
    // openPreviewByExercise(exercise);

    // match theo index (simple strategy)
    cy.get('[data-cy="matching-left"]').each(($left, i) => {
        cy.wrap($left).click();
        cy.get('[data-cy="matching-right"]').eq(i).click();
    });

    submitAndVerify();
    closePreview();
}


function handlePronunciation(exercise, index) {
    cy.log(`Handle pronunciation: ${exercise.id}`);

    openPreviewByIndex(index);
    // openPreviewByExercise(exercise);

    // Start recording
    cy.get('svg[viewBox="0 0 352 512"]')
        .closest('button')
        .click();

    // Stop recording
    cy.contains('Tap to stop', { timeout: 10000 })
        .prev('button')
        .click();

    submitAndVerify();
    closePreview();
}


function handleFillBlank(exercise, index, mode = CURRENT_TEST_MODE) {
    cy.log(`Handle fill_blank (${mode}): ${exercise.id}`);

    openPreviewByIndex(index, exercise);

    const answers = Array.isArray(exercise.answers) ? exercise.answers : [];

    cy.get('input.border-b-2', { timeout: 10000 })
        .each(($input, i) => {
            let value;

            if (mode === 'correct') {
                value = answers[i] || '';
            } else {
                value = 'WRONG_ANSWER';
            }

            cy.wrap($input)
                .clear()
                .type(value);
        });

    submitAndVerify(mode);
    closePreview();
}


// function openPreviewByIndex(index) {
//     cy.get('div.bg-white.flex.flex-col.rounded-2xl')
//         .eq(index)
//         .trigger('mouseover')
//         .within(() => {
//             cy.get('button.ant-btn-icon-only')
//                 .eq(1)
//                 .click();
//         });
// }


const EXERCISE_TYPE_TEXT_MAP = {
    arrangement: 'Arrangement',
    multiple_choice: 'Multiple choice',
    fill_in_the_blank: 'Fill in the blank'
};


function getExerciseCardByIndex(index, ex) {
    const number = index + 1;
    const typeText = EXERCISE_TYPE_TEXT_MAP[ex.exerciseType];

    if (!typeText) {
        throw new Error(`Unsupported exercise type: ${exType}`);
    }

    return cy
        .get('span.ant-typography.font-semibold')
        .filter((_, el) =>
            el.innerText.includes(`${number}`) &&
            el.innerText.includes(typeText)
        )
        .first()
        .closest('div.bg-white.flex.flex-col.rounded-2xl');
}


function openPreviewByIndex(index, ex) {
    // const previewIndex =
    //     PREVIEW_INDEX_BY_SUBTYPE[ex.mediaType];

    if (ex.mediaType == 'AUDIO' || ex.subType == 'SENTENCE') {
        getExerciseCardByIndex(index, ex)
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .within(() => {
                cy.get('svg[viewBox="0 0 512 512"]')
                    .closest('button.ant-btn-icon-only')
                    .eq(0)
                    .should('be.visible')
                    .click();
            });
    } else {
        getExerciseCardByIndex(index, ex)
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .within(() => {
                cy.get('svg[viewBox="0 0 512 512"]')
                    .closest('button.ant-btn-icon-only')
                    .eq(1)
                    .should('be.visible')
                    .click();
            });
    }

}


function handleArrangement(exercise, index, mode = CURRENT_TEST_MODE) {
    cy.log(`Handle arrangement: ${exercise.subType} - ${exercise.id}`);

    openPreviewByIndex(index, exercise);

    switch (exercise.subType) {
        case 'CHARACTER':
            handleArrangementCharacter(exercise, mode);
            break;

        case 'WORD':
            handleArrangementWord(exercise, mode);
            break;

        case 'SENTENCE':
            handleArrangementSentence(exercise, mode);
            break;

        default:
            throw new Error(`Unsupported arrangement subType: ${exercise.subType}`);
    }

    submitAndVerify(mode);
    closePreview();
}

function handleArrangementCharacter(exercise, mode) {
    if (!exercise.answer) {
        throw new Error('Missing exercise.answer');
    }

    const answerChars = exercise.answer.split(' ').filter(Boolean);
    const usedIndexes = new Set(); // lưu data-index đã click

    const finalChars =
        mode === 'correct'
            ? answerChars
            : answerChars.length >= 2
                ? [answerChars[1], answerChars[0], ...answerChars.slice(2)]
                : answerChars;

    finalChars.forEach((char, pos) => {
        cy.get('button.word')
            .filter(':visible')
            .then($buttons => {
                const target = [...$buttons].find(btn => {
                    const text = btn.innerText.trim();
                    const idx = btn.getAttribute('data-index');
                    return text === char && !usedIndexes.has(idx);
                });

                expect(
                    target,
                    `unused button for "${char}" at position ${pos} (${mode})`
                ).to.exist;

                const idx = target.getAttribute('data-index');
                usedIndexes.add(idx);

                cy.wrap(target).click();
            });
    });
}


function escapeRegExp(str) {
    return (str || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildWordRegex(word) {
    const clean = escapeRegExp(normalizeWord(word));
    return new RegExp(`^${clean}[?.!]?$`);
}


function handleArrangementWord(exercise, mode = 'correct') {
    if (!exercise.answer) {
        throw new Error('Missing exercise.answer');
    }

    const words = splitBySpace(exercise.answer);

    const finalWords =
        mode === 'correct'
            ? words
            : [...words].reverse();

    const usedIndexes = new Set();

    finalWords.forEach((rawWord, pos) => {
        const expectedText = rawWord.trim();
        const normalizedExpected = normalizeWord(expectedText);

        cy.get('button.word')
            .filter(':visible')
            .then($buttons => {
                const buttons = [...$buttons];

                let target = buttons.find(btn => {
                    const text = btn.innerText.trim();
                    const idx = btn.getAttribute('data-index');
                    return text === expectedText && !usedIndexes.has(idx);
                });

                if (!target) {
                    target = buttons.find(btn => {
                        const text = btn.innerText.trim();
                        const idx = btn.getAttribute('data-index');
                        return (
                            normalizeWord(text) === normalizedExpected &&
                            !usedIndexes.has(idx)
                        );
                    });
                }

                expect(
                    target,
                    `unused button for "${rawWord}" at position ${pos}`
                ).to.exist;

                usedIndexes.add(target.getAttribute('data-index'));
                cy.wrap(target).click();
            });
    });
}


function normalizeWord(word) {
    return (word || '').trim().replace(/[?.!]+$/, '');
}


export function handleArrangementSentence(exercise, mode) {

    if (!Array.isArray(exercise.answers) || !exercise.answers.length) {
        throw new Error('answers empty');
    }

    const answers =
        mode === 'correct'
            ? [...exercise.answers]
            : [...exercise.answers].reverse();

    const HANDLE_SELECTOR = 'div.word.cursor-grab';
    for (let i = answers.length - 1; i >= 0; i--) {
        const text = answers[i];
        cy.log(`Drag to top: ${text}`);
        cy.contains(HANDLE_SELECTOR, text)
            .should('be.visible')
            .then($handle => {
                cy.wrap($handle).realMouseDown({ button: 'left' })
                    .realMouseMove(0, -120).wait(500).realMouseMove(0, -120)
                    .wait(500).realMouseMove(0, -120).realMouseUp();
            }); cy.wait(300);
    }
}

function splitBySpace(text) {
    return text
        .split(' ')
        .map(t => t.trim())
        .filter(Boolean);
}


function closePreview() {
    cy.get('[aria-label="close"]', { timeout: 10000 })
        .closest('button')
        .click();
}

function submitAndVerify(mode = 'correct') {
    cy.contains('button', 'Submit', { timeout: 10000 }).click();

    if (mode === 'correct') {
        cy.contains(/Correct!|Great|Good job|Nice/i, { timeout: 10000 })
            .should('be.visible');
    } else {
        cy.contains(/Wrong|Try again|Incorrect/i, { timeout: 10000 })
            .should('be.visible');
    }
}
