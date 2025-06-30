// Environment variables checker for development
// This helps debug environment variable loading issues

export function checkEnvironmentVariables() {
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ];

  console.log('🔍 Environment Variables Check:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  
  const missing: string[] = [];
  const present: string[] = [];

  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      present.push(varName);
      console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
    } else {
      missing.push(varName);
      console.log(`❌ ${varName}: undefined`);
    }
  });

  if (missing.length > 0) {
    console.log('\n❌ Missing environment variables:', missing);
    console.log('📝 Please check your .env.local file and restart the development server');
    return false;
  } else {
    console.log('\n✅ All required environment variables are present');
    return true;
  }
}

// Optional environment variables
export function checkOptionalEnvironmentVariables() {
  const optionalVars = [
    'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
    'NEXT_PUBLIC_APP_NAME',
    'NEXT_PUBLIC_APP_VERSION',
    'NEXT_PUBLIC_BASE_URL'
  ];

  console.log('\n📋 Optional Environment Variables:');
  optionalVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: ${value}`);
    } else {
      console.log(`⚠️ ${varName}: not set`);
    }
  });
}
