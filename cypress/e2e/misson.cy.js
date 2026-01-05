import { clickControl, expandTemplate, clickPreviewByIndexAndName, hasAudio, hasImage, hasPair, hasUrlData, matchMediaType, createMission } from '../support/utils'

describe('gen mission', () => {
  beforeEach(() => {
    cy.session('user-session', () => {
      cy.loginByApi();
    }, {
      validate() {
        cy.getCookie('access-token').should('exist');
      }
    })
    cy.visit('/');
    cy.intercept('POST', '/api/lcm/web/unit/list-units?page=0&size=6&isDashboard=true').as('listUnit');
    cy.intercept('POST', '/api/lcm/web/lesson/create-lesson').as('createLesson');
    cy.wait('@listUnit', { timeout: 10000 }).then(({ response }) => {
      const listUnits = response.body.data;
      let id = null;
      if (Array.isArray(listUnits) && listUnits.length !== 0) {
        id = listUnits[0].id;
      }
      else{
        createMission();
        cy.wait('@createLesson', { timeout: 10000 }).then(({ response }) => {
          id = response.body.data.id;
        });
      }
      cy.log("iD: " + id);
      cy.wrap(id).as('unitId');
    });
  });

  it('happy case create dropdown', function () {
    const type = 0; // 0: audio, 1: image
    const exerciseType = "dropdown";
    const name = "Dropdown";

    cy.intercept('POST', '/api/lcm/web/excercise/create-dropdown').as('generateQuestion');
    const countQuestion = 1;

    cy.visit(`/teacher/mission/${this.unitId}`);

    expandTemplate(`template-${exerciseType}-collapse`);
    cy.get(`[data-cy="template-content-${exerciseType}"]`).within(() => {
      if(type == 0)
        clickControl('Audio', 'plus', countQuestion);
      else
        clickControl('Image', 'plus', countQuestion);
    });
    cy.get('button[data-cy="generate-question"]').click();

    let idQuestion = '';
    let indexQuesion = null;
    let questions = [];
    for (let i = 0; i < countQuestion; i++) {
      cy.wait('@generateQuestion', { timeout: 5000 }).then(({ response }) => {
        const listQuestions = response.body.data.data;
        listQuestions.forEach((item, index) => {
          if (!hasUrlData(item, type) && item.exerciseType === exerciseType && matchMediaType(item, type)) {
            idQuestion = item.id;
            indexQuesion = index;
            questions.push({
              index: indexQuesion,
              id: idQuestion
            });
          }
        })
      })
    }
    for (let i = 0; i < countQuestion; i++) {
      cy.wait('@generateQuestion', { timeout: 25000 }).then(({ response }) => {
        const listQuestions = response.body.data.data;
        idQuestion = questions[i].id;
        indexQuesion = questions[i].index;
        listQuestions.forEach(item => {
          if (hasUrlData(item, type) && idQuestion === item.id && item.exerciseType === exerciseType  && matchMediaType(item, type)) {
            const answers = item.answers;
            if(indexQuesion !== null){
              clickPreviewByIndexAndName(indexQuesion+1, name, type);
              cy.get('.ant-select-selector').click();
              cy.get('.ant-select-dropdown')
                .should('be.visible')
                .contains('.ant-select-item-option', answers[0])
                .click();
              cy.contains('button', 'Submit').click();
              cy.contains('Correct!').should('be.visible');
              cy.get('[aria-label="close"]')
                .closest('button')
                .click()
            }
          }
        })
      })
    }
  })

  it('happy case create drag and drop', function () {
    const type = 0; // 0: audio, 1: image
    const exerciseType = "drag_and_drop";
    const name = "Drag and drop";

    cy.intercept('POST', '/api/lcm/web/excercise/create-drag-and-drop').as('generateQuestion');
    const countQuestion = 1;

    cy.visit(`/teacher/mission/${this.unitId}`);

    expandTemplate('template-drag_and_drop-collapse');
    cy.get('[data-cy="template-content-drag_and_drop"]').within(() => {
      if(type == 0)
        clickControl('Audio', 'plus', countQuestion);
      else
        clickControl('Image', 'plus', countQuestion);
    });
    cy.get('button[data-cy="generate-question"]').click();

    let idQuestion = '';
    let indexQuesion = null;
    let questions = [];
    for (let i = 0; i < countQuestion; i++) {
      cy.wait('@generateQuestion', { timeout: 5000 }).then(({ response }) => {
        const listQuestions = response.body.data.data;
        listQuestions.forEach((item, index) => {
          if (!hasUrlData(item, type) && item.exerciseType === exerciseType && matchMediaType(item, type)) {
            idQuestion = item.id;
            indexQuesion = index;
            questions.push({
              index: indexQuesion,
              id: idQuestion
            });
          }
        })
      })
    }
    for (let i = 0; i < countQuestion; i++) {
      cy.wait('@generateQuestion', { timeout: 25000 }).then(({ response }) => {
        const listQuestions = response.body.data.data;
        idQuestion = questions[i].id;
        indexQuesion = questions[i].index;
        listQuestions.forEach(item => {
          if (hasUrlData(item, type) && idQuestion === item.id && item.exerciseType === exerciseType  && matchMediaType(item, type)) {
            const answers = item.answers;
            if(indexQuesion !== null){
              clickPreviewByIndexAndName(indexQuesion+1, name, type);
              answers.forEach((text, index) => {
                cy.contains('[data-option-index]', text)
                  .should('be.visible')
                  .click();
                cy.wait(300);
                cy.get(`[data-index="${index}"]`)
                  .should('be.visible')
                  .invoke('text')
                  .then(t => {
                    expect(t.trim()).to.eq(text);
                  });
              });
              cy.contains('button', 'Submit').click();
              cy.contains('Correct!').should('be.visible');
              cy.get('[aria-label="close"]')
                .closest('button')
                .click()
            }
          }
        })
      })
    }
  })

  it('happy case create matching pairs audio-text', function () {
    cy.intercept('POST', '/api/lcm/web/excercise/create-excercise-matching-pairs').as('generateQuestion');
    const countQuestion = 1;

    cy.visit(`/teacher/mission/${this.unitId}`);

    // clickPreviewByIndexAndName(1+1, "Matching pairs");

    // cy.get('.pointLeft').each(($pointLeft, index) => {
    // cy.wrap($pointLeft)
    //     .closest('[class*="rounded-md"]')
    //     .within(() => {
    //       cy.get('audio source')
    //         .invoke('attr', 'src')
    //         .then((leftSrc) => {

    //           // click left
    //           cy.wrap($pointLeft).click({ force: true });
    //           cy.log(leftSrc)
    //         });
    //     });
    // });

    expandTemplate('template-matching_pairs-collapse');
    cy.get('[data-cy="template-content-matching_pairs"]').within(() => {
      clickControl('Audio- Text', 'plus', countQuestion);
    });
    cy.get('button[data-cy="generate-question"]').click();

    let idQuestion = '';
    let indexQuesion = null;
    let questions = [];
    for (let i = 0; i < countQuestion; i++) {
      cy.wait('@generateQuestion', { timeout: 5000 }).then(({ response }) => {
        const listQuestions = response.body.data.data;
        listQuestions.forEach((item, index) => {
          if (!hasPair(item) && item.exerciseType === "matching_pairs" && item.mediaType === "TEXT_AUDIO") {
            idQuestion = item.id;
            indexQuesion = index;
            questions.push({
              index: indexQuesion,
              id: idQuestion
            });
          }
        })
      })
    }
    for (let i = 0; i < countQuestion; i++) {
      cy.wait('@generateQuestion', { timeout: 25000 }).then(({ response }) => {
        const listQuestions = response.body.data.data;
        idQuestion = questions[i].id;
        indexQuesion = questions[i].index;
        listQuestions.forEach(item => {
          if (hasPair(item) && idQuestion === item.id && item.exerciseType === "matching_pairs"  && item.mediaType === "TEXT_AUDIO") {
            const pairLst = item.pairLst;
            let questionPairs = [];
            pairLst.left.forEach(pairL => {
              questionPairs.push({
                audio: pairL.audio,
                title: pairL.label
              });
            });
            if(indexQuesion !== null){
              clickPreviewByIndexAndName(indexQuesion+1, "Matching pairs");
              cy.get('.pointLeft').each(($pointLeft) => {
                cy.wrap($pointLeft)
                  .closest('[class*="rounded-md"]')
                  .find('audio source')
                  .invoke('attr', 'src')
                  .then((leftSrc) => {
                    cy.wrap($pointLeft).click({ force: true });

                    const pathAudio = new URL(leftSrc).searchParams.get('path');
                    const matched = questionPairs.find(q => q.audio === pathAudio);
                    expect(matched, 'matched question').to.exist;

                    const title = matched.title;
                    cy.log('title: ' + title);

                    cy.contains('.text-xs', title)
                      .parents('.rounded-md')
                      .should('have.descendants', '.pointRight')
                      .click()
                  });
              });
              cy.contains('button', 'Submit').click();
              cy.contains('Correct!').should('be.visible');
              cy.get('[aria-label="close"]')
                .closest('button')
                .click()
            }
          }
        })
      })
    }

  })


  it('happy case create pronunciation image', function () {
    let originalMp3Blob;
    cy.intercept('POST', '/api/ai-integrate/ai/phonemes-scoring').as('uploadScore');
    cy.intercept('POST', '/api/lcm/web/excercise/create-excercise-pronunciation').as('generateQuestion');

    const hasImage = (item) => {
      return item.image !== null;
    };

    // cy.visit('/teacher/mission/430b8177-7f46-4ad8-8f32-947850b3f102');
    cy.visit(`/teacher/mission/${this.unitId}`, {
      onBeforeLoad(win) {
        cy.stub(win.navigator.mediaDevices, 'getUserMedia').callsFake(() => {
          const AudioContext = win.AudioContext || win.webkitAudioContext;
          const ctx = new AudioContext();
          const dest = ctx.createMediaStreamDestination();
          const osc = ctx.createOscillator();
          osc.connect(dest);
          osc.start();
          return Promise.resolve(dest.stream);
        });

        // Trộm long tráo phụng
        const originalAppend = win.FormData.prototype.append;
        cy.stub(win.FormData.prototype, 'append').callsFake(function (key, value, filename) {
          if (key === 'audio') {
            if (originalMp3Blob) {
              return originalAppend.call(this, key, originalMp3Blob, 'recording.mp3');
            }
          }
          return originalAppend.apply(this, arguments);
        });
      },
    });
    
    const countQuestion = 1;
    expandTemplate('template-pronunciation-collapse');
    cy.get('[data-cy="template-content-pronunciation"]').within(() => {
      clickControl('Image', 'plus', countQuestion);
      // clickControl('Audio', 'plus', countQuestion);
    })
    cy.get('button[data-cy="generate-question"]').click();
    
    let idQuestion = '';
    let indexQuesion = null;
    let questions = [];
    for (let i = 0; i < countQuestion; i++) {
      cy.wait('@generateQuestion', { timeout: 5000 }).then(({ response }) => {
        const listQuestions = response.body.data.data;
        listQuestions.forEach((item, index) => {
          if (!hasImage(item) && item.mediaType === "IMAGE") {
            idQuestion = item.id;
            indexQuesion = index;
            questions.push({
              index: indexQuesion,
              id: idQuestion
            });
          }
        })
      })
    }
    for (let i = 0; i < countQuestion; i++) {
      cy.wait('@generateQuestion', { timeout: 15000 }).then(({ response }) => {
        const listQuestions = response.body.data.data;
        idQuestion = questions[i].id;
        indexQuesion = questions[i].index;
        listQuestions.forEach(item => {
          if (hasImage(item) && idQuestion === item.id && item.mediaType === "IMAGE") {
            // cy.request({
            //     url:Cypress.env('fileUrl')+item.audio,
            //     encoding: null,
            //   }).then((response) => {
            //     originalMp3Blob = new Blob([response.body], { type: 'audio/mpeg' });
            //   });
            clickPreviewByIndexAndName(indexQuesion+1, "Pronunciation", 1);
            cy.get('svg[viewBox="0 0 352 512"]')
              .closest('button')
              .click();
            cy.contains('Tap to stop')
              .prev('button')
              .click()
            cy.wait('@uploadScore').then((interception) => {
              expect(interception.response.statusCode).to.eq(200);
            });
            cy.contains('button', 'Submit').click();
            cy.contains('Wrong!').should('be.visible');
            cy.get('[aria-label="close"]')
              .closest('button')
              .click()
          }
        })
      })
    }
  })

  it('happy case create pronunciation audio', function () {
    const type = 0; // 0: audio, 1: image
    const exerciseType = "pronunciation";
    const name = "Pronunciation";

    let originalMp3Blob;
    cy.intercept('POST', '/api/ai-integrate/ai/phonemes-scoring').as('uploadScore');
    cy.intercept('POST', '/api/lcm/web/excercise/create-excercise-pronunciation').as('generateQuestion');

    // cy.visit('/teacher/mission/430b8177-7f46-4ad8-8f32-947850b3f102');
    cy.visit(`/teacher/mission/${this.unitId}`, {
      onBeforeLoad(win) {
        cy.stub(win.navigator.mediaDevices, 'getUserMedia').callsFake(() => {
          const AudioContext = win.AudioContext || win.webkitAudioContext;
          const ctx = new AudioContext();
          const dest = ctx.createMediaStreamDestination();
          const osc = ctx.createOscillator();
          osc.connect(dest);
          osc.start();
          return Promise.resolve(dest.stream);
        });

        // Trộm long tráo phụng
        const originalAppend = win.FormData.prototype.append;
        cy.stub(win.FormData.prototype, 'append').callsFake(function (key, value, filename) {
          if (key === 'audio') {
            if (originalMp3Blob) {
              return originalAppend.call(this, key, originalMp3Blob, 'recording.mp3');
            }
          }
          return originalAppend.apply(this, arguments);
        });
      },
    });
    
    const countQuestion = 1;
    expandTemplate(`template-${exerciseType}-collapse`);
    cy.get(`[data-cy="template-content-${exerciseType}"]`).within(() => {
      // clickControl('Image', 'plus', 2);
      clickControl('Audio', 'plus', countQuestion);
    })
    cy.get('button[data-cy="generate-question"]').click();
    
    let idQuestion = '';
    let indexQuesion = null;
    let questions = [];
    for (let i = 0; i < countQuestion; i++) {
      cy.wait('@generateQuestion', { timeout: 5000 }).then(({ response }) => {
        const listQuestions = response.body.data.data;
        listQuestions.forEach((item, index) => {
          if (!hasUrlData(item, type) && item.exerciseType === exerciseType  && matchMediaType(item, type)) {
            idQuestion = item.id;
            indexQuesion = index;
            questions.push({
              index: indexQuesion,
              id: idQuestion
            });
          }
        })
      })
    }
    for (let i = 0; i < countQuestion; i++) {
      cy.wait('@generateQuestion', { timeout: 15000 }).then(({ response }) => {
        const listQuestions = response.body.data.data;
        idQuestion = questions[i].id;
        indexQuesion = questions[i].index;
        listQuestions.forEach(item => {
          if (hasUrlData(item, type) && idQuestion === item.id && item.exerciseType === exerciseType  && matchMediaType(item, type)) {
            cy.request({
                url:Cypress.env('fileUrl')+item.audio,
                encoding: null,
              }).then((response) => {
                originalMp3Blob = new Blob([response.body], { type: 'audio/mpeg' });
              });
            
            if(indexQuesion !== null){
              clickPreviewByIndexAndName(indexQuesion+1, name);
              
              cy.get('svg[viewBox="0 0 352 512"]')
                .closest('button')
                .click();
              cy.contains('Tap to stop')
                .prev('button')
                .click()
              cy.wait('@uploadScore').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
              });
              cy.contains('button', 'Submit').click();
              cy.contains('Correct!').should('be.visible');
              cy.get('[aria-label="close"]')
                .closest('button')
                .click()
            }
          }
        })
      })
    }
  })

  it('create mission with grade', () => {
    cy.fixture('mission').then((data) => {
      cy.visit('/teacher/mission/create')
      
      cy.get('.ant-select[name="gradeId"]').click()

      // chọn Grade
      cy.get('body')
        .find('.ant-select-dropdown')
        .contains('.ant-select-item-option', data.grade)
        .click()

      // verify
      cy.get('.ant-select[name="gradeId"]')
        .contains(data.grade)
      
      cy.get('input[name="topic"]').type(data.topic).click()
      cy.contains('button', 'Apply')
        .should('be.visible')
        .click()
      // cy.wait(2000)
      // cy.debug()
      // data.vocab.forEach(word => {
      //   cy.get('input[placeholder="Add vocabulary"]')
      //     .click()
      //     .type(`${word}{enter}`)
      // })
      cy.get('input[placeholder^="Enter grammar elements"]')
            .should('be.visible')
            .click()
            .type('pre')
      // cy.wait(2000)
      // cy.debug()
      cy.contains('div', 'Present Tense')
        .should('be.visible')
        .click()
      cy.contains('button', 'Apply')
        .should('be.visible')
        .click()
      
      cy.contains('button', 'Continue')
        .scrollIntoView()
        .should('be.visible')
        .and('not.be.disabled')
        .click()
      
      cy.get('.ant-checkbox-group')
        .find('.ant-checkbox-wrapper')
        .each(($label) => {
          cy.wrap($label).click()
        })

      cy.contains('button', 'Save')
        .scrollIntoView()
        .should('be.visible')
        .and('not.be.disabled')
        .click()
    })
  })
})