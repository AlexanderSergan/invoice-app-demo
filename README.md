# Overview

Simple invoice demo app.
demo: https://calm-waters-44556.herokuapp.com

# Roadmap
  - [x] Heroku pipeline deploy.
  - [x] Customers page.
  - [x] Products page.
  - [ ] FAB.
  - [ ] Module tree refactor.
  - [ ] Documentation.
  - [ ] Analytics.

# Dependencies

- sqlite3
- node
- npm

# Getting Started

###### Install npm dependencies
`npm install`

###### Run the node server
`node app.js`

###### Viewing the application in your browser
`http://localhost:8000`

# Schema

## Customers

- id (integer)
- name (string)
- address (string)
- phone (string)


## Products

- id (integer)
- name (string)
- price (decimal)

## Invoices

- id (integer)
- customer_id (integer)
- discount (decimal)
- total (decimal)

## InvoiceItems

- id (integer)
- invoice_id (integer)
- product_id (integer)
- quantity (decimal)


# Resources

## Customers
```
GET|POST          /api/customers
GET|PUT|DELETE    /api/customers/{id}
```

## Products
```
GET|POST          /api/products
GET|PUT|DELETE    /api/products/{id}
```
## Invoices
```
GET|POST          /api/invoices
GET|PUT|DELETE    /api/invoices/{id}
```

## InvoiceItems
```
GET|POST          /api/invoices/{id}/items
GET|PUT|DELETE    /api/invoices/{invoice_id}/items/{id}
```
