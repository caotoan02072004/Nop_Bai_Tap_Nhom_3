/// <reference types="cypress" />

describe('BTVN', () => {
    it('Thực hiện chờ đến lúc hoàn tất task', () => {
        cy.visit('https://practice.expandtesting.com/slow');
        cy.contains('The slow task has finished. Thanks for waiting!', { timeout: 10000 }).should('be.visible');
    })


    it("Tìm tới phần tử có text là 48.48 trong bảng", () => {
        cy.visit("https://practice.expandtesting.com/large");
        cy.contains("td", "48.48")
            .scrollIntoView({ easing: 'linear' })
            .should("be.visible").click();

    });


    it('Thực hiện các thao tác', () => {
        cy.visit('https://practice.expandtesting.com/shadowdom');
        cy.contains("This button is inside a Shadow DOM.", { includeShadowDom: true })
            .click()

        cy.on('window:alert', (text) => {
            expect(text).to.eq('OK');

        })
    })
    it('Lấy danh sách các giá trị của bảng', () => {
        cy.visit('https://practice.expandtesting.com/challenging-dom');
        const tableValues = []

        cy.get('table thead th').then($headers => {
            const columns = [...$headers].map(th => th.innerText.trim())

            cy.get('table tbody tr').each($row => {
                const rowData = {}

                cy.wrap($row).find('td').each(($cell, index) => {
                    rowData[columns[index]] = $cell.text().trim()
                }).then(() => {
                    tableValues.push(rowData)
                })
            }).then(() => {
                console.log(tableValues)
                cy.log(JSON.stringify(tableValues))
            })
        })
    })
})
describe('Nhấn vào btn vàng 10 lần liên tiếp', () => {
    it('TC01 - Click yellow button 10 times with wait for reload', () => {

        cy.visit('https://practice.expandtesting.com/challenging-dom');
        

        const clickYellow = (count) => {

            if (count <= 0) return;

            cy.get('.btn.btn-warning.mb-2')
                .should('be.visible')
                .click();

            cy.get('table')
                .should('be.visible')
                .then(() => {
                    clickYellow(count - 1);
                });
        };

        clickYellow(10);

    });

})

describe('Thực hiện lấy được con số trong thẻ hình ảnh dưới cùng', () => {

    it.only('Thực hiện lấy được con số trong thẻ hình ảnh dưới cùng', () => {

        cy.visit('https://practice.expandtesting.com/challenging-dom', {
            onBeforeLoad(win) {

                // Spy vào fillText
                cy.stub(win.CanvasRenderingContext2D.prototype, 'fillText')
                    .as('fillText');
            }
        });

        // Đảm bảo canvas đã render
        cy.get('#canvas').should('exist');

        // Lấy text đã được vẽ lên canvas
        cy.get('@fillText').then(stub => {

            // Lấy argument đầu tiên của lần gọi cuối
            const text = stub.lastCall.args[0];
            // Ví dụ: "Answer: 99900"

            cy.log(`Canvas text: ${text}`);

            // Tách số
            const number = text.match(/\d+/)[0];

            cy.log(`Extracted number: ${number}`);

            expect(number).to.match(/^\d+$/);
        });
    });

});

describe('Thực hiện thao tác', () => {

    beforeEach(() => {
        cy.visit('https://practice.expandtesting.com/js-dialogs');
    });

    it('Đối với Alert: Thực hiện ấn [Ok]', () => {
        cy.get('#js-alert').click();

        cy.on('window:alert', (text) => {
            expect(text).to.contains('I am a Js Alert');
        });

        // cy.contains('Click for JS Alert').click();

        cy.get('#dialog-response')
            .should('have.text', 'OK');
    });

    it('Đối với Prompt: Nhập liệu thành công', () => {


        cy.on('window:confirm', () => false);

        cy.get('#js-confirm').click();

        cy.get('#dialog-response')
            .should('have.text', 'Cancel');
    });

    it('Đối với Confirm: Ấn được nút Huỷ', () => {

        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('Nhập liệu thành công');
        });

        cy.get('#js-prompt').click();

        cy.get('#dialog-response')
            .should('have.text', 'Nhập liệu thành công');
    });

});

describe('Thực hiện thao tác chuột phải vào vùng chỉ định', () => {
    it('Thực hiện thao tác chuột phải vào vùng chỉ định', () => {
        cy.visit('https://practice.expandtesting.com/context-menu');

        cy.get('#hot-spot').rightclick();

        cy.on('window:alert', (text) => {
            expect(text).to.eq('You selected a context menu');
        });


    });
});

describe('Thực hiện kéo slider lên giá trị 3', () => {
    it('Thực hiện kéo slider lên giá trị 3)', () => {
        cy.visit('https://practice.expandtesting.com/horizontal-slider');

        cy.get('input[type="range"]').then(($el) => {
            const el = $el[0];

            el.value = '3';

            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        });

        cy.get('#range', { timeout: 10000 }).should('have.text', '3');
    });
});

describe('Thực hiện các thao tác', () => {
    it('Remove and add checkbox successfully', () => {
        cy.visit('https://practice.expandtesting.com/dynamic-controls');

        cy.contains('button', 'Remove').click();

        cy.get('#checkbox', { timeout: 10000 }).should('not.exist');

        cy.get('#message').should('have.text', "It's gone!");

        cy.contains('button', 'Add').click();

        cy.get('#checkbox', { timeout: 10000 }).should('exist');


        cy.get('#message').should('have.text', "It's back!");
    });
});

describe('Dynamic Controls - Enable / Disable input', () => {
    it('Enable and disable input successfully', () => {
        cy.visit('https://practice.expandtesting.com/dynamic-controls');

        const input = '#input-example input';

        cy.contains('button', 'Enable').click();


        cy.get(input, { timeout: 10000 })
            .should('be.enabled');


        cy.get('#message')
            .should('have.text', "It's enabled!");


        cy.contains('button', 'Disable').click();


        cy.get(input, { timeout: 10000 })
            .should('be.disabled');

        cy.get('#message')
            .should('have.text', "It's disabled!");
    });
});

describe('Notes App - Full flow', () => {
    const email = `user_${Date.now()}@test.com`;
    const password = '12345678';
    const name = 'test';
    const noteTitle = 'My first note';
    const noteDesc = 'This is a test note';

    it('Register -> Login -> Add note -> Verify -> Delete note', () => {

        cy.visit('https://practice.expandtesting.com/notes/app');

        cy.get('[data-testid="open-register-view"]').click();

        cy.get('[data-testid="register-email"]').type(email);
        cy.get('#password').type(password);
        cy.get('#confirmPassword').type(password);
        cy.get('[data-testid="register-name"]').type(name);

        cy.get('button[type="submit"]').click();


        cy.get('[data-testid="login-view"]').click();

        cy.url().should('include', '/login');


        cy.get('#email').type(email);
        cy.get('#password').type(password);


        cy.get('button[type="submit"]').click();

        cy.url({ timeout: 10000 }).should('include', '/notes');

        cy.contains('button', 'Add Note').click();

        cy.get('#title').type(noteTitle);
        cy.get('#description').type(noteDesc);



        cy.get('select#category')
            .should('be.visible')
            .select('Work');


        cy.contains('button', 'Create').click();


        // cy.contains('.card', noteTitle, { timeout: 10000 })
        //     .should('be.visible')
        //     .and('contain.text', noteDesc);

        cy.get('.card', { timeout: 10000 })
            .should('contain.text', noteTitle)
            .and('contain.text', noteDesc);


        cy.get('[data-testid="note-delete"]').click();
        cy.get('[data-testid="note-delete-confirm"]').click();


        cy.contains('.card', noteTitle)
            .should('not.exist');
    });
});

describe('Color Wheel - White box (correct)', () => {
    it('Spin and click correct color on first try', () => {

        cy.visit('https://practice.expandtesting.com/color-wheel', {
            onBeforeLoad(win) {
                Object.defineProperty(win, '__getColorSelected', {
                    get() {
                        return win.eval('colorSelected');
                    }
                });
            }
        });

        cy.window()
            .its('__getColorSelected')
            .should('be.a', 'string')
            .then(color => {
                cy.log('Correct color:', color);

                cy.get('#answers')
                    .contains('button', new RegExp(`^${color}$`, 'i'))
                    .click();
            });

        cy.get('#result')
            .should('not.contain.text', 'Incorrect');
    });
});

describe('Flaky Test - reload based', () => {


    beforeEach(() => {
        cy.visit("https://practice.expandtesting.com/flaky-test");
    });

    it.only("Should eventually show Success after reloads", { retries: 10 }, () => {
        // cy.visit('https://practice.expandtesting.com/flaky-test');
        cy.contains("Ready")
            .should("exist")
            .should("be.visible")
            .click();
    });
});


describe('New Window page', () => {
    it('Find text on new window page', () => {
        cy.visit('https://practice.expandtesting.com/windows');

        cy.contains('a', 'Click Here')
            .invoke('removeAttr', 'target')
            .click();

        cy.contains(
            'Example of a new window page for Automation Testing Practice',
            { timeout: 10000 }
        ).should('be.visible');
    });
});


describe('OTP Login - auto Gmail', () => {
    it.only('Login successfully and verify Logout button', () => {
        cy.visit('https://practice.expandtesting.com/otp-login');

        cy.get('#email')
            .type('ngocvunc207@gmail.com');

        cy.get('[type="submit"]').click();

        cy.task('getOtpFromGmail').then((otp) => {
            cy.get('#otp').type(otp);
            cy.get('[type="submit"]').click();
        });

        cy.contains('Logout', { timeout: 10000 })
            .should('be.visible');
    });
});


describe('Geolocation - Where Am I', () => {
    it('Allow geolocation and verify city', () => {

        cy.visit('https://practice.expandtesting.com/geolocation', {
            onBeforeLoad(win) {
                cy.stub(win.navigator.geolocation, 'getCurrentPosition')
                    .callsFake((cb) => {
                        return cb({
                            coords: {
                                latitude: 21.028511,
                                longitude: 105.804817
                            }
                        });
                    });
            }
        });


        cy.get('#geoBtn').click();

        cy.contains('City:', { timeout: 10000 })
            .should('be.visible')
            .and('contain.text', 'Unknown');
    });
});







