namespace my.bookshop;

using { cuid, managed, sap.common.CodeList } from '@sap/cds/common';

entity Books : cuid, managed {
  title      : String(111);
  descr      : String(1000) @mandatory;
  author     : Association to Authors;
  stock      : Integer;
  price      : Decimal(9,2);
  currency   : Association to Currencies on currency.code = currency_code;
  currency_code : String(3); // <-- Add this line
  genre      : Association to Genres on genre.code = genre_code;
  genre_code : String(10); 
}

annotate Books with{
  modifiedAt @odata.etag
}

entity Authors : cuid, managed {
  name       : String(111);
  books      : Composition of many Books on books.author = $self;
}

entity Orders : cuid, managed {
  book       : Association to Books;
  quantity   : Integer;
  total      : Decimal(9,2) @readonly;
}

entity Currencies {
  code       : String(3);
  symbol     : String(5);
}

entity Genres : CodeList {
  key code   : String(10);
  text       : localized String(100);    
}