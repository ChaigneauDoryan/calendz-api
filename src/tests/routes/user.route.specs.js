const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')
const helper = require('../test.helper')

describe('./routes/user.route', () => {
  // ===============================================
  // == POST /api/v1/user - user register
  // ===============================================
  describe('POST /api/v1/user - user register', () => {
    it('should fail (412) : veuillez indiquer votre prénom', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre prénom')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer votre nom', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre nom')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer votre adresse mail', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', password: '123AZE', password2: '123AZE', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre adresse mail')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer un mot de passe', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password2: '123AZE', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un mot de passe')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez confirmer votre mot de passe', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez confirmer votre mot de passe')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer votre classe', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre classe')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : le prénom indiqué est trop court', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'Jo', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le prénom indiqué est trop court')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : le nom indiqué est trop court', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Do', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le nom indiqué est trop court')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : l\'adresse mail indiquée est trop courte', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'a.z@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'L\'adresse mail indiquée est trop courte')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : le mot de passe indiqué est trop court', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZ', password2: '123AZ', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le mot de passe indiqué est trop court')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : le prénom indiqué est trop long', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'azeazeazeazeazeazeazeazeazeazeaze', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', password2: 'AZE123', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le prénom indiqué est trop long')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : le nom indiqué est trop long', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'azeazeazeazeazeazeazeazeazeazeaze', email: 'john.doe@epsi.fr', password: '123AZE', password2: 'AZE123', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le nom indiqué est trop long')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : l\'adresse mail indiquée est trop longue', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'azeazeazeazeazeazeazeazeazeazeaze.azeazeazeazeazeazeazeazeazeazeaze@epsi.fr', password: '123AZE', password2: 'AZE123', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'L\'adresse mail indiquée est trop longue')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : le mot de passe indiqué est trop long', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: 'azeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeaze', password2: 'azeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeaze', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le mot de passe indiqué est trop long')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer une adresse mail valide', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doeepsi.fr', password: '123AZE', password2: 'AZE123', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une adresse mail valide')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : seules les adresses EPSI et WIS sont acceptées', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@gmail.com', password: '123AZE', password2: 'AZE123', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Seules les adresses EPSI et WIS sont acceptées')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : cette adresse mail est déjà utilisée', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'alexandre.tuet1@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Cette adresse mail est déjà utilisée')
          done()
        })
    })

    it('should fail (412) : votre mot de passe doit contenir au moins un chiffre', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'alexandre.tuet@epsi.fr', password: 'AZEAZE', password2: 'AZE123', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Votre mot de passe doit contenir au moins un chiffre')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : votre mot de passe doit contenir au moins une lettre', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123123', password2: 'AZE123', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Votre mot de passe doit contenir au moins une lettre')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : les deux mots de passe ne correspondent pas', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: 'AZE123', password2: 'AZE1234', grade: 'B1 G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Les deux mots de passe ne correspondent pas')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer une classe valide', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: 'AZE123', password2: 'AZE123', grade: 'B1 G4' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une classe valide')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should success (201) : votre compte a bien été créé', (done) => {
      request(app).post('/api/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: 'AZE123', password2: 'AZE123', grade: 'B1 G1' })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          assert.property(res.body, 'id')
          assert.isDefined(res.body.id)
          helper.hasBodyMessage(res.body, 'Votre compte a bien été créé')
          done()
        })
    })
  })

  // ====================================================================
  // == POST /api/v1/user/password-reset - réinitialisation mot de passe
  // ====================================================================
  describe('POST /api/v1/user/password-reset - réinitialisation mot de passe', () => {
    it('should fail (412) : aucun token transmit', (done) => {
      request(app).post('/api/v1/user/password-reset').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucun token transmit')
          done()
        })
    })

    it('should fail (404) : le lien actuel est invalide', (done) => {
      request(app).post('/api/v1/user/password-reset').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'notAValidToken' })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Le lien actuel est invalide')
          done()
        })
    })

    it('should fail (412) : le type du token est invalide', (done) => {
      request(app).post('/api/v1/user/password-reset').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken3' })
        // .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Le type du token est invalide')
          done()
        })
    })

    helper.testPasswordWithConfirmation('/api/v1/user/password-reset')
  })

  // ===============================================
  // == GET /api/v1/user/:id - get user
  // ===============================================
  describe('GET /api/v1/user/:id - get user', () => {
    // make sure this route requires auth
    helper.testAuthentication('/api/v1/user/1234')

    it.skip('should fail (4??) : not a valid userId', (done) => {
      request(app).get('/api/v1/user/1234').set(helper.defaultSetsWithAuth).expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err)
          // TODO:
          done()
        })
    })

    it.skip('should fail (4??) : user not found', (done) => {
      request(app).get('/api/v1/user/????').set(helper.defaultSetsWithAuth).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          // TODO:
          done()
        })
    })

    it.skip('should success (200) : valid user data', (done) => {
      request(app).get('/api/v1/user/????').set(helper.defaultSetsWithAuth).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          // TODO:
          done()
        })
    })
  })
})