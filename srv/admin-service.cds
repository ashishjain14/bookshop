using my.bookshop as db from '../db/schema.cds' ;

service AdminService{

    entity Books as projection on db.Books ;
    entity Authors as projection on db.Authors ;
}