#!/bin/bash

# Script para configurar Google Play Service Account
# Autor: Splits Team

set -e

echo "🔐 Configuración de Service Account para Google Play"
echo "=================================================="
echo ""

# Verificar que existe el archivo
if [ ! -f "google-play-service-account.json" ]; then
    echo "❌ Error: google-play-service-account.json no encontrado"
    echo ""
    echo "Por favor:"
    echo "1. Ve a https://console.cloud.google.com/iam-admin/serviceaccounts"
    echo "2. Crea un service account"
    echo "3. Descarga el JSON key"
    echo "4. Guárdalo como google-play-service-account.json en este directorio"
    exit 1
fi

# Verificar que no sea el template vacío
if grep -q "AQUI_VA_TU_KEY_ID" google-play-service-account.json; then
    echo "⚠️  Advertencia: El archivo parece ser un template"
    echo ""
    read -p "¿Quieres reemplazarlo con tu archivo real? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Por favor, pega el contenido del JSON descargado de Google Cloud:"
        echo "(Presiona Ctrl+D cuando termines)"
        cat > google-play-service-account.json
        echo "✅ Archivo actualizado"
    else
        echo "❌ Cancelado"
        exit 1
    fi
fi

# Validar que sea un JSON válido
if ! jq empty google-play-service-account.json 2>/dev/null; then
    echo "❌ Error: El archivo no es un JSON válido"
    exit 1
fi

echo "✅ Archivo JSON válido"
echo ""

# Extraer información del service account
EMAIL=$(jq -r '.client_email' google-play-service-account.json)
PROJECT_ID=$(jq -r '.project_id' google-play-service-account.json)

echo "📧 Service Account Email: $EMAIL"
echo "🆔 Project ID: $PROJECT_ID"
echo ""

# Verificar si EAS está instalado
if ! command -v eas &> /dev/null; then
    echo "⚠️  EAS CLI no está instalado"
    echo "Instalando..."
    npm install -g eas-cli
fi

# Verificar login en EAS
echo "🔐 Verificando login en EAS..."
if ! eas whoami &> /dev/null; then
    echo "Por favor, inicia sesión en EAS:"
    eas login
fi

echo ""
echo "📤 Subiendo service account a EAS..."

# Crear el secret
eas secret:create \
    --scope project \
    --name GOOGLE_PLAY_SERVICE_ACCOUNT_KEY_PATH \
    --type file \
    --value ./google-play-service-account.json \
    --force

echo ""
echo "✅ ¡Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Ve a https://play.google.com/console/"
echo "2. Setup → API access → Grant access a: $EMAIL"
echo "3. Otorga permisos para 'Release apps to testing tracks'"
echo ""
echo "🚀 Para hacer submit:"
echo "   eas build --platform android --profile production-aab --auto-submit"
echo ""
