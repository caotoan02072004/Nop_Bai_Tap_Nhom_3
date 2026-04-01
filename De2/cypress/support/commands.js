// // ***********************************************
// // This example commands.js shows you how to
// // create various custom commands and overwrite
// // existing commands.
// //
// // For more comprehensive examples of custom
// // commands please read more here:
// // https://on.cypress.io/custom-commands
// // ***********************************************
// //
// //
// // -- This is a parent command --
// // Cypress.Commands.add('login', (email, password) => { ... })
// //
// //
// // -- This is a child command --
// // Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
// //
// //
// // -- This is a dual command --
// // Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
// //
// //
// // -- This will overwrite an existing command --
// // Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add('loginByUI', (username, password) => {
//   cy.get('[name="username"]').type(username)
//   cy.get('[name="password"]').type(password)
//   cy.contains('span', 'Sign in').click()
// })

// Cypress.Commands.add('loginByApiSession', () => {

//   const authUrl = Cypress.env('authenticate');
//   if (!authUrl) {
//     throw new Error('Cypress env "authenticate" is not defined');
//   }

//   cy.session(
//     'user-session',
//     () => {
//       cy.log('RUN LOGIN');
//       cy.request({
//         method: 'POST',
//         url: authUrl,
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         form: true,
//         body: {
//           grant_type: Cypress.env('grant_type'),
//           client_id: Cypress.env('client_id'),
//           username: Cypress.env('username'),
//           password: Cypress.env('password'),
//           rememberDevice: false,
//         },
//       }).then((res) => {
//         expect(res.status).to.eq(200);
//         expect(res.body).to.have.property('access_token');

//         cy.setCookie('access-token', res.body.access_token);
//         cy.setCookie('refresh-token', res.body.refresh_token);
//       });
//     },
//     {
//       validate() {
//         cy.log('VALIDATE');
//         cy.getCookie('access-token').should('exist');
//       },
//     }
//   );

//   cy.visit('/');
// });

// // Cypress.Commands.add('loginByApiSession', () => {

// //   cy.session(
// //     'user-session',
// //     () => {
// //       cy.request({
// //         method: 'POST',
// //         url: Cypress.env('authenticate'),
// //         headers: {
// //           'Content-Type': 'application/x-www-form-urlencoded'
// //         },
// //         form: true,
// //         body: {
// //           grant_type: Cypress.env('grant_type'),
// //           client_id: Cypress.env('client_id'),
// //           username: Cypress.env('username'),
// //           password: Cypress.env('password'),
// //           rememberDevice: false
// //         }

// //       }).then((res) => {
// //         cy.log('Login successful, token received')
// //         cy.visit('/')
// //         cy.window().then((win) => {
// //           cy.setCookie('access-token', res.body.access_token)
// //           cy.setCookie('refresh-token', res.body.refresh_token)
// //         })
// //       })
// //     },
// //     {
// //       validate() {
// //         cy.getCookie('access-token').should('exist');
// //       },
// //     }
// //   );

// //   cy.visit('/');

// // })

// Cypress.Commands.add("selectTemplateTypes", (templateCode, items) => {
//   cy.get(`[data-cy="template-${templateCode}-collapse"]`)
//     .should("exist")
//     .scrollIntoView()
//     .closest(".ant-collapse-header")
//     .click({ force: true });

//   cy.get(`[data-cy="template-content-${templateCode}"]`).should("exist");

//   cy.get(`[data-cy="template-content-${templateCode}"]`).should("be.visible");

//   items.forEach(({ type, qty }) => {
//     const baseSelector = `template-${templateCode}-${type}`;

//     if (qty !== undefined) {
//       cy.get("body").then(($body) => {
//         const inputSelector = `[data-cy="${baseSelector}-input"]`;

//         if ($body.find(inputSelector).length) {
//           cy.get(inputSelector)
//             .clear()
//             .type(String(qty))
//             .should("have.value", String(qty));
//         }
//       });
//     }
//   });
// });

// Cypress.Commands.add("waitApiSuccess", (alias) => {
//   cy.wait(alias).then(({ response }) => {
//     expect(response, `Response of ${alias}`).to.exist;
//     expect(response.statusCode).to.eq(200);
//     expect(response.body?.code).to.eq(0);
//   });
// });

// Cypress.Commands.add("fillInput", (selector, value) => {
//   cy.get(selector).clear().type(value).should("have.value", value);
// });

// Cypress.Commands.add("selectAntdOption", (label) => {
//   cy.contains(".ant-select-item-option", new RegExp(`^${label}$`)).click();
// });

// Cypress.Commands.add('loginByApi', () => {
//   cy.request({
//     method: 'POST',
//     url: 'https://beta.cheppy.ai/api/security/authenticate',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     form: true,
//     body: {
//       grant_type: Cypress.env('grant_type'),
//       client_id: Cypress.env('client_id'),
//       username: Cypress.env('username'),
//       password: Cypress.env('password'),
//       rememberDevice: false
//     }

//   }).then((res) => {
//     cy.log('Login successful, token received')
//     cy.visit('https://beta.cheppy.ai')
//     cy.window().then((win) => {
//       cy.setCookie('access-token', res.body.access_token)
//       cy.setCookie('refresh-token', res.body.refresh_token)
//     })
//   })
// })


Cypress.Commands.add("byTestId", (id) => cy.get(`[data-test-id="${id}"]`));

Cypress.Commands.add("clickByText", (text) => {
  cy.contains("button, a, [role='button']", text, { matchCase: false }).click({ force: true });
});

Cypress.Commands.add("typeByLabel", (labelText, value) => {
  // Tìm input/textarea/select gần label (UI form thường dùng)
  cy.contains("label", labelText, { matchCase: false })
    .then(($label) => {
      const forAttr = $label.attr("for");
      if (forAttr) {
        cy.get(`#${forAttr}`).clear().type(String(value));
      } else {
        cy.wrap($label)
          .parent()
          .find("input, textarea")
          .first()
          .clear()
          .type(String(value));
      }
    });
});

Cypress.Commands.add("typeById", (id, value, options = {}) => {
  const v = value == null ? "" : String(value);

  const selectors = [
    `[data-test-id="${id}"]`,
    `#${CSS.escape(id)}`,
    `[name="${id}"]`,
  ];

  cy.get("body").then(($body) => {
    const found = selectors.find((sel) => $body.find(sel).length);
    if (!found) {
      throw new Error(`typeById: Cannot find element. Tried: ${selectors.join(" | ")}`);
    }

    cy.get(found, options)
      .then(($el) => {
        const $target = $el.is("input, textarea")
          ? $el
          : $el.find("input, textarea").first();

        if (!$target.length) {
          throw new Error(`typeById: Selector matched but no input/textarea. Selector: ${found}`);
        }

        cy.wrap($target).scrollIntoView().clear({ force: true }).type(v, { force: true });
      });
  });
});

Cypress.Commands.add("selectByLabel", (labelText, optionText) => {
  cy.contains("label", labelText, { matchCase: false })
    .then(($label) => {
      const forAttr = $label.attr("for");
      if (forAttr) {
        cy.get(`#${forAttr}`).select(optionText);
      } else {
        cy.wrap($label)
          .parent()
          .find("select")
          .first()
          .select(optionText);
      }
    });
});

// ===== App actions =====
Cypress.Commands.add("visitLab120", (urlPath) => {
  cy.visit(urlPath);
  cy.contains(/healthcare|multi-stage|treatment/i, { timeout: 20000 }).should("exist");
});

// Cypress.Commands.add("login", ({ username, password }) => {

//   cy.get("body").then(($body) => {
//     if ($body.find('[data-test-id="username"]').length) {
//       cy.byTestId("username").clear().type(username);
//       cy.byTestId("password").clear().type(password);
//       cy.byTestId("login").click();
//     } else {

//       cy.get('input[name="username"], input[placeholder*="user" i], input[type="text"]').first().clear().type(username);
//       cy.get('input[name="password"], input[placeholder*="pass" i], input[type="password"]').first().clear().type(password);
//       cy.contains("button", /login|sign in|đăng nhập/i).click();
//     }
//   });

//   cy.contains(new RegExp(username, "i"), { timeout: 20000 }).should("exist");
// });

Cypress.Commands.add('login', ({ username, password }) => {

  // cy.visit('https://autotestsandbox.com/labs/healthcare-multi-stage-treatment');


  cy.get('[data-test-id="username"]').should('be.visible').clear().type(username);
  cy.get('[data-test-id="password"]').should('be.visible').clear().type(password);
  cy.get('[data-test-id="btn-login"]').should('be.visible').click();

})


Cypress.Commands.add("logoutIfPossible", () => {
  cy.byTestId('lab-120-logout').click();
  cy.contains(/Not signed in/i, { timeout: 10000 }).should("exist");
});


Cypress.Commands.add("createAdmissionPatient", (patient) => {

  cy.verifyText('ADMISSION_DRAFT');
  cy.typeById("patient-full-name", patient.fullName);
  cy.typeById("dob", patient.dob);

  cy.selectByTestId("gender", patient.gender);
  cy.typeById("national-id", patient.nationalId);
  cy.typeById("phone", patient.phone);
  cy.typeById("address", patient.address);
  cy.typeById("admission-reason", patient.admissionReason);


  cy.byTestId("triage-level").then(($el) => {
    const isDisabled = $el.is(":disabled");

    if (isDisabled) {
      // field readonly => verify value
      cy.wrap($el).should("have.value", patient.triageLevel);
    } else {
      // field editable => select theo value
      cy.wrap($el).select(patient.triageLevel);
      cy.wrap($el).should("have.value", patient.triageLevel);
    }
  });

  cy.byTestId('initial-department').select('Cardiology');
  cy.byTestId('btn-admit').click();
  cy.verifyText('ADMITTED');


});

Cypress.Commands.add("selectByTestId", (testId, option, options = {}) => {
  const v = option == null ? "" : String(option);

  cy.get(`[data-test-id="${testId}"]`, options)
    .should("exist")
    .then(($el) => {
      const $target = $el.is("select") ? $el : $el.find("select").first();

      if (!$target.length) {
        throw new Error(`selectByTestId: Cannot find <select> inside [data-testid="${testId}"]`);
      }

      cy.wrap($target).scrollIntoView().select(v, { force: true });
      cy.wrap($target).should("have.value", v);
    });
});

Cypress.Commands.add("createLabOrderForPatient", (priority, order, note) => {
  cy.get('[data-test-id="lab-priority"]').select(priority);
  cy.get('[data-test-id="lab-tests"]').contains(order).click();
  cy.get('[data-test-id="clinical-note"]').type(note);
  cy.get('[data-test-id="btn-submit-lab-order"]').click();
  cy.get('[data-test-id="lab-120-lab-status"]').should('be.visible');
  cy.contains(/lab order submitted\.?/i, { timeout: 15000 }).should('exist');
  cy.get('[data-test-id="timeline"]').contains('LAB_PENDING').should('be.visible');
  cy.get('[data-test-id="timeline"]').contains('LAB_ORDERED').should('be.visible');

});

Cypress.Commands.add("publishDelayedLabResult", (patientName, result) => {

  cy.get('[data-test-id="btn-open-case"]').click();
  cy.get('[data-test-id="result-status"]').select(result.value);
  cy.get('[data-test-id="result-summary"]').type(result.resultText);
  cy.get('[data-test-id="btn-publish-result"]').click();
  // cy.contains('Lab result published. Await availability.').should('be.visible');
  cy.get('[data-test-id="timeline"]').contains('LAB_RESULTED').should('be.visible');
});

Cypress.Commands.add("getByTestIdScroll", (testId, options = {}) => {
  return cy.get(`[data-test-id="${testId}"]`, options)
    .should("exist")
    .scrollIntoView({ block: "center" });
});


Cypress.Commands.add("doctorProtocolUpdate", (patientName, protocol) => {
  cy.get('button[data-test-id="btn-login"]').click();
  cy.get('button[data-test-id="btn-login"]').click();
  cy.get('textarea[data-test-id="diagnosis"]').click();
  // cy.get('textarea[data-test-id="diagnosis"]').type('test');

  // cy.get('[data-test-id="btn-login"]').should('be.visible').click();
  // cy.getByTestIdScroll("diagnosis")
  //   .should("be.visible")
  //   .should("not.be.disabled")
  //   .clear({ force: true })
  //   .type(protocol.diagnosis, { force: true });
  cy.get('[data-test-id="diagnosis"]').type(protocol.diagnosis);
  cy.get('[data-test-id="protocol-name"]').select(protocol.protocolname);
  cy.get('[data-test-id="med-name"]').type(protocol.medication);
  cy.get('[data-test-id="med-dose"]').type(protocol.dose);
  cy.get('[data-test-id="med-frequency"]').type(protocol.frequency);
  cy.get('[data-test-id="btn-add-med"]').click();
  cy.get('[data-test-id="lab-120-med-list"]').should('be.visible');
  cy.get('[data-test-id="btn-save-protocol"]').click();
  cy.contains('Protocol updated.').should('be.visible');
  cy.get('[data-test-id="timeline"]').contains('PROTOCOL_UPDATED').should('be.visible');
});

Cypress.Commands.add("chiefChangeDoctorAndLock", (patientName, newDoctor) => {
  cy.clickByText("Admin");
  cy.clickByText("Doctor Change");

  cy.contains(patientName, { matchCase: false }).click({ force: true });
  cy.selectByLabel("Assign doctor", newDoctor);
  cy.clickByText("Confirm");
  cy.contains(/doctor changed|assigned|success/i, { timeout: 20000 }).should("exist");

  cy.clickByText("Record Lock");
  cy.contains(patientName, { matchCase: false }).click({ force: true });
  cy.clickByText("Lock");
  cy.contains(/locked|record locked|success/i, { timeout: 20000 }).should("exist");
});


Cypress.Commands.add("verifyText", (text, options = {}) => {
  const t = text == null ? "" : String(text).trim();
  if (!t) throw new Error("verifyText: text is empty");

  return cy.contains(t, { matchCase: false, ...options }).should("be.visible");
});

Cypress.Commands.add("verifyTimeline", (patientName) => {

  cy.clickByText("Timeline");
  cy.contains(patientName, { matchCase: false }).click({ force: true });

  const expectedStages = [
    /admission/i,
    /lab order/i,
    /delayed/i,
    /protocol/i,
    /doctor change/i,
    /lock/i
  ];

  expectedStages.forEach((re) => {
    cy.contains(re).should("exist");
  });
});
