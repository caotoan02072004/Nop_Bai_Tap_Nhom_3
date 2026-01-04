import {
  expandTemplate,
} from '../support/utils';
import { handleExercise } from '../support/exercises';
import {
  TEMPLATE_KEY,
  MEDIA_TYPE,
  ARRANGEMENT_MEDIA_TYPE,
  MATCHING_PAIR_TYPE,
  DRAG_AND_DROP_MEDIA_TYPE,
  DROPDOWN_MEDIA_TYPE,
  MULTIPLE_CHOICE_MEDIA_TYPE,
  FILL_IN_THE_BLANK_MEDIA_TYPE,
} from "../constants";

describe('gen mission', () => {

  beforeEach(() => {
    cy.loginByApiSession();
  });

  it.skip("Teacher creates a mission and configures stages successfully", () => {

    cy.intercept("GET", "**/level**").as("getLevels");
    cy.intercept("GET", "**/grade**").as("getGrades");
    cy.intercept("GET", "**/grammar**").as("getGrammars");
    cy.intercept("GET", "**/topic-vocab**").as("getTopicVocabs");
    cy.intercept("POST", "**/create-unit**").as("createUnit");
    // cy.intercept("GET", "**/web/unit/**").as("getUnitDetail");
    cy.intercept("GET", "**/lesson/lessons-by-unit**").as("getLessonsByUnit");
    cy.intercept("POST", "**/lesson/create-lesson").as("createLesson");

    // cy.intercept("POST", "**/create-excercise-pronunciation").as(
    //   "createExcercisePronunciation"
    // );
    // cy.intercept("POST", "**/create-excercise-matching-pairs").as(
    //   "createExcerciseMatchingPairs"
    // );
    // cy.intercept("POST", "**/create-excercise-drag-and-drop").as(
    //   "createExcerciseDragAndDrop"
    // );
    // cy.intercept("POST", "**/create-excercise-dropdown").as(
    //   "createExcerciseDropdown"
    // );
    cy.intercept("POST", "**/create-excercise-multiple-choice").as(
      "createExcerciseMultipleChoice"
    );
    cy.intercept("POST", "**/create-excercise-fill-in-the-blank").as(
      "createExcerciseFillInTheBlank"
    );
    cy.intercept("POST", "**/create-excercise-arrangement").as(
      "createExcerciseArrangement"
    );

    // cy.visit(`/home`);

    cy.visit(`/teacher/mission/create`);

    cy.wait(500);

    cy.waitApiSuccess("@getLevels");
    cy.waitApiSuccess("@getGrades");

    // ===============================
    // Step 2: Select grade
    // ===============================
    cy.get('[data-cy="grade-select"]', { timeout: 5000 })
      .should("be.visible")
      .click();

    cy.selectAntdOption("K-1");

    cy.get('[data-cy="grade-select"]')
      .should("contain.text", "K-1");

    // ===============================
    // Step 3: Enter and apply topic
    // ===============================
    cy.fillInput('[data-cy="topic-input"]', "Animal");

    cy.waitApiSuccess("@getTopicVocabs");

    cy.get('[data-cy="apply-topic-button"]', { timeout: 5000 })
      .should("be.visible")
      .and("be.enabled")
      .click();

    // ===============================
    // Step 4: Enter and select grammar
    // ===============================
    cy.fillInput('[data-cy="grammar-input"]', "The cat is on the mat.");

    cy.waitApiSuccess("@getGrammars");

    cy.get('[data-cy="grammar-item"]', { timeout: 5000 })
      .should("have.length.greaterThan", 0)
      .first()
      .click();

    cy.get('[data-cy="apply-grammar-button"]')
      .should("be.visible")
      .and("be.enabled")
      .click();

    // ===============================
    // Step 5: Submit mission creation
    // ===============================
    cy.get('[data-cy="submit-button"]')
      .should("be.visible")
      .and("be.enabled")
      .click();

    // cy.waitApiSuccess("@createUnit");

    cy.wait("@createUnit").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);

      const unitId = interception.response.body.data.id;
      expect(unitId).to.exist;

      cy.wrap(unitId).as("unitId");
    });


    // ===============================
    // Step 6: Create stage
    // ===============================
    cy.waitApiSuccess("@getLessonsByUnit");
    // cy.waitApiSuccess("@getUnitDetail");

    // Wait for UI to be ready
    cy.get('[data-cy="create-stage-button"]', { timeout: 15000 })
      .should("exist")
      .should("be.visible")
      .and("not.be.disabled");

    // Click create stage button
    cy.get('[data-cy="create-stage-button"]').click();

    // Verify lesson creation
    cy.wait("@createLesson", { timeout: 15000 })
      .its("response.statusCode")
      .should("eq", 200);

    // ===============================
    // Step 7: Configure template types
    // ===============================

    // Pronunciation templates
    // cy.selectTemplateTypes(TEMPLATE_KEY.PRONUNCIATION, [
    //   { type: MEDIA_TYPE.AUDIO, qty: 1 },
    //   { type: MEDIA_TYPE.IMAGE, qty: 1 },
    // ]);

    // // Matching pairs templates
    // cy.selectTemplateTypes(TEMPLATE_KEY.MATCHING_PAIRS, [
    //   { type: MATCHING_PAIR_TYPE.TEXT_IMAGE, qty: 1 },
    //   { type: MATCHING_PAIR_TYPE.TEXT_AUDIO, qty: 1 },
    //   { type: MATCHING_PAIR_TYPE.AUDIO_IMAGE, qty: 1 },
    // ]);

    // // Drag and drop templates
    // cy.selectTemplateTypes(TEMPLATE_KEY.DRAG_AND_DROP, [
    //   { type: DRAG_AND_DROP_MEDIA_TYPE.AUDIO, qty: 1 },
    //   { type: DRAG_AND_DROP_MEDIA_TYPE.IMAGE, qty: 1 },
    // ]);

    // // Dropdown templates
    // cy.selectTemplateTypes(TEMPLATE_KEY.DROPDOWN, [
    //   { type: DROPDOWN_MEDIA_TYPE.AUDIO, qty: 1 },
    //   { type: DROPDOWN_MEDIA_TYPE.IMAGE, qty: 1 },
    // ]);

    // Multiple choice templates
    cy.selectTemplateTypes(TEMPLATE_KEY.MULTIPLE_CHOICE, [
      { type: MULTIPLE_CHOICE_MEDIA_TYPE.AUDIO, qty: 1 },
      { type: MULTIPLE_CHOICE_MEDIA_TYPE.IMAGE, qty: 1 },
    ]);

    // Fill in the blank templates
    cy.selectTemplateTypes(TEMPLATE_KEY.FILL_IN_THE_BLANK, [
      { type: FILL_IN_THE_BLANK_MEDIA_TYPE.AUDIO, qty: 1 },
      { type: FILL_IN_THE_BLANK_MEDIA_TYPE.IMAGE, qty: 1 },
    ]);

    // Arrangement templates
    cy.selectTemplateTypes(TEMPLATE_KEY.ARRANGEMENT, [
      { type: ARRANGEMENT_MEDIA_TYPE.WORD, qty: 1 },
      { type: ARRANGEMENT_MEDIA_TYPE.SENTENCE, qty: 1 },
      { type: ARRANGEMENT_MEDIA_TYPE.CHARACTER, qty: 1 },
    ]);

    // ===============================
    // Step 8: Generate questions for stage
    // ===============================
    cy.get('[data-cy="generate-question"]', { timeout: 10000 })
      .should("be.visible")
      .and("be.enabled")
      .click();

    // Wait for all exercise creation APIs to complete
    // cy.wait(
    //   [
    //     // "@createExcercisePronunciation",
    //     // "@createExcerciseMatchingPairs",
    //     // "@createExcerciseDragAndDrop",
    //     // "@createExcerciseDropdown",
    //     "@createExcerciseMultipleChoice",
    //     "@createExcerciseFillInTheBlank",
    //     "@createExcerciseArrangement",
    //   ],
    //   { timeout: 240000 }
    // ).then((interceptions) => {
    //   // Verify all API calls succeeded
    //   interceptions.forEach((interception) => {
    //     expect(interception.response.statusCode).to.eq(200);
    //   });
    // });

    // // ===============================
    // // Step 9: Generate individual questions (optional)
    // // ===============================
    // // Wait for generate buttons to appear
    // cy.wait(2000);

    // // Click visible generate question buttons
    // cy.get("[data-cy='generate-question-button']")
    //   .filter(":visible")
    //   .should("have.length.at.least", 1)
    //   .each(($btn, index) => {
    //     // Click each button with a small delay
    //     cy.wrap($btn)
    //       .should("be.visible")
    //       .and("be.enabled")
    //       .click();

    //     // Wait briefly between clicks to avoid overwhelming the system
    //     // if (index < 15) {
    //     //   cy.wait(500);
    //     // }
    //   });

    // ===============================
    // Step 10: Verify completion
    // ===============================
    cy.get('[data-cy="loading-spinner"]', { timeout: 120000 })
      .should('not.exist');


    // cy.get('[data-cy="stage-complete-indicator"]', { timeout: 10000 })
    //   .should("be.visible");
  });


  it('lam bai dung', () => {

    const unitId = '17ced912-a4c8-4caa-86a4-584429d00e61';
    // const unitId = this.unitId;
    // const unitId = '33b16107-dbf9-4585-9624-07cb9567fc6e';
    const countQuestion = 1;


    cy.intercept(
      'GET',
      '**/api/lcm/web/lesson/lessons-by-unit*'
    ).as('getLessons');

    cy.visit(`/teacher/mission/${unitId}`, {
      onBeforeLoad(win) {
        cy.stub(win.navigator.mediaDevices, 'getUserMedia')
          .callsFake(() => {
            const AudioContext = win.AudioContext || win.webkitAudioContext;
            const ctx = new AudioContext();
            const dest = ctx.createMediaStreamDestination();
            const osc = ctx.createOscillator();
            osc.connect(dest);
            osc.start();
            return Promise.resolve(dest.stream);
          });
      },
    });


    cy.wait('@getLessons', { timeout: 50000 })
      .then(({ request, response }) => {

        expect(response?.statusCode).to.eq(200);

        const stages = response.body?.data || [];
        const questions = [];

        stages.forEach((stage, stageIndex) => {
          (stage.data || []).forEach((item, index) => {
            // if (item.mediaType === 'IMAGE' && item.image) {
            questions.push({
              ...item,
              stageIndex,
              index,
              id: item.id,
            });
            // }
          });
        });

        cy.wrap(questions).as('questions');

        cy.writeFile('cypress/debug/lessons-by-unit.json', {
          url: request.url,
          status: response.statusCode,
          body: response.body,
        });
      });

    cy.wait(3000);



    cy.get('@questions').then((questions) => {
      questions.forEach((q, index) => {
        handleExercise(q, index, 'correct');
        cy.wait(500)

      });
    });


  });

  it('lam bai sai', () => {
    const unitId = '17ced912-a4c8-4caa-86a4-584429d00e61';
    // const unitId = '33b16107-dbf9-4585-9624-07cb9567fc6e';
    // const unitId = this.unitId;
    const countQuestion = 1;

    cy.intercept(
      'GET',
      '**/api/lcm/web/lesson/lessons-by-unit*'
    ).as('getLessons');

    cy.visit(`/teacher/mission/${unitId}`, {
      onBeforeLoad(win) {
        cy.stub(win.navigator.mediaDevices, 'getUserMedia')
          .callsFake(() => {
            const AudioContext = win.AudioContext || win.webkitAudioContext;
            const ctx = new AudioContext();
            const dest = ctx.createMediaStreamDestination();
            const osc = ctx.createOscillator();
            osc.connect(dest);
            osc.start();
            return Promise.resolve(dest.stream);
          });
      },
    });


    cy.wait('@getLessons', { timeout: 50000 })
      .then(({ request, response }) => {

        expect(response?.statusCode).to.eq(200);

        const stages = response.body?.data || [];
        const questions = [];

        stages.forEach((stage, stageIndex) => {
          (stage.data || []).forEach((item, index) => {
            questions.push({
              ...item,
              stageIndex,
              index,
              id: item.id,
            });
            // }
          });
        });

        cy.wrap(questions).as('questions');

        cy.writeFile('cypress/debug/lessons-by-unit.json', {
          url: request.url,
          status: response.statusCode,
          body: response.body,
        });
      });

    cy.wait(3000);



    cy.get('@questions').then((questions) => {
      questions.forEach((q, index) => {
        handleExercise(q, index, 'wrong');
        cy.wait(500)

      });
    });


  });

});
