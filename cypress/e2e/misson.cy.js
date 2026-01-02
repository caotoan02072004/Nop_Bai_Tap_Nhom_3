import { clickControl, expandTemplate, clickPreviewByIndexAndName } from '../support/utils'

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

  it('happy case create pronunciation', () => {
    let originalMp3Blob;
    // cy.visit('/teacher/mission/430b8177-7f46-4ad8-8f32-947850b3f102');
    cy.visit('/teacher/mission/430b8177-7f46-4ad8-8f32-947850b3f102', {
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

    cy.intercept('POST', '/api/ai-integrate/ai/phonemes-scoring').as('uploadScore');
    
    expandTemplate('template-pronunciation-collapse');
    cy.get('[data-cy="template-content-pronunciation"]').within(() => {
      // clickControl('Image', 'plus', 2);
      clickControl('Audio', 'plus', 1);
    })

    cy.intercept('POST', '/api/lcm/web/excercise/create-excercise-pronunciation').as('generateQuestion');

    cy.get('button[data-cy="generate-question"]').click();
    const hasAudio = (item) => {
      return item.audio !== null;
    };
    let idQuestion = '';
    let indexQuesion = null;
    cy.wait('@generateQuestion', { timeout: 5000 }).then(({ response }) => {
      const listQuestions = response.body.data.data;
      listQuestions.forEach((item, index) => {
        if (!hasAudio(item)) {
          idQuestion = item.id;
          indexQuesion = index;
        }
      })
    })

    cy.wait('@generateQuestion', { timeout: 15000 }).then(({ response }) => {
      const listQuestions = response.body.data.data;
      listQuestions.forEach(item => {
        if (hasAudio(item) && idQuestion === item.id) {
          cy.request({
              url:Cypress.env('fileUrl')+item.audio,
              encoding: null,
            }).then((response) => {
              originalMp3Blob = new Blob([response.body], { type: 'audio/mpeg' });
            });

          if(indexQuesion !== null){
            clickPreviewByIndexAndName(indexQuesion+1, "Pronunciation");
            
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
  })

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