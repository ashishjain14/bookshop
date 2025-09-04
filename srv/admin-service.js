const cds = require('@sap/cds')

class AdminService extends cds.ApplicationService {
    init(){
        const { Authors }   = this.entities;

        this.before(['CREATE', 'UPDATE'], Authors, this.validateLifeData);

         // Reduce the stock of the ordered book according to the ordered quantity
        this.on('submitOrder', this.reduceStock);

        return super.init();
    }

    reduceStock(req) {
        /* !!! This is only a preliminary, incomplete implementation of the submitOrder action. !!!
           !!! In the next lesson, we will learn how to use queries.                            !!!
           !!! These will then be used to complete the implementation.                          !!! */
        const { Books } = this.entities;
        const { book, quantity } = req.data;

        if (quantity < 1) {
            return req.error('The quantity must be at least 1.');
        }

        let stock = 10;

        return { stock };
    }

    validateLifeData(req) {
        const { dateOfBirth, dateOfDeath } = req.data;
        if (!dateOfBirth || !dateOfDeath) {
            return;
        }

        const birth = new Date(dateOfBirth);
        const dead = new Date(dateOfDeath);

        if (dead < birth) {
            req.error('DEATH_BEFORE_BIRTH',[dateOfDeath,dateOfBirth]);
        }
    }

}

module.exports = AdminService;