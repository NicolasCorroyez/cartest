const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

const { expect } = chai;
chai.use(chaiHttp);

describe('Cart API', () => {
    // Exercice très facile : Ajouter un produit
    it('devrait ajouter un produit au panier', (done) => {
        chai.request(app)
            .post('/cart')
            .send({
                id: '1',
                name: 'Produit A',
                price: 10,
                taxRate: 20,
                quantity: 2,
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.cart).to.be.an('array').with.lengthOf(1);
                done();
            });
    });

    // Exercice facile : Calcul des totaux
    it('devrait calculer correctement les totaux', (done) => {
        chai.request(app)
            .get('/cart')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.totalHT).to.equal('20.00');
                expect(res.body.totalTax).to.equal('4.00');
                expect(res.body.totalTTC).to.equal('24.00');
                done();
            });
    });

    // Exercice moyen : Application d'un rabais
    it('devrait appliquer un rabais sur le panier', (done) => {
        chai.request(app)
            .get('/cart')
            .end((err, res) => {
                expect(res).to.have.status(200);
                const discount = (parseFloat(res.body.totalTTC) * 10 / 100).toFixed(2); // 10% de rabais
                expect(discount).to.equal('2.40');
                done();
            });
    });

    // Exercice moyen : Supprimer un produit du panier
    it('devrait supprimer un produit du panier', (done) => {
        chai.request(app)
            .delete('/cart/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.cart).to.be.an('array').with.lengthOf(0);
                done();
            });
    });
});
