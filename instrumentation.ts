// instrumentation.ts
export async function register() {
  // Custom initialization first
  console.log('🚀 Server starting...');

  // Initialize custom services
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side custom logic
    await initializeDatabase();
    await initializeCache();

    // Then load Sentry
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime custom logic
    await initializeEdgeServices();

    // Then load Sentry
    await import('./sentry.edge.config');
  }

  console.log('✅ Instrumentation complete');
}

// Next.js 15+ error handling
export async function onRequestError(
  err: Error,
  request: {
    path: string;
    method: string;
    headers: Headers;
  },
  context: {
    routerKind: 'Pages Router' | 'App Router';
    routePath: string;
    routeType: 'render' | 'route' | 'action' | 'middleware';
  }
) {
  // Custom error logging (in addition to Sentry)
  console.error('❌ Request Error:', {
    error: err.message,
    path: request.path,
    method: request.method,
    route: context.routePath,
  });

  // Send to custom analytics
  await sendToCustomAnalytics({
    error: err,
    request,
    context,
  });
}

// Helper functions
async function initializeDatabase() {
  // Your database connection logic
  console.log('📊 Database initialized');
}

async function initializeCache() {
  // Your cache initialization
  console.log('💾 Cache initialized');
}

async function initializeEdgeServices() {
  // Edge-specific services
  console.log('⚡ Edge services initialized');
}

async function sendToCustomAnalytics(data: any) {
  // Your custom analytics logic
}
