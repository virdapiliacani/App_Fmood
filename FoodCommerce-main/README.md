## FmoodEcommerce - E-Commerce Website

![Banner](frontend/public/banner.jpg)

#### Demo : [Click Here](https://fmood-f097b.web.app)

### Features :

#### Guest :

1. Register
2. Login
3. View Product
4. Find Product

#### User :

1. Add to cart
2. Checkout
3. Trace Transaction
4. View Transaction
5. Open Their Own Store
6. etc

#### Admin Store

1. Product CRUD
2. Add a product video and photo upto 5 photos / product
3. Manage Order
   - Cancel Order
   - Process Order
   - Trace Order
   - View Success Order
4. etc

#### Installation

meet system requirement below before begin the installation :

1. PHP ver >= 7.4
2. Nodejs ver >= 16
3. PHP composer

##### a. Backend Installation

1. Clone repository using command "git clone [link]"
2. Create database in mysql
3. rename ".env.example" file to ".env"
4. configure .env accordingly, based on your mysql connection configuration.
5. Go to backend folder
6. run commands below :

```
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan storage:link
php artisan serve
```

##### b. Frontend Installation

_do commands below on diffrent terminal / command line / tty_

1. Go to frontend folder
2. run commands below :

```
npm install
npm start
```

**Note : on many case default backend/laravel url is : https://127.0.0.1:8000**  
**if you meet different case, change backend and storage url in _frontend/src/serverUrls_**

##### Dev Note : Apps Layout still using Indonesian Language, will update to english near future :) .
