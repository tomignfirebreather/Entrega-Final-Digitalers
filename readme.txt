Datos del administrador para poder acceder a las operaciones CRUD de productos:

useremail: "administrador@hotmail.com"
userpass: "123456"
-----------------------------------------------------------------------------------------------
Detalles de la aplicación:

La aplicación consiste en un ecommerce desarrollado con la técnica SSR (Server Side Rendering) 
utilizada en el desarrollo de aplicaciones web, con un diseño basado en una arquitectura MVC 
(Modelo Vista Controlador), en el cual se renderizan desde el servidor los archivos html.
La app web es un eccomerce con inicio de sesión, tanto para clientes como para administradores, 
donde sólo estos últimos acceden a un panel de administración de los productos que se 
comercializan en el eccomerce.
La aplicación es segura, ya que cuenta con encriptación de contraseña con bcrypt, y diversos 
middlewares tales como protección de rutas para que accedan a las mismas el usuario que le 
corresponda (client o admin) y otro con jsonwebtoken para autenticar las solicitudes y se pueda 
proporcionar el acceso seguro a los recursos protegidos de la aplicación web.
-----------------------------------------------------------------------------------------------
Herramientas y tecnologías utilizadas:

Diseño:
Figma

Frontend:
HTML5
CSS3
Bootstrap
Javascript

Backend:
Node.js
Express.js

Base de datos:
MongoDB Atlas Database
-----------------------------------------------------------------------------------------------
Propósito de la aplicación:

Barté es un eccomerce en donde se pueden adquirir combos de tragos o cocktails con todos los 
ingredientes necesarios para prepararlos. Más adelente la intención es que también se pueda 
ofrecer las recetas de cómo preparar los tragos paso a paso, datos exclusivos sobre los tragos 
que se ofrecen y sobre la cocktelería. Además de una sección de "favoritos" en donde se puedan
valorar los tragos y añadir notas o comentarios.
