# dynamic_public_ip
Script que se ejecuta en un intervalo de tiempo para comprobar si ha cambiado la ip pública de la red en la que está alojado el servidor, útil para redes domésticas con ip pública dinámica a la que queramos acceder personalmente desde fuera.
En caso de que cambie la ip se envía un email al destinatario indicado.

Para nodemailer es necesario nodejs versión > 6
