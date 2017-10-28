Developer: Seval U.
Contact: sevalzx@gmail.com
Date: 24.12.2013

**************************
* PHP LOGIN WEB SERVICE  *
**************************

Run sql dump in your Mysql server, then Put the codes in your server. This webservice always gives JSON output.
This project is created for who wants to learn basic PHP webservice. So it is for PHP beginners.

We have just one table whose name is "users". Here is its sql:
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `encrypted_password` varchar(64) CHARACTER SET utf8 NOT NULL,
  `salt` varchar(16) CHARACTER SET utf8 NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

1. Adding a user:

You can add a user with using GET:
http://myserveraddress.com/php_login_webservice/index.php?tag=register&name=seval&email=seval@test.com&password=12345

You should get this output JSON message:
{"tag":"register","success":1,"error":0,"uid":"52b98c6c9287a0.10563974","user":{"name":"seval","email":"seval@test.com","created_at":"2013-12-24 15:30:20","updated_at":null}}

If this user is already exist, it gives this output JSON:
{"tag":"register","success":0,"error":2,"error_msg":"User already existed"}

If there is an error during registration, it gives this output JSON:
{"tag":"register","success":0,"error":1,"error_msg":"Error occurred in Registration"}


2. Login a user:

You can make a user "login" with using GET:
http://myserveraddress.com/php_login_webservice/index.php?tag=login&email=seval@test.com&password=12345

If the parameters are true, the web service will give you this success output JSON:
{"tag":"login","success":1,"error":0,"uid":"52b98c6c9287a0.10563974","user":{"name":"seval","email":"seval@test.com","created_at":"2013-12-24 15:30:20","updated_at":null}}

Lets try a wrong password to login:
http://myserveraddress.com/php_login_webservice/index.php?tag=login&email=seval@test.com&password=123456

This is the error message, output JSON:
{"tag":"login","success":0,"error":1,"error_msg":"Incorrect email or password!"}
