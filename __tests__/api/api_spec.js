const frisby = require('frisby');
const Joi = frisby.Joi;

describe('BADGES', function () {
    it('Check Data types of GET BADGES call', function (done) {
        return frisby.get('https://api.stackexchange.com/2.2/badges?order=desc&sort=rank&site=stackoverflow')
          .expect('status', 200)
          .expect('jsonTypes', 'items.*', { // Assert *each* object in 'items' array
            'badge_type': Joi.string().required(),
            'award_count': Joi.number().required(),
            'rank': Joi.string().required(),
            'badge_id': Joi.number().required(),
            'link': Joi.string().uri().required(),
            'name': Joi.string().required(),
          })
          .done(done); 
      });
});

describe('BADGES/Names', function () {
    it ('Check Data types of GET BADGES NAMES call', function (done) {
        return frisby
          .get('https://api.stackexchange.com/2.2/badges/name?order=asc&sort=name&site=stackoverflow')
          .expect('status', 200)
          .expect('jsonTypes', 'items.*', { // Assert *each* object in 'items' array
          'badge_type': Joi.string().required(),
          'award_count': Joi.number().required(),
          'rank': Joi.string().required(),
          'badge_id': Joi.number().required(),
          'link': Joi.string().uri().required(),
          'name': Joi.string().required(),
        })
        .done(done);
    });
});

describe('BADGES/Names', function () {
    it('Check Names are sorted in ascending order', function (done) {
        return frisby
            .get('https://api.stackexchange.com/2.2/badges/name?order=asc&sort=name&site=stackoverflow')
            .expect('status', 200)
            .then((res) => {
                //console.log(res.body.items);
                const data = JSON.parse(res['body']);
                const items = data.items;
                const originalItemNames = items.map((item) => item.name);
                const sortedItems = [...originalItemNames].sort();
                //console.log(JSON.stringify(originalItemNames) === JSON.stringify(sortedItems));
                expect(JSON.stringify(originalItemNames) === JSON.stringify(sortedItems)).toBe(true)
            })
            .done(done);
    });
});


describe('BADGES/Names', function () {
    it('Check Names are sorted in descending order', function (done) {
        return frisby
            .get('https://api.stackexchange.com/2.2/badges/name?order=desc&sort=name&site=stackoverflow')
            .expect('status', 200)
            .then(function(res) {
                //console.log(res.body.items);
                const data = JSON.parse(res['body']);
                const items = data.items;
                const originalItemNames = items.map((item) => item.name);
                const sortedItems = [...originalItemNames].sort().reverse();
                //console.log(JSON.stringify(originalItemNames) === JSON.stringify(sortedItems));
                expect(JSON.stringify(originalItemNames) === JSON.stringify(sortedItems)).toBe(true)
            })
            .done(done);
    });
});


describe('BADGES/Names', function () {
    it('Check rank filter is correct', function (done) {
        return frisby
            .get('https://api.stackexchange.com/2.2/badges?order=asc&max=gold&sort=rank&site=stackoverflow')
            .expect('status', 200)
            .then(function(res) {
                //console.log(res.body.items);
                const data = JSON.parse(res['body']);
                const items = data.items;
                const originalRankNames = items.map((item) => item.rank);
                expect(originalRankNames.every((val, i, originalRankNames) => val === 'gold')).toBe(true)
            })
            .done(done);
    });
});
jest.setTimeout(20000);