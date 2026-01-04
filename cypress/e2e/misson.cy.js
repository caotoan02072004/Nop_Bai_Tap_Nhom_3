import { clickControl, expandTemplate, clickPreviewByIndexAndName, hasAudio, hasImage, hasPair } from '../support/utils'

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
  })

  it('happy case create matching pairs audio-text', () => {
    cy.intercept('POST', '/api/lcm/web/excercise/create-excercise-matching-pairs').as('generateQuestion');
    const countQuestion = 1;

    cy.visit('/teacher/mission/430b8177-7f46-4ad8-8f32-947850b3f102');

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
        idQuestion = questions[0].id;
        indexQuesion = questions[0].index;
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


  // it('happy case create pronunciation image', () => {
  //   let originalMp3Blob;
  //   cy.intercept('POST', '/api/ai-integrate/ai/phonemes-scoring').as('uploadScore');
  //   cy.intercept('POST', '/api/lcm/web/excercise/create-excercise-pronunciation').as('generateQuestion');

  //   const hasImage = (item) => {
  //     return item.image !== null;
  //   };

  //   // cy.visit('/teacher/mission/430b8177-7f46-4ad8-8f32-947850b3f102');
  //   cy.visit('/teacher/mission/430b8177-7f46-4ad8-8f32-947850b3f102', {
  //     onBeforeLoad(win) {
  //       cy.stub(win.navigator.mediaDevices, 'getUserMedia').callsFake(() => {
  //         const AudioContext = win.AudioContext || win.webkitAudioContext;
  //         const ctx = new AudioContext();
  //         const dest = ctx.createMediaStreamDestination();
  //         const osc = ctx.createOscillator();
  //         osc.connect(dest);
  //         osc.start();
  //         return Promise.resolve(dest.stream);
  //       });

  //       // Trộm long tráo phụng
  //       const originalAppend = win.FormData.prototype.append;
  //       cy.stub(win.FormData.prototype, 'append').callsFake(function (key, value, filename) {
  //         if (key === 'audio') {
  //           if (originalMp3Blob) {
  //             return originalAppend.call(this, key, originalMp3Blob, 'recording.mp3');
  //           }
  //         }
  //         return originalAppend.apply(this, arguments);
  //       });
  //     },
  //   });
    
  //   const countQuestion = 1;
  //   expandTemplate('template-pronunciation-collapse');
  //   cy.get('[data-cy="template-content-pronunciation"]').within(() => {
  //     clickControl('Image', 'plus', countQuestion);
  //     // clickControl('Audio', 'plus', countQuestion);
  //   })
  //   cy.get('button[data-cy="generate-question"]').click();
    
  //   let idQuestion = '';
  //   let indexQuesion = null;
  //   let questions = [];
  //   for (let i = 0; i < countQuestion; i++) {
  //     cy.wait('@generateQuestion', { timeout: 5000 }).then(({ response }) => {
  //       const listQuestions = response.body.data.data;
  //       listQuestions.forEach((item, index) => {
  //         if (!hasImage(item) && item.mediaType === "IMAGE") {
  //           idQuestion = item.id;
  //           indexQuesion = index;
  //           questions.push({
  //             index: indexQuesion,
  //             id: idQuestion
  //           });
  //         }
  //       })
  //     })
  //   }
  //   for (let i = 0; i < countQuestion; i++) {
  //     cy.wait('@generateQuestion', { timeout: 15000 }).then(({ response }) => {
  //       const listQuestions = response.body.data.data;
  //       idQuestion = questions[0].id;
  //       indexQuesion = questions[0].index;
  //       listQuestions.forEach(item => {
  //         if (hasImage(item) && idQuestion === item.id && item.mediaType === "IMAGE") {
  //           // cy.request({
  //           //     url:Cypress.env('fileUrl')+item.audio,
  //           //     encoding: null,
  //           //   }).then((response) => {
  //           //     originalMp3Blob = new Blob([response.body], { type: 'audio/mpeg' });
  //           //   });
  //           cy.get('.image-custom')
  //             .find('.ant-spin-spinning', { timeout: 20000 })
  //             .should('not.exist')
  //           clickPreviewByIndexAndName(indexQuesion+1, "Pronunciation");
  //           cy.get('svg[viewBox="0 0 352 512"]')
  //             .closest('button')
  //             .click();
  //           cy.contains('Tap to stop')
  //             .prev('button')
  //             .click()
  //           cy.wait('@uploadScore').then((interception) => {
  //             expect(interception.response.statusCode).to.eq(200);
  //           });
  //           cy.contains('button', 'Submit').click();
  //           cy.contains('Correct!').should('be.visible');
  //           cy.get('[aria-label="close"]')
  //             .closest('button')
  //             .click()
  //         }
  //       })
  //     })
  //   }
  // })

  // it('happy case create pronunciation audio', () => {
  //   let originalMp3Blob;
  //   cy.intercept('POST', '/api/ai-integrate/ai/phonemes-scoring').as('uploadScore');
  //   cy.intercept('POST', '/api/lcm/web/excercise/create-excercise-pronunciation').as('generateQuestion');

  //   const hasAudio = (item) => {
  //     return item.audio !== null;
  //   };

  //   // cy.visit('/teacher/mission/430b8177-7f46-4ad8-8f32-947850b3f102');
    // cy.visit('/teacher/mission/430b8177-7f46-4ad8-8f32-947850b3f102', {
    //   onBeforeLoad(win) {
    //     cy.stub(win.navigator.mediaDevices, 'getUserMedia').callsFake(() => {
    //       const AudioContext = win.AudioContext || win.webkitAudioContext;
    //       const ctx = new AudioContext();
    //       const dest = ctx.createMediaStreamDestination();
    //       const osc = ctx.createOscillator();
    //       osc.connect(dest);
    //       osc.start();
    //       return Promise.resolve(dest.stream);
    //     });

    //     // Trộm long tráo phụng
    //     const originalAppend = win.FormData.prototype.append;
    //     cy.stub(win.FormData.prototype, 'append').callsFake(function (key, value, filename) {
    //       if (key === 'audio') {
    //         if (originalMp3Blob) {
    //           return originalAppend.call(this, key, originalMp3Blob, 'recording.mp3');
    //         }
    //       }
    //       return originalAppend.apply(this, arguments);
    //     });
    //   },
    // });
    
  //   const countQuestion = 2;
  //   expandTemplate('template-pronunciation-collapse');
  //   cy.get('[data-cy="template-content-pronunciation"]').within(() => {
  //     // clickControl('Image', 'plus', 2);
  //     clickControl('Audio', 'plus', countQuestion);
  //   })
  //   cy.get('button[data-cy="generate-question"]').click();
    
  //   let idQuestion = '';
  //   let indexQuesion = null;
  //   let questions = [];
  //   for (let i = 0; i < countQuestion; i++) {
  //     cy.wait('@generateQuestion', { timeout: 5000 }).then(({ response }) => {
  //       const listQuestions = response.body.data.data;
  //       listQuestions.forEach((item, index) => {
  //         if (!hasAudio(item)) {
  //           idQuestion = item.id;
  //           indexQuesion = index;
  //           questions.push({
  //             index: indexQuesion,
  //             id: idQuestion
  //           });
  //         }
  //       })
  //     })
  //   }
  //   for (let i = 0; i < countQuestion; i++) {
  //     cy.wait('@generateQuestion', { timeout: 15000 }).then(({ response }) => {
  //       const listQuestions = response.body.data.data;
  //       idQuestion = questions[0].id;
  //       indexQuesion = questions[0].index;
  //       listQuestions.forEach(item => {
  //         if (hasAudio(item) && idQuestion === item.id) {
  //           cy.request({
  //               url:Cypress.env('fileUrl')+item.audio,
  //               encoding: null,
  //             }).then((response) => {
  //               originalMp3Blob = new Blob([response.body], { type: 'audio/mpeg' });
  //             });
            
  //           if(indexQuesion !== null){
  //             clickPreviewByIndexAndName(indexQuesion+1, "Pronunciation");
              
  //             cy.get('svg[viewBox="0 0 352 512"]')
  //               .closest('button')
  //               .click();
  //             cy.contains('Tap to stop')
  //               .prev('button')
  //               .click()
  //             cy.wait('@uploadScore').then((interception) => {
  //               expect(interception.response.statusCode).to.eq(200);
  //             });
  //             cy.contains('button', 'Submit').click();
  //             cy.contains('Correct!').should('be.visible');
  //             cy.get('[aria-label="close"]')
  //               .closest('button')
  //               .click()
  //           }
  //         }
  //       })
  //     })
  //   }
  // })

  // it('create mission with grade', () => {
  //   cy.fixture('mission').then((data) => {
  //     cy.visit('/teacher/mission/create')
      
  //     cy.get('.ant-select[name="gradeId"]').click()

  //     // chọn Grade
  //     cy.get('body')
  //       .find('.ant-select-dropdown')
  //       .contains('.ant-select-item-option', data.grade)
  //       .click()

  //     // verify
  //     cy.get('.ant-select[name="gradeId"]')
  //       .contains(data.grade)
      
  //     cy.get('input[name="topic"]').type(data.topic).click()
  //     cy.contains('button', 'Apply')
  //       .should('be.visible')
  //       .click()
  //     // cy.wait(2000)
  //     // cy.debug()
  //     // data.vocab.forEach(word => {
  //     //   cy.get('input[placeholder="Add vocabulary"]')
  //     //     .click()
  //     //     .type(`${word}{enter}`)
  //     // })
  //     cy.get('input[placeholder^="Enter grammar elements"]')
  //           .should('be.visible')
  //           .click()
  //           .type('pre')
  //     // cy.wait(2000)
  //     // cy.debug()
  //     cy.contains('div', 'Present Tense')
  //       .should('be.visible')
  //       .click()
  //     cy.contains('button', 'Apply')
  //       .should('be.visible')
  //       .click()
      
  //     cy.contains('button', 'Continue')
  //       .scrollIntoView()
  //       .should('be.visible')
  //       .and('not.be.disabled')
  //       .click()
      
  //     cy.get('.ant-checkbox-group').should('be.visible')
  //       .find('input[type="checkbox"]')
  //       .check({ force: true })

  //     cy.contains('button', 'Save')
  //       .scrollIntoView()
  //       .should('be.visible')
  //       .and('not.be.disabled')
  //       .click()
  //   })
  // })
})