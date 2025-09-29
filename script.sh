#!/bin/bash
set -e

MONGO_URI="mongodb://root:root@localhost:28000/campuswap?authSource=admin"

echo "=== [1] Reload collection: activities ==="
mongoimport --uri "$MONGO_URI" \
  --collection activities \
  --drop \
  --file activities.json \
  --jsonArray

echo "=== [2] Reload collection: users ==="
mongoimport --uri "$MONGO_URI" \
  --collection users \
  --drop \
  --file campuswap.users.json \
  --jsonArray

echo "=== Script terminé ==="
read -p "Appuyez sur Entrée pour fermer..."
