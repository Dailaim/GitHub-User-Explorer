#!/bin/sh

# Espera a que la base de datos esté lista
while ! timeout 1 bash -c 'echo > /dev/tcp/db/5432'; do
  echo "waiting for postgres..."
  sleep 2
done

# Ejecuta la migración de la base de datos
npx prisma db push

# Inicia la aplicación
npm run start 