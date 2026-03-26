#!/bin/sh
echo "Running migrations..."
npx prisma migrate deploy || echo "Migration failed, continuing..."
echo "Starting API..."
exec node dist/main
